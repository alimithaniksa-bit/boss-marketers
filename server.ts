import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini safely
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// Local fallback marketing planner in case Gemini key is missing or calls fail
function getFallbackPlan(niche: string, goal: string, location: string, budget: number, presence: string) {
  // Determine allocations based on niche and goal
  let fbPct = 50;
  let instaPct = 50;

  if (niche.toLowerCase().includes("fashion") || niche.toLowerCase().includes("apparel") || niche.toLowerCase().includes("lifestyle")) {
    fbPct = 30;
    instaPct = 70; // Highly visual goes to Instagram
  } else if (niche.toLowerCase().includes("b2b") || niche.toLowerCase().includes("saas") || niche.toLowerCase().includes("service")) {
    fbPct = 70;
    instaPct = 30; // Services do better on Facebook/Messenger/Leads
  } else if (goal.toLowerCase().includes("lead")) {
    fbPct = 60;
    instaPct = 40;
  }

  const fbAmount = Math.round((budget * fbPct) / 100);
  const instaAmount = Math.round((budget * instaPct) / 100);

  return {
    recommendationSummary: `Based on your ${niche} business and primary goal of ${goal}, The Boss AI has formulated a tailored digital strategy. Operating in ${location} with a monthly budget of PKR ${budget.toLocaleString()}, we recommend a balanced platform approach focusing on high-intent target audiences.`,
    budgetAllocation: {
      facebook: fbPct,
      instagram: instaPct,
      fbAmount,
      instaAmount,
      splitReasoning: `We have allocated ${fbPct}% to Facebook and ${instaPct}% to Instagram. Facebook is optimized for broad reach and advanced lead generation forms, whereas Instagram will drive visual appeal and product discovery among younger demographics in ${location}.`
    },
    suggestedCampaigns: [
      {
        name: `${niche} High-Intent Conversions`,
        objective: goal.includes("sales") || goal.includes("conversions") ? "Sales/Conversions" : "Lead Generation",
        targetAudience: `Interests related to ${niche}, active shoppers in ${location}, age 18-45.`,
        estimatedCpc: "PKR 15 - 35"
      },
      {
        name: "Brand Lift & Retargeting",
        objective: "Custom Audiences (Website Visitors, Page Engagers)",
        targetAudience: `Warm prospects who interacted with your FB/Insta pages in the last 30 days.`,
        estimatedCpc: "PKR 8 - 18"
      }
    ],
    roadmap: [
      {
        phase: "Phase 1: Setup & Pixel Validation",
        title: "Foundation & Targeting Setup",
        tasks: [
          "Install Meta Pixel on website / landing pages.",
          "Set up Custom Conversions for lead forms and checkouts.",
          "Design 3 different ad creatives (Carousel, Video, and single image)."
        ],
        expectedOutcome: "Accurate tracking active; ads ready for testing."
      },
      {
        phase: "Phase 2: A/B Testing & Audience Discovery",
        title: "Launch & Core Audience Identification",
        tasks: [
          `Launch testing campaigns targeting custom interests in ${location}.`,
          "A/B test different slogans and visual creative variations.",
          "Identify winning ad sets based on cost-per-result (CPR)."
        ],
        expectedOutcome: "Identified 2 winning creatives and key high-converting audiences."
      },
      {
        phase: "Phase 3: Scaling & Funnel Optimization",
        title: "Budget Scaling & Dynamic Remarketing",
        tasks: [
          `Increase budget of winning campaigns by 20% every 3 days.`,
          "Launch retargeting ads with high-urgency offers to warm page engagers.",
          "Exclude past buyers to focus purely on cold acquisition."
        ],
        expectedOutcome: "Stable lead stream and lowered customer acquisition cost."
      }
    ]
  };
}

app.post("/api/boss-ai/analyze", async (req, res) => {
  const { niche, goal, location, budget, presence } = req.body;

  if (!niche || !goal || !location || !budget || !presence) {
    return res.status(400).json({ error: "Missing required quiz parameters." });
  }

  const numericBudget = Number(budget) || 50000;

  // Use local fallback if Gemini client is not initialized
  if (!ai) {
    const fallback = getFallbackPlan(niche, goal, location, numericBudget, presence);
    return res.json({ ...fallback, method: "local-deterministic" });
  }

  try {
    const prompt = `You are "Boss AI", the super-intelligent automated marketing strategist for "The Boss Marketers", Karachi's premier marketing agency.
Analyze this quiz response from a potential client and generate a highly custom, realistic, and expert marketing plan:
- Business Niche: ${niche}
- Primary Goal: ${goal}
- Target Location: ${location}
- Monthly Budget (PKR): ${numericBudget}
- Current Presence: ${presence}

Provide a comprehensive, high-value strategy including a realistic percentage split between Facebook and Instagram, specific campaign names, target audience suggestions, and a structured 3-phase roadmap. Make sure all values are returned in PKR.`;

    // Create a timeout promise to prevent slow Gemini calls from hitting gateway timeouts
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Gemini API call timed out after 25 seconds")), 25000)
    );

    const response = await Promise.race([
      ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are the Boss AI, an elite digital marketing strategist. Always output structured, clean, and highly encouraging expert plans.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recommendationSummary: {
                type: Type.STRING,
                description: "A summary of the strategy custom-tailored to the niche and budget."
              },
              budgetAllocation: {
                type: Type.OBJECT,
                properties: {
                  facebook: { type: Type.INTEGER, description: "Facebook budget percentage (0-100)" },
                  instagram: { type: Type.INTEGER, description: "Instagram budget percentage (0-100)" },
                  splitReasoning: { type: Type.STRING, description: "Detailed reasoning for this budget split." }
                },
                required: ["facebook", "instagram", "splitReasoning"]
              },
              suggestedCampaigns: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    objective: { type: Type.STRING },
                    targetAudience: { type: Type.STRING },
                    estimatedCpc: { type: Type.STRING, description: "Estimated cost-per-click or lead in PKR, e.g., 'PKR 12 - 25'" }
                  },
                  required: ["name", "objective", "targetAudience", "estimatedCpc"]
                }
              },
              roadmap: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    phase: { type: Type.STRING, description: "e.g., 'Phase 1: Setup'" },
                    title: { type: Type.STRING, description: "Brief title of this phase" },
                    tasks: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    },
                    expectedOutcome: { type: Type.STRING }
                  },
                  required: ["phase", "title", "tasks", "expectedOutcome"]
                }
              }
            },
            required: ["recommendationSummary", "budgetAllocation", "suggestedCampaigns", "roadmap"]
          }
        }
      }),
      timeoutPromise
    ]);

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from Gemini.");
    }

    const data = JSON.parse(text);
    // Add computed amounts for the budget split
    const fbPct = data.budgetAllocation.facebook;
    const instaPct = data.budgetAllocation.instagram;
    data.budgetAllocation.fbAmount = Math.round((numericBudget * fbPct) / 100);
    data.budgetAllocation.instaAmount = Math.round((numericBudget * instaPct) / 100);

    return res.json({ ...data, method: "gemini-ai" });

  } catch (error) {
    console.error("Gemini call failed, falling back:", error);
    const fallback = getFallbackPlan(niche, goal, location, numericBudget, presence);
    return res.json({ ...fallback, method: "fallback-after-error" });
  }
});

// Serve static assets in production, otherwise pass to Vite
async function startServer() {
  if (process.env.NODE_ENV === "production") {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  } else {
    // Vite dev middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`The Boss Marketers server running on port ${PORT}`);
  });
}

startServer();
