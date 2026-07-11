const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const DB_PATH = path.join(__dirname, "database", "trades.json");

// Load Data
app.get("/api/trades", (req, res) => {

    try {

        const data = fs.readFileSync(DB_PATH, "utf8");

        res.json(JSON.parse(data));

    } catch (err) {

        res.json({});

    }

});

// Save Data
app.post("/api/trades", (req, res) => {

    try {

        fs.writeFileSync(
            DB_PATH,
            JSON.stringify(req.body, null, 2)
        );

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