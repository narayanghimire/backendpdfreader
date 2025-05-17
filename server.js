const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

const corsOptions = {
  origin: "https://reactpdfreader.onrender.com", // your frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.options("*", cors(corsOptions)); // enable preflight

app.post("/ask", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      req.body,
      {
        headers: {
          Authorization: `Bearer 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`,
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
