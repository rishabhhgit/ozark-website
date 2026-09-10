import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Download, Key, MessageSquare, Shield, ArrowRight, CheckCircle, XCircle, Server, Monitor, Cpu, HardDrive, Settings, Globe, Eye, Palette, Zap } from "lucide-react";
import { prefersReducedMotion, isTouchDevice, createRipple } from "@/lib/motion";
import { FEATURES, PROVIDERS, HOW_IT_WORKS, SHORTCUTS, SYSTEM_REQUIREMENTS, SETTINGS_CONFIG, FOOTER_LINKS } from "@/lib/data";
import { DOWNLOAD_URL } from "@/lib/config";
import FeatureSection from "@/components/FeatureSection";

gsap.registerPlugin(ScrollTrigger);

const iconMapSteps = {
  download: Download,
  key: Key,
  chat: MessageSquare,
  shield: Shield,
};

const iconMapSettings = {
  "anthropic": Key,
  "openai": Key,
  "gemini": Key,
  "groq": Key,
  "mistral": Key,
  "openrouter": Key,
  "ollama": Globe,
  "prompt": MessageSquare,
  "stealth": Eye,
  "providers": Server,
  "theme": Palette,
  "hotkey": Zap,
  "window": Monitor,
  "security": Shield,
  "model": Cpu,
};

const EXTRA_SETTINGS = [
  { key: "theme", label: "Theme", description: "Switch between light, dark, and system themes" },
  { key: "hotkey", label: "Global Hotkeys", description: "Customize all keyboard shortcuts from the Shortcuts tab" },
  { key: "window", label: "Window Behavior", description: "Control always-on-top, transparency, and taskbar visibility" },
  { key: "security", label: "Security Mode", description: "Enable disguise mode and screen-capture exclusion" },
  { key: "model", label: "Default Model", description: "Set your preferred model for each provider on startup" },
];

const ALL_SETTINGS = [...SETTINGS_CONFIG, ...EXTRA_SETTINGS];

// ── Features Section ──
function Features() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Check if already in view
      const sectionRect = sectionRef.current?.getBoundingClientRect();
      const alreadyInView = sectionRect && sectionRect.top < window.innerHeight * 0.85;

      if (alreadyInView) {
        // Set everything visible immediately
        const headerChildren = headerRef.current?.children;
        if (headerChildren) gsap.set(headerChildren, { opacity: 1, y: 0 });
        const line = sectionRef.current?.querySelector(".halloween-divider");
        if (line) gsap.set(line, { scaleX: 1, opacity: 1 });
        const featureItems = featuresRef.current?.querySelectorAll(".feature-item");
        if (featureItems) featureItems.forEach(item => gsap.set(item, { opacity: 1, x: 0, scale: 1 }));
      } else {
        const headerChildren = headerRef.current?.children;
        if (headerChildren) {
          gsap.fromTo(headerChildren, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none none" } });
        }

        const line = sectionRef.current?.querySelector(".halloween-divider");
        if (line) {
          gsap.fromTo(line, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 1.5, ease: "power3.inOut", scrollTrigger: { trigger: line, start: "top 90%", toggleActions: "play none none none" } });
        }

        const featureItems = featuresRef.current?.querySelectorAll(".feature-item");
        if (featureItems) {
          featureItems.forEach((item, i) => {
            const isEven = i % 2 === 0;
            gsap.fromTo(item,
              { opacity: 0, x: isEven ? -80 : 80, scale: 0.94 },
              { opacity: 1, x: 0, scale: 1, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 88%", toggleActions: "play none none none" } }
            );
          });
        }
      }

      const decoElements = sectionRef.current?.querySelectorAll(".deco-parallax");
      if (decoElements) {
        decoElements.forEach((el, i) => {
          gsap.to(el, {
            y: -50 * (i + 1),
            ease: "none",
            scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 2 + i },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="section-cool relative mx-auto max-w-[1400px] px-6 sm:px-10 py-8 md:py-10 overflow-hidden">
      {/* Decorative red accent glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none deco-parallax" style={{ background: "radial-gradient(circle, rgba(196,48,48,0.06) 0%, transparent 70%)", filter: "blur(80px)" }} />
      <div className="absolute bottom-0 left-[10%] w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(196,48,48,0.04) 0%, transparent 70%)", filter: "blur(60px)" }} />

      {/* Ghost decorative elements — parallax */}
      <div className="absolute bottom-20 left-10 opacity-[0.06] pointer-events-none deco-parallax" style={{ animation: "ghost-float 20s ease-in-out infinite" }}>
        <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
          <path d="M50 10C30 10 15 28 15 48V75C15 78 18 80 20 78C22 76 24 72 27 72C30 72 32 76 35 76C38 76 40 72 43 72C46 72 48 76 51 76C54 76 56 72 59 72C62 72 64 76 67 76C70 76 72 72 75 72C78 72 80 76 83 76C85 78 88 76 88 73V48C88 28 73 10 50 10Z" fill="#8a3030" />
          <ellipse cx="38" cy="40" rx="5" ry="5.5" fill="white" />
          <ellipse cx="62" cy="40" rx="5" ry="5.5" fill="white" />
        </svg>
      </div>

      <div className="absolute top-32 right-16 opacity-[0.04] pointer-events-none deco-parallax" style={{ animation: "ghost-float 25s ease-in-out 3s infinite" }}>
        <svg width="50" height="50" viewBox="0 0 100 100" fill="none">
          <path d="M50 15C35 15 24 30 24 45V65C24 67 26 68 28 67C30 65 32 62 34 62C36 62 38 65 40 65C42 65 44 62 46 62C48 62 50 65 52 65C54 65 56 62 58 62C60 62 62 65 64 65C66 65 68 62 70 62C72 64 74 67 76 67C78 68 80 67 80 65V45C80 30 65 15 50 15Z" fill="#8a3030"/>
          <circle cx="40" cy="40" r="3" fill="white" />
          <circle cx="60" cy="40" r="3" fill="white" />
        </svg>
      </div>

      <div ref={headerRef} className="mb-6 md:mb-5 text-center">
        <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block" style={{ opacity: 0 }}>Feature Deep Dive</span>
        <h2 className="mt-2 text-4xl font-bold tracking-tight text-ink md:text-5xl lg:text-6xl" style={{ opacity: 0 }}>Everything you need to prepare</h2>
        <p className="mx-auto mt-3 max-w-[60ch] text-[16px] sm:text-[18px] leading-relaxed text-sub" style={{ opacity: 0 }}>Powerful features wrapped in a clean, distraction-free interface.</p>
        <div className="halloween-divider mx-auto mt-5 w-[100px]" style={{ transformOrigin: "center" }} />
      </div>

      <div ref={featuresRef}>
        {FEATURES.map((f, i) => (
          <div key={f.title} className="feature-item" style={{ opacity: 0 }} data-spotlight>
            <FeatureSection {...f} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Providers Section ──
function ProvidersSection() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".provider-card");
      if (cards) {
        cards.forEach((card, i) => {
          gsap.fromTo(card,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: i * 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
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
    <section ref={sectionRef} id="providers" className="relative py-6 md:py-8 overflow-hidden">
      {/* Red accent glow */}
      <div className="absolute top-0 left-[20%] w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(196,48,48,0.04) 0%, transparent 70%)", filter: "blur(80px)" }} />
      {/* Ghost decoration */}
      <div className="absolute top-20 right-10 opacity-[0.04] pointer-events-none" style={{ animation: "ghost-float 22s ease-in-out infinite" }}>
        <svg width="50" height="50" viewBox="0 0 100 100" fill="none">
          <path d="M50 10C30 10 15 28 15 48V75C15 78 18 80 20 78C22 76 24 72 27 72C30 72 32 76 35 76C38 76 40 72 43 72C46 72 48 76 51 76C54 76 56 72 59 72C62 72 64 76 67 76C70 76 72 72 75 72C78 72 80 76 83 76C85 78 88 76 88 73V48C88 28 73 10 50 10Z" fill="#8a3030" />
          <ellipse cx="38" cy="40" rx="5" ry="5.5" fill="white" />
          <ellipse cx="62" cy="40" rx="5" ry="5.5" fill="white" />
        </svg>
      </div>

      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="text-center mb-6">
          <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block mb-3">
            AI Providers & Models
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Connect to any AI backend
          </h2>
          <p className="mx-auto mt-4 max-w-[55ch] text-[15px] leading-relaxed text-sub">
            Ozark supports 8 built-in providers plus custom OpenAI-compatible endpoints.
            Provide API keys for cloud providers, or run locally with Ollama.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROVIDERS.map((provider) => (
            <div
              key={provider.name}
              className="provider-card rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-4 transition-all duration-300 hover:border-white/[0.15] hover:shadow-md"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: provider.color }}
                  />
                  <span className="text-[14px] font-bold text-ink">{provider.name}</span>
                </div>
                {provider.requiresKey ? (
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-600 bg-amber-500/10 border border-amber-500/20 rounded-full px-2 py-0.5">
                    <CheckCircle size={10} />
                    Key Required
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-green-600 bg-green-500/10 border border-green-500/20 rounded-full px-2 py-0.5">
                    <XCircle size={10} />
                    No Key Needed
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {provider.models.map((model) => (
                  <span
                    key={model}
                    className="inline-flex rounded-md bg-ink/[0.04] border border-ink/[0.06] px-2 py-1 text-[10px] font-mono font-medium text-sub"
                  >
                    {model}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div className="provider-card rounded-xl border border-dashed border-accent/30 bg-accent/[0.02] backdrop-blur-sm p-5 transition-all duration-300 hover:border-accent/40 hover:shadow-md" style={{ opacity: 0 }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="h-3 w-3 rounded-full bg-gradient-to-br from-accent to-accent/60" />
                <span className="text-[14px] font-bold text-ink">Custom</span>
              </div>
              <span className="flex items-center gap-1 text-[10px] font-semibold text-accent bg-accent/10 border border-accent/20 rounded-full px-2 py-0.5">
                <Server size={10} />
                Self-Hosted
              </span>
            </div>
            <p className="text-[12px] text-sub leading-relaxed">
              Add any OpenAI-compatible endpoint with name, URL, API key, and model list.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6 max-w-[600px] mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Server size={16} className="text-accent" />
            <span className="text-[13px] font-bold text-ink">Server AI</span>
          </div>
          <p className="text-[13px] text-sub leading-relaxed">
             Providers are automatically disabled when limits are reached.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── How It Works Section ──
function HowItWorks() {
  const sectionRef = useRef(null);
  const stepsRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const steps = stepsRef.current?.querySelectorAll(".step-card");
      if (steps) {
        steps.forEach((step, i) => {
          gsap.fromTo(step,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: i * 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: step,
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
    <section ref={sectionRef} id="how-it-works" className="relative py-6 md:py-8 overflow-hidden">
      {/* Red accent glow */}
      <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(196,48,48,0.04) 0%, transparent 70%)", filter: "blur(80px)" }} />
      {/* Ghost decoration */}
      <div className="absolute bottom-10 left-8 opacity-[0.04] pointer-events-none" style={{ animation: "ghost-float 25s ease-in-out 4s infinite" }}>
        <svg width="45" height="45" viewBox="0 0 100 100" fill="none">
          <path d="M50 15C35 15 24 30 24 45V65C24 67 26 68 28 67C30 65 32 62 34 62C36 62 38 65 40 65C42 65 44 62 46 62C48 62 50 65 52 65C54 65 56 62 58 62C60 62 62 65 64 65C66 65 68 62 70 62C72 64 74 67 76 67C78 68 80 67 80 65V45C80 30 65 15 50 15Z" fill="#8a3030"/>
          <circle cx="40" cy="40" r="3" fill="white"/>
          <circle cx="60" cy="40" r="3" fill="white"/>
        </svg>
      </div>
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="text-center mb-10 md:mb-14">
          <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block mb-3">
            Simple Setup
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-ink md:text-5xl lg:text-6xl">
            Up and running in 60 seconds
          </h2>
          <p className="mx-auto mt-4 max-w-[50ch] text-[16px] sm:text-[18px] leading-relaxed text-sub">
            No accounts, no installation wizards, no cloud sync. Just download, add your keys, and start asking.
          </p>
        </div>

        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {HOW_IT_WORKS.map((step, i) => {
            const Icon = iconMapSteps[step.icon] || Download;
            return (
              <div
                key={step.step}
                className="step-card relative group rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-8 transition-all duration-300 hover:border-white/[0.15] hover:shadow-lg"
                style={{ opacity: 0 }}
              >
                <div className="absolute -top-3 -left-1 text-[64px] font-bold text-accent/[0.07] leading-none select-none">
                  {step.step}
                </div>
                <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 transition-all duration-300 group-hover:bg-accent/15 group-hover:scale-110">
                  <Icon size={20} className="text-accent" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-ink">{step.title}</h3>
                <p className="text-[14px] leading-relaxed text-sub">{step.body}</p>
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10">
                    <ArrowRight size={16} className="text-border" />
                  </div>
                )}
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

// ── Shortcuts Section ──
function Shortcuts() {
  const sectionRef = useRef(null);
  const tableRef = useRef(null);

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
    <section ref={sectionRef} className="relative py-6 md:py-8 overflow-hidden">
      {/* Red accent glow */}
      <div className="absolute top-[30%] left-[5%] w-[350px] h-[350px] rounded-full opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(196,48,48,0.04) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="mx-auto max-w-[800px] px-6 md:px-10">
        <div className="text-center mb-6">
          <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block mb-3">
            Keyboard Shortcuts
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Control everything from anywhere
          </h2>
          <p className="mx-auto mt-4 max-w-[45ch] text-[15px] leading-relaxed text-sub">
            Global hotkeys work even when Ozark is in the background. No need to switch windows.
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

          {SHORTCUTS.map((s, i) => (
            <div
              key={s.action}
              className={`grid grid-cols-[1fr_1fr] gap-4 px-5 py-3 transition-colors hover:bg-hover/30 ${i % 2 === 0 ? "bg-bg/30" : "bg-transparent"}`}
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

// ── System Requirements Section ──
function SystemRequirements() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(contentRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
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
    <section ref={sectionRef} className="relative py-6 md:py-8 overflow-hidden">
      {/* Red accent glow */}
      <div className="absolute bottom-[20%] right-[8%] w-[300px] h-[300px] rounded-full opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(196,48,48,0.04) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="mx-auto max-w-[1000px] px-6 md:px-10">
        <div className="text-center mb-6">
          <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block mb-3">
            System Requirements
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
            What you need to run Ozark
          </h2>
        </div>

        <div
          ref={contentRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          style={{ opacity: 0 }}
        >
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 border border-accent/20">
              <Monitor size={20} className="text-accent" />
            </div>
            <h3 className="mb-2 text-sm font-bold text-ink">Operating System</h3>
            <p className="text-[13px] text-sub leading-relaxed">{SYSTEM_REQUIREMENTS.os}</p>
          </div>

          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 border border-accent/20">
              <Cpu size={20} className="text-accent" />
            </div>
            <h3 className="mb-2 text-sm font-bold text-ink">.NET Runtime</h3>
            <p className="text-[13px] text-sub leading-relaxed">{SYSTEM_REQUIREMENTS.runtime}</p>
          </div>

          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 border border-accent/20">
              <HardDrive size={20} className="text-accent" />
            </div>
            <h3 className="mb-2 text-sm font-bold text-ink">Disk Space</h3>
            <div className="text-[13px] text-sub leading-relaxed">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <CheckCircle size={12} className="text-green-500" />
                <span>Framework: {SYSTEM_REQUIREMENTS.disk.framework}</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <CheckCircle size={12} className="text-green-500" />
                <span>Self-contained: {SYSTEM_REQUIREMENTS.disk.selfContained}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6 text-center max-w-[400px] mx-auto">
          <h3 className="mb-2 text-sm font-bold text-ink">Memory</h3>
          <p className="text-[13px] text-sub">{SYSTEM_REQUIREMENTS.ram}</p>
        </div>
      </div>
    </section>
  );
}

// ── Settings Section ──
function SettingsSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const noteRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const headerChildren = headerRef.current?.children;
      if (headerChildren) {
        gsap.fromTo(headerChildren, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none none" } });
      }

      const items = gridRef.current?.querySelectorAll(".setting-item");
      if (items) {
        items.forEach((item, i) => {
          gsap.fromTo(item,
            { opacity: 0, x: i % 2 === 0 ? -16 : 16 },
            {
              opacity: 1,
              x: 0,
              duration: 0.45,
              delay: i * 0.05,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 92%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }

      if (noteRef.current) {
        gsap.fromTo(noteRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: noteRef.current, start: "top 92%", toggleActions: "play none none none" } });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-6 md:py-8 overflow-hidden">
      {/* Red accent glow */}
      <div className="absolute top-[40%] right-[12%] w-[300px] h-[300px] rounded-full opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(196,48,48,0.04) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="mx-auto max-w-[800px] px-6 md:px-10">
        <div ref={headerRef} className="text-center mb-6">
          <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block mb-3" style={{ opacity: 0 }}>
            Settings & Configuration
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl" style={{ opacity: 0 }}>
            Everything you can customize
          </h2>
          <p className="mx-auto mt-4 max-w-[50ch] text-[15px] leading-relaxed text-sub" style={{ opacity: 0 }}>
            Click the gear icon to open Settings. All preferences are saved automatically
            to %APPDATA%\Ozark\settings.json.
          </p>
        </div>

        <div
          ref={gridRef}
          className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm overflow-hidden divide-y divide-border/20"
        >
          {ALL_SETTINGS.map((setting) => {
            const Icon = iconMapSettings[setting.key] || Settings;
            return (
              <div
                key={setting.key}
                className="setting-item flex items-center gap-3 px-4 py-3 transition-colors hover:bg-hover/30"
                style={{ opacity: 0 }}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 border border-accent/20 flex-shrink-0">
                  <Icon size={16} className="text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[13px] font-bold text-ink">{setting.label}</h4>
                  <p className="text-[12px] text-sub leading-relaxed">{setting.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div ref={noteRef} className="mt-6 rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-5" style={{ opacity: 0 }}>
          <div className="flex items-start gap-3">
            <Server size={16} className="text-accent flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[13px] font-bold text-ink mb-1">Custom Providers</h4>
              <p className="text-[12px] text-sub leading-relaxed">
                Add your own OpenAI-compatible endpoints with: Name, Endpoint URL, API Key,
                Models (comma-separated), and Supports Images option.
                Custom providers appear in the dropdown alongside built-in ones.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Closing CTA ──
function ClosingCTA() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const contentRef = useRef(null);
  const btnRef = useRef(null);
  const ringRef = useRef(null);
  const decoRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current, { opacity: 0, y: 60, rotateX: 8, scale: 0.94 }, { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: cardRef.current, start: "top 88%", toggleActions: "play none none none" } });

      const contentChildren = contentRef.current?.children;
      if (contentChildren) {
        gsap.fromTo(contentChildren, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: contentRef.current, start: "top 85%", toggleActions: "play none none none" } });
      }

      if (ringRef.current) {
        gsap.fromTo(ringRef.current, { scale: 1, opacity: 0.6 }, { scale: 2, opacity: 0, duration: 1.8, repeat: -1, ease: "power2.out" });
      }

      if (decoRef.current) {
        gsap.fromTo(decoRef.current, { opacity: 0, scale: 0.5 }, { opacity: 0.15, scale: 1, duration: 2, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" } });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });

    if (!isTouchDevice() && cardRef.current) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const moveX = (e.clientX - centerX) / (rect.width / 2);
      const moveY = (e.clientY - centerY) / (rect.height / 2);

      gsap.to(cardRef.current, {
        rotateX: moveY * -3,
        rotateY: moveX * 3,
        transformPerspective: 1000,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    gsap.to(cardRef.current, { scale: 1.02, duration: 0.5, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    gsap.to(cardRef.current, { scale: 1, rotateX: 0, rotateY: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
  };

  const handleBtnClick = (e) => {
    createRipple(e, btnRef.current);
  };

  return (
    <section ref={sectionRef} className="section-peach relative mx-auto max-w-[1400px] px-6 sm:px-10 pb-16 pt-10 overflow-hidden">
      <div
        ref={decoRef}
        className="absolute -bottom-[150px] -left-[150px] w-[500px] h-[500px] rounded-full pointer-events-none opacity-0"
        style={{
          background: "radial-gradient(circle, rgba(196,48,48,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Ghost decorations */}
      <div className="absolute top-10 left-8 opacity-[0.05] pointer-events-none" style={{ animation: "ghost-float 20s ease-in-out 2s infinite" }}>
        <svg width="55" height="55" viewBox="0 0 100 100" fill="none">
          <path d="M50 8C28 8 12 28 12 50V78C12 80 15 82 17 80C19 78 22 74 25 74C28 74 30 78 33 78C36 78 38 74 41 74C44 74 46 78 49 78C52 78 54 74 57 74C60 74 62 78 65 78C68 78 70 74 73 74C76 74 79 78 81 80C83 82 86 80 86 78V50C86 28 70 8 50 8Z" fill="#8a3030"/>
          <ellipse cx="36" cy="42" rx="6" ry="7" fill="white"/>
          <ellipse cx="64" cy="42" rx="6" ry="7" fill="white"/>
          <circle cx="37" cy="43" r="2.5" fill="#8a3030"/>
          <circle cx="65" cy="43" r="2.5" fill="#8a3030"/>
        </svg>
      </div>

      <div className="absolute bottom-16 right-12 opacity-[0.04] pointer-events-none" style={{ animation: "ghost-float 26s ease-in-out 7s infinite" }}>
        <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
          <path d="M50 15C35 15 24 30 24 45V65C24 67 26 68 28 67C30 65 32 62 34 62C36 62 38 65 40 65C42 65 44 62 46 62C48 62 50 65 52 65C54 65 56 62 58 62C60 62 62 65 64 65C66 65 68 62 70 62C72 64 74 67 76 67C78 68 80 67 80 65V45C80 30 65 15 50 15Z" fill="#8a3030"/>
          <circle cx="40" cy="40" r="3" fill="white"/>
          <circle cx="60" cy="40" r="3" fill="white"/>
        </svg>
      </div>

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] px-8 py-10 text-center shadow-2xl sm:px-12 sm:py-14 md:py-16 cursor-default"
        style={{ opacity: 0, perspective: "1200px", transformStyle: "preserve-3d" }}
        data-spotlight
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-400/40 to-transparent golden-accent-line" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-400/25 to-transparent" />
        <div ref={glowRef} className="absolute -top-[250px] -right-[250px] w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none" style={{ background: "conic-gradient(from 0deg, rgba(94,106,210,0.06), rgba(94,106,210,0.03), rgba(94,106,210,0.02), rgba(94,106,210,0.06))", filter: "blur(80px)" }} />

        <div
          style={{
            background: isHovered
              ? `radial-gradient(circle 400px at ${coords.x}px ${coords.y}px, rgba(94,106,210,0.08) 0%, transparent 80%)`
              : `radial-gradient(circle 250px at 50% 50%, rgba(94,106,210,0.03) 0%, transparent 80%)`,
          }}
          className="absolute inset-0 -z-10 transition-all duration-500 pointer-events-none"
        />

        <div ref={contentRef}>
          <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent" style={{ opacity: 0 }}>Get Started Instantly</span>
          <h2 className="mt-4 mb-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl" style={{ opacity: 0 }}>Ready to ace your next technical round?</h2>
          <p className="mx-auto mb-10 max-w-[55ch] text-[16px] sm:text-[18px] leading-relaxed text-sub md:text-[19px]" style={{ opacity: 0 }}>Free to download. No accounts, no data leaves your machine. Set up your local keys in seconds.</p>
        </div>

        <div className="relative inline-block">
          <div
            ref={ringRef}
            className="absolute inset-0 rounded-xl border-2 border-accent/30 pointer-events-none"
            style={{ opacity: 0, willChange: "transform, opacity" }}
          />
          <a
            ref={btnRef}
            href={DOWNLOAD_URL}
            onClick={handleBtnClick}
            className="ghs-btn-primary inline-flex items-center gap-3 rounded-xl bg-accent px-8 py-4 text-[15px] sm:text-[17px] font-semibold text-white shadow-premium relative overflow-hidden transition-all duration-300 hover:scale-105"
            data-cursor="magnetic"
            data-cursor-text="Download"
          >
            <Download size={18} strokeWidth={2.5} />
            Download for <span className="text-white font-bold">Windows 11</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Footer ──
function Footer() {
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
        gsap.to(logo, {
          y: -3,
          duration: 2.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="border-t border-border/30 bg-[#1a1a1f] relative z-10">
      <div ref={contentRef} className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 px-6 sm:px-8 py-10 md:flex-row">
        <div className="flex items-center gap-2.5 footer-logo" style={{ opacity: 0 }}>
          <img src="/eyes-logo.png" alt="Ozark" className="h-8 w-8 object-contain" />
          <span className="text-xs font-semibold tracking-tight text-ink">Ozark</span>
          <span className="text-[10px] font-medium text-sub/70">&copy; {new Date().getFullYear()}</span>
        </div>

        <div className="flex items-center gap-8" style={{ opacity: 0 }}>
          <a href={DOWNLOAD_URL} className="underline-reveal text-[13px] font-semibold text-sub hover:text-ink transition-colors" data-cursor="link">Download for <span className="text-ink font-bold">Windows 11</span></a>
          {FOOTER_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="underline-reveal text-[13px] font-semibold text-sub hover:text-ink transition-colors" data-cursor="link">{link.label}</a>
          ))}
        </div>

        <div className="text-[11.5px] font-medium text-sub/65" style={{ opacity: 0 }}>Your keys. Your code. Your machine.</div>
      </div>
    </footer>
  );
}

// ── Exported wrapper: all Service 1 sections ──
export default function Service1Sections() {
  useEffect(() => {
    // Refresh ScrollTrigger after mount to catch elements already in view
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Features />
      <ProvidersSection />
      <HowItWorks />
      <Shortcuts />
      <SystemRequirements />
      <SettingsSection />
      <ClosingCTA />
      <Footer />
    </>
  );
}
