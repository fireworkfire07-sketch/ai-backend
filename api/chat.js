export default async function handler(req, res) {
  try {
    const mesaj = req.body?.mesaj || "Selam";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.OPENAI_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          { role: "user", content: mesaj }
        ]
      })
    });

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({
      error: "Hata oluştu",
      detail: error.message
    });
  }
}
messages: [
  { role: "system", content: "Sen para kazandıran iş fikirleri veren agresif bir satış uzmanısın." },
  { role: "user", content: mesaj }
]
