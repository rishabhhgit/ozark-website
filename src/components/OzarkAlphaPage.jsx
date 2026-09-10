import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download, Shield, Cpu, Monitor, Eye, Zap, Globe, Key, ArrowRight, CheckCircle, Server } from "lucide-react";
import { prefersReducedMotion, isTouchDevice, createRipple } from "@/lib/motion";
import { DOWNLOAD_URL } from "@/lib/config";
import { FOOTER_LINKS } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

// ── Hero Section ──
function AlphaHero() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const children = contentRef.current?.children;
      if (children) {
        gsap.fromTo(children, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" } });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative mx-auto max-w-[1200px] px-6 sm:px-10 pt-28 sm:pt-36 md:pt-44 pb-12 md:pb-16">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(196,48,48,0.06) 0%, transparent 70%)", filter: "blur(100px)" }} />
      <div ref={contentRef} className="relative z-10">
        <div className="mb-8 sm:mb-10 inline-flex items-center gap-2 rounded-full border border-border/50 bg-bg/80 px-4 py-2 sm:px-5 sm:py-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-accent backdrop-blur-sm">
          <Eye size={13} className="text-accent" />
          Ozark Alpha
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-ink leading-[1.05] mb-6">
          What is Ozark?
        </h1>
        <p className="max-w-[65ch] text-[17px] sm:text-[19px] md:text-[21px] leading-relaxed text-sub mb-8">
          Ozark Alpha is a lightweight desktop application that integrates advanced AI models directly into your workflow. It appears as a subtle overlay that you can position anywhere on your screen, ready to assist you when you need it. Unlike traditional chat applications, Ozark is designed to be invisible to screen-sharing and monitoring tools, so it never interferes with your test environment.
        </p>
        <p className="max-w-[55ch] text-[18px] sm:text-[20px] md:text-[22px] leading-relaxed text-ink/80 font-medium italic">
          Think of it as your personal AI co-pilot — always available, never distracting.
        </p>
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

  return (
    <section ref={sectionRef} className="relative py-10 md:py-14 overflow-hidden">
      <div className="absolute bottom-0 left-[10%] w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(196,48,48,0.04) 0%, transparent 70%)", filter: "blur(80px)" }} />
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block mb-3">Our Mission</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink mb-6">Why We Built Ozark</h2>
            <p className="text-[16px] leading-relaxed text-sub mb-6">
              Online assessments and technical interviews can be stressful. You might know the answer but struggle with time pressure, syntax, or edge cases. Ozark helps you stay focused and confident by providing:
            </p>
          </div>
          <div className="space-y-5">
            <div className="flex items-start gap-4 rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-5 transition-all duration-300 hover:border-white/[0.15]">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 border border-accent/20 flex-shrink-0">
                <Zap size={18} className="text-accent" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-ink mb-1">Instant AI-powered suggestions</h3>
                <p className="text-[14px] text-sub leading-relaxed">Get real-time help with coding problems, system design, and debugging.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-5 transition-all duration-300 hover:border-white/[0.15]">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 border border-accent/20 flex-shrink-0">
                <Monitor size={18} className="text-accent" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-ink mb-1">Seamless workflow integration</h3>
                <p className="text-[14px] text-sub leading-relaxed">No need to switch windows or applications — it works right where you are.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-5 transition-all duration-300 hover:border-white/[0.15]">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 border border-accent/20 flex-shrink-0">
                <Shield size={18} className="text-accent" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-ink mb-1">Discreet operation</h3>
                <p className="text-[14px] text-sub leading-relaxed">Respects your test environment and doesn't trigger alarms.</p>
              </div>
            </div>
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
    {
      icon: Eye,
      title: "Invisible Overlay",
      description: "Ozark's interface is a sleek, transparent overlay that sits on top of your screen. It's completely hidden from screen-capture and proctoring software, so you can use it without worrying about detection.",
      details: ["Transparent overlay on your screen", "Hidden from screen-capture tools", "Invisible to proctoring software", "Position anywhere on screen"],
    },
    {
      icon: Cpu,
      title: "Multi-Model AI Support",
      description: "Connect to your favourite AI providers — OpenAI, Anthropic, Gemini, Mistral, Groq, or local Ollama models. Ozark supports them all, giving you the flexibility to choose the best model for the task.",
      details: ["8 built-in providers", "Custom OpenAI-compatible endpoints", "Local Ollama support", "Instant model switching"],
    },
    {
      icon: Zap,
      title: "Hotkey-Driven Workflow",
      description: "Control everything with intuitive hotkeys. Capture screenshots, send prompts, toggle the overlay, and switch between models — all without touching your mouse.",
      details: ["Global hotkeys work anywhere", "Screenshot capture shortcuts", "Model switching hotkeys", "Overlay toggle controls"],
    },
    {
      icon: Monitor,
      title: "Screenshot Analysis",
      description: "Need help with a visual problem? Ozark can capture your screen (excluding itself) and send it to the AI for analysis. Perfect for debugging UI issues or understanding complex diagrams.",
      details: ["Screen capture with one hotkey", "Self-exclusion from captures", "Multi-screenshot support", "Visual problem analysis"],
    },
    {
      icon: ArrowRight,
      title: "Auto-Typing",
      description: "Once the AI provides an answer, Ozark can automatically type it into the active application — no copy-paste required. This keeps your flow uninterrupted and your focus on the problem.",
      details: ["Human-like typing simulation", "Random delays between keystrokes", "F9 to start, F10 to stop", "Works in any text field"],
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Ozark doesn't store your conversations on any server. All AI requests are sent directly from your machine to the provider of your choice. Your data stays yours.",
      details: ["No server-side storage", "Direct provider communication", "Local API key encryption", "Zero telemetry tracking"],
    },
  ];

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".feature-card");
      if (cards) {
        cards.forEach((card, i) => {
          gsap.fromTo(card,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: i * 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-10 md:py-14 overflow-hidden">
      <div className="absolute top-[30%] right-[5%] w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(196,48,48,0.04) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
        <div className="text-center mb-10">
          <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block mb-3">Key Features</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink md:text-5xl">Everything you need to succeed</h2>
          <p className="mx-auto mt-4 max-w-[55ch] text-[16px] leading-relaxed text-sub">Powerful features wrapped in a clean, distraction-free interface designed for high-stakes assessments.</p>
        </div>
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="feature-card rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6 transition-all duration-300 hover:border-white/[0.15] hover:shadow-lg group" style={{ opacity: 0 }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 mb-4 transition-all duration-300 group-hover:bg-accent/15 group-hover:scale-110">
                  <Icon size={22} className="text-accent" />
                </div>
                <h3 className="text-lg font-bold text-ink mb-3">{feature.title}</h3>
                <p className="text-[14px] leading-relaxed text-sub mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2 text-[13px] text-sub">
                      <CheckCircle size={14} className="text-accent mt-0.5 flex-shrink-0" />
                      <span>{detail}</span>
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

// ── Use Cases Section ──
function UseCases() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  const cases = [
    { title: "Coding Assessments", description: "Get instant help with algorithms, data structures, and syntax.", icon: Cpu },
    { title: "System Design Interviews", description: "Receive real-time suggestions for architecture, trade-offs, and scalability.", icon: Server },
    { title: "Debugging", description: "Analyse error messages and stack traces without leaving your IDE.", icon: Monitor },
    { title: "Learning", description: "Understand complex concepts with AI-generated explanations and examples.", icon: Globe },
  ];

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const items = contentRef.current?.querySelectorAll(".use-case-item");
      if (items) {
        items.forEach((item, i) => {
          gsap.fromTo(item,
            { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
            { opacity: 1, x: 0, duration: 0.7, delay: i * 0.1, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 88%", toggleActions: "play none none none" } }
          );
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-10 md:py-14 overflow-hidden">
      <div className="absolute bottom-[20%] left-[8%] w-[350px] h-[350px] rounded-full opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(196,48,48,0.04) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="mx-auto max-w-[1000px] px-6 sm:px-10">
        <div className="text-center mb-10">
          <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block mb-3">Use Cases</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink">How Engineers Use Ozark</h2>
        </div>
        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((useCase) => {
            const Icon = useCase.icon;
            return (
              <div key={useCase.title} className="use-case-item rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6 transition-all duration-300 hover:border-white/[0.15] hover:shadow-md" style={{ opacity: 0 }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 border border-accent/20">
                    <Icon size={18} className="text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-ink">{useCase.title}</h3>
                </div>
                <p className="text-[14px] leading-relaxed text-sub">{useCase.description}</p>
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
    <section ref={sectionRef} className="relative py-10 md:py-14 overflow-hidden">
      <div className="absolute top-[40%] right-[12%] w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(196,48,48,0.04) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="mx-auto max-w-[1000px] px-6 sm:px-10">
        <div ref={contentRef} className="text-center">
          <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block mb-3">The Ozark Difference</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink mb-6">Why Ozark is Different</h2>
          <p className="mx-auto max-w-[65ch] text-[16px] sm:text-[18px] leading-relaxed text-sub mb-8">
            Most AI tools require you to switch windows, copy-paste questions, and then manually apply the answers. Ozark streamlines this entire loop. It stays out of your way, works invisibly, and integrates directly into your existing environment. The result is a smoother, faster, and more confident test-taking experience.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[800px] mx-auto">
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-5 text-center">
              <div className="text-2xl font-bold text-accent mb-1">0</div>
              <div className="text-[13px] text-sub">Windows to switch</div>
            </div>
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-5 text-center">
              <div className="text-2xl font-bold text-accent mb-1">100%</div>
              <div className="text-[13px] text-sub">Invisible to proctors</div>
            </div>
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-5 text-center">
              <div className="text-2xl font-bold text-accent mb-1">∞</div>
              <div className="text-[13px] text-sub">AI models supported</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Getting Started Section ──
function GettingStarted() {
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
          <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block mb-3">Get Started</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink mb-6">Getting Started</h2>
          <p className="text-[16px] leading-relaxed text-sub mb-8">
            Ozark is available for Windows and can be downloaded from our website. Simply install, configure your preferred AI provider, and you're ready to go.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={DOWNLOAD_URL} className="ghs-btn-primary inline-flex items-center gap-3 rounded-xl bg-accent px-8 py-4 text-[15px] font-semibold text-white shadow-premium relative overflow-hidden transition-all duration-300 hover:scale-105">
              <Download size={18} strokeWidth={2.5} />
              Download for Windows 11
            </a>
            <a href="/ozark" className="ghs-btn-ghost inline-flex items-center gap-2 rounded-xl px-6 py-4 text-[15px] font-semibold text-sub hover:text-ink transition-all duration-300 hover:scale-105">
              Explore Features <ArrowRight size={16} />
            </a>
          </div>
          <p className="mt-6 text-[13px] text-sub/70">
            Note: Ozark is intended for educational and productivity purposes. Always adhere to the terms of service of any platform you use.
          </p>
        </div>
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
      <div className="absolute top-0 left-[15%] w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(196,48,48,0.04) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="mx-auto max-w-[800px] px-6 sm:px-10">
        <div ref={contentRef} className="text-center">
          <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block mb-3">What's Next</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink mb-6">The Future of Ozark</h2>
          <p className="text-[16px] leading-relaxed text-sub mb-6">
            We're constantly improving Ozark with new features, better AI integrations, and enhanced stealth capabilities. Our mission is to empower engineers worldwide with intelligent, unobtrusive assistance that helps them perform at their best.
          </p>
          <p className="text-[18px] font-medium text-ink/80 italic">
            Stay tuned for updates, and happy coding!
          </p>
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
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AlphaHero />
      <WhyWeBuilt />
      <KeyFeatures />
      <UseCases />
      <WhyDifferent />
      <GettingStarted />
      <FutureSection />
      <AlphaFooter />
    </>
  );
}
