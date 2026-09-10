import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AppWindow from "./AppWindow";
import OzarkBox from "./OzarkBox";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function AppShowcase() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const appWindowRef = useRef(null);
  const decoRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Header stagger with blur
      const headingChildren = headingRef.current?.children;
      if (headingChildren) {
        gsap.fromTo(headingChildren, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.18, ease: "power3.out", scrollTrigger: { trigger: headingRef.current, start: "top 85%", toggleActions: "play none none none" } });
      }

      // App window 3D entrance with scale
      gsap.fromTo(appWindowRef.current, 
        { opacity: 0, scale: 0.8, y: 100, rotateX: 15 }, 
        { opacity: 1, scale: 1, y: 0, rotateX: 0, duration: 1.5, ease: "power3.out", scrollTrigger: { trigger: appWindowRef.current, start: "top 90%", toggleActions: "play none none none" } }
      );

      // Decorative element with parallax
      if (decoRef.current) {
        gsap.fromTo(decoRef.current, { opacity: 0, scale: 0.5 }, { opacity: 0.25, scale: 1, duration: 2.5, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" } });
        gsap.to(decoRef.current, { y: -60, rotation: 12, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 3 } });
      }

      // Ghost decorative parallax
      const ghostDeco = sectionRef.current?.querySelector(".ghost-deco");
      if (ghostDeco) {
        gsap.to(ghostDeco, { y: -40, rotation: -5, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 2 } });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative mx-auto w-full px-6 sm:px-10 py-16 md:py-20 overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Decorative golden blob */}
      <div
        ref={decoRef}
        className="absolute -top-[100px] -right-[150px] w-[500px] h-[500px] rounded-full pointer-events-none opacity-0"
        style={{
          background: "radial-gradient(circle, rgba(196,48,48,0.04) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Ghost decorative element */}
      <div className="ghost-deco absolute top-40 left-10 opacity-[0.06] pointer-events-none" style={{ animation: "ghost-float 22s ease-in-out infinite" }}>
        <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
          <path d="M50 10C30 10 15 28 15 48V75C15 78 18 80 20 78C22 76 24 72 27 72C30 72 32 76 35 76C38 76 40 72 43 72C46 72 48 76 51 76C54 76 56 72 59 72C62 72 64 76 67 76C70 76 72 72 75 72C78 72 80 76 83 76C85 78 88 76 88 73V48C88 28 73 10 50 10Z" fill="#8a3030" />
          <ellipse cx="38" cy="40" rx="5" ry="5.5" fill="white" />
          <ellipse cx="62" cy="40" rx="5" ry="5.5" fill="white" />
        </svg>
      </div>

      {/* Peeking ghost — bottom right */}
      <div className="absolute bottom-10 right-20 opacity-[0.05] pointer-events-none deco-parallax" style={{ animation: "ghost-float 28s ease-in-out 5s infinite" }}>
        <svg width="45" height="45" viewBox="0 0 100 100" fill="none">
          <path d="M20 100V45C20 25 35 10 55 10C75 10 90 25 90 45V100C90 100 85 95 80 95C75 95 70 100 65 100C60 100 55 95 50 95C45 95 40 100 35 100C30 100 25 95 20 100Z" fill="#8a3030"/>
          <ellipse cx="42" cy="50" rx="5" ry="6" fill="white"/>
          <ellipse cx="68" cy="50" rx="5" ry="6" fill="white"/>
          <circle cx="43" cy="51" r="2" fill="#8a3030"/>
          <circle cx="69" cy="51" r="2" fill="#8a3030"/>
        </svg>
      </div>

      <OzarkBox />

      <div ref={headingRef} className="mb-16 md:mb-24 text-center">
        <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block" style={{ opacity: 0 }}>Interactive Demo</span>
        <h2 className="mt-3 text-4xl font-bold tracking-tight text-ink md:text-5xl lg:text-6xl" style={{ opacity: 0 }}>An interface that stays out of your way</h2>
        <p className="mx-auto mt-4 max-w-[60ch] text-[16px] sm:text-[18px] leading-relaxed text-sub md:text-[19px]" style={{ opacity: 0 }}>Every provider, every model, and your full history — sitting neatly alongside your editor.</p>
        <div className="halloween-divider mx-auto mt-8 w-[100px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1400px]" style={{ perspective: "1400px" }}>
        <div ref={appWindowRef} className="app-window-container" style={{ opacity: 0, transformStyle: "preserve-3d" }}>
          <AppWindow detailed />
        </div>
      </div>
    </section>
  );
}
