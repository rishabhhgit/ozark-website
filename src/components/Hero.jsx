import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Download, ArrowRight, ShieldCheck, Eye, Zap, Keyboard, ChevronDown } from "lucide-react";
import AppWindow from "./AppWindow";
import EyePair from "./ui/EyePair";
import { DOWNLOAD_URL } from "@/lib/config";
import { prefersReducedMotion, isTouchDevice } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

function FloatingParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 5 + 2,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 6,
      opacity: Math.random() * 0.3 + 0.1,
    })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-accent/20"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animation: `particle-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const valuePropsRef = useRef(null);
  const appWindowRef = useRef(null);
  const trustRef = useRef(null);
  const ambientPurpleRef = useRef(null);
  const ambientPeachRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const mouseParallaxRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Ambient glow entrance
      tl.fromTo(ambientPurpleRef.current, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }, 0);
      tl.fromTo(ambientPeachRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }, 0.2);

      // Badge with spring
      tl.fromTo(badgeRef.current, { opacity: 0, y: 20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" }, 0.4);

      // Character-by-character heading reveal
      const headingChars = headingRef.current?.querySelectorAll(".char");
      if (headingChars?.length) {
        gsap.set(headingChars, { opacity: 0, y: 40, rotationX: -40 });
        tl.to(headingChars, { opacity: 1, y: 0, rotationX: 0, duration: 0.5, stagger: 0.012, ease: "power3.out" }, 0.6);
      }

      // Subtitle fade-in
      tl.fromTo(subtitleRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 1);

      // CTA buttons with spring
      const ctaButtons = ctaRef.current?.children;
      if (ctaButtons?.length) {
        tl.fromTo(ctaButtons, { opacity: 0, y: 20, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12, ease: "back.out(1.4)" }, 1.2);
      }

      // Value props stagger
      const valueProps = valuePropsRef.current?.children;
      if (valueProps?.length) {
        tl.fromTo(valueProps, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" }, 1.4);
      }

      // App window with 3D entrance
      tl.fromTo(appWindowRef.current, { opacity: 0, scale: 0.88, y: 50, rotateX: 8 }, { opacity: 1, scale: 1, y: 0, rotateX: 0, duration: 1.1, ease: "power3.out" }, 0.8);

      // Trust section
      tl.fromTo(trustRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 1.6);

      // Provider pills with spring stagger
      const providerPills = trustRef.current?.querySelectorAll(".provider-pill");
      if (providerPills?.length) {
        tl.fromTo(providerPills, { opacity: 0, scale: 0.85, y: 10 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "back.out(1.7)" }, 1.8);
      }

      // Scroll indicator
      if (scrollIndicatorRef.current) {
        tl.fromTo(scrollIndicatorRef.current, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 2.2);
      }

      // Ambient parallax on scroll
      gsap.to(ambientPurpleRef.current, { y: 100, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1.5 } });
      gsap.to(ambientPeachRef.current, { y: 70, x: -25, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 2 } });

      // Mouse parallax on heading (subtle)
      if (!isTouchDevice() && headingRef.current) {
        const heading = headingRef.current;
        const handleMouseMove = (e) => {
          const rect = sectionRef.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const moveX = (e.clientX - centerX) / rect.width;
          const moveY = (e.clientY - centerY) / rect.height;
          gsap.to(heading, { x: moveX * 8, y: moveY * 5, duration: 0.8, ease: "power2.out" });
        };
        sectionRef.current.addEventListener("mousemove", handleMouseMove, { passive: true });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text) => {
    return text.split(" ").map((word, wi) => (
      <span key={wi} className="inline-block whitespace-nowrap">
        {word.split("").map((char, ci) => (
          <span key={ci} className="char inline-block" style={{ perspective: "400px" }}>
            {char}
          </span>
        ))}
        {wi < text.split(" ").length - 1 && (
          <span className="char inline-block" style={{ perspective: "400px" }}>{"\u00A0"}</span>
        )}
      </span>
    ));
  };

  return (
    <section ref={sectionRef} className="relative mx-auto w-full px-6 pb-16 pt-20 sm:px-10 sm:pb-20 sm:pt-24 md:pb-24 md:pt-28 min-h-screen">
      {/* Ambient glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div ref={ambientPurpleRef} className="absolute -top-[200px] left-[15%] w-[600px] h-[600px] sm:w-[900px] sm:h-[900px] rounded-full opacity-0" style={{ background: "radial-gradient(circle, rgba(196,48,48,0.04) 0%, transparent 70%)", filter: "blur(100px)" }} />
        <div ref={ambientPeachRef} className="absolute top-[10%] left-[50%] w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full opacity-0" style={{ background: "radial-gradient(circle, rgba(139,0,0,0.06) 0%, transparent 70%)", filter: "blur(100px)" }} />
        {/* Ember accent glow */}
        <div className="absolute top-[30%] right-[10%] w-[400px] h-[400px] rounded-full opacity-40" style={{ background: "radial-gradient(circle, rgba(196,48,48,0.03) 0%, transparent 70%)", filter: "blur(80px)" }} />
      </div>

        {/* Giant watching eyes — track the cursor across the whole viewport */}
        <div className="absolute top-[2%] right-[-2%] w-[300px] sm:w-[400px] md:w-[560px] lg:w-[680px] opacity-[0.5] pointer-events-none">
          <EyePair size={680} gap={0.1} trackCursor blink blinkMin={4000} blinkMax={9000} />
        </div>

      <FloatingParticles />

      <div ref={mouseParallaxRef} className="relative z-10 grid items-center gap-12 lg:grid-cols-[1fr_680px] lg:gap-16" style={{ perspective: "1200px" }}>
        <div className="order-2 lg:order-1 min-w-0">
          <div ref={badgeRef} className="mb-8 sm:mb-10 inline-flex items-center gap-2 rounded-full border border-border/50 bg-bg/80 px-4 py-2 sm:px-5 sm:py-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-accent shadow-[0_1px_2px_rgba(0,0,0,0.01)] backdrop-blur-sm" style={{ opacity: 0 }}>
            <Sparkles size={13} className="text-accent" />
            Built for Online Assessment and Interview
          </div>

          <h1 ref={headingRef} className="mb-6 sm:mb-8 text-[32px] sm:text-[40px] md:text-[52px] lg:text-[68px] font-bold leading-[1.05] tracking-tight">
              {splitText("Ace every online assessment and interview.")}
            <br />
            <span className="text-ink/30">
              {splitText("with an invisible AI copilot.")}
            </span>
          </h1>

          <p ref={subtitleRef} className="mb-8 sm:mb-10 max-w-[520px] text-[16px] sm:text-[18px] lg:text-[20px] leading-relaxed text-sub" style={{ opacity: 0 }}>
            Ozark sits discreetly beside your screen. Switch models instantly, stream coding solutions, and format system design explanations, completely offline and privacy-first.
          </p>

          <div ref={ctaRef} className="flex flex-wrap items-center gap-4 sm:gap-5">
            <a href="/ozark" className="ghs-btn-ghost flex items-center gap-1.5 rounded-xl px-4 py-3.5 sm:px-5 sm:py-4 text-[14px] sm:text-[16px] font-semibold text-sub hover:text-ink transition-all duration-300 hover:scale-105" style={{ opacity: 0 }} data-cursor="expand" data-cursor-text="Explore">
              Learn how it works <ArrowRight size={16} className="ml-1" />
            </a>
          </div>

          <div ref={valuePropsRef} className="mt-10 sm:mt-12 grid grid-cols-3 gap-6 sm:gap-8 border-t border-border/40 pt-6 sm:pt-8">
            <div className="flex flex-col gap-2" style={{ opacity: 0 }}>
              <div className="flex items-center gap-2 text-ink font-semibold text-[12px] sm:text-sm">
                <Eye size={16} className="text-accent" />
                Stealth Mode
              </div>
              <span className="text-[11px] sm:text-[13px] text-sub leading-snug">Invisible to screenshots & screen share.</span>
            </div>
            <div className="flex flex-col gap-2" style={{ opacity: 0 }}>
              <div className="flex items-center gap-2 text-ink font-semibold text-[12px] sm:text-sm">
                <Zap size={16} className="text-accent" />
                Screenshot AI
              </div>
              <span className="text-[11px] sm:text-[13px] text-sub leading-snug">Capture screen, ask AI to solve it.</span>
            </div>
            <div className="flex flex-col gap-2" style={{ opacity: 0 }}>
              <div className="flex items-center gap-2 text-ink font-semibold text-[12px] sm:text-sm">
                <Keyboard size={16} className="text-accent" />
                AutoType
              </div>
              <span className="text-[11px] sm:text-[13px] text-sub leading-snug">AI types answers for you instantly.</span>
            </div>
          </div>
        </div>

        <div ref={appWindowRef} className="relative max-w-[320px] sm:max-w-[480px] md:max-w-[600px] lg:max-w-[880px] xl:max-w-[1000px] justify-self-center w-full min-w-0 order-1 lg:order-2 app-window-container" style={{ opacity: 0, transformStyle: "preserve-3d" }}>
          <div className="absolute inset-0 bg-accent/5 rounded-2xl filter blur-2xl" />
          <AppWindow />
        </div>
      </div>

      <div ref={trustRef} className="mt-12 sm:mt-16 pt-6 sm:pt-8 text-center" style={{ opacity: 0 }}>
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-sub/70">Compatible with all frontier engines</span>
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-x-8 sm:gap-x-10 gap-y-4 sm:gap-y-5">
          {["OpenAI", "Claude", "Gemini", "DeepSeek", "Groq", "Ollama", "Mistral"].map((provider, i) => (
            <span key={provider} className="provider-pill font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-ink/35 border border-gold-400/15 bg-bg rounded-lg px-4 py-2 sm:px-5 sm:py-2.5 shadow-[inset_0_1px_2px_rgba(196,48,48,0.02)] transition-all duration-300 cursor-default hover:text-ink/80 hover:border-gold-400/30 hover:shadow-[0_8px_24px_rgba(196,48,48,0.04)] hover:scale-105" data-cursor="expand" data-cursor-text={provider} style={{ animationDelay: `${i * 0.1}s` }}>
              {provider}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollIndicatorRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0" style={{ opacity: 0 }}>
        <span className="text-[11px] font-medium text-sub/50 uppercase tracking-widest">Scroll</span>
        <div className="animate-scroll-bounce">
          <ChevronDown size={18} className="text-sub/40" />
        </div>
      </div>
    </section>
  );
}
