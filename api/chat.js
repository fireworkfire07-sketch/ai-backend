export default async function handler(req, res) {
  try {
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
            content: "Sen Orhan’ın AI video içerik asistanısın.",
          },
          {
            role: "user",
            content: req.body.message || "Merhaba",
          },
        ],
      }),
    });

    const data = await response.json();

    res.status(200).json({
      reply: data.choices?.[0]?.message?.content || "Cevap alınamadı",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}
