export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { businessType, city } = req.body || {};

  if (!businessType || !city) {
    return res.status(400).json({ error: "businessType and city are required" });
  }

  try {
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

    const prompt = `You are helping a ${businessType} find freelance clients in ${city}.
Here is a list of real local businesses found via Google Maps search:
${JSON.stringify(places, null, 2)}

For each business, write one short, specific reason (1-2 sentences) why this business could be a good client for a ${businessType} freelancer. Base the reason ONLY on the data given (for example: no website listed, has a phone but no site, etc). Do not invent facts that are not present in the data.

Return ONLY valid JSON, an array in exactly this format, no markdown, no code fences, no explanation:
[
  { "businessName": "", "city": "", "phone": "", "website": "", "reason": "" }
]`;

    const aiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemma-4-26b-a4b-it:free",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const aiData = await aiRes.json();
    let text = aiData.choices?.[0]?.message?.content || "[]";
    text = text.replace(/```json|```/g, "").trim();

    const results = JSON.parse(text);
    return res.status(200).json(results);
  } catch (error) {
    console.error("find-clients error:", error);
    return res.status(500).json({ error: "Something went wrong finding clients." });
  }
}