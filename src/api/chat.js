
const SYSTEM_PROMPT = `
You are ONDA AI, a friendly multilingual assistant.

You have two responsibilities:

1. ONDA ASSISTANT:
Explain the ONDA connected hydration bottle concept.
Known project features:
- Hydration tracking.
- Personalized hydration goals.
- Smart hydration reminders.
- Connected mobile application.
- Supporting healthier daily habits.

Never invent technical specifications, prices, availability,
medical benefits or product capabilities that are not confirmed.
If you don't know, say so clearly.

2. GENERAL AI:
Answer general questions helpfully, accurately and clearly.

LANGUAGES:
- Detect the user's language automatically.
- Support Moroccan Darija, Arabic, French and English.
- Respond in the language used by the user.
- Keep answers friendly and concise.

SAFETY:
- Never diagnose medical conditions.
- Do not present hydration recommendations as medical advice.
- Never claim to be a human.
`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "AI service is not configured." });
  }

  try {
    const { message, history = [] } = req.body || {};

    if (
      typeof message !== "string" ||
      !message.trim() ||
      message.length > 2000
    ) {
      return res.status(400).json({ error: "Invalid message." });
    }

    if (!Array.isArray(history) || history.length > 12) {
      return res.status(400).json({ error: "Invalid conversation history." });
    }

    const safeHistory = history.map((item) => {
      if (
        !item ||
        !["user", "model"].includes(item.role) ||
        typeof item.text !== "string" ||
        item.text.length > 3000
      ) {
        throw new Error("Invalid conversation history.");
      }

      return {
        role: item.role,
        parts: [{ text: item.text }]
      };
    });

    const contents = [
      ...safeHistory,
      {
        role: "user",
        parts: [{ text: message.trim() }]
      }
    ];

    const model = process.env.GEMINI_MODEL || "gemini-3.8-flash";

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 700
          }
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      console.error("Gemini API error:", response.status, errorData);

      if (response.status === 429) {
        return res.status(429).json({
          error: "The AI is busy. Please try again shortly."
        });
      }

      return res.status(502).json({
        error: "The AI service is temporarily unavailable."
      });
    }

    const data = await response.json();

    const answer = data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim();

    if (!answer) {
      return res.status(502).json({
        error: "The AI returned an empty response."
      });
    }

    res.setHeader("Cache-Control", "no-store");

    return res.status(200).json({ answer });
  } catch (error) {
    console.error("Chat error:", error);

    return res.status(500).json({
      error: "Something went wrong. Please try again."
    });
  }
}
