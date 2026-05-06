 export default async function handler(req, res) {
  try {
    const prompt = req.body?.prompt || "Bugün para kazandıracak 3 iş fikri ver.";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.OPENAI_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          { role: "system", content: "Sen para kazandıran iş fikirleri bulan agresif bir girişimcisin." },
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || "Cevap alınamadı.";

    await fetch(process.env.SUPABASE_URL + "/rest/v1/records", {
      method: "POST",
      headers: {
        apikey: process.env.SUPABASE_KEY,
        Authorization: "Bearer " + process.env.SUPABASE_KEY,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify({
        content: JSON.stringify({ prompt, answer })
      })
    });

    res.status(200).json({ prompt, answer });
  } catch (err) {
    res.status(500).json({
      error: "Hata oluştu",
      detail: err.message
    });
  }
}
