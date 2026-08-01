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
    specialistAgents: {
      marketing: {
        title: "Marketing Agent",
        positioning: `High-value market positioning for ${niche} in ${location}, highlighting reliability, premium quality, and local trust.`,
        messagingHooks: [
          `"Transform your ${niche} experience with ${location}'s top-rated specialists."`,
          `"Exclusive ${location} offer: Claim your free consultation & limited bundle today."`,
          `"Proven results, 0 guesswork. Join hundreds of satisfied clients in ${location}."`
        ],
        strategy: `Build strong social proof and brand equity. Target high-intent prospects through direct value offers.`
      },
      designing: {
        title: "Designing Agent",
        aesthetic: "Clean, ultra-minimalist, high-contrast layouts with strong typographic hierarchy.",
        canvaQueries: [
          `"Minimalist ${niche.toLowerCase()} instagram story template"`,
          `"Clean modern square post ${niche.toLowerCase()} dark theme"`,
          `"Minimalist promotional banner luxury aesthetic"`,
          `"Modern carousel slide template minimalist typography"`
        ],
        colorPalette: ["#000000", "#FFFFFF", "#3B82F6", "#10B981"]
      },
      development: {
        title: "Development Agent",
        techStack: "React + Tailwind CSS SPA or Shopify/WooCommerce with optimized checkout.",
        keyFeatures: [
          "1-Click WhatsApp Quick Ordering button",
          "Mobile-first responsive landing page with < 1.5s load time",
          "Automated Meta Pixel & Conversions API integration",
          "High-converting lead capture form with instant SMS/WhatsApp trigger"
        ],
        conversionOptimization: "Reduce form fields to name and phone number. Display verified client testimonials above the fold."
      },
      adsManagement: {
        title: "Ads Management Agent",
        campaignStructure: "Advantage+ Budget Optimization (CBO) split into Prospecting and Retargeting.",
        targetingTactics: [
          `Geo-fenced targeting strictly within ${location}`,
          `High-income demographic layering and engage-shopper behaviors`,
          "Lookalike audiences generated from high-value purchasers"
        ],
        trackingSetup: "Meta Pixel + Conversions API (CAPI) with Event Match Quality > 8.0."
      }
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
    const prompt = `You are "Boss AI", the chief AI assistant for "The Boss Marketers", managing four specialist agents:
1. Marketing Agent (Market positioning, copy hooks, growth strategy)
2. Designing Agent (Minimalist visual aesthetics, branding, and exact Canva search queries for professional minimalist templates)
3. Development Agent (Website/landing page tech stack, UX, lead forms, conversion optimization)
4. Ads Management Agent (Meta Ads Manager campaign architecture, budget pacing, Pixel tracking)

Analyze this quiz response from a potential client and generate a comprehensive business setup plan:
- Business Niche: ${niche}
- Primary Goal: ${goal}
- Target Location: ${location}
- Monthly Budget (PKR): ${numericBudget}
- Current Presence: ${presence}

Provide a comprehensive, high-value strategy including a realistic percentage split between Facebook and Instagram, advice from all four specialist agents (including exact Canva search queries for design tasks), specific campaign names, target audience suggestions, and a structured 3-phase roadmap. Make sure all values are returned in PKR.`;

    // Create a timeout promise to prevent slow Gemini calls from hitting gateway timeouts
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Gemini API call timed out after 25 seconds")), 25000)
    );

    const response = await Promise.race([
      ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are Boss AI for 'The Boss Marketers'. Output structured, clean, actionable plans managing Marketing, Designing (with exact Canva search queries for minimalist templates), Development, and Ads Management agents.",
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
              specialistAgents: {
                type: Type.OBJECT,
                properties: {
                  marketing: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      positioning: { type: Type.STRING },
                      messagingHooks: { type: Type.ARRAY, items: { type: Type.STRING } },
                      strategy: { type: Type.STRING }
                    },
                    required: ["title", "positioning", "messagingHooks", "strategy"]
                  },
                  designing: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      aesthetic: { type: Type.STRING },
                      canvaQueries: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Exact actionable search queries for Canva templates" },
                      colorPalette: { type: Type.ARRAY, items: { type: Type.STRING } }
                    },
                    required: ["title", "aesthetic", "canvaQueries", "colorPalette"]
                  },
                  development: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      techStack: { type: Type.STRING },
                      keyFeatures: { type: Type.ARRAY, items: { type: Type.STRING } },
                      conversionOptimization: { type: Type.STRING }
                    },
                    required: ["title", "techStack", "keyFeatures", "conversionOptimization"]
                  },
                  adsManagement: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      campaignStructure: { type: Type.STRING },
                      targetingTactics: { type: Type.ARRAY, items: { type: Type.STRING } },
                      trackingSetup: { type: Type.STRING }
                    },
                    required: ["title", "campaignStructure", "targetingTactics", "trackingSetup"]
                  }
                },
                required: ["marketing", "designing", "development", "adsManagement"]
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
            required: ["recommendationSummary", "budgetAllocation", "specialistAgents", "suggestedCampaigns", "roadmap"]
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

// Interactive Specialist Consultation endpoint for Boss AI
app.post("/api/boss-ai/chat", async (req, res) => {
  const { message, contextHistory = [], agent = "all" } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  const systemInstruction = `You are the AI assistant for 'The Boss Marketers'. Your goal is to guide the user through a multi-step business setup process. You will manage four distinct specialist agents:
1. Marketing Agent (Positioning, copy hooks, campaign strategy)
2. Designing Agent (Minimalist visual aesthetics, logo guidelines, exact Canva template search queries)
3. Development Agent (Landing page architecture, tech stack, conversion triggers, mobile optimization)
4. Ads Management Agent (Meta Ads Manager setup, targeting, Pixel & CAPI tracking)

When a user interacts with 'Boss AI', guide them clearly, asking specific questions about their business to understand their needs. 
CRITICAL FOR DESIGN: For design tasks or visual branding, the Designing Agent MUST provide exact, actionable search queries for Canva, focusing on minimalist aesthetics and professional templates (e.g. "Minimalist E-commerce Instagram Story Template", "Clean Modern Grid Post Layout Canva").
Ensure all advice aligns with 'The Boss Marketers' branding, delivering expert, high-impact guidance.`;

  if (!ai) {
    // Fallback response if AI key is missing
    return res.json({
      reply: `[The Boss Marketers - Boss AI Advisor]\n\nThank you for reaching out! To guide your business setup process:\n\n1. **Marketing Agent**: Focus on clear value propositions and localized social proof.\n2. **Designing Agent**: Use minimalist Canva search queries like \`"Minimalist ${message} Instagram Story Template"\` or \`"Clean modern square post Canva"\`.\n3. **Development Agent**: Ensure a fast <1.5s mobile landing page with a 1-Click WhatsApp CTA.\n4. **Ads Management Agent**: Target high-intent local demographics with Meta CBO campaigns.\n\nFor a full personalized roadmap, complete our 5-step strategy quiz!`,
      canvaQueries: [
        `"Minimalist ${message} Instagram Story Template"`,
        `"Clean modern square post Canva"`,
        `"Minimalist brand identity kit Canva"`
      ]
    });
  }

  try {
    const prompt = `User Query: "${message}"
Active Agent Focus: ${agent}
Previous Context: ${JSON.stringify(contextHistory)}

Provide an authoritative, well-structured response from Boss AI managing the specialist agents. Include exact Canva search queries for any design requests!`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
      }
    });

    const replyText = response.text || "Thank you for reaching out to Boss AI. Let's optimize your business strategy!";
    return res.json({ reply: replyText });
  } catch (error: any) {
    console.error("Boss AI Chat error:", error);
    return res.status(500).json({ 
      reply: `Boss AI is ready to assist your business setup! Let's refine your marketing, design (using Canva minimalist search queries), web dev, or ad campaigns.`
    });
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
