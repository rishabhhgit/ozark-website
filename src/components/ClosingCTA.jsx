import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download } from "lucide-react";
import { DOWNLOAD_URL } from "@/lib/config";
import { prefersReducedMotion, isTouchDevice, createRipple } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function ClosingCTA() {
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
      // Card entrance with 3D perspective
      gsap.fromTo(cardRef.current, { opacity: 0, y: 60, rotateX: 8, scale: 0.94 }, { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: cardRef.current, start: "top 88%", toggleActions: "play none none none" } });

      // Content children stagger
      const contentChildren = contentRef.current?.children;
      if (contentChildren) {
        gsap.fromTo(contentChildren, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: contentRef.current, start: "top 85%", toggleActions: "play none none none" } });
      }

      // Pulsing ring animation
      if (ringRef.current) {
        gsap.fromTo(ringRef.current, { scale: 1, opacity: 0.6 }, { scale: 2, opacity: 0, duration: 1.8, repeat: -1, ease: "power2.out" });
      }

      // Decorative element
      if (decoRef.current) {
        gsap.fromTo(decoRef.current, { opacity: 0, scale: 0.5 }, { opacity: 0.15, scale: 1, duration: 2, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" } });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });

    // 3D tilt on card
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
    <section ref={sectionRef} className="section-peach relative mx-auto max-w-[1400px] px-6 sm:px-10 pb-32 pt-16 overflow-hidden">
      {/* Decorative golden blob */}
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
        {/* Golden accent lines */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-400/40 to-transparent golden-accent-line" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-400/25 to-transparent" />
        {/* Rotating conic gradient glow */}
        <div ref={glowRef} className="absolute -top-[250px] -right-[250px] w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none" style={{ background: "conic-gradient(from 0deg, rgba(196,48,48,0.06), rgba(196,48,48,0.03), rgba(196,48,48,0.02), rgba(196,48,48,0.06))", filter: "blur(80px)" }} />

        {/* Mouse-following radial gradient */}
        <div
          style={{
            background: isHovered
              ? `radial-gradient(circle 400px at ${coords.x}px ${coords.y}px, rgba(196,48,48,0.08) 0%, transparent 80%)`
              : `radial-gradient(circle 250px at 50% 50%, rgba(196,48,48,0.03) 0%, transparent 80%)`,
          }}
          className="absolute inset-0 -z-10 transition-all duration-500 pointer-events-none"
        />

        <div ref={contentRef}>
          <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent" style={{ opacity: 0 }}>Get Started Instantly</span>
          <h2 className="mt-4 mb-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl" style={{ opacity: 0 }}>Ready to ace your next technical round?</h2>
          <p className="mx-auto mb-6 max-w-[55ch] text-[16px] sm:text-[18px] leading-relaxed text-sub md:text-[19px]" style={{ opacity: 0 }}>Free to download. No accounts, no data leaves your machine. Set up your local keys in seconds.</p>
        </div>

        <div className="relative inline-block">
          {/* Pulsing ring */}
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
