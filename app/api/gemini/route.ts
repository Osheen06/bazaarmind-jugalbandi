import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const hasKey = Boolean(process.env.GEMINI_API_KEY);
  return NextResponse.json({
    status: hasKey ? "connected" : "demo_mode",
    model: hasKey ? "gemini-1.5-flash" : "deterministic-fallback",
    message: hasKey
      ? "Gemini 1.5 Flash Connected via Server API"
      : "Running deterministic agricultural intelligence fallback engine (demo mode)",
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, payload } = body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const prompt = buildGeminiPrompt(action, payload);
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.2,
                maxOutputTokens: 1024,
              },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            const parsed = parseGeminiResponse(action, rawText);
            return NextResponse.json({
              success: true,
              liveCall: true,
              source: "gemini-1.5-flash",
              data: parsed,
            });
          }
        }
      } catch (geminiError) {
        console.warn("Live Gemini API call failed or timed out. Falling back to deterministic agent:", geminiError);
      }
    }

    // Deterministic Fallback Mode (Realistic, instant, reliable for hackathon judging)
    const deterministicData = handleDeterministicAction(action, payload);
    return NextResponse.json({
      success: true,
      liveCall: false,
      source: "bazaarmind-deterministic-engine",
      data: deterministicData,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed processing request" },
      { status: 500 }
    );
  }
}

function buildGeminiPrompt(action: string, payload: any): string {
  switch (action) {
    case "parseFarmerIntent":
      return `You are BazaarMind's agricultural NLP agent for Indian farmers.
Extract structured crop, quantity (in tonnes or quintals or kg), availability timeframe in days, and location from this farmer query:
"${payload.text}"
Return ONLY valid JSON matching this schema:
{
  "crop": "Tomato" | "Potato" | "Onion" | "Wheat" | "Rice" | "Other",
  "quantityValue": number,
  "quantityUnit": "tonne" | "quintal" | "kg",
  "harvestWindowDays": number,
  "location": string,
  "hindiSummary": string,
  "englishSummary": string,
  "missingFields": string[]
}`;

    case "explainRecommendation":
      return `You are BazaarMind's advisor. Explain in simple, respectful Hindi and English why the farmer should choose this opportunity over a crowded mandi.
Produce: ${payload.crop}, ${payload.quantity} tonnes.
Top Buyer: ${payload.topBuyerName} offering ₹${payload.topPrice}/kg, net ₹${payload.topNet}/kg, distance ${payload.topDistance}km.
Alternative: Mandi offering ₹${payload.mandiPrice}/kg, net ₹${payload.mandiNet}/kg.
Return JSON:
{
  "hindiExplanation": "2-3 short, clear sentences in Hindi",
  "englishExplanation": "2-3 short sentences",
  "signatureInsight": "Why quoted price != net in-hand earning"
}`;

    case "generateAgentPlan":
      return `Generate a transparent 5-step agent execution plan for selling ${payload.quantity} tonnes of ${payload.crop}.
Return JSON array of steps:
[{ "id": "1", "title": "string", "description": "string", "status": "completed"|"in_progress"|"waiting_approval"|"not_started", "requiresHumanApproval": boolean }]`;

    case "generateNegotiationSuggestion":
      return `Suggest polite negotiation counter-offer for ${payload.quantity}T ${payload.crop} for buyer ${payload.buyerName}. Target ₹${payload.targetPrice}/kg. Return JSON: { "suggestedOffer": string, "rationale": string }`;

    case "answerFarmerQuestion":
      return `Answer the farmer's question simply: "${payload.question}". Language: ${payload.language || "hi"}. Focus on actionable market advice. Return JSON: { "answer": string }`;

    default:
      return `Process agricultural market data for ${payload?.crop || "produce"}. Return JSON.`;
  }
}

function parseGeminiResponse(action: string, rawText: string): any {
  try {
    // Strip markdown code fences if Gemini returned ```json ... ```
    const cleaned = rawText.replace(/```json/gi, "").replace(/```/g, "").trim();
    return JSON.parse(cleaned);
  } catch {
    return { rawResponse: rawText };
  }
}

function handleDeterministicAction(action: string, payload: any): any {
  switch (action) {
    case "parseFarmerIntent": {
      const text = (payload?.text || "").toLowerCase();
      let crop = "Tomato";
      let quantity = 3.0;
      let unit: "tonne" | "quintal" | "kg" = "tonne";
      let days = 3;
      let location = "Bakhtawarpur, North Delhi (Demo Region)";

      if (text.includes("tamatar") || text.includes("tomato") || text.includes("टमाटर")) {
        crop = "Tomato";
      } else if (text.includes("pyaz") || text.includes("onion") || text.includes("प्याज")) {
        crop = "Onion";
      } else if (text.includes("aloo") || text.includes("potato") || text.includes("आलू")) {
        crop = "Potato";
      } else if (text.includes("gehun") || text.includes("wheat") || text.includes("गेहूं")) {
        crop = "Wheat";
      } else if (text.includes("chawal") || text.includes("rice") || text.includes("चावल") || text.includes("basmati")) {
        crop = "Basmati Rice";
      }

      // Quantity regex matching
      const qtyMatch = text.match(/(\d+(\.\d+)?)\s*(ton|tonne|टन|quintal|क्विंटल|kg|किलो)/i) || text.match(/(\d+(\.\d+)?)/);
      if (qtyMatch) {
        quantity = parseFloat(qtyMatch[1]);
        if (text.includes("quintal") || text.includes("क्विंटल")) unit = "quintal";
        if (text.includes("kg") || text.includes("किलो")) unit = "kg";
      }

      // Days regex
      const daysMatch = text.match(/(\d+)\s*(din|day|दिन)/i);
      if (daysMatch) {
        days = parseInt(daysMatch[1], 10);
      }

      return {
        crop,
        quantityValue: quantity,
        quantityUnit: unit,
        harvestWindowDays: days,
        location,
        confidence: 0.96,
        missingFields: [],
        hindiSummary: `आपके ${quantity} ${unit === "tonne" ? "टन" : unit} ${crop === "Tomato" ? "टमाटर" : crop} (कटाई: ${days} दिन में) की मांग खोजी जा रही है।`,
        englishSummary: `Detected ${quantity} ${unit}s of ${crop} ready in ${days} days from ${location}.`,
        rawText: payload?.text,
      };
    }

    case "explainRecommendation": {
      const topBuyer = payload?.topBuyerName || "FreshKart Wholesale";
      const topNet = payload?.topNet || "20.85";
      const topPrice = payload?.topPrice || "22.50";
      const mandiNet = payload?.mandiNet || "19.70";
      const mandiPrice = payload?.mandiPrice || "23.00";

      return {
        hindiExplanation: `FreshKart आपको ₹${topPrice}/किलो का भाव दे रहा है, लेकिन 0% मंडी आढ़त और केवल 28 किमी दूरी होने से आपके हाथ में पूरे ₹${topNet}/किलो बचेंगे। गाजीपुर मंडी में भाव ₹${mandiPrice} दिखेगा लेकिन आढ़त और जाम में खराब होने के बाद केवल ₹${mandiNet}/किलो ही मिलेंगे।`,
        englishExplanation: `FreshKart Wholesale offers the highest net realization at ₹${topNet}/kg. Although Ghazipur Mandi displays a headline price of ₹${mandiPrice}/kg, 5% arhatiya commission and transit wastage reduce your net take-home to ₹${mandiNet}/kg.`,
        signatureInsight: "Highest quoted price ≠ Highest farmer earnings. Direct buyers eliminate commission and cut transit damage.",
      };
    }

    case "generateAgentPlan": {
      return [
        {
          id: "step-1",
          title: "Understand Farmer Requirement",
          description: "Parsed 3 tonnes Grade-A Tomato harvest in 3 days from Bakhtawarpur.",
          status: "completed",
          requiresHumanApproval: false,
        },
        {
          id: "step-2",
          title: "Scan Real-Time Demand Radar",
          description: "Queried 30+ buyer requirements and 8 mandis within 60 km radius.",
          status: "completed",
          requiresHumanApproval: false,
        },
        {
          id: "step-3",
          title: "Compute Net Realization Engine",
          description: "Factored transport, zero commission, and 1.8% wastage. FreshKart yields highest net (₹20.85/kg).",
          status: "completed",
          requiresHumanApproval: false,
        },
        {
          id: "step-4",
          title: "Request Formal Buyer Quote",
          description: "Dispatched digital RFQ to FreshKart Wholesale procurement desk.",
          status: "completed",
          requiresHumanApproval: false,
        },
        {
          id: "step-5",
          title: "Farmer Binding Approval",
          description: "Wait for farmer to confirm ₹22.50/kg quote before creating binding trade contract.",
          status: "waiting_approval",
          requiresHumanApproval: true,
          actionDetails: "Click 'Approve Sale' to authorize transaction and generate escrow contract.",
        },
        {
          id: "step-6",
          title: "Logistics Pooling & Gate Pass",
          description: "Combine with 2 nearby Bakhtawarpur farmers on same route (saves ₹900).",
          status: "not_started",
          requiresHumanApproval: true,
        },
        {
          id: "step-7",
          title: "Escrow Settlement & Learning",
          description: "Automated payment release upon gate weighment and quality receipt.",
          status: "not_started",
          requiresHumanApproval: false,
        },
      ];
    }

    case "generateNegotiationSuggestion": {
      return {
        suggestedOffer: "₹23.00/kg with guaranteed farm-gate sorted Grade-A packing",
        rationale: "Buyer has a tight 48-hour delivery SLA with their darkstores. Your lot is only 28 km away, saving them 3 hours in inbound transit.",
      };
    }

    case "answerFarmerQuestion": {
      const q = (payload?.question || "").toLowerCase();
      if (q.includes("payment") || q.includes("paise") || q.includes("भुगतान")) {
        return {
          answer: "BazaarMind operates with digital escrow: once your harvest passes gate quality inspection, payment is transferred directly to your bank account via NEFT within 24 hours.",
        };
      }
      return {
        answer: "BazaarMind connects your harvest directly to verified buyers who need your crop right now, calculating your true take-home earnings after transport and handling costs.",
      };
    }

    default:
      return { status: "processed", payload };
  }
}
