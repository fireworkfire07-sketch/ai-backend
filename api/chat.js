export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({
      ok: true,
      message: "AI Backend calisiyor. POST /api/chat kullan."
    });
  }

  try {
    const { message } = req.body || {};

    if (!message) {
      return res.status(400).json({
        ok: false,
        error: "Mesaj bos olamaz."
      });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        ok: false,
        error: "OPENAI_API_KEY Vercel Environment Variables icinde yok."
      });
    }

    const openaiResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "Sen Orhan'in merkezi AI backend asistanisin. Kisa, net, pratik ve Turkce cevap ver. Para, proje, otomasyon ve is gelistirme odakli davran."
            },
            {
              role: "user",
              content: message
            }
          ],
          temperature: 0.7
        })
      }
    );

    const data = await openaiResponse.json();

    if (!openaiResponse.ok) {
      return res.status(openaiResponse.status).json({
        ok: false,
        error: "OpenAI cevap hatasi",
        detail: data
      });
    }

    const answer =
      data?.choices?.[0]?.message?.content || "Cevap alinamadi.";

    return res.status(200).json({
      ok: true,
      answer
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: "Sunucu hatasi",
      detail: error.message
    });
  }
}
