import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Sparkles, 
  TrendingUp, 
  Target, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Loader2, 
  Smartphone, 
  PieChart, 
  Send, 
  Calendar, 
  CheckCircle,
  Percent,
  Facebook,
  Instagram,
  ChevronRight,
  AlertTriangle,
  Megaphone,
  Palette,
  Code,
  BarChart3,
  Copy,
  Check,
  Bot,
  User,
  MessageSquare,
  Search,
  ExternalLink
} from 'lucide-react';

interface Campaign {
  name: string;
  objective: string;
  targetAudience: string;
  estimatedCpc: string;
}

interface RoadmapPhase {
  phase: string;
  title: string;
  tasks: string[];
  expectedOutcome: string;
}

interface SpecialistAgentMarketing {
  title: string;
  positioning: string;
  messagingHooks: string[];
  strategy: string;
}

interface SpecialistAgentDesigning {
  title: string;
  aesthetic: string;
  canvaQueries: string[];
  colorPalette: string[];
}

interface SpecialistAgentDevelopment {
  title: string;
  techStack: string;
  keyFeatures: string[];
  conversionOptimization: string;
}

interface SpecialistAgentAds {
  title: string;
  campaignStructure: string;
  targetingTactics: string[];
  trackingSetup: string;
}

interface SpecialistAgents {
  marketing: SpecialistAgentMarketing;
  designing: SpecialistAgentDesigning;
  development: SpecialistAgentDevelopment;
  adsManagement: SpecialistAgentAds;
}

interface AnalysisResult {
  recommendationSummary: string;
  budgetAllocation: {
    facebook: number;
    instagram: number;
    fbAmount: number;
    instaAmount: number;
    splitReasoning: string;
  };
  specialistAgents?: SpecialistAgents;
  suggestedCampaigns: Campaign[];
  roadmap: RoadmapPhase[];
  method: string;
}

const NICHES = [
  { id: 'ecommerce', label: 'E-commerce & Retail', icon: '🛍️', desc: 'Selling physical products online' },
  { id: 'realestate', label: 'Real Estate & Property', icon: '🏠', desc: 'Buying, selling, or renting properties' },
  { id: 'tech', label: 'Tech, SaaS & Apps', icon: '💻', desc: 'Software, mobile apps, or tech services' },
  { id: 'fashion', label: 'Fashion & Apparel', icon: '👗', desc: 'Clothing, jewellery, and lifestyle accessories' },
  { id: 'local', label: 'Local Business & Services', icon: '📍', desc: 'Cafes, clinics, salons, or physical agencies' },
  { id: 'other', label: 'Other / Custom Niche', icon: '🚀', desc: 'Unique business models or startups' }
];

const GOALS = [
  { id: 'conversions', label: 'Direct Conversions & Sales', desc: 'Maximize purchases, orders, and direct checkouts', icon: <TrendingUp className="w-5 h-5 text-emerald-500" /> },
  { id: 'leads', label: 'Lead Generation', desc: 'Collect names, phone numbers, and potential client inquiries', icon: <Target className="w-5 h-5 text-blue-500" /> },
  { id: 'awareness', label: 'Brand Awareness & Reach', desc: 'Get your brand seen by as many people as possible', icon: <Sparkles className="w-5 h-5 text-purple-500" /> },
  { id: 'engagement', label: 'Social Engagement', desc: 'Boost page likes, comments, shares, and DM conversations', icon: <Send className="w-5 h-5 text-pink-500" /> }
];

const LOCATIONS = [
  { id: 'karachi', label: 'Karachi Only', desc: 'Focus strictly on the metropolitan hub of Karachi', icon: <MapPin className="w-5 h-5" /> },
  { id: 'pakistan', label: 'Nationwide (Pakistan)', desc: 'Scale across all major cities of Pakistan', icon: <MapPin className="w-5 h-5" /> },
  { id: 'global', label: 'International / Export', desc: 'Target foreign audiences (US, UK, UAE, etc.)', icon: <MapPin className="w-5 h-5" /> }
];

const PRESENCES = [
  { id: 'scratch', label: 'Starting From Scratch', desc: 'No pages or very new accounts with 0 followers' },
  { id: 'low', label: 'Low Engagement', desc: 'Have active pages but struggling with reach and sales' },
  { id: 'moderate', label: 'Active & Growing', desc: 'Consistent posting but want a professional strategic push' }
];

const BUDGET_PRESETS = [
  { value: 30000, label: 'PKR 30,000 / mo', desc: 'Perfect for local validation' },
  { value: 75000, label: 'PKR 75,000 / mo', desc: 'Accelerated growth budget' },
  { value: 150000, label: 'PKR 150,000 / mo', desc: 'Aggressive scaling budget' },
  { value: 300000, label: 'PKR 300,000 / mo', desc: 'Elite market dominance' }
];

export default function BossAI() {
  const [step, setStep] = useState(1);
  const [niche, setNiche] = useState('');
  const [goal, setGoal] = useState('');
  const [location, setLocation] = useState('');
  const [presence, setPresence] = useState('');
  const [budget, setBudget] = useState(75000);
  
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [activeAgentTab, setActiveAgentTab] = useState<'marketing' | 'designing' | 'development' | 'adsManagement'>('designing');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string; canvaQueries?: string[] }>>([
    {
      role: 'assistant',
      content: "Hello! I am Boss AI, leading the four specialist teams at The Boss Marketers (Marketing, Designing, Development, and Ads Management). How can we guide your business setup today?"
    }
  ]);
  const [chatLoading, setChatLoading] = useState(false);
  const [copiedQuery, setCopiedQuery] = useState<string | null>(null);

  const handleCopyQuery = (query: string) => {
    navigator.clipboard.writeText(query);
    setCopiedQuery(query);
    setTimeout(() => setCopiedQuery(null), 2500);
  };

  const handleSendChat = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userMsg = chatInput.trim();
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setChatLoading(true);

    try {
      const response = await fetch('/api/boss-ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          contextHistory: chatMessages.slice(-6),
          agent: activeAgentTab
        })
      });
      const data = await response.json();
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: data.reply || "Boss AI is ready to guide your business setup with our specialist team!",
        canvaQueries: data.canvaQueries
      }]);
    } catch (err) {
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: "Boss AI and our 4 Specialist Agents are at your service! For design tasks, use exact Canva queries like `Minimalist E-Commerce Instagram Story Template` or `Clean modern dark post layout Canva`."
      }]);
    } finally {
      setChatLoading(false);
    }
  };

  const loadingStages = [
    "Analyzing business niche demographics...",
    "Correlating Meta algorithm performance matrices...",
    "Calculating optimal Facebook/Instagram budget split...",
    "Designing highly persuasive ad campaign frameworks...",
    "Formulating 3-phase tactical deployment roadmap...",
    "Securing your digital strategy blueprint..."
  ];

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const runAnalysis = async () => {
    setLoading(true);
    setLoadingStage(0);
    setError(null);

    // Cycle through loading stages for realistic AI feeing
    const interval = setInterval(() => {
      setLoadingStage(prev => {
        if (prev < loadingStages.length - 1) return prev + 1;
        return prev;
      });
    }, 1200);

    try {
      const response = await fetch('/api/boss-ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          niche: NICHES.find(n => n.id === niche)?.label || niche,
          goal: GOALS.find(g => g.id === goal)?.label || goal,
          location: LOCATIONS.find(l => l.id === location)?.label || location,
          budget,
          presence: PRESENCES.find(p => p.id === presence)?.label || presence
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned error status ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error("Received non-JSON response from the server.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      clearInterval(interval);
      setLoading(false);
      setStep(6); // Go to results step
    }
  };

  const getWhatsAppLink = () => {
    if (!result) return 'https://wa.me/923150229035';
    const text = `Hi The Boss Marketers! I just ran the Boss AI Strategist and got my custom roadmap.
💼 Niche: ${NICHES.find(n => n.id === niche)?.label || niche}
🎯 Goal: ${GOALS.find(g => g.id === goal)?.label || goal}
💰 Budget: PKR ${budget.toLocaleString()}
📍 Target: ${LOCATIONS.find(l => l.id === location)?.label || location}

Budget Split:
🔵 Facebook: ${result.budgetAllocation.facebook}% (PKR ${result.budgetAllocation.fbAmount.toLocaleString()})
🟣 Instagram: ${result.budgetAllocation.instagram}% (PKR ${result.budgetAllocation.instaAmount.toLocaleString()})

I would like to discuss implementing this exact roadmap for my business!`;
    return `https://wa.me/923150229035?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col justify-center">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-blue-500/5 md:bg-blue-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="w-full max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-8 opacity-60 hover:opacity-100 transition-opacity">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Step Indicator */}
        {step <= 5 && (
          <div className="flex justify-between items-center mb-12">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-blue-500 font-bold block mb-1">Interactive Strategist</span>
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight">Boss AI</h1>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-black/40 md:text-white/40">STEP {step} OF 5</span>
              <div className="w-32 h-1 bg-black/10 md:bg-white/10 rounded-full mt-2 overflow-hidden">
                <motion.div 
                  className="h-full bg-blue-500" 
                  initial={{ width: '20%' }}
                  animate={{ width: `${step * 20}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* STEP 1: NICHE */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">What is your business niche?</h2>
              <p className="text-black/60 md:text-white/60">Select the category that best matches your business profile to help Boss AI target the right consumer interests.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {NICHES.map(item => (
                  <button
                    key={item.id}
                    onClick={() => { setNiche(item.id); handleNext(); }}
                    className={`p-6 rounded-2xl border text-left transition-all ${niche === item.id ? 'border-blue-500 bg-blue-500/5 md:bg-blue-500/10' : 'border-black/10 md:border-white/10 hover:border-black/30 md:hover:border-white/30 bg-black/5 md:bg-white/5'}`}
                  >
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <h3 className="font-bold text-lg uppercase tracking-tight">{item.label}</h3>
                    <p className="text-xs text-black/60 md:text-white/60 mt-1">{item.desc}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: GOAL */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">What is your primary marketing goal?</h2>
              <p className="text-black/60 md:text-white/60">We design Meta conversion funnels differently based on what success looks like for you.</p>

              <div className="grid grid-cols-1 gap-4 pt-4">
                {GOALS.map(item => (
                  <button
                    key={item.id}
                    onClick={() => { setGoal(item.id); handleNext(); }}
                    className={`p-6 rounded-2xl border text-left flex items-start gap-4 transition-all ${goal === item.id ? 'border-blue-500 bg-blue-500/5 md:bg-blue-500/10' : 'border-black/10 md:border-white/10 hover:border-black/30 md:hover:border-white/30 bg-black/5 md:bg-white/5'}`}
                  >
                    <div className="p-3 bg-black/5 md:bg-white/5 rounded-xl mt-1">{item.icon}</div>
                    <div>
                      <h3 className="font-bold text-lg uppercase tracking-tight">{item.label}</h3>
                      <p className="text-sm text-black/60 md:text-white/60 mt-1">{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={handlePrev} className="px-6 py-3 border border-black/10 md:border-white/10 rounded-full font-bold uppercase tracking-widest text-xs">Back</button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: LOCATION */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">Where is your target audience?</h2>
              <p className="text-black/60 md:text-white/60">Target location affects the estimated CPM and audience density inside Meta Ads Manager.</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                {LOCATIONS.map(item => (
                  <button
                    key={item.id}
                    onClick={() => { setLocation(item.id); handleNext(); }}
                    className={`p-6 rounded-2xl border text-left transition-all flex flex-col justify-between ${location === item.id ? 'border-blue-500 bg-blue-500/5 md:bg-blue-500/10' : 'border-black/10 md:border-white/10 hover:border-black/30 md:hover:border-white/30 bg-black/5 md:bg-white/5'}`}
                  >
                    <div className="p-3 bg-black/5 md:bg-white/5 rounded-xl w-fit mb-4">{item.icon}</div>
                    <div>
                      <h3 className="font-bold text-lg uppercase tracking-tight">{item.label}</h3>
                      <p className="text-xs text-black/60 md:text-white/60 mt-1">{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={handlePrev} className="px-6 py-3 border border-black/10 md:border-white/10 rounded-full font-bold uppercase tracking-widest text-xs">Back</button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: BUDGET */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">What is your monthly ad budget (PKR)?</h2>
              <p className="text-black/60 md:text-white/60">Ad spend determines campaign bidding structure, lookalike sizing, and daily pixel testing bandwidth.</p>

              <div className="space-y-4 pt-4">
                <div className="bg-black/5 md:bg-white/5 p-8 rounded-2xl border border-black/10 md:border-white/10 text-center">
                  <span className="text-[10px] uppercase tracking-widest text-black/40 md:text-white/40 block mb-2">Estimated Spend</span>
                  <div className="text-4xl md:text-6xl font-black text-blue-500 font-mono">
                    PKR {budget.toLocaleString()}
                  </div>
                </div>

                <div className="py-6">
                  <input 
                    type="range" 
                    min={20000} 
                    max={500000} 
                    step={10000} 
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full h-2 bg-black/10 md:bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-xs font-mono opacity-50 mt-2">
                    <span>PKR 20K</span>
                    <span>PKR 250K</span>
                    <span>PKR 500K+</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
                  {BUDGET_PRESETS.map(preset => (
                    <button
                      key={preset.value}
                      onClick={() => setBudget(preset.value)}
                      className={`p-3 rounded-xl border text-center transition-all ${budget === preset.value ? 'border-blue-500 bg-blue-500/10' : 'border-black/5 md:border-white/5 hover:border-black/10 md:hover:border-white/10 bg-black/5 md:bg-white/5'}`}
                    >
                      <span className="font-bold text-xs block">{preset.label}</span>
                      <span className="text-[8px] opacity-60 uppercase tracking-widest block mt-1">{preset.desc.split(' ')[0]} plan</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-8">
                <button onClick={handlePrev} className="px-6 py-3 border border-black/10 md:border-white/10 rounded-full font-bold uppercase tracking-widest text-xs">Back</button>
                <button onClick={handleNext} className="px-8 py-3 bg-blue-500 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-blue-600 transition-all">Continue</button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: PRESENCE */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">Your current social media presence?</h2>
              <p className="text-black/60 md:text-white/60">This helps Boss AI determine if we need initial warm-up campaigns or if we can jump directly into high-scale conversion funnels.</p>

              <div className="grid grid-cols-1 gap-4 pt-4">
                {PRESENCES.map(item => (
                  <button
                    key={item.id}
                    onClick={() => { setPresence(item.id); }}
                    className={`p-6 rounded-2xl border text-left transition-all ${presence === item.id ? 'border-blue-500 bg-blue-500/5 md:bg-blue-500/10' : 'border-black/10 md:border-white/10 hover:border-black/30 md:hover:border-white/30 bg-black/5 md:bg-white/5'}`}
                  >
                    <h3 className="font-bold text-lg uppercase tracking-tight">{item.label}</h3>
                    <p className="text-sm text-black/60 md:text-white/60 mt-1">{item.desc}</p>
                  </button>
                ))}
              </div>

              <div className="flex gap-4 pt-8">
                <button onClick={handlePrev} className="px-6 py-3 border border-black/10 md:border-white/10 rounded-full font-bold uppercase tracking-widest text-xs">Back</button>
                <button 
                  disabled={!niche || !goal || !location || !presence}
                  onClick={runAnalysis} 
                  className="px-10 py-4 bg-blue-500 disabled:opacity-40 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-blue-600 transition-all flex items-center gap-2"
                >
                  Analyze Strategic Blueprint <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* LOADING STATE */}
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center space-y-6"
            >
              <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
              <div className="space-y-2">
                <h3 className="text-xl font-bold uppercase tracking-widest text-blue-500">Boss AI Computing</h3>
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={loadingStage}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-black/60 md:text-white/60 font-mono text-sm h-6"
                  >
                    {loadingStages[loadingStage]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* STEP 6: RESULTS */}
          {step === 6 && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-black/10 md:border-white/10 pb-8">
                <div>
                  <div className="flex items-center gap-2 text-blue-500 font-bold uppercase tracking-widest text-xs mb-2">
                    <Sparkles className="w-4 h-4" /> Customized Marketing Strategy
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Your Roadmap</h2>
                </div>
                <div className="bg-black/5 md:bg-white/5 px-6 py-3 border border-black/10 md:border-white/10 rounded-2xl flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold tracking-widest opacity-60">ANALYZED BY BOSS AI</span>
                </div>
              </div>

              {/* Recommendation summary card */}
              <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-transparent p-8 rounded-3xl border border-blue-500/20">
                <h3 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-500" /> Executive AI Summary
                </h3>
                <p className="text-black/80 md:text-white/80 leading-relaxed text-lg font-light">
                  {result.recommendationSummary}
                </p>
              </div>

              {/* SPECIALIST AGENTS ADVICE (Marketing, Designing, Development, Ads Management) */}
              {result.specialistAgents && (
                <div className="space-y-6 pt-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-blue-500" /> 4 Managed Specialist Teams
                    </h3>
                    <span className="text-xs font-mono text-blue-500 uppercase tracking-widest font-bold">The Boss Marketers Framework</span>
                  </div>

                  {/* Specialist Agent Tabs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-black/5 md:bg-white/5 p-1.5 rounded-2xl border border-black/10 md:border-white/10">
                    <button
                      onClick={() => setActiveAgentTab('marketing')}
                      className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                        activeAgentTab === 'marketing'
                          ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                          : 'text-black/60 md:text-white/60 hover:text-black md:hover:text-white'
                      }`}
                    >
                      <Megaphone className="w-4 h-4" /> Marketing
                    </button>
                    <button
                      onClick={() => setActiveAgentTab('designing')}
                      className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                        activeAgentTab === 'designing'
                          ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                          : 'text-black/60 md:text-white/60 hover:text-black md:hover:text-white'
                      }`}
                    >
                      <Palette className="w-4 h-4" /> Designing
                    </button>
                    <button
                      onClick={() => setActiveAgentTab('development')}
                      className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                        activeAgentTab === 'development'
                          ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                          : 'text-black/60 md:text-white/60 hover:text-black md:hover:text-white'
                      }`}
                    >
                      <Code className="w-4 h-4" /> Development
                    </button>
                    <button
                      onClick={() => setActiveAgentTab('adsManagement')}
                      className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                        activeAgentTab === 'adsManagement'
                          ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                          : 'text-black/60 md:text-white/60 hover:text-black md:hover:text-white'
                      }`}
                    >
                      <BarChart3 className="w-4 h-4" /> Ads Setup
                    </button>
                  </div>

                  {/* Active Agent Content Panel */}
                  <div className="bg-black/5 md:bg-white/5 border border-black/10 md:border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
                    {/* 1. MARKETING AGENT */}
                    {activeAgentTab === 'marketing' && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-black/10 md:border-white/10 pb-4">
                          <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold">
                            <Megaphone className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-black text-lg uppercase tracking-tight">Marketing Agent Strategy</h4>
                            <p className="text-xs text-black/50 md:text-white/50">Market positioning & high-converting message hooks</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-500 block mb-1">Market Positioning</span>
                            <p className="text-sm text-black/80 md:text-white/80 leading-relaxed">{result.specialistAgents?.marketing.positioning}</p>
                          </div>

                          <div>
                            <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-500 block mb-2">High-Converting Messaging Hooks</span>
                            <div className="space-y-2">
                              {result.specialistAgents?.marketing.messagingHooks.map((hook, i) => (
                                <div key={i} className="p-3 bg-black/5 md:bg-white/5 rounded-xl border border-black/5 md:border-white/5 text-xs font-medium text-black/90 md:text-white/90 flex items-center gap-2">
                                  <Sparkles className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                                  <span>{hook}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="pt-2">
                            <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-500 block mb-1">Core Campaign Strategy</span>
                            <p className="text-sm text-black/70 md:text-white/70">{result.specialistAgents?.marketing.strategy}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 2. DESIGNING AGENT (CANVA ACTIONABLE SEARCH QUERIES) */}
                    {activeAgentTab === 'designing' && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-black/10 md:border-white/10 pb-4">
                          <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                            <Palette className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-black text-lg uppercase tracking-tight">Designing Agent & Canva Templates</h4>
                            <p className="text-xs text-black/50 md:text-white/50">Minimalist visual guidelines & exact actionable Canva queries</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-400 block mb-1">Visual Aesthetic</span>
                            <p className="text-sm text-black/80 md:text-white/80 leading-relaxed">{result.specialistAgents?.designing.aesthetic}</p>
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-400">Actionable Canva Search Queries</span>
                              <span className="text-[10px] text-purple-400/80 uppercase tracking-widest font-bold">Copy & Paste in Canva</span>
                            </div>
                            <div className="space-y-2.5">
                              {result.specialistAgents?.designing.canvaQueries.map((query, i) => (
                                <div key={i} className="p-3.5 bg-black/5 md:bg-white/5 rounded-2xl border border-purple-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group hover:border-purple-500/50 transition-all">
                                  <div className="flex items-center gap-2.5 font-mono text-xs text-purple-300">
                                    <Search className="w-4 h-4 text-purple-400 flex-shrink-0" />
                                    <span>{query}</span>
                                  </div>
                                  <div className="flex items-center gap-2 self-end sm:self-auto">
                                    <button
                                      onClick={() => handleCopyQuery(query)}
                                      className="px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-[11px] font-bold uppercase tracking-wider rounded-lg border border-purple-500/20 flex items-center gap-1.5 transition-all"
                                    >
                                      {copiedQuery === query ? (
                                        <>
                                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                                          <span className="text-emerald-400">Copied!</span>
                                        </>
                                      ) : (
                                        <>
                                          <Copy className="w-3.5 h-3.5" />
                                          <span>Copy Query</span>
                                        </>
                                      )}
                                    </button>
                                    <a
                                      href={`https://www.canva.com/search?q=${encodeURIComponent(query)}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-3 py-1.5 bg-purple-500 text-white text-[11px] font-bold uppercase tracking-wider rounded-lg hover:bg-purple-600 flex items-center gap-1 transition-all"
                                    >
                                      <span>Open Canva</span>
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-400 block mb-2">Recommended Brand Palette</span>
                            <div className="flex items-center gap-3">
                              {result.specialistAgents?.designing.colorPalette.map((color, i) => (
                                <div key={i} className="flex items-center gap-2 bg-black/5 md:bg-white/5 px-3 py-1.5 rounded-full border border-black/10 md:border-white/10">
                                  <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: color }} />
                                  <span className="text-xs font-mono font-bold uppercase">{color}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 3. DEVELOPMENT AGENT */}
                    {activeAgentTab === 'development' && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-black/10 md:border-white/10 pb-4">
                          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                            <Code className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-black text-lg uppercase tracking-tight">Development Agent Specifications</h4>
                            <p className="text-xs text-black/50 md:text-white/50">Tech stack, mobile speed optimization & lead capture</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 block mb-1">Recommended Tech Stack</span>
                            <p className="text-sm font-mono text-emerald-400/90">{result.specialistAgents?.development.techStack}</p>
                          </div>

                          <div>
                            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 block mb-2">Essential E-commerce & Conversion Features</span>
                            <div className="space-y-2">
                              {result.specialistAgents?.development.keyFeatures.map((feat, i) => (
                                <div key={i} className="p-3 bg-black/5 md:bg-white/5 rounded-xl border border-black/5 md:border-white/5 text-xs text-black/90 md:text-white/90 flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                  <span>{feat}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 block mb-1">Conversion Rate Optimization (CRO)</span>
                            <p className="text-sm text-black/80 md:text-white/80">{result.specialistAgents?.development.conversionOptimization}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 4. ADS MANAGEMENT AGENT */}
                    {activeAgentTab === 'adsManagement' && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-black/10 md:border-white/10 pb-4">
                          <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold">
                            <BarChart3 className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-black text-lg uppercase tracking-tight">Ads Management Agent Architecture</h4>
                            <p className="text-xs text-black/50 md:text-white/50">Meta Ads Manager structure, targeting tactics & CAPI setup</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-500 block mb-1">Campaign Architecture</span>
                            <p className="text-sm text-black/80 md:text-white/80">{result.specialistAgents?.adsManagement.campaignStructure}</p>
                          </div>

                          <div>
                            <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-500 block mb-2">Targeting Tactics</span>
                            <div className="space-y-2">
                              {result.specialistAgents?.adsManagement.targetingTactics.map((tactic, i) => (
                                <div key={i} className="p-3 bg-black/5 md:bg-white/5 rounded-xl border border-black/5 md:border-white/5 text-xs text-black/90 md:text-white/90 flex items-center gap-2">
                                  <Target className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                                  <span>{tactic}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-500 block mb-1">Pixel & Conversions API Setup</span>
                            <p className="text-sm text-black/80 md:text-white/80">{result.specialistAgents?.adsManagement.trackingSetup}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Budget split section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-black/5 md:bg-white/5 border border-black/10 md:border-white/10 p-8 rounded-3xl space-y-6">
                  <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-blue-500" /> FB & Insta Budget Split
                  </h3>

                  <div className="space-y-4">
                    {/* FB bar */}
                    <div>
                      <div className="flex justify-between items-center text-sm font-bold uppercase mb-2">
                        <span className="flex items-center gap-2 text-[#1877F2]"><Facebook className="w-4 h-4" /> Facebook ads</span>
                        <span>{result.budgetAllocation.facebook}% (PKR {result.budgetAllocation.fbAmount.toLocaleString()})</span>
                      </div>
                      <div className="w-full h-3 bg-black/10 md:bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-[#1877F2]" 
                          initial={{ width: 0 }}
                          animate={{ width: `${result.budgetAllocation.facebook}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                        />
                      </div>
                    </div>

                    {/* Insta bar */}
                    <div>
                      <div className="flex justify-between items-center text-sm font-bold uppercase mb-2">
                        <span className="flex items-center gap-2 text-[#E4405F]"><Instagram className="w-4 h-4" /> Instagram ads</span>
                        <span>{result.budgetAllocation.instagram}% (PKR {result.budgetAllocation.instaAmount.toLocaleString()})</span>
                      </div>
                      <div className="w-full h-3 bg-black/10 md:bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-[#F77737] via-[#E1306C] to-[#C13584]" 
                          initial={{ width: 0 }}
                          animate={{ width: `${result.budgetAllocation.instagram}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-black/60 md:text-white/60 leading-relaxed border-t border-black/10 md:border-white/10 pt-4 mt-6">
                    {result.budgetAllocation.splitReasoning}
                  </p>
                </div>

                {/* Suggested Campaigns */}
                <div className="space-y-6">
                  <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-500" /> Recommended Campaigns
                  </h3>

                  <div className="grid grid-cols-1 gap-4">
                    {result.suggestedCampaigns.map((camp, i) => (
                      <div key={i} className="p-6 bg-black/5 md:bg-white/5 border border-black/10 md:border-white/10 rounded-2xl relative overflow-hidden group">
                        <div className="absolute right-0 top-0 h-full w-1 bg-blue-500" />
                        <h4 className="font-bold text-lg uppercase tracking-tight text-blue-500">{camp.name}</h4>
                        <div className="grid grid-cols-2 gap-4 mt-4 text-xs">
                          <div>
                            <span className="opacity-50 uppercase tracking-widest block mb-1">Objective</span>
                            <span className="font-mono font-bold uppercase">{camp.objective}</span>
                          </div>
                          <div>
                            <span className="opacity-50 uppercase tracking-widest block mb-1">Estimated Cost</span>
                            <span className="font-mono font-bold text-emerald-500">{camp.estimatedCpc}</span>
                          </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-black/5 md:border-white/5 text-xs text-black/70 md:text-white/70">
                          <span className="opacity-50 uppercase tracking-widest block mb-1">Meta Audience Strategy</span>
                          {camp.targetAudience}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Multi-Phase Roadmap */}
              <div className="space-y-8 pt-6">
                <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-500" /> Structured 3-Phase Roadmap
                </h3>

                <div className="relative border-l-2 border-black/10 md:border-white/10 pl-6 ml-4 space-y-12">
                  {result.roadmap.map((phase, i) => (
                    <div key={i} className="relative">
                      {/* Node circle */}
                      <div className="absolute -left-[35px] top-1.5 w-6 h-6 rounded-full bg-[#050505] border-2 border-blue-500 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                      </div>

                      <div className="space-y-4">
                        <div>
                          <span className="text-[10px] font-mono font-bold tracking-widest text-blue-500 uppercase">{phase.phase}</span>
                          <h4 className="text-2xl font-black uppercase tracking-tight mt-1">{phase.title}</h4>
                        </div>

                        <div className="bg-black/5 md:bg-white/5 border border-black/10 md:border-white/10 p-6 rounded-2xl max-w-3xl space-y-4">
                          <ul className="space-y-3">
                            {phase.tasks.map((task, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-sm text-black/80 md:text-white/80">
                                <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                <span>{task}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="border-t border-black/10 md:border-white/10 pt-3 text-xs flex items-center gap-2 text-emerald-500">
                            <span className="font-bold uppercase tracking-widest">Expected Outcome:</span>
                            <span>{phase.expectedOutcome}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* INTERACTIVE BOSS AI SPECIALIST ADVISOR CHAT */}
              <div className="bg-black/5 md:bg-white/5 border border-black/10 md:border-white/10 rounded-3xl p-6 md:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-black/10 md:border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-500 text-white flex items-center justify-center font-bold">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black uppercase tracking-tight">Ask Boss AI Specialist Agents</h3>
                      <p className="text-xs text-black/60 md:text-white/60">Guide your multi-step business setup with custom questions</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase bg-blue-500/10 text-blue-500 border border-blue-500/20 px-3 py-1 rounded-full font-bold">
                      4 Specialist Teams Active
                    </span>
                  </div>
                </div>

                {/* Message Log */}
                <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {msg.role === 'assistant' && (
                        <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}
                      <div className={`p-4 rounded-2xl text-sm max-w-xl leading-relaxed ${
                        msg.role === 'user' 
                          ? 'bg-blue-500 text-white rounded-tr-none' 
                          : 'bg-black/5 md:bg-white/5 border border-black/10 md:border-white/10 text-black/90 md:text-white/90 rounded-tl-none whitespace-pre-wrap'
                      }`}>
                        {msg.content}

                        {msg.canvaQueries && msg.canvaQueries.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-black/10 md:border-white/10 space-y-2">
                            <span className="text-[10px] uppercase font-mono tracking-widest text-purple-400 font-bold block">Canva Actionable Search Queries:</span>
                            {msg.canvaQueries.map((q, i) => (
                              <div key={i} className="flex items-center justify-between gap-2 p-2 bg-purple-500/10 rounded-xl text-xs font-mono text-purple-300">
                                <span>{q}</span>
                                <button
                                  type="button"
                                  onClick={() => handleCopyQuery(q)}
                                  className="text-[10px] font-bold uppercase bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600 transition-all"
                                >
                                  Copy
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      {msg.role === 'user' && (
                        <div className="w-8 h-8 rounded-xl bg-black/10 md:bg-white/10 text-black md:text-white flex items-center justify-center flex-shrink-0 mt-1">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  ))}
                  {chatLoading && (
                    <div className="flex gap-3 items-center text-xs font-mono text-blue-500">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Boss AI Specialist Agents are analyzing your question...</span>
                    </div>
                  )}
                </div>

                {/* Input form */}
                <form onSubmit={handleSendChat} className="flex gap-3 pt-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask about design, Canva templates, marketing, web dev, or Meta ads..."
                    className="flex-1 bg-black/5 md:bg-white/5 border border-black/10 md:border-white/10 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-blue-500 transition-all placeholder:text-black/40 md:placeholder:text-white/40"
                  />
                  <button
                    type="submit"
                    disabled={chatLoading || !chatInput.trim()}
                    className="px-6 py-3.5 bg-blue-500 text-white font-bold uppercase tracking-widest text-xs rounded-2xl hover:bg-blue-600 disabled:opacity-50 transition-all flex items-center gap-2"
                  >
                    <span>Ask</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

              {/* Apply strategy CTA */}
              <div className="bg-gradient-to-b from-blue-500/10 to-transparent p-12 rounded-3xl border border-blue-500/20 text-center space-y-6">
                <h3 className="text-3xl font-black uppercase tracking-tight">Deploy This Blueprint</h3>
                <p className="max-w-xl mx-auto text-black/60 md:text-white/60">
                  Ready to turn this roadmap into real customers and sales? Connect with Karachi's premier marketing team to deploy this exact ad framework.
                </p>
                <div className="flex justify-center gap-4 pt-4">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-10 py-5 bg-blue-500 text-white font-bold uppercase tracking-widest rounded-full text-xs hover:bg-blue-600 hover:scale-105 transition-all flex items-center gap-3"
                  >
                    Deploy Roadmap On WhatsApp <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 6: ERROR STATE */}
          {step === 6 && error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="max-w-xl mx-auto bg-black/5 md:bg-white/5 border border-red-500/20 rounded-3xl p-8 md:p-12 text-center space-y-6"
            >
              <div className="w-16 h-16 bg-red-500/15 text-red-500 rounded-full flex items-center justify-center mx-auto">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <div className="space-y-2 text-left">
                <h3 className="text-2xl font-black uppercase tracking-tight text-center">Strategy Generation Delayed</h3>
                <p className="text-sm text-black/60 md:text-white/60 leading-relaxed text-center">
                  The digital matrix is currently highly saturated, or our AI engine took longer than expected to process your request.
                </p>
                <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-2xl text-xs font-mono text-red-400 mt-4 overflow-x-auto whitespace-pre-wrap">
                  Error Detail: {error}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <button
                  onClick={() => {
                    setStep(5);
                    setError(null);
                  }}
                  className="px-8 py-3 border border-black/10 md:border-white/10 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-black/5 md:hover:bg-white/5 transition-all"
                >
                  Modify Answers
                </button>
                <button
                  onClick={runAnalysis}
                  className="px-8 py-3 bg-blue-500 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-blue-600 transition-all"
                >
                  Retry Analysis
                </button>
              </div>

              <div className="border-t border-black/5 md:border-white/5 pt-6 text-xs text-black/40 md:text-white/40">
                Or skip the AI and get a human strategist to build your roadmap for free via WhatsApp.
                <div className="mt-3">
                  <a
                    href="https://wa.me/923150229035"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 font-bold uppercase tracking-wider"
                  >
                    Chat directly with a human expert <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
