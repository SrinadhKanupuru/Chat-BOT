require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Test route
app.get("/", (req, res) => {
  res.send("AI Chatbot Backend is running!");
});

// Chat route
app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    console.log("User:", userMessage);

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",

      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant. Answer clearly and simply.",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    const reply = completion.choices[0].message.content;

    console.log("AI:", reply);

    res.json({
      reply: reply,
    });

  } catch (error) {
    console.error("Groq Error:", error);

    res.status(500).json({
      reply: "Sorry, I couldn't process your message.",
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});