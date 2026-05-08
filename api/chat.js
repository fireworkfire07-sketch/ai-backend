export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(200).json({
        ok: true,
        answer: "AI Backend aktif. POST /api/chat kullan.",
        reply: "AI Backend aktif. POST /api/chat kullan."
      });
    }

    const message = req.body?.message || req.body?.text || "";

    if (!message) {
      return res.status(200).json({
        ok: false,
        error: "Mesaj gerekli",
        answer: "Mesaj gerekli.",
        reply: "Mesaj gerekli."
      });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(200).json({
        ok: false,
        error: "OPENAI_API_KEY yok",
        answer: "OPENAI_API_KEY Vercel içinde yok.",
        reply: "OPENAI_API_KEY Vercel içinde yok."
      });
    }

    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Sen Orhan'ın AI backend asistanısın. Türkçe, kısa, net ve pratik cevap ver."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await openaiResponse.json();

    if (!openaiResponse.ok) {
      const errorText = data?.error?.message || "OpenAI hata verdi.";
      return res.status(200).json({
        ok: false,
        error: errorText,
        answer: errorText,
        reply: errorText
      });
    }

    const answer = data?.choices?.[0]?.message?.content || "Cevap alınamadı.";

    return res.status(200).json({
      ok: true,
      answer,
      reply: answer
    });

  } catch (error) {
    return res.status(200).json({
      ok: false,
      error: error.message,
      answer: "Backend hata verdi: " + error.message,
      reply: "Backend hata verdi: " + error.message
    });
  }
}

// redeploy trigger 3
