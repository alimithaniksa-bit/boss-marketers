/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  TrendingUp, 
  Users, 
  Target, 
  Zap, 
  ArrowRight, 
  Instagram, 
  Facebook, 
  Mail, 
  MapPin, 
  CheckCircle2,
  Menu,
  X,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Box,
  Layers,
  Cpu,
  Globe
} from 'lucide-react';
import BossAI from './components/BossAI.tsx';
import Card3DTilt from './components/Card3DTilt.tsx';
import Motion3DCanvas from './components/Motion3DCanvas.tsx';
import MotionGraphic3DObject from './components/MotionGraphic3DObject.tsx';
import TypoText from './components/TypoText.tsx';
import SitePreloader from './components/SitePreloader.tsx';

const LOGO_URL = "https://scontent-atl3-2.xx.fbcdn.net/v/t39.30808-1/315771740_114226948170266_3907760731931891078_n.jpg?stp=dst-jpg_tt6&cstp=mx500x500&ctp=s500x500&_nc_cat=104&ccb=1-7&_nc_sid=3ab345&_nc_ohc=pWBH0i3Gj-cQ7kNvwGwGMSD&_nc_oc=AdnaBGsfzvAiSMeM8YfZQZJIs5rcBJZUXHA7k0ZEykDC57aH41UmYcZVCulaWWluXyo&_nc_zt=24&_nc_ht=scontent-atl3-2.xx&_nc_gid=3IXdifswJ0jSyM76B-TsBw&_nc_ss=8&oh=00_Afy40PgeTiKujlp4U7jSiIRX9kR8Svou84wUAbk6liuxUA&oe=69AC8BAE";

const services = [
  {
    title: "Social Media Management",
    description: "End-to-end management of your social presence, from content strategy to community engagement.",
    icon: <Users className="w-6 h-6 text-white" />,
    badge: "3D ENGAGEMENT ENGINE"
  },
  {
    title: "Performance Marketing",
    description: "Data-driven Meta ad campaigns designed to maximize ROI and scale your business rapidly in Pakistan.",
    icon: <TrendingUp className="w-6 h-6 text-white" />,
    badge: "HIGH CONVERSION ADS"
  },
  {
    title: "Content Creation",
    description: "High-quality visual and written content, motion graphics, and minimalist video reels.",
    icon: <Zap className="w-6 h-6 text-white" />,
    badge: "MINIMALIST CANVA & REELS"
  },
  {
    title: "Brand Strategy",
    description: "Defining your brand's voice, luxury positioning, mission, and visual identity for long-term dominance.",
    icon: <Target className="w-6 h-6 text-white" />,
    badge: "LUXURY POSITIONING"
  }
];

const workflow = [
  {
    step: "01",
    title: "Discovery & Audit",
    description: "We dive deep into your target market, budget allocation, and competitive positioning to find the winning angle."
  },
  {
    step: "02",
    title: "Boss AI Strategy",
    description: "Crafting a bespoke marketing blueprint using our 4 Specialist Agents (Marketing, Designing, Web Dev, Ads)."
  },
  {
    step: "03",
    title: "Execution & Launch",
    description: "Deploying high-impact Meta CBO campaigns, minimalist Canva visuals, and high-converting landing pages."
  },
  {
    step: "04",
    title: "Scaling & ROAS",
    description: "Continuous monitoring, Pixel event optimization, and data-driven budget scaling for maximum revenue."
  }
];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PrivacyPolicy() {
  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-white">
      <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-12 text-white/60 hover:text-white transition-all">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
      <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-12">Privacy Policy</h1>
      <div className="space-y-8 text-white/70 leading-relaxed font-light">
        <section className="bg-white/5 p-8 rounded-3xl border border-white/10">
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-4">1. Introduction</h2>
          <p>Welcome to The Boss Marketers. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at info@thebossmarketers.site.</p>
        </section>
        <section className="bg-white/5 p-8 rounded-3xl border border-white/10">
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-4">2. Information We Collect</h2>
          <p>We collect personal information that you voluntarily provide to us when expressing an interest in obtaining information about us or our products and services, when participating in activities on the website or otherwise contacting us.</p>
        </section>
        <section className="bg-white/5 p-8 rounded-3xl border border-white/10">
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-4">3. How We Use Your Information</h2>
          <p>We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
        </section>
        <section className="bg-white/5 p-8 rounded-3xl border border-white/10">
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-4">4. Sharing Your Information</h2>
          <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</p>
        </section>
        <section className="bg-white/5 p-8 rounded-3xl border border-white/10">
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-4">5. Contact Us</h2>
          <p>If you have questions or comments about this policy, you may email us at info@thebossmarketers.site or by post to: d_16 Block 07 Gulshan E Iqbal Karachi.</p>
        </section>
      </div>
    </div>
  );
}

function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // 3D Scroll Perspective Transforms
  const heroScale = useTransform(smoothProgress, [0, 0.25], [1, 0.92]);
  const heroRotateX = useTransform(smoothProgress, [0, 0.25], [0, 15]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0.3]);

  const servicesY = useTransform(smoothProgress, [0.15, 0.45], [100, 0]);
  const servicesRotateX = useTransform(smoothProgress, [0.15, 0.45], [20, 0]);
  const servicesOpacity = useTransform(smoothProgress, [0.15, 0.3], [0, 1]);

  const workflowScale = useTransform(smoothProgress, [0.35, 0.65], [0.9, 1]);
  const workflowRotateY = useTransform(smoothProgress, [0.35, 0.65], [-10, 0]);

  const aboutPerspective = useTransform(smoothProgress, [0.6, 0.9], [15, 0]);

  return (
    <div ref={containerRef} className="relative bg-[#050505] text-white overflow-hidden selection:bg-white selection:text-black">
      {/* Dynamic 3D Matrix Grid Background */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <Motion3DCanvas variant="full-bg" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 px-6">
        <motion.div 
          style={{ 
            scale: heroScale, 
            rotateX: heroRotateX,
            opacity: heroOpacity,
            perspective: 1000
          }}
          className="relative z-20 max-w-7xl mx-auto w-full text-center space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2 border border-white/20 rounded-full text-[10px] font-mono uppercase tracking-[0.3em] mb-6 bg-white/5 backdrop-blur-md text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-white animate-spin" /> Karachi's Premier Digital Marketing Agency
            </motion.span>
            
            <h1 className="text-5xl sm:text-7xl md:text-[8.5vw] font-black leading-[0.85] tracking-tighter uppercase mb-6 font-mono">
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="block text-white"
              >
                <TypoText text="Make Your" mode="scramble-once" delay={300} speed={30} />
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-white/30 drop-shadow-[0_0_35px_rgba(255,255,255,0.2)]"
              >
                <TypoText text="Business" mode="scramble-once" delay={700} speed={40} />
              </motion.span> <br />
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="block text-white"
              >
                <TypoText text="Successful." mode="scramble-once" delay={1100} speed={40} />
              </motion.span>
            </h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-white/70 font-light leading-relaxed mb-10"
            >
              We are <strong className="text-white font-bold">The Boss Marketers</strong>. Powered by 3D motion graphics, automated AI strategy, and precision Meta performance campaigns to build digital dominance.
            </motion.p>

            {/* Interactive 3D Call to Action */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <motion.a 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                href="https://wa.me/923150229035"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-full flex items-center gap-3 hover:bg-neutral-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105"
              >
                Start Dominating
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <Link 
                  to="/boss-ai"
                  className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-black uppercase tracking-widest text-xs rounded-full backdrop-blur-md flex items-center gap-2 transition-all hover:scale-105"
                >
                  <Sparkles className="w-4 h-4 text-white" /> Launch Boss AI Planner
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Dynamic 3D Graphic Graphic Element in Hero */}
          <div className="pt-10 max-w-lg mx-auto">
            <Card3DTilt maxTilt={20}>
              <MotionGraphic3DObject type="cube" title="3D MOTION STRATEGY ENGINE" badge="THE BOSS MARKETERS" />
            </Card3DTilt>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-60"
        >
          <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white">SCROLL TO REVEAL</span>
          <div className="w-px h-10 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

      {/* Services Section with 3D Motion Reveal */}
      <motion.section 
        id="services" 
        style={{ 
          y: servicesY, 
          rotateX: servicesRotateX, 
          opacity: servicesOpacity,
          perspective: 1000 
        }}
        className="py-32 relative z-10 bg-[#050505] border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl w-full">
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-white/50 mb-3 block">3D Digital Ecosystem</span>
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none font-mono text-white">
                Comprehensive <br />Services
              </h2>
            </div>
            <p className="max-w-md text-white/60 text-sm md:text-base font-light leading-relaxed">
              We don't just manage accounts; we build digital empires. Our services are crafted with precision, minimalist visual art, and conversion engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card3DTilt key={index} maxTilt={15}>
                <div className="p-8 bg-neutral-950/80 border border-white/10 rounded-3xl hover:border-white/40 transition-all group h-full flex flex-col justify-between shadow-xl">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                        {service.icon}
                      </div>
                      <span className="text-[9px] font-mono uppercase bg-white/5 border border-white/10 text-white/70 px-2.5 py-1 rounded-full font-bold">
                        {service.badge}
                      </span>
                    </div>
                    <h3 className="text-xl font-black mb-3 uppercase tracking-tight text-white font-mono">{service.title}</h3>
                    <p className="text-white/60 text-xs leading-relaxed mb-8 font-light">
                      {service.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/80 group-hover:text-white transition-all pt-4 border-t border-white/5">
                    <span>Explore Module</span> 
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-white" />
                  </div>
                </div>
              </Card3DTilt>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Workflow Section with Interactive 3D Depth Steps */}
      <motion.section 
        id="workflow" 
        style={{ scale: workflowScale, rotateY: workflowRotateY }}
        className="py-32 bg-[#000000] border-t border-white/10 text-white relative z-10"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-white/50 mb-3 block">Precision Pipeline</span>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase font-mono">How We <br />Execute</h2>
            </div>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
              <Cpu className="w-4 h-4 text-white animate-pulse" />
              <span className="text-xs font-mono uppercase text-white/80">4 Specialist Agents Framework</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflow.map((item, index) => (
              <Card3DTilt key={index} maxTilt={12}>
                <div className="relative p-8 bg-neutral-950/90 border border-white/10 rounded-3xl h-full flex flex-col justify-between group hover:border-white/30 transition-all">
                  <span className="text-7xl font-black text-white/10 absolute top-4 right-6 select-none font-mono">
                    {item.step}
                  </span>
                  <div className="relative z-10 space-y-4">
                    <div className="w-8 h-px bg-white/40 group-hover:w-16 transition-all duration-300" />
                    <h3 className="text-xl font-black uppercase tracking-tight text-white font-mono">
                      {item.title}
                    </h3>
                    <p className="text-white/60 text-xs leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-mono uppercase text-white/40">
                    <span>STEP {item.step}</span>
                    <span className="text-white font-bold">VERIFIED</span>
                  </div>
                </div>
              </Card3DTilt>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Boss AI Interactive Teaser Section */}
      <section className="py-28 bg-[#050505] border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-b from-neutral-900/80 to-black/90 border border-white/20 rounded-[40px] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl backdrop-blur-xl">
            <div className="max-w-xl text-left space-y-6">
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-white/70 bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full inline-block font-bold">
                Interactive AI Strategy Hub
              </span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white font-mono">
                Boss AI Strategy Quiz
              </h2>
              <p className="text-white/70 text-base md:text-lg font-light leading-relaxed">
                Receive instant Meta budget splits (FB vs IG), actionable Canva minimalist template search queries, web dev recommendations, and a 3-phase roadmap customized for your local market.
              </p>
              <Link to="/boss-ai" className="group px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-xs rounded-full inline-flex items-center gap-3 hover:bg-neutral-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:scale-105">
                Launch Boss AI Strategist
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            {/* Interactive Simulation Visual */}
            <div className="w-full lg:max-w-md">
              <Card3DTilt maxTilt={10}>
                <div className="bg-black border border-white/20 rounded-3xl p-8 space-y-6 text-left shadow-2xl">
                  <div className="flex justify-between items-center text-xs opacity-60 font-mono">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-white animate-spin" /> LIVE AI BUDGET SPLIT
                    </span>
                    <span className="text-white font-bold">OPTIMIZED</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold font-mono uppercase mb-1.5 text-white">
                        <span>Facebook Ads</span>
                        <span>50%</span>
                      </div>
                      <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
                        <div className="w-[50%] h-full bg-white rounded-full shadow-[0_0_10px_#fff]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-bold font-mono uppercase mb-1.5 text-white">
                        <span>Instagram Ads</span>
                        <span>50%</span>
                      </div>
                      <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
                        <div className="w-[50%] h-full bg-neutral-400 rounded-full shadow-[0_0_10px_#aaa]" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                    <span className="text-[10px] font-mono uppercase text-white/50 block font-bold">Designing Agent Canva Query:</span>
                    <code className="text-xs font-mono text-white block bg-black/60 p-2 rounded-lg border border-white/10">
                      "Minimalist E-commerce Instagram Story Template"
                    </code>
                  </div>
                  
                  <div className="border-t border-white/10 pt-4 flex justify-between items-center text-xs font-mono">
                    <div>
                      <span className="opacity-40 block text-[9px] tracking-wider uppercase">TARGET LOCATION</span>
                      <span className="font-bold text-white">Karachi, Pakistan</span>
                    </div>
                    <div className="text-right">
                      <span className="opacity-40 block text-[9px] tracking-wider uppercase">ESTIMATED ROAS</span>
                      <span className="font-bold text-emerald-400">3.8x - 4.5x</span>
                    </div>
                  </div>
                </div>
              </Card3DTilt>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="reviews" className="py-32 bg-[#000000] border-t border-white/10 relative z-10 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-white/50 block">Client Proof</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase font-mono">Client Reviews</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Syed Muhammad Ali",
                review: "The Boss Marketers are truly the bosses of marketing in Karachi. They handled our social media with extreme professionalism and the results were beyond our expectations. 10/10!",
                role: "Business Owner"
              },
              {
                name: "Ayesha Siddiqui",
                review: "Amazing experience working with them. Their creative minimalist approach to content creation helped our brand stand out in a crowded market. Highly recommended!",
                role: "Creative Director"
              },
              {
                name: "Bilal Ahmed",
                review: "Best performance marketing agency. They don't just spend your budget; they invest it to get the best ROI. Our sales have doubled since we started working with them.",
                role: "E-commerce Specialist"
              }
            ].map((testimonial, index) => (
              <Card3DTilt key={index} maxTilt={12}>
                <div className="p-8 border border-white/10 rounded-3xl bg-neutral-950/80 h-full flex flex-col justify-between hover:border-white/30 transition-all">
                  <div>
                    <div className="flex gap-1.5 mb-6 text-white">
                      {[...Array(5)].map((_, i) => (
                        <Sparkles key={i} className="w-4 h-4 fill-white text-white" />
                      ))}
                    </div>
                    <p className="text-sm italic mb-8 text-white/80 leading-relaxed font-light">
                      "{testimonial.review}"
                    </p>
                  </div>
                  <div className="pt-6 border-t border-white/5">
                    <h4 className="font-bold uppercase tracking-widest text-xs font-mono text-white">{testimonial.name}</h4>
                    <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest mt-1">{testimonial.role}</p>
                  </div>
                </div>
              </Card3DTilt>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <motion.section 
        id="about" 
        style={{ rotateX: aboutPerspective }}
        className="py-32 bg-[#050505] border-t border-white/10 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-white/50 block">Our Ethos</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase font-mono leading-none">
                The Boss <br />Mindset
              </h2>
              <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed">
                Based in Karachi, <strong className="text-white">The Boss Marketers</strong> was built on one principle: results over promises. We combine 3D motion aesthetics, full-funnel Meta performance ads, and custom AI strategy to elevate brands above noise.
              </p>
              <div className="space-y-3 pt-4">
                {[
                  "Data-Driven Performance Marketing",
                  "Minimalist 3D Motion & Design Aesthetics",
                  "Local Karachi & Global Market Expertise",
                  "Unwavering ROI Commitment"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/90">
                    <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0" />
                    <span className="font-mono uppercase tracking-wider text-xs">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <Card3DTilt maxTilt={15}>
              <MotionGraphic3DObject type="orb" title="THE BOSS BRAND MATRIX" badge="1.9K+ HAPPY CLIENTS" />
            </Card3DTilt>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section id="contact" className="py-32 bg-[#000000] border-t border-white/10 text-white text-center relative z-10">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase font-mono leading-none">
            Ready to <br />Scale?
          </h2>
          <p className="text-base md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
            Join the ranks of high-growth businesses that transformed their revenue and brand identity with The Boss Marketers.
          </p>
          <a 
            href="https://wa.me/923150229035"
            target="_blank"
            rel="noopener noreferrer"
            className="px-12 py-6 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-full hover:bg-neutral-200 transition-all inline-block shadow-[0_0_35px_rgba(255,255,255,0.4)] hover:scale-105"
          >
            Contact Us Today
          </a>
        </div>
      </section>
    </div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black transition-colors duration-700">
      <AnimatePresence>
        {isLoading && (
          <SitePreloader key="site-preloader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <ScrollToTop />
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled || !isHome ? 'bg-black/90 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <TypoText 
              text="The Boss Marketers" 
              mode="loop-glitch" 
              className="text-lg sm:text-2xl font-black tracking-tighter uppercase italic font-mono text-white group-hover:text-white/90 transition-all drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {isHome ? (
              ['Services', 'Workflow', 'Reviews', 'About', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className="text-xs font-mono font-bold uppercase tracking-widest text-white/60 hover:text-white transition-all"
                >
                  {item}
                </a>
              ))
            ) : (
              <Link to="/" className="text-xs font-mono font-bold uppercase tracking-widest text-white/60 hover:text-white transition-all">
                Home
              </Link>
            )}
            <Link to="/boss-ai" className="text-xs font-mono font-bold uppercase tracking-widest text-white bg-white/10 border border-white/20 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-white animate-spin" /> Boss AI
            </Link>
            <a 
              href="https://wa.me/923150229035"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-white text-black text-xs font-mono font-black uppercase tracking-widest rounded-full hover:bg-neutral-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            >
              Get Started
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu className="text-white" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black pt-28 px-6 md:hidden border-b border-white/10"
          >
            <div className="flex flex-col gap-8">
              {isHome ? (
                ['Services', 'Workflow', 'Reviews', 'About', 'Contact'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-3xl font-black font-mono uppercase tracking-tighter text-white"
                  >
                    {item}
                  </a>
                ))
              ) : (
                <Link 
                  to="/" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl font-black font-mono uppercase tracking-tighter text-white"
                >
                  Home
                </Link>
              )}
              <Link 
                to="/boss-ai"
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-black font-mono uppercase tracking-tighter text-white flex items-center gap-2"
              >
                <Sparkles className="w-6 h-6 text-white" /> Boss AI Planner
              </Link>
              <a 
                href="https://wa.me/923150229035"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-center py-4 bg-white text-black font-black font-mono uppercase tracking-widest text-xs rounded-full"
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/boss-ai" element={<BossAI />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>

      {/* Footer */}
      <footer className="py-16 bg-[#000000] border-t border-white/10 text-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tighter uppercase italic font-mono text-white">The Boss Marketers</span>
            </Link>

            <div className="flex gap-6 text-white">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="mailto:info@thebossmarketers.site" className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs font-mono text-white/40 gap-4">
            <p>© {new Date().getFullYear()} The Boss Marketers. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        href="https://wa.me/923150229035"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(255,255,255,0.4)] group hover:bg-neutral-200 transition-all border border-white/50"
      >
        <svg 
          viewBox="0 0 24 24" 
          className="w-7 h-7 fill-black"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span className="absolute right-full mr-4 bg-white text-black text-xs font-mono font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl border border-white/20">
          WhatsApp Us Direct
        </span>
      </motion.a>
    </div>
  );
}
