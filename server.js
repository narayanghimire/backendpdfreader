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

// Log incoming requests for debugging
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url} from origin: ${req.headers.origin}`);
  next();
});

// Use CORS with options
app.use(cors(corsOptions));
app.use(express.json());

// Handle preflight OPTIONS requests explicitly
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
