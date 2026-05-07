module.exports = async (req, res) => {

  try {

    const message = req.body.message || "";

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

              content: `
Sen ORHAN CORE AI isimli ana otomasyon sistemisin.

Görevlerin:
- Tüm projeleri yönet
- En hızlı para görevini seç
- Satış mesajları oluştur
- Yeni proje üret
- Düşük kazançlı işleri ele
- Günlük rapor hazırla
- Orhan adına stratejik düşün

Her zaman kısa, net, uygulanabilir cevap ver.
`
            },

            {
              role: "user",
              content: message
            }

          ],

          temperature: 0.8

        })

      }
    );

    const data = await response.json();

    const reply =
      data.choices?.[0]?.message?.content ||
      "Cevap üretilemedi.";

    res.status(200).json({
      reply
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};
