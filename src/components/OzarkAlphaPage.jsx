import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Shield, Cpu, Monitor, Eye, Zap, Globe, Key, ArrowRight, CheckCircle, Server, Camera, Send, Keyboard, Settings, Copy, Sparkles, IndianRupee, Mic } from "lucide-react";
import { prefersReducedMotion, createRipple } from "@/lib/motion";
import { DOWNLOAD_URL } from "@/lib/config";
import { FOOTER_LINKS } from "@/lib/data";
import FeatureSection from "@/components/FeatureSection";

gsap.registerPlugin(ScrollTrigger);

const ALPHA_DOWNLOAD_URL = "#"; // TODO: Update with real Ozark Alpha download link

const ALPHA_FEATURES = [
  { eyebrow: "DYNAMIC ISLAND", title: "Floating AI that stays out of your way", body: "A compact, always-on-top bar that hovers over any application. Type a question, get an answer, and never lose context. Works silently over HackerRank, Mercer Mettl, and SEB.", kind: "island", reverse: false },
  { eyebrow: "STEALTH OVERLAY", title: "Invisible to screen sharing", body: "A tiny, cursor-following text layer powered by Windows GDI that is completely hidden from screen-sharing software and proctoring tools. Ask questions during your assessment without anyone knowing.", kind: "stealth", reverse: true },
  { eyebrow: "SCREENSHOT ANALYSIS", title: "Capture, ask, solve", body: "Press Ctrl+Shift+Space to capture your screen. The AI sees exactly what you see — coding problems, diagrams, system designs. Ask it to solve, explain, or optimize anything in the screenshot.", kind: "screenshot", reverse: false },
  { eyebrow: "AUTOTYPE", title: "Let the AI type for you", body: "AutoType simulates human typing with random delays directly into any text field. Press F9 to start, F10 to stop. Perfect for HackerRank and Mettl coding challenges.", kind: "autotype", reverse: true },
  { eyebrow: "CODE MODE", title: "Optimized for competitive programming", body: "Specialized prompts detect your coding platform, identify algorithmic patterns (DP, greedy, graph), state optimal complexity, and produce clean, well-commented code with self-checks for edge cases.", kind: "code", reverse: false },
  { eyebrow: "MULTI-MODEL INTELLIGENCE", title: "The best models, one shortcut away", body: "Switch instantly between OpenAI, Claude, Gemini, DeepSeek, Groq, Mistral, Ollama, or OpenRouter. Use the optimal model for algorithmic puzzles, system design, or behavioral strategies.", kind: "providers", reverse: true },
  { eyebrow: "DISGUISE MODE", title: "Hide in plain sight", body: "Press Ctrl+Shift+U to instantly morph Ozark Alpha into a realistic Windows Update screen. One hotkey transforms your AI assistant into something nobody questions.", kind: "disguise", reverse: false },
  { eyebrow: "CUSTOM SYSTEM PROMPT", title: "Define your ideal assistant", body: "Permanently add your own instructions to every AI request. 'Always answer in bullet points', 'Use TypeScript', 'Explain like I'm 5' — saved automatically, persists after restart.", kind: "prompt", reverse: true },
  { eyebrow: "ZERO TELEMETRY", title: "Absolute privacy by design", body: "No accounts, no cloud sync, and no tracking. API keys are encrypted locally and communicate directly with providers. Your prep work stays strictly on your machine.", kind: "privacy", reverse: false },
];

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
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.3 }} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
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

// ── Hero Section (matching reference: "Presenting Ozark" with counter) ──
function AlphaHero() {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const counterRef = useRef(null);

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
      // Counter animation
      if (counterRef.current) {
        gsap.fromTo(counterRef.current, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power3.out", delay: 0.8 });
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
            {splitText("The invisible AI bypass")}
            <br />
            <span className="text-ink/30">{splitText("for online assessments.")}</span>
          </h1>
          <p ref={subtitleRef} className="mb-8 sm:mb-10 max-w-[520px] text-[16px] sm:text-[18px] lg:text-[20px] leading-relaxed text-sub" style={{ opacity: 0 }}>
            Ozark Alpha sits discreetly beside your screen. Switch models instantly, stream coding solutions, and AutoType answers — completely invisible to HackerRank, Mercer Mettl, and SEB proctoring.
          </p>
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4 sm:gap-5">
            <a href={ALPHA_DOWNLOAD_URL} className="ghs-btn-primary inline-flex items-center gap-3 rounded-xl bg-accent px-7 py-3.5 sm:px-8 sm:py-4 text-[14px] sm:text-[16px] font-semibold text-white shadow-premium relative overflow-hidden transition-all duration-300 hover:scale-105" style={{ opacity: 0 }} data-cursor="magnetic">
              <Download size={18} strokeWidth={2.5} />
              Download for Windows 11
            </a>
            <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-3.5" style={{ opacity: 0 }}>
              <IndianRupee size={16} className="text-accent" />
              <span className="text-[16px] font-bold text-ink">1999</span>
              <span className="text-[13px] text-sub">/month</span>
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <ChatDemo />
        </div>
      </div>
    </section>
  );
}

// ── Feature Grid (6 cards, matching reference) ──
function FeatureGrid() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  const cards = [
    { icon: Eye, title: "Invisible Overlay", description: "Hidden from screen-capture, proctoring software, and browser lockdowns. Use it without detection on HackerRank, Mettl, and SEB." },
    { icon: Cpu, title: "Multi-Model AI Support", description: "Connect to OpenAI, Anthropic, Gemini, Mistral, Groq, or local Ollama models. Switch instantly during your assessment." },
    { icon: Keyboard, title: "Hotkey-Driven Workflow", description: "Control everything with intuitive hotkeys — capture screenshots, send prompts, toggle overlay, AutoType answers." },
    { icon: Camera, title: "Screenshot Analysis", description: "One hotkey captures the assessment question and sends it to AI. Perfect for coding problems and system design diagrams." },
    { icon: Send, title: "Auto-Typing", description: "AI answers are typed directly into the assessment — no copy-paste needed. Human-like typing that evades detection." },
    { icon: Shield, title: "Privacy First", description: "No server-side storage. All AI requests go directly from your machine to your chosen provider. Your data stays yours." },
  ];

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const headerChildren = headerRef.current?.children;
      if (headerChildren) {
        gsap.fromTo(headerChildren, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none none" } });
      }
      const line = sectionRef.current?.querySelector(".halloween-divider");
      if (line) {
        gsap.fromTo(line, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 1.5, ease: "power3.inOut", scrollTrigger: { trigger: line, start: "top 90%", toggleActions: "play none none none" } });
      }
      const featureItems = gridRef.current?.querySelectorAll(".feature-item");
      if (featureItems) {
        featureItems.forEach((item, i) => {
          gsap.fromTo(item, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.18, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none none" } });
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="relative mx-auto max-w-[1400px] px-6 sm:px-10 py-8 md:py-10 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(196,48,48,0.06) 0%, transparent 70%)", filter: "blur(80px)" }} />
      <div ref={headerRef} className="mb-6 md:mb-5 text-center">
        <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block" style={{ opacity: 0 }}>Explore Ozark Alpha Features</span>
        <h2 className="mt-2 text-4xl font-bold tracking-tight text-ink md:text-5xl lg:text-6xl" style={{ opacity: 0 }}>Everything you need to bypass</h2>
        <p className="mx-auto mt-3 max-w-[60ch] text-[16px] sm:text-[18px] leading-relaxed text-sub" style={{ opacity: 0 }}>Stealth overlay, instant AI solving, and auto-typing — all in one tool for HackerRank, Mercer Mettl, and SEB.</p>
        <div className="halloween-divider mx-auto mt-5 w-[100px]" style={{ transformOrigin: "center" }} />
      </div>
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="feature-item rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6 transition-all duration-300 hover:border-white/[0.15] hover:shadow-lg hover:-translate-y-1 group" style={{ opacity: 0 }}>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 mb-4 transition-all duration-300 group-hover:bg-accent/15 group-hover:scale-110">
                <Icon size={20} className="text-accent" />
              </div>
              <h3 className="text-[16px] font-bold text-ink mb-2">{card.title}</h3>
              <p className="text-[13px] leading-relaxed text-sub">{card.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ── Use Cases (4 cards, matching reference) ──
function UseCases() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const cases = [
    { title: "HackerRank Bypass", description: "Get instant help with algorithms, data structures, and syntax. AutoType answers directly into the HackerRank editor.", icon: Zap },
    { title: "Mercer Mettl Bypass", description: "Hidden from Mettl's screen recording, browser lockdown, and webcam monitoring. Full stealth overlay.", icon: Shield },
    { title: "Safe Exam Browser", description: "Runs outside SEB's lockdown scope. Invisible to its proctoring and tab-switch detection.", icon: Eye },
    { title: "Any Assessment", description: "Works with any online assessment platform — LeetCode, Codeforces, custom portals, and more.", icon: Globe },
  ];

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll(".use-case-item");
      if (items) {
        items.forEach((item, i) => {
          gsap.fromTo(item, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.8, delay: i * 0.1, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 88%", toggleActions: "play none none none" } });
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-6 md:py-8 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="text-center mb-6">
          <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block mb-3">Use Cases</span>
          <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">How Engineers Use Ozark Alpha</h2>
        </div>
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cases.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.title} className="use-case-item rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-5 transition-all duration-300 hover:border-white/[0.15] hover:shadow-md" style={{ opacity: 0 }}>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 border border-accent/20 mb-3">
                  <Icon size={18} className="text-accent" />
                </div>
                <h3 className="text-[15px] font-bold text-ink mb-2">{c.title}</h3>
                <p className="text-[13px] leading-relaxed text-sub">{c.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── How It Works (4 steps, matching reference) ──
function HowItWorks() {
  const sectionRef = useRef(null);
  const stepsRef = useRef(null);

  const steps = [
    { step: "01", title: "Download & Install", body: "Single executable, no installation wizard. Double-click to run. Works on Windows 10/11 with .NET 6+ runtime.", icon: Download, details: "self-contained single executable file (180 MB)" },
    { step: "02", title: "Add Your API Keys", body: "Enter keys for OpenAI, Anthropic, Gemini, or any supported provider. Keys are stored locally and never leave your machine.", icon: Key },
    { step: "03", title: "Start Your Assessment", body: "Open HackerRank, Mettl, or SEB. Ozark Alpha runs invisibly in the background. Press Ctrl+Shift+Space to capture questions.", icon: Monitor, details: "Ctrl+Enter to send, or use AutoType with F9" },
    { step: "04", title: "Stay Invisible", body: "Enable Stealth Mode or Disguise Mode. The AI stays hidden from screen capture, screen sharing, and proctoring software.", icon: Shield },
  ];

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const cards = stepsRef.current?.querySelectorAll(".step-card");
      if (cards) {
        cards.forEach((card, i) => {
          gsap.fromTo(card, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" } });
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="how-it-works" className="relative py-6 md:py-8 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="text-center mb-10 md:mb-14">
          <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block mb-3">Simple Setup</span>
          <h2 className="text-4xl font-bold tracking-tight text-ink md:text-5xl lg:text-6xl">Up and running in 60 seconds</h2>
          <p className="mx-auto mt-4 max-w-[50ch] text-[16px] sm:text-[18px] leading-relaxed text-sub">No accounts, no installation wizards, no cloud sync. Just download, add your keys, and start asking.</p>
        </div>
        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.step} className="step-card relative group rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-8 transition-all duration-300 hover:border-white/[0.15] hover:shadow-lg" style={{ opacity: 0 }}>
                <div className="absolute -top-3 -left-1 text-[64px] font-bold text-accent/[0.07] leading-none select-none">{s.step}</div>
                <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 transition-all duration-300 group-hover:bg-accent/15 group-hover:scale-110">
                  <Icon size={20} className="text-accent" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-ink">{s.title}</h3>
                <p className="text-[14px] leading-relaxed text-sub">{s.body}</p>
                {s.details && <p className="mt-2 text-[12px] text-accent/70 font-mono">{s.details}</p>}
              </div>
            );
          })}
        </div>
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm px-6 py-3">
            <span className="text-[13px] text-sub">System Requirements:</span>
            <span className="text-[13px] font-semibold text-ink">Windows 11 (64-bit)</span>
            <span className="text-border">|</span>
            <span className="text-[13px] font-semibold text-ink">.NET 6+ Runtime</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Feature Showcase (11 deep-dive sections, matching reference) ──
function FeatureShowcase() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const headerChildren = headerRef.current?.children;
      if (headerChildren) {
        gsap.fromTo(headerChildren, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none none" } });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative mx-auto max-w-[1400px] px-6 sm:px-10 py-8 md:py-10 overflow-hidden">
      <div ref={headerRef} className="mb-6 md:mb-5 text-center">
        <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block" style={{ opacity: 0 }}>Feature Deep Dive</span>
        <h2 className="mt-2 text-4xl font-bold tracking-tight text-ink md:text-5xl lg:text-6xl" style={{ opacity: 0 }}>Smart Features</h2>
        <p className="mx-auto mt-3 max-w-[60ch] text-[16px] sm:text-[18px] leading-relaxed text-sub" style={{ opacity: 0 }}>Powerful features wrapped in a clean, distraction-free interface.</p>
        <div className="halloween-divider mx-auto mt-5 w-[100px]" style={{ transformOrigin: "center" }} />
      </div>
      <div>
        {ALPHA_FEATURES.map((f, i) => (
          <div key={f.eyebrow} className="feature-item" style={{ opacity: 0 }} data-spotlight>
            <FeatureSection {...f} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Pricing Section ──
function Pricing() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current, { opacity: 0, y: 40, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: cardRef.current, start: "top 85%", toggleActions: "play none none none" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-10 md:py-16 overflow-hidden">
      <div className="mx-auto max-w-[600px] px-6 sm:px-10">
        <div ref={cardRef} className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-8 text-center shadow-2xl" style={{ opacity: 0 }}>
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
          <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block mb-2">Ozark Alpha</span>
          <h3 className="text-3xl font-bold text-ink mb-2">Monthly subscription</h3>
          <div className="flex items-center justify-center gap-1 mb-4">
            <IndianRupee size={28} className="text-accent" />
            <span className="text-5xl font-bold text-ink">1999</span>
            <span className="text-lg text-sub">/month</span>
          </div>
          <p className="text-[14px] text-sub mb-6">Cancel anytime. Access all platforms.</p>
          <ul className="space-y-3 mb-8 text-left max-w-[320px] mx-auto">
            {["HackerRank bypass", "Mercer Mettl bypass", "Safe Exam Browser bypass", "All future platforms", "Priority support"].map((item) => (
              <li key={item} className="flex items-center gap-2 text-[14px] text-sub">
                <CheckCircle size={16} className="text-accent flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <a href={ALPHA_DOWNLOAD_URL} className="ghs-btn-primary inline-flex items-center gap-3 rounded-xl bg-accent px-8 py-4 text-[16px] font-semibold text-white shadow-premium relative overflow-hidden transition-all duration-300 hover:scale-105 w-full justify-center" data-cursor="magnetic">
            <Download size={18} strokeWidth={2.5} />
            Get Ozark Alpha
          </a>
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
          <img src="/eyes-logo.png" alt="Ozark Alpha" className="h-8 w-8 object-contain" />
          <span className="text-xs font-semibold tracking-tight text-ink">Ozark Alpha</span>
          <span className="text-[10px] font-medium text-sub/70">&copy; {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-8" style={{ opacity: 0 }}>
          <a href={ALPHA_DOWNLOAD_URL} className="underline-reveal text-[13px] font-semibold text-sub hover:text-ink transition-colors">Download</a>
          {FOOTER_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="underline-reveal text-[13px] font-semibold text-sub hover:text-ink transition-colors">{link.label}</a>
          ))}
        </div>
        <div className="text-[11.5px] font-medium text-sub/65" style={{ opacity: 0 }}>Your keys. Your code. Your machine.</div>
      </div>
    </footer>
  );
}

// ── Keyboard Shortcuts ──
function Shortcuts() {
  const sectionRef = useRef(null);
  const tableRef = useRef(null);

  const shortcuts = [
    { keys: ["Ctrl", "Shift", "M"], action: "Mouse double-click (take screenshot)" },
    { keys: ["Alt", "T"], action: "Start auto-typing (pending file → overlay → last AI response)" },
    { keys: ["Esc"], action: "Stop auto-typing immediately" },
    { keys: ["Alt", "H"], action: "Toggle overlay visibility (show/hide)" },
    { keys: ["Alt", "Z"], action: "Increase window size" },
    { keys: ["Alt", "C"], action: "Decrease window size" },
    { keys: ["Alt", "I"], action: "Toggle input capture mode (type into overlay)" },
    { keys: ["Alt", "Enter"], action: "Send message from overlay input" },
    { keys: ["Alt", "S"], action: "Take screenshot" },
    { keys: ["Alt", "M"], action: "Scroll chat up" },
    { keys: ["Alt", "N"], action: "Scroll chat down" },
    { keys: ["Alt", "X"], action: "Cycle AI provider" },
    { keys: ["Alt", "B"], action: "Toggle YouTube window visibility" },
    { keys: ["Alt", "←"], action: "Move overlay left" },
    { keys: ["Alt", "→"], action: "Move overlay right" },
    { keys: ["Alt", "↑"], action: "Move overlay up" },
    { keys: ["Alt", "↓"], action: "Move overlay down" },
  ];

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      if (tableRef.current) {
        gsap.fromTo(tableRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: tableRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-[800px] px-6 md:px-10">
        <div className="text-center mb-12">
          <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block mb-3">
            Keyboard Shortcuts
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Control everything from anywhere
          </h2>
          <p className="mx-auto mt-4 max-w-[45ch] text-[15px] leading-relaxed text-sub">
            Global hotkeys work even when Ozark Alpha is in the background. No need to switch windows.
          </p>
        </div>

        <div
          ref={tableRef}
          className="rounded-xl overflow-hidden"
          style={{ opacity: 0 }}
        >
          <div className="grid grid-cols-[1fr_1fr] gap-4 px-6 py-4 border-b border-border/30">
            <span className="text-[13px] font-bold text-sub">Shortcut</span>
            <span className="text-[13px] font-bold text-sub">Action</span>
          </div>

          {shortcuts.map((s, i) => (
            <div
              key={s.action}
              className={`grid grid-cols-[1fr_1fr] gap-4 px-6 py-3.5 transition-colors hover:bg-hover/30 ${i % 2 === 0 ? "bg-bg/30" : "bg-transparent"}`}
            >
              <div className="flex items-center gap-1.5">
                {s.keys.map((k, ki) => (
                  <span key={ki} className="flex items-center gap-1.5">
                    <kbd className="inline-flex h-7 min-w-[28px] items-center justify-center rounded-lg bg-ink/[0.08] border border-ink/[0.06] px-2 font-mono text-[12px] font-semibold text-ink shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                      {k}
                    </kbd>
                    {ki < s.keys.length - 1 && (
                      <span className="text-[11px] text-sub/40 font-medium">+</span>
                    )}
                  </span>
                ))}
              </div>
              <span className="text-[13px] text-sub flex items-center">{s.action}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
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
      <FeatureGrid />
      <UseCases />
      <HowItWorks />
      <FeatureShowcase />
      <Shortcuts />
      <Pricing />
      <AlphaFooter />
    </>
  );
}
