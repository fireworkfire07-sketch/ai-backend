export default async function handler(req, res) {
  try {
    const { message } = req.body || {};

    if (!message) {
      return res.status(400).json({ reply: "Mesaj boş geldi." });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ reply: "OPENAI_API_KEY eksik." });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Sen Orhan’ın kısa, net ve para odaklı dijital asistanısın. Türkçe cevap ver.",
          },
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        reply: data.error?.message || "OpenAI API hatası.",
      });
    }

    return res.status(200).json({
      reply: data.choices?.[0]?.message?.content || "Cevap üretilemedi.",
    });
  } catch (error) {
    return res.status(500).json({
      reply: error.message || "Sunucu hatası.",
    });
  }
}
