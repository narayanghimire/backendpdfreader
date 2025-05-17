require('dotenv').config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

const allowedOrigin = "https://reactpdfreader.onrender.com";

const corsOptions = {
  origin: allowedOrigin,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", allowedOrigin);
  res.header("Access-Control-Allow-Methods", corsOptions.methods);
  res.header("Access-Control-Allow-Headers", corsOptions.allowedHeaders.join(","));
  res.sendStatus(corsOptions.optionsSuccessStatus);
});

app.post("/ask", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      req.body,
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,  // Use env variable here
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send("Server error");
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
