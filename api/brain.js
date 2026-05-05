export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.OPENAI_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content: "Sen para kazandıran iş fikirleri bulan agresif bir girişimcisin."
          },
          {
            role: "user",
            content: "Bugün para kazandıracak 3 iş fikri ver."
          }
        ]
      })
    });

    const data = await response.json();

    console.log("YENİ FİKİRLER:", data.choices[0].message.content);

    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
