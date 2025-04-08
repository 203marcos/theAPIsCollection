import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Serve static files (index.html and index.js)
app.use(express.static(__dirname));

// Endpoint to fetch random or filtered activity
app.get("/activity", async (req, res) => {
    const { type, participants } = req.query;

    let apiUrl = "https://bored-api.appbrewery.com/random";
    if (type || participants) {
        apiUrl = "https://bored-api.appbrewery.com/filter?";
        if (type) apiUrl += `type=${type}&`;
        if (participants) apiUrl += `participants=${participants}`;
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!response.ok) {
            return res
                .status(response.status)
                .json({ message: "Failed to fetch activity" });
        }

        res.json(data);
    } catch (error) {
        console.error("Server Error:", error.message);
        res.status(500).json({
            message: "Failed to fetch activity",
            error: error.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
