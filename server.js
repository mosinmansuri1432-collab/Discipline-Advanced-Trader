require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { createClient } = require("@supabase/supabase-js");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage()
});

const app = express();
const PORT = 3000;



const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
);

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));


// Load Data

app.get("/api/trades", async (req, res) => {

    try {

        const user_id = req.query.user_id;

        if (!user_id) {
            return res.json({});
        }

        const { data, error } = await supabase
            .from("trades")
            .select("journal")
            .eq("user_id", user_id)
            .maybeSingle();

        if (error || !data) {
            return res.json({});
        }

        res.json(data.journal);

    } catch (err) {

        res.json({});

    }

});

// Save Data

app.post("/api/trades", async (req, res) => {

    try {

        const { user_id, journal } = req.body;

        const { data: existing } = await supabase
            .from("trades")
            .select("id")
            .eq("user_id", user_id)
            .maybeSingle();

        let error;

        if (existing) {

            ({ error } = await supabase
                .from("trades")
                .update({
                    journal: journal
                })
                .eq("user_id", user_id));

        } else {

            ({ error } = await supabase
                .from("trades")
                .insert([
                    {
                        user_id: user_id,
                        journal: journal
                    }
                ]));

        }

        if (error) throw error;

        res.json({
            success: true
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            error: err.message
        });

    }

});

// Get Profile

app.get("/api/profile", async (req, res) => {

    try {

        const user_id = req.query.user_id;

        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user_id)
            .maybeSingle();

        if (error) throw error;

        res.json(data);

    } catch (err) {

        res.status(500).json({

            success: false,

            error: err.message

        });

    }

});

// Create / Update Profile

app.post("/api/profile", async (req, res) => {

    try {

        const { id, name, email } = req.body;

        const { data: existing } = await supabase
            .from("profiles")
            .select("id")
            .eq("id", id)
            .maybeSingle();

        let error;

        if (existing) {

            ({ error } = await supabase
                .from("profiles")
                .update({
                    name,
                    email
                })
                .eq("id", id));

        } else {

            ({ error } = await supabase
                .from("profiles")
                .insert([{
                    id,
                    name,
                    email,
                    role: "free",
                    plan: "free",
                    premium: false
                }]));

        }

        if (error) throw error;

        res.json({ success: true });

    } catch (err) {

        res.status(500).json({
            success: false,
            error: err.message
        });

    }

});

app.post("/api/create-order", async (req, res) => {

    try {

        const { amount } = req.body;

        const options = {

            amount: amount * 100,
            currency: "INR",
            receipt: "receipt_" + Date.now()

        };

        const order = await razorpay.orders.create(options);

        res.json(order);

    } catch (err) {

        res.status(500).json({

            success: false,
            error: err.message

        });

    }

});

app.post("/api/verify-payment", async (req, res) => {

console.log("VERIFY PAYMENT HIT");
console.log(req.body);

    try {

        const {

            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature

        } = req.body;

        const body =
            razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

         console.log("EXPECTED:", expectedSignature);
         console.log("RECEIVED:", razorpay_signature);

        if (expectedSignature === razorpay_signature) {

    console.log("PAYMENT VERIFIED");

    const startDate = new Date();

    const expiryDate = new Date();

    if (req.body.plan === "6month") {

        expiryDate.setMonth(expiryDate.getMonth() + 6);

    } else {

        expiryDate.setFullYear(expiryDate.getFullYear() + 1);

    }

    const { error } = await supabase
        .from("subscriptions")
        .insert([
            {
                user_id: req.body.user_id,
                plan: req.body.plan,
                amount: req.body.amount,
                payment_id: razorpay_payment_id,
                order_id: razorpay_order_id,
                status: "active",
                start_date: startDate,
                expiry_date: expiryDate
            }
        ]);

    if (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            error: error.message
        });

    }

    console.log("SUBSCRIPTION SAVED");



  const { error: profileError } = await supabase
    .from("profiles")
    .update({
        premium: true,
        role: "premium",
        plan: req.body.plan,
        expiry: expiryDate
    })
    .eq("id", req.body.user_id);

if (profileError) {
    console.error(profileError);
}

    return res.json({
        success: true
    });

}
        res.status(400).json({

            success: false

        });

    } catch (err) {

        res.status(500).json({

            success: false,
            error: err.message

        });

    }

});

app.listen(PORT, () => {

    console.log("KEY ID:", process.env.RAZORPAY_KEY_ID);
console.log("SECRET:", process.env.RAZORPAY_KEY_SECRET ? "FOUND" : "NOT FOUND");

    console.log("===================================");

    console.log("SANA VISIONARY TRADERServer Running");

    console.log("http://localhost:" + PORT);

    console.log("===================================");

});