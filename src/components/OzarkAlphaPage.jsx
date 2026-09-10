import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Shield, Cpu, Monitor, Eye, Zap, Globe, Key, ArrowRight, CheckCircle, Server, Camera, Send, Keyboard, Settings, Copy, Sparkles, IndianRupee } from "lucide-react";
import { prefersReducedMotion } from "@/lib/motion";
import { DOWNLOAD_URL } from "@/lib/config";
import { FOOTER_LINKS } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const ALPHA_DOWNLOAD_URL = "#"; // TODO: Update with real Ozark Alpha download link

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
            Ozark Alpha
          </div>
          <h1 ref={headingRef} className="mb-6 sm:mb-8 text-[32px] sm:text-[40px] md:text-[52px] lg:text-[64px] font-bold leading-[1.05] tracking-tight">
            {splitText("Bypass any online")}
            <br />
            <span className="text-ink/30">{splitText("assessment in seconds.")}</span>
          </h1>
          <p ref={subtitleRef} className="mb-8 sm:mb-10 max-w-[520px] text-[16px] sm:text-[18px] lg:text-[20px] leading-relaxed text-sub" style={{ opacity: 0 }}>
            Ozark Alpha is an invisible AI bypass for HackerRank, Mercer Mettl, and Safe Exam Browser. Runs as a stealth overlay — undetected by proctors, screen recorders, and browser lockdowns.
          </p>
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4 sm:gap-5">
            <a href={ALPHA_DOWNLOAD_URL} className="ghs-btn-primary inline-flex items-center gap-3 rounded-xl bg-accent px-7 py-3.5 sm:px-8 sm:py-4 text-[14px] sm:text-[16px] font-semibold text-white shadow-premium relative overflow-hidden transition-all duration-300 hover:scale-105" style={{ opacity: 0 }} data-cursor="magnetic">
              <Download size={18} strokeWidth={2.5} />
              Download Ozark Alpha
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

// ── Supported Platforms Section ──
function SupportedPlatforms() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const platforms = [
    { name: "HackerRank", tag: "HRB", description: "Invisible overlay inside HackerRank. AutoType answers directly into the code editor.", color: "#1BA94C" },
    { name: "Mercer Mettl", tag: "MSB", description: "Hidden from Mettl's screen recording, browser lockdown, and webcam monitoring.", color: "#E44D26" },
    { name: "Safe Exam Browser", tag: "SEB", description: "Runs outside SEB's lockdown scope. Invisible to its proctoring and tab-switch detection.", color: "#2563EB" },
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
      <div className="mx-auto max-w-[1000px] px-6 sm:px-10">
        <div className="text-center mb-10">
          <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block mb-3">Supported Platforms</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink">Built for every lockdown browser</h2>
        </div>
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-3 gap-5">
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

// ── What Is Ozark Alpha Section ──
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
          <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block mb-3">What is Ozark Alpha?</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink mb-6">An AI copilot that stays invisible</h2>
          <p className="mx-auto max-w-[65ch] text-[16px] sm:text-[18px] leading-relaxed text-sub">
            Ozark Alpha is a lightweight desktop tool that runs as a <span className="text-ink/80 font-medium">stealth overlay</span> on top of your assessment. It captures your screen, sends it to AI, and types the answer for you — all while remaining <span className="text-ink/80 font-medium">completely hidden</span> from HackerRank, Mercer Mettl, and Safe Exam Browser proctoring.
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
    { icon: Eye, title: "Invisible Overlay", description: "Hidden from screen-capture, proctoring software, and browser lockdowns.", details: ["GDI-powered text rendering", "Zero DOM elements captured", "Invisible to all proctors", "Position anywhere on screen"] },
    { icon: Camera, title: "Screenshot Capture", description: "One hotkey captures the assessment question and sends it to AI.", details: ["Self-exclusion from captures", "Multi-screenshot support", "Works in all lockdown browsers", "Ctrl+Shift+Space shortcut"] },
    { icon: Send, title: "AutoType", description: "AI answers are typed directly into the assessment — no copy-paste needed.", details: ["Human-like typing speed", "Random delays between keys", "F9 to start, F10 to stop", "Works in any text field"] },
    { icon: Cpu, title: "Multi-Model AI", description: "Choose from OpenAI, Claude, Gemini, Groq, Mistral, or local Ollama.", details: ["8 built-in providers", "Custom endpoints supported", "Local Ollama for offline use", "Instant model switching"] },
    { icon: Keyboard, title: "Hotkey Control", description: "Everything controlled via keyboard — no mouse needed during the assessment.", details: ["Ctrl+Shift+Space: Capture", "Alt+I: Focus input", "Ctrl+Shift+U: Disguise mode", "F9/F10: AutoType on/off"] },
    { icon: Shield, title: "Privacy First", description: "Your API keys and data stay on your machine. Nothing is stored on servers.", details: ["Local API key encryption", "Zero telemetry tracking", "No cloud sync required", "Direct provider communication"] },
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
          <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block mb-3">Features</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink md:text-5xl">Everything you need to bypass</h2>
          <p className="mx-auto mt-4 max-w-[55ch] text-[16px] leading-relaxed text-sub">Stealth overlay, instant AI solving, and auto-typing — all in one tool.</p>
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
            <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block mb-3">See It In Action</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink">Real-time AI solving</h2>
            <p className="mx-auto mt-4 max-w-[50ch] text-[16px] leading-relaxed text-sub">Capture any question, get instant solutions with syntax highlighting, and AutoType the answer.</p>
          </div>
          <ChatDemo />
        </div>
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
      <KeyFeatures />
      <InteractiveDemo />
      <Pricing />
      <AlphaFooter />
    </>
  );
}
