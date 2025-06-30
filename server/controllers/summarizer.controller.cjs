const axios = require('axios');

exports.summarizeArticle = async (req, res) => {
  const { text } = req.body;
  console.log("📥 Article text received:", text);

  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "No text provided" });
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${process.env.GEMINI_API_KEY}`;


  const payload = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Summarize the following article in 3 bullet points:\n\n${text}`
          }
        ]
      }
    ]
  };

  try {
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    const summary = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!summary) {
      throw new Error("Summary not found in Gemini response");
    }

    console.log("✅ Gemini Summary:", summary);
    res.json({ summary });

  } catch (error) {
    console.error("❌ Gemini API Error:", error.response?.data || error.message);
    res.status(500).json({
      error: "Failed to summarize",
      details: error.response?.data || error.message
    });
  }
};

