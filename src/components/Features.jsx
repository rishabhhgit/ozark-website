import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FeatureSection from "./FeatureSection";
import { FEATURES } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Header stagger reveal
      const headerChildren = headerRef.current?.children;
      if (headerChildren) {
        gsap.fromTo(headerChildren, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none none" } });
      }

      // Section line expand with golden glow
      const line = sectionRef.current?.querySelector(".halloween-divider");
      if (line) {
        gsap.fromTo(line, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 1.5, ease: "power3.inOut", scrollTrigger: { trigger: line, start: "top 90%", toggleActions: "play none none none" } });
      }

      // Feature items with alternating slide + blur + scale
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

      // Parallax on decorative elements
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
    <section ref={sectionRef} id="features" className="section-cool relative mx-auto max-w-[1400px] px-6 sm:px-10 py-24 md:py-36 overflow-hidden">
      {/* Decorative golden accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none deco-parallax" style={{ background: "radial-gradient(circle, rgba(196,48,48,0.04) 0%, transparent 70%)", filter: "blur(80px)" }} />
      
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

      <div ref={headerRef} className="mb-16 md:mb-24 text-center">
        <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block" style={{ opacity: 0 }}>Feature Deep Dive</span>
        <h2 className="mt-3 text-4xl font-bold tracking-tight text-ink md:text-5xl lg:text-6xl" style={{ opacity: 0 }}>Everything you need to prepare</h2>
        <p className="mx-auto mt-4 max-w-[60ch] text-[16px] sm:text-[18px] leading-relaxed text-sub" style={{ opacity: 0 }}>Powerful features wrapped in a clean, distraction-free interface.</p>
        <div className="halloween-divider mx-auto mt-8 w-[100px]" style={{ transformOrigin: "center" }} />
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
