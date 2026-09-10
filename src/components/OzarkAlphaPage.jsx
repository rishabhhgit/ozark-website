import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Shield, Cpu, Monitor, Eye, Zap, Globe, Key, ArrowRight, CheckCircle, Server, Camera, Send, Keyboard, Settings, Copy, ChevronDown, Sparkles } from "lucide-react";
import { prefersReducedMotion, isTouchDevice, createRipple } from "@/lib/motion";
import { DOWNLOAD_URL } from "@/lib/config";
import { FOOTER_LINKS } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

// ── Chat Demo Component ──
function ChatDemo() {
  const [messages] = useState([
    { role: "user", text: "Solve: Sliding Window Maximum — given array nums and window size k, return max in each window." },
    { role: "ai", text: "Using a monotonic deque for O(N) time complexity.", code: `function maxSlidingWindow(nums, k) {
  const deque = [], result = [];
  for (let i = 0; i < nums.length; i++) {
    while (deque.length && deque[0] < i - k + 1) deque.shift();
    while (deque.length && nums[deque[deque.length - 1]] <= nums[i]) deque.pop();
    deque.push(i);
    if (i >= k - 1) result.push(nums[deque[0]]);
  }
  return result;
}`, complexity: "O(N)", latency: "0.24s" },
  ]);

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm overflow-hidden shadow-2xl max-w-[600px] mx-auto">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded">GPT-4o</span>
          <span className="flex items-center gap-1 text-[10px] text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Ready
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Settings size={13} className="text-sub/50" />
        </div>
      </div>
      <div className="p-4 space-y-4 custom-scrollbar max-h-[320px] overflow-y-auto">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.3 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[85%] rounded-xl px-4 py-3 ${msg.role === "user" ? "bg-accent/15 border border-accent/20" : "bg-white/[0.04] border border-white/[0.06]"}`}>
                <p className="text-[13px] text-ink/90 leading-relaxed">{msg.text}</p>
                {msg.code && (
                  <div className="mt-3 rounded-lg bg-[#0d0d10] border border-white/[0.06] overflow-hidden">
                    <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/[0.04]">
                      <span className="text-[10px] text-sub/50 font-mono">solution.js</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] text-accent/70 bg-accent/10 px-1.5 py-0.5 rounded font-mono">{msg.complexity}</span>
                        <span className="text-[9px] text-green-400/70 bg-green-400/10 px-1.5 py-0.5 rounded font-mono">{msg.latency}</span>
                      </div>
                    </div>
                    <pre className="p-3 text-[12px] font-mono text-ink/80 leading-relaxed overflow-x-auto"><code>{msg.code}</code></pre>
                  </div>
                )}
                {msg.role === "ai" && (
                  <div className="flex items-center gap-2 mt-2">
                    <button className="flex items-center gap-1 text-[10px] text-sub/50 hover:text-accent transition-colors"><Copy size={10} /> Copy</button>
                    <button className="flex items-center gap-1 text-[10px] text-sub/50 hover:text-accent transition-colors"><Send size={10} /> AutoType</button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="px-4 py-2.5 border-t border-white/[0.06] flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2 rounded-lg bg-white/[0.03] border border-white/[0.06] px-3 py-2">
          <input type="text" placeholder="Ask anything..." className="flex-1 bg-transparent text-[13px] text-ink placeholder:text-sub/30 outline-none" readOnly />
          <span className="text-[10px] text-sub/30 font-mono">Ctrl+Enter</span>
        </div>
        <Camera size={16} className="text-sub/40" />
      </div>
      <div className="px-4 pb-2.5">
        <p className="text-[10px] text-sub/30 text-center">AI can make mistakes. Check important info.</p>
      </div>
    </div>
  );
}

// ── Hero Section ──
function AlphaHero() {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo(badgeRef.current, { opacity: 0, y: 20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" }, 0);
      const headingChars = headingRef.current?.querySelectorAll(".char");
      if (headingChars?.length) {
        gsap.set(headingChars, { opacity: 0, y: 40, rotationX: -40 });
        tl.to(headingChars, { opacity: 1, y: 0, rotationX: 0, duration: 0.5, stagger: 0.012, ease: "power3.out" }, 0.3);
      }
      tl.fromTo(subtitleRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.8);
      const ctaButtons = ctaRef.current?.children;
      if (ctaButtons?.length) {
        tl.fromTo(ctaButtons, { opacity: 0, y: 20, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12, ease: "back.out(1.4)" }, 1);
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const splitText = (text) => text.split(" ").map((word, wi) => (
    <span key={wi} className="inline-block whitespace-nowrap">
      {word.split("").map((char, ci) => (
        <span key={ci} className="char inline-block" style={{ perspective: "400px" }}>{char}</span>
      ))}
      {wi < text.split(" ").length - 1 && <span className="char inline-block" style={{ perspective: "400px" }}>{"\u00A0"}</span>}
    </span>
  ));

  return (
    <section ref={sectionRef} className="relative mx-auto max-w-[1400px] px-6 sm:px-10 pt-28 sm:pt-36 md:pt-44 pb-12 md:pb-16 overflow-hidden">
      <div className="absolute top-0 right-[10%] w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(196,48,48,0.06) 0%, transparent 70%)", filter: "blur(100px)" }} />
      <div className="absolute bottom-0 left-[5%] w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(196,48,48,0.04) 0%, transparent 70%)", filter: "blur(80px)" }} />

      <div className="relative z-10 grid items-center gap-12 lg:grid-cols-[1fr_600px] lg:gap-16">
        <div>
          <div ref={badgeRef} className="mb-6 sm:mb-8 inline-flex items-center gap-2 rounded-full border border-border/50 bg-bg/80 px-4 py-2 sm:px-5 sm:py-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-accent backdrop-blur-sm" style={{ opacity: 0 }}>
            <Sparkles size={13} className="text-accent" />
            Presenting Ozark Alpha
          </div>
          <h1 ref={headingRef} className="mb-6 sm:mb-8 text-[32px] sm:text-[40px] md:text-[52px] lg:text-[64px] font-bold leading-[1.05] tracking-tight">
            {splitText("The invisible AI copilot")}
            <br />
            <span className="text-ink/30">{splitText("for online assessments.")}</span>
          </h1>
          <p ref={subtitleRef} className="mb-8 sm:mb-10 max-w-[520px] text-[16px] sm:text-[18px] lg:text-[20px] leading-relaxed text-sub" style={{ opacity: 0 }}>
            Ace every online assessment and interview — from HackerRank and Mercer Mettl to SEB and Safe Exam Browser. Ozark sits discreetly beside your screen, ready to assist when you need it.
          </p>
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4 sm:gap-5">
            <a href={DOWNLOAD_URL} className="ghs-btn-primary inline-flex items-center gap-3 rounded-xl bg-accent px-7 py-3.5 sm:px-8 sm:py-4 text-[14px] sm:text-[16px] font-semibold text-white shadow-premium relative overflow-hidden transition-all duration-300 hover:scale-105" style={{ opacity: 0 }} data-cursor="magnetic">
              <Download size={18} strokeWidth={2.5} />
              Download for Windows 11
            </a>
            <a href="/ozark" className="ghs-btn-ghost flex items-center gap-1.5 rounded-xl px-5 py-3.5 text-[14px] sm:text-[16px] font-semibold text-sub hover:text-ink transition-all duration-300 hover:scale-105" style={{ opacity: 0 }} data-cursor="expand">
              Explore Features <ArrowRight size={16} />
            </a>
          </div>
        </div>
        <div className="hidden lg:block">
          <ChatDemo />
        </div>
      </div>
    </section>
  );
}

// ── What Is Ozark Section ──
function WhatIsOzark() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const children = contentRef.current?.children;
      if (children) {
        gsap.fromTo(children, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" } });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-10 md:py-16 overflow-hidden">
      <div className="mx-auto max-w-[1000px] px-6 sm:px-10">
        <div ref={contentRef} className="text-center">
          <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block mb-3">What is Ozark?</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink mb-6">A copilot that never gets in your way</h2>
          <p className="mx-auto max-w-[65ch] text-[16px] sm:text-[18px] leading-relaxed text-sub mb-6">
            Ozark Alpha is a lightweight desktop application that integrates advanced AI models directly into your workflow. It appears as a subtle overlay you can position anywhere on your screen — ready to assist you when you need it. Unlike traditional chat applications, Ozark is designed to be <span className="text-ink/80 font-medium">invisible to screen-sharing and monitoring tools</span>, so it never interferes with your test environment.
          </p>
          <p className="mx-auto max-w-[50ch] text-[18px] sm:text-[20px] leading-relaxed text-ink/80 font-medium italic">
            Think of it as your personal AI co-pilot — always available, never distracting.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Supported Platforms Section ──
function SupportedPlatforms() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const platforms = [
    { name: "HackerRank", tag: "HRB", description: "Bypass proctoring with invisible AI assistance. AutoType answers directly into the editor.", color: "#1BA94C" },
    { name: "Mercer Mettl", tag: "MSB", description: "Full stealth overlay that stays hidden from Mettl's screen recording and browser lockdown.", color: "#E44D26" },
    { name: "Safe Exam Browser", tag: "SEB", description: "Invisible to SEB's lockdown mode. Ozark runs outside the exam browser's monitoring scope.", color: "#2563EB" },
    { name: "All Platforms", tag: "∞", description: "Works with any online assessment platform — LeetCode, Codeforces, custom portals, and more.", color: "#8B5CF6" },
  ];

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".platform-card");
      if (cards) {
        cards.forEach((card, i) => {
          gsap.fromTo(card, { opacity: 0, y: 40, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, delay: i * 0.1, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none none" } });
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-10 md:py-16 overflow-hidden">
      <div className="absolute top-[20%] left-[5%] w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(196,48,48,0.04) 0%, transparent 70%)", filter: "blur(80px)" }} />
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
        <div className="text-center mb-10">
          <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block mb-3">Supported Platforms</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink">Built for every assessment</h2>
        </div>
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {platforms.map((p) => (
            <div key={p.name} className="platform-card group rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6 transition-all duration-300 hover:border-white/[0.15] hover:shadow-lg hover:-translate-y-1" style={{ opacity: 0 }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                  <span className="text-[14px] font-bold text-ink">{p.name}</span>
                </div>
                <span className="text-[10px] font-bold text-accent bg-accent/10 border border-accent/20 rounded-full px-2 py-0.5">{p.tag}</span>
              </div>
              <p className="text-[13px] text-sub leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Why We Built Section ──
function WhyWeBuilt() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const children = contentRef.current?.children;
      if (children) {
        gsap.fromTo(children, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" } });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const reasons = [
    { icon: Zap, title: "Instant AI-powered suggestions", desc: "Get real-time help with coding problems, system design, and debugging across HackerRank, Mettl, and SEB." },
    { icon: Monitor, title: "Seamless workflow integration", desc: "No need to switch windows or applications — Ozark works right where you are, overlaying your assessment." },
    { icon: Shield, title: "Discreet operation", desc: "Respects your test environment. Invisible to proctoring software, screen recorders, and browser lockdowns." },
  ];

  return (
    <section ref={sectionRef} className="relative py-10 md:py-16 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block mb-3">Our Mission</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink mb-6">Why We Built Ozark</h2>
            <p className="text-[16px] leading-relaxed text-sub mb-6">
              Online assessments and technical interviews can be stressful. You might know the answer but struggle with time pressure, syntax, or edge cases. Ozark helps you stay focused and confident by providing:
            </p>
          </div>
          <div className="space-y-4">
            {reasons.map((r) => {
              const Icon = r.icon;
              return (
                <div key={r.title} className="flex items-start gap-4 rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-5 transition-all duration-300 hover:border-white/[0.15] hover:shadow-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 border border-accent/20 flex-shrink-0">
                    <Icon size={18} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-ink mb-1">{r.title}</h3>
                    <p className="text-[14px] text-sub leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-10 rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6 text-center">
          <p className="text-[16px] sm:text-[18px] leading-relaxed text-sub italic max-w-[60ch] mx-auto">
            "We believe that technology should empower engineers, not hinder them. Ozark is our answer to the growing demand for real-time, intelligent assistance during high-stakes assessments."
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Key Features Section ──
function KeyFeatures() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const features = [
    { icon: Eye, title: "Invisible Overlay", description: "A sleek, transparent overlay hidden from screen-capture and proctoring software. Use it without detection.", details: ["Hidden from screen-capture tools", "Invisible to proctoring software", "Position anywhere on screen", "Zero DOM elements captured"] },
    { icon: Cpu, title: "Multi-Model AI Support", description: "Connect to OpenAI, Anthropic, Gemini, Mistral, Groq, or local Ollama models.", details: ["8 built-in providers", "Custom OpenAI-compatible endpoints", "Local Ollama support", "Instant model switching"] },
    { icon: Keyboard, title: "Hotkey-Driven Workflow", description: "Control everything with intuitive hotkeys — capture screenshots, send prompts, toggle overlay.", details: ["Global hotkeys work anywhere", "Ctrl+Shift+Space for screenshots", "Alt+I to focus input", "F9/F10 for AutoType"] },
    { icon: Camera, title: "Screenshot Analysis", description: "Capture your screen and send it to the AI for analysis. Perfect for debugging UI issues or diagrams.", details: ["Self-exclusion from captures", "Multi-screenshot support", "Visual problem analysis", "Works in Dynamic Island"] },
    { icon: Send, title: "Auto-Typing", description: "AI answers are typed directly into the active application — no copy-paste required.", details: ["Human-like typing simulation", "Random delays between keystrokes", "Respects special characters", "Works in any text field"] },
    { icon: Shield, title: "Privacy First", description: "No server-side storage. All AI requests go directly from your machine to your chosen provider.", details: ["Local API key encryption", "Zero telemetry tracking", "No cloud sync required", "Your data stays yours"] },
  ];

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".feature-card");
      if (cards) {
        cards.forEach((card, i) => {
          gsap.fromTo(card, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" } });
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-10 md:py-16 overflow-hidden">
      <div className="absolute top-[30%] right-[5%] w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(196,48,48,0.04) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
        <div className="text-center mb-10">
          <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block mb-3">Key Features</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink md:text-5xl">Everything you need to succeed</h2>
          <p className="mx-auto mt-4 max-w-[55ch] text-[16px] leading-relaxed text-sub">Powerful features wrapped in a clean, distraction-free interface designed for high-stakes assessments.</p>
        </div>
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="feature-card rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6 transition-all duration-300 hover:border-white/[0.15] hover:shadow-lg hover:-translate-y-1 group" style={{ opacity: 0 }}>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 mb-4 transition-all duration-300 group-hover:bg-accent/15 group-hover:scale-110">
                  <Icon size={20} className="text-accent" />
                </div>
                <h3 className="text-[16px] font-bold text-ink mb-2">{f.title}</h3>
                <p className="text-[13px] leading-relaxed text-sub mb-4">{f.description}</p>
                <ul className="space-y-1.5">
                  {f.details.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-[12px] text-sub">
                      <CheckCircle size={12} className="text-accent mt-0.5 flex-shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── How It Works Section ──
function HowItWorks() {
  const sectionRef = useRef(null);
  const stepsRef = useRef(null);

  const steps = [
    { step: "01", title: "Download & Install", body: "Single executable, no installation wizard. Double-click to run. Works on Windows 10/11 with .NET 6+ runtime.", icon: Download },
    { step: "02", title: "Add Your API Keys", body: "Enter keys for OpenAI, Anthropic, Gemini, or any supported provider. Keys are stored locally and never leave your machine.", icon: Key },
    { step: "03", title: "Ask Anything", body: "Type questions, capture screenshots, or use the Dynamic Island. Ozark connects to the best model for your task.", icon: Sparkles },
    { step: "04", title: "Stay Invisible", body: "Enable Stealth Mode or Disguise Mode. The AI stays hidden from screen capture, screen sharing, and proctoring software.", icon: Shield },
  ];

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const cards = stepsRef.current?.querySelectorAll(".step-card");
      if (cards) {
        cards.forEach((card, i) => {
          gsap.fromTo(card, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, delay: i * 0.15, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" } });
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-10 md:py-16 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
        <div className="text-center mb-10">
          <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block mb-3">Simple Setup</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink md:text-5xl">Up and running in 60 seconds</h2>
          <p className="mx-auto mt-4 max-w-[50ch] text-[16px] sm:text-[18px] leading-relaxed text-sub">No accounts, no installation wizards, no cloud sync. Just download, add your keys, and start asking.</p>
        </div>
        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.step} className="step-card relative group rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-7 transition-all duration-300 hover:border-white/[0.15] hover:shadow-lg" style={{ opacity: 0 }}>
                <div className="absolute -top-3 -left-1 text-[64px] font-bold text-accent/[0.07] leading-none select-none">{s.step}</div>
                <div className="relative mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 transition-all duration-300 group-hover:bg-accent/15 group-hover:scale-110">
                  <Icon size={20} className="text-accent" />
                </div>
                <h3 className="mb-3 text-[16px] font-bold text-ink">{s.title}</h3>
                <p className="text-[13px] leading-relaxed text-sub">{s.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Interactive Demo Section ──
function InteractiveDemo() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const children = contentRef.current?.children;
      if (children) {
        gsap.fromTo(children, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" } });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-10 md:py-16 overflow-hidden">
      <div className="mx-auto max-w-[1000px] px-6 sm:px-10">
        <div ref={contentRef}>
          <div className="text-center mb-8">
            <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block mb-3">Interactive Demo</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink">See it in action</h2>
            <p className="mx-auto mt-4 max-w-[50ch] text-[16px] leading-relaxed text-sub">Real-time AI responses with syntax highlighting, complexity analysis, and one-click AutoType.</p>
          </div>
          <ChatDemo />
        </div>
      </div>
    </section>
  );
}

// ── Use Cases Section ──
function UseCases() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const cases = [
    { title: "Coding Assessments", description: "Get instant help with algorithms, data structures, and syntax on HackerRank, LeetCode, and Codeforces.", icon: Cpu },
    { title: "System Design Interviews", description: "Receive real-time suggestions for architecture, trade-offs, and scalability.", icon: Server },
    { title: "Debugging", description: "Analyse error messages and stack traces without leaving your IDE.", icon: Monitor },
    { title: "Learning", description: "Understand complex concepts with AI-generated explanations and examples.", icon: Globe },
  ];

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll(".use-case-item");
      if (items) {
        items.forEach((item, i) => {
          gsap.fromTo(item, { opacity: 0, x: i % 2 === 0 ? -40 : 40 }, { opacity: 1, x: 0, duration: 0.7, delay: i * 0.1, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 88%", toggleActions: "play none none none" } });
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-10 md:py-16 overflow-hidden">
      <div className="mx-auto max-w-[1000px] px-6 sm:px-10">
        <div className="text-center mb-10">
          <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block mb-3">Use Cases</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink">How Engineers Use Ozark</h2>
        </div>
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cases.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.title} className="use-case-item rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6 transition-all duration-300 hover:border-white/[0.15] hover:shadow-md" style={{ opacity: 0 }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 border border-accent/20">
                    <Icon size={18} className="text-accent" />
                  </div>
                  <h3 className="text-[16px] font-bold text-ink">{c.title}</h3>
                </div>
                <p className="text-[14px] leading-relaxed text-sub">{c.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Why Different Section ──
function WhyDifferent() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const children = contentRef.current?.children;
      if (children) {
        gsap.fromTo(children, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" } });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-10 md:py-16 overflow-hidden">
      <div className="mx-auto max-w-[1000px] px-6 sm:px-10">
        <div ref={contentRef} className="text-center">
          <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block mb-3">The Ozark Difference</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink mb-6">Why Ozark is Different</h2>
          <p className="mx-auto max-w-[65ch] text-[16px] sm:text-[18px] leading-relaxed text-sub mb-8">
            Most AI tools require you to switch windows, copy-paste questions, and then manually apply the answers. Ozark streamlines this entire loop. It stays out of your way, works invisibly, and integrates directly into your existing environment. The result is a smoother, faster, and more confident test-taking experience.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[800px] mx-auto">
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-5 text-center hover:border-white/[0.15] transition-all duration-300">
              <div className="text-2xl font-bold text-accent mb-1">0</div>
              <div className="text-[13px] text-sub">Windows to switch</div>
            </div>
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-5 text-center hover:border-white/[0.15] transition-all duration-300">
              <div className="text-2xl font-bold text-accent mb-1">100%</div>
              <div className="text-[13px] text-sub">Invisible to proctors</div>
            </div>
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-5 text-center hover:border-white/[0.15] transition-all duration-300">
              <div className="text-2xl font-bold text-accent mb-1">∞</div>
              <div className="text-[13px] text-sub">AI models supported</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── CTA Section ──
function ClosingCTA() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current, { opacity: 0, y: 60, rotateX: 8, scale: 0.94 }, { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: cardRef.current, start: "top 88%", toggleActions: "play none none none" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleBtnClick = (e) => createRipple(e, btnRef.current);

  return (
    <section ref={sectionRef} className="relative mx-auto max-w-[1200px] px-6 sm:px-10 pb-16 pt-10 overflow-hidden">
      <div ref={cardRef} className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] px-8 py-10 text-center shadow-2xl sm:px-12 sm:py-14 md:py-16" style={{ opacity: 0 }}>
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent">Get Started Instantly</span>
        <h2 className="mt-4 mb-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">Ready to ace your next technical round?</h2>
        <p className="mx-auto mb-8 max-w-[55ch] text-[16px] sm:text-[18px] leading-relaxed text-sub">Free to download. No accounts, no data leaves your machine. Works with HackerRank, Mercer Mettl, SEB, and every major platform.</p>
        <a ref={btnRef} href={DOWNLOAD_URL} onClick={handleBtnClick} className="ghs-btn-primary inline-flex items-center gap-3 rounded-xl bg-accent px-8 py-4 text-[15px] sm:text-[17px] font-semibold text-white shadow-premium relative overflow-hidden transition-all duration-300 hover:scale-105" data-cursor="magnetic" data-cursor-text="Download">
          <Download size={18} strokeWidth={2.5} />
          Download for <span className="text-white font-bold">Windows 11</span>
        </a>
      </div>
    </section>
  );
}

// ── Future Section ──
function FutureSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const children = contentRef.current?.children;
      if (children) {
        gsap.fromTo(children, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none none" } });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-10 md:py-14 overflow-hidden">
      <div className="mx-auto max-w-[800px] px-6 sm:px-10">
        <div ref={contentRef} className="text-center">
          <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block mb-3">What's Next</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink mb-6">The Future of Ozark</h2>
          <p className="text-[16px] leading-relaxed text-sub mb-6">
            We're constantly improving Ozark with new features, better AI integrations, and enhanced stealth capabilities. Our mission is to empower engineers worldwide with intelligent, unobtrusive assistance that helps them perform at their best.
          </p>
          <p className="text-[18px] font-medium text-ink/80 italic">Stay tuned for updates, and happy coding!</p>
        </div>
      </div>
    </section>
  );
}

// ── Footer ──
function AlphaFooter() {
  const footerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const children = contentRef.current?.children;
      if (children) {
        gsap.fromTo(children, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: footerRef.current, start: "top 95%", toggleActions: "play none none none" } });
      }
      const logo = footerRef.current?.querySelector(".footer-logo");
      if (logo) {
        gsap.to(logo, { y: -3, duration: 2.5, ease: "sine.inOut", yoyo: true, repeat: -1 });
      }
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="border-t border-border/30 relative z-10">
      <div ref={contentRef} className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 px-6 sm:px-8 py-10 md:flex-row">
        <div className="flex items-center gap-2.5 footer-logo" style={{ opacity: 0 }}>
          <img src="/eyes-logo.png" alt="Ozark" className="h-8 w-8 object-contain" />
          <span className="text-xs font-semibold tracking-tight text-ink">Ozark</span>
          <span className="text-[10px] font-medium text-sub/70">&copy; {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-8" style={{ opacity: 0 }}>
          <a href={DOWNLOAD_URL} className="underline-reveal text-[13px] font-semibold text-sub hover:text-ink transition-colors">Download for Windows 11</a>
          {FOOTER_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="underline-reveal text-[13px] font-semibold text-sub hover:text-ink transition-colors">{link.label}</a>
          ))}
        </div>
        <div className="text-[11.5px] font-medium text-sub/65" style={{ opacity: 0 }}>Your keys. Your code. Your machine.</div>
      </div>
    </footer>
  );
}

// ── Exported Wrapper ──
export default function OzarkAlphaPage() {
  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AlphaHero />
      <div className="lg:hidden px-6 pb-10"><ChatDemo /></div>
      <WhatIsOzark />
      <SupportedPlatforms />
      <WhyWeBuilt />
      <KeyFeatures />
      <HowItWorks />
      <InteractiveDemo />
      <UseCases />
      <WhyDifferent />
      <ClosingCTA />
      <FutureSection />
      <AlphaFooter />
    </>
  );
}
