require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT = 3000;



const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
);



app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

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

app.listen(PORT, () => {

    console.log("===================================");

    console.log("TraderOS Server Running");

    console.log("http://localhost:" + PORT);

    console.log("===================================");

});