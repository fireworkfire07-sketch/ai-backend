export default async function handler(req, res) {
  try {

    if (req.method !== "POST") {
      return res.status(200).json({
        ok: true,
        answer: "API çalışıyor"
      });
    }

    const message = req.body.message;

    if (!message) {
      return res.status(400).json({
        answer: "Mesaj boş"
      });
    }

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: message,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    return res.status(200).json({
      answer:
        data.choices?.[0]?.message?.content ||
        "OpenAI cevap vermedi",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      answer: "SERVER HATASI",
      error: String(error),
    });
  }
}

// redeploy trigger 999
