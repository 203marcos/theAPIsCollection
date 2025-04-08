import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

// Recria o comportamento de __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Serve static files (index.html and index.js)
app.use(express.static(__dirname));

// Endpoint para lidar com requisições à API OpenUV
app.get("/uv", async (req, res) => {
    const { lat, lng, alt = 0 } = req.query;

    if (!lat || !lng) {
        return res
            .status(400)
            .json({ message: "Latitude and longitude are required." });
    }

    console.log(
        "Latitude:",
        lat,
        "Longitude:",
        lng,
        "API Key:",
        process.env.OPENUV_API_KEY
    );

    try {
        const headers = {
            "x-access-token": process.env.OPENUV_API_KEY,
            "Content-Type": "application/json",
        };

        const requestOptions = {
            method: "GET",
            headers: headers,
            redirect: "follow",
        };

        const response = await fetch(
            `https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lng}&alt=${alt}`,
            requestOptions
        );

        console.log("API Response Status:", response.status);

        if (!response.ok) {
            const error = await response.json();
            console.error("API Error Response:", error);
            return res.status(response.status).json(error);
        }

        const data = await response.json();
        console.log("API Data:", data);
        res.json(data);
    } catch (error) {
        console.error("Server Error:", error.message);
        res.status(500).json({
            message: "Failed to fetch UV data.",
            error: error.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
