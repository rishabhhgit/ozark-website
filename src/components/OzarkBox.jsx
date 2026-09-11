import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  {
    id: 1,
    name: "Safe Exam Browser Crack",
    tag: "SEB",
    badge: "Flashkick",
    description: "Bypass SEB lockdown mode. Runs outside its monitoring scope — invisible to proctoring and tab-switch detection.",
    bgGradient: "from-[rgba(26,26,31,0.6)] via-[rgba(30,28,32,0.5)] to-[rgba(22,20,24,0.4)]",
    image: "/seb.webp",
  },
];

export default function OzarkBox() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const headingChildren = headingRef.current?.children;
      if (headingChildren) {
        gsap.fromTo(headingChildren, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.18, ease: "power3.out", scrollTrigger: { trigger: headingRef.current, start: "top 85%", toggleActions: "play none none none" } });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative mx-auto w-full px-6 sm:px-10 py-8 md:py-10 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none opacity-15" style={{
        background: "radial-gradient(circle, rgba(196,48,48,0.04) 0%, transparent 70%)",
        filter: "blur(80px)",
      }} />

      <div ref={headingRef} className="mb-8 md:mb-12 text-center">
        <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block" style={{ opacity: 0 }}>Core Product</span>
        <h2 className="mt-3 text-4xl font-bold tracking-tight text-ink md:text-5xl lg:text-6xl" style={{ opacity: 0 }}>Ozark</h2>
        <p className="mx-auto mt-4 max-w-[60ch] text-[16px] sm:text-[18px] leading-relaxed text-sub md:text-[19px]" style={{ opacity: 0 }}>
          The invisible AI copilot for online assessments conducted on browser.
        </p>
        <div className="inline-flex items-baseline gap-2 mt-4" style={{ opacity: 0 }}>
          <span className="text-sm font-medium text-sub">Starting from</span>
          <span className="text-2xl sm:text-3xl font-bold text-ink">₹1299</span>
          <span className="text-sm font-medium text-sub">/month</span>
        </div>
        <div className="halloween-divider mx-auto mt-8 w-[100px]" />
      </div>

      <Link to="/ozark">
      <div className="mx-auto max-w-[900px] rounded-2xl border border-[rgba(196,48,48,0.08)] bg-transparent transition-all duration-300 hover:border-[rgba(196,48,48,0.2)] hover:scale-[1.02] overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className={`relative w-full md:w-1/2 aspect-[16/10] md:aspect-auto bg-gradient-to-br ${PRODUCTS[0].bgGradient} flex items-center justify-center p-8 overflow-hidden`}>
            <div className="absolute inset-0 opacity-30" style={{
              background: "radial-gradient(circle at 30% 40%, rgba(196,48,48,0.08) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(196,48,48,0.05) 0%, transparent 50%)",
            }} />
            <img src="/globe.svg" alt="Browser Exam Crack" className="h-24 w-auto object-contain" />
            <div className="absolute top-3 left-3 rounded bg-[#c43030]/90 px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">
              Flashkick
            </div>
            <div className="absolute top-3 right-3 text-[10px] text-[#9a8a8a] font-medium">BRW</div>
          </div>
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-ink mb-2">Browser Exam Crack</h3>
            <p className="text-sm text-sub leading-relaxed mb-4">Bypass SEB lockdown mode. Runs outside its monitoring scope — invisible to proctoring and tab-switch detection.</p>
            <div className="mb-4">
              <span className="text-[11px] font-semibold text-accent uppercase tracking-wider">For browser-level exams only</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-[11px] font-medium text-accent/80 bg-accent/10 border border-accent/20 rounded-full px-3 py-1">Invisible overlay</span>
              <span className="text-[11px] font-medium text-accent/80 bg-accent/10 border border-accent/20 rounded-full px-3 py-1">Bypasses lockdown</span>
              <span className="text-[11px] font-medium text-accent/80 bg-accent/10 border border-accent/20 rounded-full px-3 py-1">AutoType answers</span>
            </div>
          </div>
        </div>
      </div>
      </Link>

      <div className="text-center mt-8">
        <a href="/ozark" className="inline-flex items-center gap-2 rounded-xl bg-[#c43030] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#a02525] hover:scale-105">
          Explore Ozark Features
        </a>
      </div>
    </section>
  );
}
