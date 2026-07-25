export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { businessType, city } = req.body || {};

  if (!businessType || !city) {
    return res
      .status(400)
      .json({ error: "businessType and city are required" });
  }

  try {
    // Search real businesses using SerpAPI
    const serpUrl = new URL("https://serpapi.com/search.json");
    serpUrl.searchParams.set("engine", "google_maps");
    serpUrl.searchParams.set("q", `${businessType} in ${city}`);
    serpUrl.searchParams.set("api_key", process.env.SERPAPI_KEY);

    const serpRes = await fetch(serpUrl.toString());
    const serpData = await serpRes.json();

    const places = (serpData.local_results || []).slice(0, 5).map((p) => ({
      businessName: p.title || "Unknown business",
      city,
      phone: p.phone || "Not listed",
      website: p.website || "No website found",
    }));

    if (places.length === 0) {
      return res.status(200).json([]);
    }

    // Ask OpenRouter AI to generate personalized reasons
    const prompt = `You are helping a ${businessType} freelancer find potential clients in ${city}.

Here is a list of real businesses found via Google Maps:

${JSON.stringify(places, null, 2)}

For each business, write one short, specific reason (1–2 sentences) explaining why it could be a good client for a ${businessType} freelancer.

Only use the information provided. Do not invent facts.

Return ONLY valid JSON in this exact format:

[
  {
    "businessName": "",
    "city": "",
    "phone": "",
    "website": "",
    "reason": ""
  }
]`;

    const aiRes = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://your-vercel-domain.vercel.app",
          "X-Title": "AI Client Finder",
        },
        body: JSON.stringify({
          model: "google/gemma-4-26b-a4b-it:free",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    const aiData = await aiRes.json();

    let text = aiData.choices?.[0]?.message?.content || "[]";
    text = text.replace(/```json|```/g, "").trim();

    let results = [];

    try {
      results = JSON.parse(text);
    } catch (e) {
      console.error("AI returned invalid JSON:", text);

      return res.status(500).json({
        error: "AI returned an invalid response.",
      });
    }

    return res.status(200).json(results);
  } catch (error) {
    console.error("find-clients error:", error);

    return res.status(500).json({
      error: "Something went wrong finding clients.",
    });
  }
}