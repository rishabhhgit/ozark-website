import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Shield, Cpu, Monitor, Eye, Zap, Globe, Key, ArrowRight, CheckCircle, Server, Camera, Send, Keyboard, Settings, Copy, Sparkles, IndianRupee, Mic } from "lucide-react";
import { prefersReducedMotion, createRipple } from "@/lib/motion";
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
            {splitText("AI that bypasses")}
            <br />
            <span className="text-ink/30">{splitText("your online exams.")}</span>
          </h1>
          <p ref={subtitleRef} className="mb-8 sm:mb-10 max-w-[520px] text-[16px] sm:text-[18px] lg:text-[20px] leading-relaxed text-sub" style={{ opacity: 0 }}>
            Invisible overlay, instant AI solving, and auto-typing — built for HackerRank, Mercer Mettl, and Safe Exam Browser.
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

// ── Platforms Defeated (Visual showcase) ──
function PlatformsDefeated() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const platforms = [
    { name: "HackerRank", image: "/hackerrank.svg" },
    { name: "Mercer Mettl", image: "/mercel-mettl.png" },
    { name: "Safe Exam Browser", image: "/seb.webp" },
  ];

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll(".platform-card");
      if (items) {
        items.forEach((item, i) => {
          gsap.fromTo(item, { opacity: 0, scale: 0.85, rotateZ: -3 }, { opacity: 1, scale: 1, rotateZ: 0, duration: 0.7, delay: i * 0.15, ease: "back.out(1.7)", scrollTrigger: { trigger: item, start: "top 88%", toggleActions: "play none none none" } });
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-6 md:py-10 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="text-center mb-6">
          <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block mb-2">Platforms</span>
          <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl">Beats them all</h2>
        </div>
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {platforms.map((p) => (
            <div key={p.name} className="platform-card relative rounded-2xl overflow-hidden group cursor-pointer border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm transition-all duration-500 hover:border-red-500/30 hover:shadow-2xl hover:shadow-red-500/20 hover:scale-[1.02]" style={{ opacity: 0 }}>
              {/* Image container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#0a0a0c]">
                {/* Platform image - grayscale and dimmed */}
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="absolute inset-0 w-full h-full object-contain p-8 grayscale opacity-40 group-hover:opacity-60 transition-all duration-500 scale-110"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
                {/* Red cracked overlay effect */}
                <div className="absolute inset-0 bg-red-900/20 mix-blend-multiply" />
                {/* Animated scratch lines */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-[20%] left-[10%] w-[80%] h-[2px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent rotate-[-15deg]" />
                  <div className="absolute top-[60%] left-[5%] w-[90%] h-[1px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent rotate-[8deg]" />
                </div>
                {/* DEFEATED stamp */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
                  <div className="relative">
                    <div className="px-5 py-2 border-[3px] border-red-500 rounded-lg bg-black/40 backdrop-blur-sm -rotate-[12deg] shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                      <span className="text-xl md:text-2xl font-black text-red-500 uppercase tracking-[0.2em] drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">DEFEATED</span>
                    </div>
                    {/* Stamp shadow */}
                    <div className="absolute inset-0 px-5 py-2 border-[3px] border-red-500/20 rounded-lg -rotate-[12deg] translate-x-1 translate-y-1" />
                  </div>
                </div>
                {/* Big X */}
                <div className="absolute top-4 right-4 z-20">
                  <span className="text-5xl md:text-6xl font-black text-red-500/90 leading-none select-none drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]">X</span>
                </div>
                {/* Bottom text overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black via-black/95 to-transparent z-10">
                  <h3 className="text-xl font-bold text-ink mb-1">{p.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <p className="text-[15px] text-sub">
            <span className="text-accent font-semibold">17 hotkeys.</span>{" "}
            <span className="text-ink font-semibold">0 detections.</span>{" "}
            <span className="text-sub">Every exam. Guaranteed.</span>
          </p>
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
          <h3 className="text-3xl font-bold text-ink mb-2">₹1999/mo. No excuses left.</h3>
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
    { keys: ["Ctrl", "Shift", "M"], action: "Screenshot" },
    { keys: ["Alt", "T"], action: "Start AutoType" },
    { keys: ["Alt", "T", "Esc"], action: "Stop AutoType" },
    { keys: ["Alt", "H"], action: "Toggle overlay" },
    { keys: ["Alt", "Z"], action: "Increase window" },
    { keys: ["Alt", "C"], action: "Decrease window" },
    { keys: ["Alt", "I"], action: "Input mode" },
    { keys: ["Alt", "Enter"], action: "Send message" },
    { keys: ["Alt", "S"], action: "Screenshot" },
    { keys: ["Alt", "M"], action: "Scroll up" },
    { keys: ["Alt", "N"], action: "Scroll down" },
    { keys: ["Alt", "X"], action: "Cycle provider" },
    { keys: ["Alt", "B"], action: "Toggle YouTube" },
    { keys: ["Alt", "←"], action: "Move left" },
    { keys: ["Alt", "→"], action: "Move right" },
    { keys: ["Alt", "↑"], action: "Move up" },
    { keys: ["Alt", "↓"], action: "Move down" },
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
            Shortcut keys
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
      <PlatformsDefeated />
      <Shortcuts />
      <Pricing />
      <AlphaFooter />
    </>
  );
}
