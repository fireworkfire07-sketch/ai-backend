export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(200).json({
      reply: "API çalışıyor."
    });
  }

  try {

    const { message } = req.body;

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization":
            `Bearer ${process.env.OPENAI_API_KEY}`
        },

        body: JSON.stringify({

          model: "gpt-4o-mini",

          messages: [
            {
              role: "system",
              content:
              "Sen ORHAN CORE AI isimli güçlü bir yapay zekasın."
            },
            {
              role: "user",
              content: message
            }
          ]

        })

      }
    );

    const data = await response.json();

    return res.status(200).json({
      reply:
      data.choices?.[0]?.message?.content ||
      "Cevap üretilemedi."
    });

  } catch (err) {

    return res.status(500).json({
      reply: "HATA: " + err.message
    });

  }

}
