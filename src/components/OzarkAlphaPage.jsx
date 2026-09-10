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
  { eyebrow: "INVISIBLE OVERLAY", title: "They can't see it. You see everything.", body: "A cursor-following text layer powered by Windows GDI — completely invisible to screen capture, screen sharing, and proctoring tools. You see the answers. They see nothing.", kind: "stealth", reverse: false },
  { eyebrow: "SCREENSHOT SOLVER", title: "One hotkey. Instant answer.", body: "Press Ctrl+Shift+Space. The AI sees exactly what you see — coding problems, diagrams, MCQs. It solves them in 0.24s. You AutoType the answer. Done.", kind: "screenshot", reverse: true },
  { eyebrow: "AUTOTYPE ENGINE", title: "Let the AI do the typing.", body: "Human-like keystrokes with random delays. No one can tell the difference. F9 to start, F10 to stop. Works in HackerRank, Mettl, and SEB editors.", kind: "autotype", reverse: false },
  { eyebrow: "DISGUISE MODE", title: "One hotkey. You're invisible.", body: "Press Ctrl+Shift+U and Ozark Alpha morphs into a Windows Update screen. Your proctor sees nothing suspicious. You keep solving.", kind: "disguise", reverse: true },
  { eyebrow: "MULTI-MODEL AI", title: "8 providers. One shortcut.", body: "GPT-4o for complex DSA. Claude for system design. Gemini for speed. Switch mid-assessment with Alt+X. Use the best model for each question.", kind: "providers", reverse: false },
  { eyebrow: "CODE MODE", title: "Built for competitive programming.", body: "Detects LeetCode, HackerRank, Codeforces. Identifies DP, greedy, graph patterns. Outputs clean code with correct function signatures and edge case checks.", kind: "code", reverse: true },
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
            {splitText("Cheat every exam.")}
            <br />
            <span className="text-ink/30">{splitText("They'll never know.")}</span>
          </h1>
          <p ref={subtitleRef} className="mb-8 sm:mb-10 max-w-[520px] text-[16px] sm:text-[18px] lg:text-[20px] leading-relaxed text-sub" style={{ opacity: 0 }}>
            Invisible AI that bypasses HackerRank, Mercer Mettl, and Safe Exam Browser. Capture questions, get instant answers, AutoType solutions — completely undetected.
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
    { icon: Eye, title: "Zero Detection", description: "Hidden from screen capture, proctoring software, and browser lockdowns. HackerRank, Mettl, SEB — none of them see it." },
    { icon: Cpu, title: "8 AI Providers", description: "GPT-4o, Claude, Gemini, DeepSeek, Groq, Mistral, Ollama, OpenRouter. Switch mid-assessment with one shortcut." },
    { icon: Keyboard, title: "17 Hotkeys", description: "Capture screenshots, send prompts, toggle overlay, AutoType answers — all without touching the mouse." },
    { icon: Camera, title: "Screenshot → Answer", description: "One hotkey captures the question. AI solves it in 0.24s. AutoType the answer. Done." },
    { icon: Send, title: "Human-Like Typing", description: "Random delays, natural keystrokes. No proctoring tool can tell the difference between you and the AI." },
    { icon: Shield, title: "Your Data, Your Machine", description: "No cloud. No accounts. No telemetry. API keys encrypted locally. Everything stays on your PC." },
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
        <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block" style={{ opacity: 0 }}>Why Ozark Alpha</span>
        <h2 className="mt-2 text-4xl font-bold tracking-tight text-ink md:text-5xl lg:text-6xl" style={{ opacity: 0 }}>Built to beat proctoring</h2>
        <p className="mx-auto mt-3 max-w-[60ch] text-[16px] sm:text-[18px] leading-relaxed text-sub" style={{ opacity: 0 }}>Every feature designed for one thing: getting answers without getting caught.</p>
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
    { title: "HackerRank", description: "DSA, MCQs, debugging — solved in 0.24s. AutoType directly into the editor. Proctor sees nothing.", icon: Zap },
    { title: "Mercer Mettl", description: "Bypasses screen recording, browser lockdown, and webcam monitoring. Full stealth. Full marks.", icon: Shield },
    { title: "Safe Exam Browser", description: "Runs outside SEB's lockdown. Invisible to tab-switch detection and proctoring. Complete freedom.", icon: Eye },
    { title: "Any Platform", description: "LeetCode, Codeforces, Codility, custom portals — if it's in a browser, Ozark Alpha beats it.", icon: Globe },
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
          <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block mb-3">Platforms</span>
          <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">Beats them all</h2>
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
        <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block" style={{ opacity: 0 }}>Deep Dive</span>
        <h2 className="mt-2 text-4xl font-bold tracking-tight text-ink md:text-5xl lg:text-6xl" style={{ opacity: 0 }}>How it works</h2>
        <p className="mx-auto mt-3 max-w-[60ch] text-[16px] sm:text-[18px] leading-relaxed text-sub" style={{ opacity: 0 }}>The technology behind undetectable AI assistance.</p>
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
          <h3 className="text-3xl font-bold text-ink mb-2">Pass every exam. Guaranteed.</h3>
          <div className="flex items-center justify-center gap-1 mb-4">
            <IndianRupee size={28} className="text-accent" />
            <span className="text-5xl font-bold text-ink">1999</span>
            <span className="text-lg text-sub">/month</span>
          </div>
          <p className="text-[14px] text-sub mb-6">One subscription. All platforms. Unlimited answers.</p>
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
            Start Cheating Now
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
            Hotkeys
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Control everything. Touch nothing.
          </h2>
          <p className="mx-auto mt-4 max-w-[45ch] text-[15px] leading-relaxed text-sub">
            17 shortcuts. All global. All invisible to proctoring software.
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
      <FeatureShowcase />
      <Shortcuts />
      <Pricing />
      <AlphaFooter />
    </>
  );
}
