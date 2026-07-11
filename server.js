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

        const { data, error } = await supabase
            .from("trades")
            .select("journal")
            .limit(1)
            .single();

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

        await supabase.from("trades").delete().neq("id", 0);

        const { error } = await supabase
            .from("trades")
            .insert([
                {
                    journal: req.body
                }
            ]);
           
            

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

 app.post("/api/upload-image", upload.single("image"), async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: "No image received"
            });
        }
        const fileName =
    Date.now() +
    "-" +
    crypto.randomUUID() +
    ".png";

const { error } = await supabase.storage
    .from("screenshots")
    .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype
    });

if (error) {
    throw error;
}

const { data } = supabase.storage
    .from("screenshots")
    .getPublicUrl(fileName);

res.json({
    success: true,
    url: data.publicUrl
});

    } catch (err) {

        res.status(500).json({
            success: false,
            error: err.message
        });

    }

});

app.post("/api/delete-image", async (req, res) => {

    try {

        const { imageUrl } = req.body;

        if (!imageUrl) {
            return res.status(400).json({
                success: false,
                error: "Image URL missing"
            });
        }

        const fileName = imageUrl.split("/").pop();

        const { error } = await supabase.storage
            .from("screenshots")
            .remove([fileName]);

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