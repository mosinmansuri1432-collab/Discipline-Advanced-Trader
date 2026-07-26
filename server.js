require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { createClient } = require("@supabase/supabase-js");
const crypto = require("crypto");
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

app.listen(PORT, () => {

    console.log("===================================");

    console.log("TraderOS Server Running");

    console.log("http://localhost:" + PORT);

    console.log("===================================");

});