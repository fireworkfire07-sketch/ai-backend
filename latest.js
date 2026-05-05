export default async function handler(req, res) {
  res.status(200).json({
    message: "Ana beyin aktif. Diğer projeler buradan beslenecek.",
    brainUrl: "https://ai-backend-one-theta.vercel.app/api/brain"
  });
}
