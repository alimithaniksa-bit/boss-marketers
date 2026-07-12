/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Sparkles
} from 'lucide-react';
import BossAI from './components/BossAI.tsx';

const LOGO_URL = "https://scontent-atl3-2.xx.fbcdn.net/v/t39.30808-1/315771740_114226948170266_3907760731931891078_n.jpg?stp=dst-jpg_tt6&cstp=mx500x500&ctp=s500x500&_nc_cat=104&ccb=1-7&_nc_sid=3ab345&_nc_ohc=pWBH0i3Gj-cQ7kNvwGwGMSD&_nc_oc=AdnaBGsfzvAiSMeM8YfZQZJIs5rcBJZUXHA7k0ZEykDC57aH41UmYcZVCulaWWluXyo&_nc_zt=24&_nc_ht=scontent-atl3-2.xx&_nc_gid=3IXdifswJ0jSyM76B-TsBw&_nc_ss=8&oh=00_Afy40PgeTiKujlp4U7jSiIRX9kR8Svou84wUAbk6liuxUA&oe=69AC8BAE";

const services = [
  {
    title: "Social Media Management",
    description: "End-to-end management of your social presence, from content strategy to community engagement.",
    icon: <Users className="w-6 h-6" />,
    color: "from-blue-500 to-indigo-600"
  },
  {
    title: "Performance Marketing",
    description: "Data-driven ad campaigns designed to maximize ROI and scale your business rapidly.",
    icon: <TrendingUp className="w-6 h-6" />,
    color: "from-emerald-500 to-teal-600"
  },
  {
    title: "Content Creation",
    description: "High-quality visual and written content that tells your brand's unique story.",
    icon: <Zap className="w-6 h-6" />,
    color: "from-orange-500 to-red-600"
  },
  {
    title: "Brand Strategy",
    description: "Defining your brand's voice, mission, and visual identity for long-term success.",
    icon: <Target className="w-6 h-6" />,
    color: "from-purple-500 to-pink-600"
  }
];

const workflow = [
  {
    step: "01",
    title: "Discovery",
    description: "We dive deep into your business, goals, and target audience to find the perfect angle."
  },
  {
    step: "02",
    title: "Strategy",
    description: "Crafting a bespoke marketing blueprint that aligns with your vision and market trends."
  },
  {
    step: "03",
    title: "Execution",
    description: "Our team of experts launches high-impact campaigns across all relevant platforms."
  },
  {
    step: "04",
    title: "Optimization",
    description: "Continuous monitoring and data-driven adjustments to ensure peak performance."
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
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest mb-12 opacity-60 hover:opacity-100 transition-opacity">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-12">Privacy Policy</h1>
      <div className="space-y-8 text-black/70 md:text-white/70 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-black md:text-white uppercase tracking-tight mb-4">1. Introduction</h2>
          <p>Welcome to The Boss Marketers. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at info@thebossmarketers.site.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-black md:text-white uppercase tracking-tight mb-4">2. Information We Collect</h2>
          <p>We collect personal information that you voluntarily provide to us when expressing an interest in obtaining information about us or our products and services, when participating in activities on the website or otherwise contacting us.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-black md:text-white uppercase tracking-tight mb-4">3. How We Use Your Information</h2>
          <p>We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-black md:text-white uppercase tracking-tight mb-4">4. Sharing Your Information</h2>
          <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-black md:text-white uppercase tracking-tight mb-4">5. Contact Us</h2>
          <p>If you have questions or comments about this policy, you may email us at info@thebossmarketers.site or by post to: d_16 Block 07 Gulshan E Iqbal Karachi.</p>
        </section>
      </div>
    </div>
  );
}

function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 md:via-black/50 to-white md:to-black z-10" />
          <motion.img 
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1920"
            className="w-full h-full object-cover opacity-20 md:opacity-40"
            referrerPolicy="no-referrer"
          />
          
          {/* Animated Vector Visuals */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * 100 + "%", 
                  y: Math.random() * 100 + "%",
                  opacity: 0 
                }}
                animate={{ 
                  x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                  y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                  opacity: [0.1, 0.3, 0.1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 15 + Math.random() * 10, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="absolute w-64 h-64 border border-black/5 md:border-white/5 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${i % 2 === 0 ? 'rgba(59, 130, 246, 0.1)' : 'rgba(16, 185, 129, 0.1)'} 0%, transparent 70%)`
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1 border border-black/10 md:border-white/20 rounded-full text-[10px] uppercase tracking-[0.3em] mb-8 bg-black/5 md:bg-white/5 backdrop-blur-sm"
            >
              Karachi's Premier Marketing Agency
            </motion.span>
            <h1 className="text-6xl md:text-[10vw] font-bold leading-[0.85] tracking-tighter uppercase mb-8">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="block"
              >Make Your</motion.span>
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-black md:from-white via-black/50 md:via-white/50 to-black/20 md:to-white/20"
              >Business</motion.span> <br />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="block"
              >Successful.</motion.span>
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="max-w-2xl mx-auto text-lg md:text-xl text-black/60 md:text-white/60 font-light mb-12"
            >
              We are The Boss Marketers. We dominate the digital landscape to empower your brand and drive unparalleled growth.
            </motion.p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <motion.a 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                href="https://wa.me/923082234916"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-10 py-5 bg-black md:bg-white text-white md:text-black font-bold uppercase tracking-widest rounded-full flex items-center gap-3 hover:scale-105 transition-all"
              >
                Start Dominating
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                href="#services"
                className="px-10 py-5 border border-black/10 md:border-white/20 font-bold uppercase tracking-widest rounded-full hover:bg-black/5 md:hover:bg-white/5 transition-all"
              >
                View Our Services
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30"
        >
          <div className="w-px h-12 bg-black md:bg-white" />
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-white md:bg-[#050505] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl w-full">
              <span className="text-[10px] uppercase tracking-[0.3em] text-black/40 md:text-white/40 mb-4 block">Our Expertise</span>
              <h2 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase leading-tight">Comprehensive <br className="hidden md:block" />Digital Solutions</h2>
            </div>
            <p className="max-w-md text-black/50 md:text-white/50 text-lg">
              We don't just manage accounts; we build empires. Our services are designed to cover every aspect of your digital presence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="p-8 bg-black/5 md:bg-white/5 border border-black/5 md:border-white/10 rounded-3xl hover:bg-black/10 md:hover:bg-white/10 transition-all group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-8 shadow-lg shadow-black/20`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">{service.title}</h3>
                <p className="text-black/50 md:text-white/50 leading-relaxed mb-8">
                  {service.description}
                </p>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <ChevronRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="py-32 bg-neutral-50 md:bg-[#050505] text-black md:text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-24">
            <span className="text-[10px] uppercase tracking-[0.3em] text-black/40 md:text-white/40 mb-4 block">The Process</span>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase">How We <br />Work</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {workflow.map((item, index) => (
              <div key={index} className="relative">
                <span className="text-8xl font-black text-black/5 md:text-white/5 absolute -top-12 -left-4 select-none">
                  {item.step}
                </span>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight flex items-center gap-3">
                    <span className="w-8 h-px bg-black/20 md:bg-white/20" />
                    {item.title}
                  </h3>
                  <p className="text-black/60 md:text-white/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Boss AI Teaser Section */}
      <section className="py-24 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-radial-gradient from-blue-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="bg-gradient-to-r from-blue-950/40 to-purple-950/40 border border-blue-500/20 rounded-[40px] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl text-left">
              <span className="text-[10px] uppercase tracking-[0.3em] text-blue-400 font-bold mb-4 block">Interactive Tool</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6">Boss AI Marketing Planner</h2>
              <p className="text-white/70 text-lg font-light leading-relaxed mb-8">
                Want to know how to split your marketing budget between Facebook and Instagram? Take our quick 5-step quiz and let Boss AI generate your personalized roadmap and budget plan instantly.
              </p>
              <Link to="/boss-ai" className="group px-8 py-4 bg-blue-500 text-white font-bold uppercase tracking-widest text-xs rounded-full inline-flex items-center gap-3 hover:bg-blue-600 transition-all">
                Launch Boss AI Strategist
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            {/* Interactive simulation visual */}
            <div className="w-full lg:max-w-md bg-[#050505] border border-white/10 rounded-3xl p-8 space-y-6 relative text-left">
              <div className="absolute -top-4 -right-3 bg-blue-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 animate-spin" /> Live Simulation
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs opacity-60 font-mono">
                  <span>BUDGET SPLIT SIMULATOR</span>
                  <span className="text-blue-400">OPTIMIZED</span>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-bold uppercase mb-1">
                      <span>Facebook Ads</span>
                      <span>60%</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-[60%] h-full bg-[#1877F2]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold uppercase mb-1">
                      <span>Instagram Ads</span>
                      <span>40%</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-[40%] h-full bg-gradient-to-r from-[#F77737] to-[#C13584]" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-white/5 pt-4 flex justify-between items-center text-xs">
                <div>
                  <span className="opacity-40 block text-[9px] tracking-wider uppercase">TARGET AUDIENCE</span>
                  <span className="font-bold">Karachi Shoppers</span>
                </div>
                <div className="text-right">
                  <span className="opacity-40 block text-[9px] tracking-wider uppercase">EST. ROAS</span>
                  <span className="font-bold text-emerald-400 font-mono">3.8x - 4.5x</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-32 bg-white md:bg-[#050505] text-black md:text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-[10px] uppercase tracking-[0.3em] text-black/40 md:text-white/40 mb-4 block">Success Stories</span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase">Client Reviews</h2>
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
                review: "Amazing experience working with them. Their creative approach to content creation helped our brand stand out in a crowded market. Highly recommended!",
                role: "Creative Director"
              },
              {
                name: "Bilal Ahmed",
                review: "Best performance marketing agency. They don't just spend your budget; they invest it to get the best ROI. Our sales have doubled since we started working with them.",
                role: "E-commerce Specialist"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-10 border border-black/10 md:border-white/10 rounded-3xl bg-neutral-50 md:bg-white/5"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-black md:fill-white" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-lg italic mb-8 text-black/80 md:text-white/80 leading-relaxed">
                  "{testimonial.review}"
                </p>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-black/40 md:text-white/40 uppercase tracking-widest mt-1">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-white md:bg-[#050505] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-black/5 md:bg-white/5 -skew-x-12 translate-x-1/4 z-0" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-black/40 md:text-white/40 mb-4 block">About Us</span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-8">
                The Boss <br />Mindset
              </h2>
              <p className="text-xl text-black/60 md:text-white/60 font-light leading-relaxed mb-8">
                Based in the heart of Karachi, The Boss Marketers was founded on a simple principle: results over promises. We saw a gap in the market for a marketing agency that truly understands the local landscape while applying global standards.
              </p>
              <div className="space-y-4">
                {[
                  "Data-Driven Strategies",
                  "Creative Excellence",
                  "Local Market Expertise",
                  "Unwavering Commitment"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-black/80 md:text-white/80">
                    <CheckCircle2 className="w-5 h-5 text-black md:text-white" />
                    <span className="font-medium uppercase tracking-widest text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square"
            >
              <div className="absolute inset-0 border border-black/10 md:border-white/10 rounded-full animate-pulse" />
              <div className="absolute inset-4 border border-black/5 md:border-white/5 rounded-full" />
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                className="w-full h-full object-cover rounded-full p-8"
                alt="Team working"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-10 right-10 bg-black md:bg-white text-white md:text-black p-8 rounded-2xl shadow-2xl">
                <span className="text-5xl font-bold block mb-1">1.9K+</span>
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">Happy Clients</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-neutral-50 md:bg-[#050505] text-black md:text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase mb-12">
            Ready to <br />Scale?
          </h2>
          <p className="text-xl text-black/60 md:text-white/60 mb-12 max-w-2xl mx-auto">
            Join the ranks of successful businesses that have transformed their digital presence with The Boss Marketers.
          </p>
          <a 
            href="https://wa.me/923150229035"
            target="_blank"
            rel="noopener noreferrer"
            className="px-12 py-6 bg-black md:bg-white text-white md:text-black font-bold uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-all inline-block"
          >
            Contact Us Today
          </a>
        </div>
      </section>
    </>
  );
}

export default function App() {
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
    <div className="min-h-screen bg-white md:bg-[#050505] text-black md:text-white font-sans selection:bg-black md:selection:bg-white selection:text-white md:selection:text-black transition-colors duration-700">
      <ScrollToTop />
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled || !isHome ? 'bg-white/80 md:bg-black/80 backdrop-blur-md py-4 border-b border-black/5 md:border-white/10' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src={LOGO_URL} 
              alt="The Boss Marketers Logo" 
              className="w-10 h-10 rounded-full border border-black/10 md:border-white/20"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://picsum.photos/seed/boss/100/100";
              }}
            />
            <span className="text-xl font-bold tracking-tighter uppercase italic">The Boss Marketers</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {isHome ? (
              ['Services', 'Workflow', 'Reviews', 'About', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
                >
                  {item}
                </a>
              ))
            ) : (
              <Link to="/" className="text-sm font-medium uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
                Home
              </Link>
            )}
            <Link to="/boss-ai" className="text-sm font-bold uppercase tracking-widest text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1">
              <Sparkles className="w-4 h-4 animate-pulse" /> Boss AI
            </Link>
            <a 
              href="https://wa.me/923150229035"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-black md:bg-white text-white md:text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-opacity-90 transition-all"
            >
              Get Started
            </a>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu className={scrolled || !isHome ? 'text-black md:text-white' : 'text-white'} />}
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
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8">
              {isHome ? (
                ['Services', 'Workflow', 'Reviews', 'About', 'Contact'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-4xl font-bold uppercase tracking-tighter text-black"
                  >
                    {item}
                  </a>
                ))
              ) : (
                <Link 
                  to="/" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl font-bold uppercase tracking-tighter text-black"
                >
                  Home
                </Link>
              )}
              <Link 
                to="/boss-ai" 
                onClick={() => setIsMenuOpen(false)}
                className="text-4xl font-black uppercase tracking-tighter text-blue-600 flex items-center gap-2"
              >
                Boss AI <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-bold">NEW</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/boss-ai" element={<BossAI />} />
      </Routes>

      {/* Footer */}
      <footer id="contact" className="py-20 bg-white md:bg-[#050505] border-t border-black/5 md:border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <img 
                  src={LOGO_URL} 
                  alt="Logo" 
                  className="w-10 h-10 rounded-full"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://picsum.photos/seed/boss/100/100";
                  }}
                />
                <span className="text-2xl font-bold tracking-tighter uppercase italic text-black md:text-white">The Boss Marketers</span>
              </div>
              <p className="text-black/40 md:text-white/40 max-w-sm mb-8">
                Empowering businesses in Karachi and beyond through strategic social media marketing and creative excellence.
              </p>
              <div className="flex gap-4">
                {[
                  { Icon: Facebook, href: "https://www.facebook.com/thebossmarketers" },
                  { Icon: Instagram, href: "https://www.instagram.com/thebossmarketers" },
                  { Icon: Mail, href: "mailto:info@thebossmarketers.site" }
                ].map((social, i) => (
                  <a 
                    key={i} 
                    href={social.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-black/10 md:border-white/10 flex items-center justify-center hover:bg-black md:hover:bg-white hover:text-white md:hover:text-black transition-all text-black md:text-white"
                  >
                    <social.Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-8 text-black/40 md:text-white/40">Contact</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-black/40 md:text-white/40" />
                  <span className="text-sm text-black/60 md:text-white/60">d_16 Block 07 Gulshan E Iqbal Karachi</span>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-black/40 md:text-white/40" />
                  <span className="text-sm text-black/60 md:text-white/60">info@thebossmarketers.site</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-8 text-black/40 md:text-white/40">Quick Links</h4>
              <div className="flex flex-col gap-4">
                {['Services', 'Workflow', 'About'].map((item) => (
                  <a key={item} href={isHome ? `#${item.toLowerCase()}` : `/#${item.toLowerCase()}`} className="text-sm text-black/60 md:text-white/60 hover:text-black md:hover:text-white transition-colors uppercase tracking-widest">
                    {item}
                  </a>
                ))}
                <Link to="/boss-ai" className="text-sm text-blue-500 font-bold hover:text-blue-600 transition-colors uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Boss AI (New)
                </Link>
                <Link to="/privacy-policy" className="text-sm text-black/60 md:text-white/60 hover:text-black md:hover:text-white transition-colors uppercase tracking-widest">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-black/5 md:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] uppercase tracking-widest text-black/20 md:text-white/20">
              © {new Date().getFullYear()} The Boss Marketers. All rights reserved.
            </p>
            <p className="text-[10px] uppercase tracking-widest text-black/20 md:text-white/20">
              Designed for Excellence
            </p>
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
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl shadow-green-500/20 group"
      >
        <svg 
          viewBox="0 0 24 24" 
          className="w-8 h-8 fill-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span className="absolute right-full mr-4 bg-white text-black text-xs font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
          Chat with us
        </span>
      </motion.a>
    </div>
  );
}
