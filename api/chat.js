export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(200).json({
        ok: true,
        message: "AI Backend aktif"
      });
    }

    const message = req.body?.message;

    if (!message) {
      return res.status(400).json({
        error: "Mesaj gerekli"
      });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    return res.status(200).json({
      reply: data.choices?.[0]?.message?.content || "Cevap alınamadı"
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}

// redeploy trigger
