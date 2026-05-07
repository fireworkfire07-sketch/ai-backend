export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Mesaj gerekli",
      });
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
            content:
              "Sen Orhan AI'sin. Kısa, net, yardımcı ve hafızalı davran.",
          },
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    const data = await response.json();

    const cevap =
      data.choices?.[0]?.message?.content ||
      "Şu an cevap oluşturulamıyor.";

    return res.status(200).json({
      reply: cevap,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Sunucu hatası",
      detail: error.message,
    });
  }
}
