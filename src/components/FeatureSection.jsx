import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FeatureVisual from "./FeatureVisual";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function FeatureSection({ eyebrow, title, body, kind, reverse, index }) {
  const sectionRef = useRef(null);
  const visualRef = useRef(null);
  const textRef = useRef(null);
  const decoRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        }
      });

      // Check if already in view — if so, play immediately
      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.85;

      if (inView) {
        gsap.set(visualRef.current, { opacity: 1, x: 0, rotateY: 0, scale: 1 });
        const textChildren = textRef.current?.children;
        if (textChildren) gsap.set(textChildren, { opacity: 1, x: 0, y: 0 });
        if (decoRef.current) gsap.set(decoRef.current, { opacity: 0.15, scale: 1 });
      } else {
        tl.fromTo(visualRef.current, { opacity: 0, x: reverse ? 80 : -80, rotateY: reverse ? -12 : 12, scale: 0.92 }, { opacity: 1, x: 0, rotateY: 0, scale: 1, duration: 1.2, ease: "power3.out" }, 0);

        const textChildren = textRef.current?.children;
        if (textChildren) {
          tl.fromTo(textChildren, { opacity: 0, x: reverse ? -40 : 40, y: 20 }, { opacity: 1, x: 0, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" }, 0.2);
        }

        if (decoRef.current) {
          tl.fromTo(decoRef.current, { opacity: 0, scale: 0.6 }, { opacity: 0.15, scale: 1, duration: 1.5, ease: "power2.out" }, 0);
        }
      }

    }, sectionRef);

    return () => ctx.revert();
  }, [reverse]);

  return (
    <div ref={sectionRef} className="relative grid items-center gap-4 py-4 md:grid-cols-2 md:gap-8 md:py-6">
      {/* Decorative background element */}
      <div
        ref={decoRef}
        className="absolute pointer-events-none opacity-0"
        style={{
          [reverse ? "right" : "left"]: "-10%",
          top: "10%",
          width: "400px",
          height: "400px",
          background: `radial-gradient(circle, rgba(196,48,48,0.03) 0%, transparent 70%)`,
          filter: "blur(60px)",
          borderRadius: "50%",
        }}
      />

      <div ref={visualRef} className={`${reverse ? "md:order-2" : "md:order-1"} flex justify-center`} style={{ opacity: 0, perspective: "1200px" }}>
        <FeatureVisual kind={kind} />
      </div>
      <div ref={textRef} className={reverse ? "md:order-1" : "md:order-2"}>
        <div className="mb-2 text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent" style={{ opacity: 0 }}>{eyebrow}</div>
        <h3 className="mb-3 text-[32px] sm:text-[38px] font-bold leading-tight tracking-tight text-ink md:text-[44px]" style={{ opacity: 0 }}>{title}</h3>
        <p className="max-w-[50ch] text-[16px] sm:text-[18px] leading-relaxed text-sub md:text-[19px]" style={{ opacity: 0 }}>{body}</p>
      </div>
    </div>
  );
}
