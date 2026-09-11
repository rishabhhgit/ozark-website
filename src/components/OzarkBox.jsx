import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function OzarkBox() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const headingChildren = headingRef.current?.children;
      if (headingChildren) {
        gsap.fromTo(headingChildren, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.18, ease: "power3.out", scrollTrigger: { trigger: headingRef.current, start: "top 85%", toggleActions: "play none none none" } });
      }

      if (cardRef.current) {
        gsap.fromTo(cardRef.current, { opacity: 0, y: 50, scale: 0.95 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: cardRef.current, start: "top 85%", toggleActions: "play none none none" }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative mx-auto w-full px-6 sm:px-10 py-10 md:py-14 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none opacity-15" style={{
        background: "radial-gradient(circle, rgba(196,48,48,0.04) 0%, transparent 70%)",
        filter: "blur(80px)",
      }} />

      <div ref={headingRef} className="mb-10 md:mb-14 text-center">
        <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block" style={{ opacity: 0 }}>Core Product</span>
        <h2 className="mt-3 text-5xl font-bold tracking-tight text-ink md:text-6xl lg:text-7xl" style={{ opacity: 0 }}>Ozark</h2>
        <p className="mx-auto mt-4 max-w-[60ch] text-[16px] sm:text-[18px] leading-relaxed text-sub md:text-[20px]" style={{ opacity: 0 }}>
          The invisible AI copilot for online assessments conducted on browser.
        </p>
        <div className="inline-flex items-baseline gap-2 mt-5" style={{ opacity: 0 }}>
          <span className="text-sm font-medium text-sub">Starting from</span>
          <span className="text-3xl sm:text-4xl font-bold text-ink">₹1299</span>
          <span className="text-sm font-medium text-sub">/month</span>
        </div>
        <div className="halloween-divider mx-auto mt-8 w-[100px]" />
      </div>

      <Link to="/ozark">
        <div ref={cardRef} className="mx-auto max-w-[1000px] rounded-2xl border border-[rgba(196,48,48,0.08)] bg-transparent transition-all duration-500 hover:border-[rgba(196,48,48,0.3)] hover:shadow-2xl hover:shadow-red-500/10 overflow-hidden group cursor-pointer" style={{ opacity: 0 }}>
          <div className="flex flex-col md:flex-row">
            <div className="relative w-full md:w-1/2 aspect-[16/10] md:aspect-auto bg-gradient-to-br from-[rgba(26,26,31,0.6)] via-[rgba(30,28,32,0.5)] to-[rgba(22,20,24,0.4)] flex items-center justify-center p-10 overflow-hidden">
              <div className="absolute inset-0 opacity-30" style={{
                background: "radial-gradient(circle at 30% 40%, rgba(196,48,48,0.08) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(196,48,48,0.05) 0%, transparent 50%)",
              }} />
              <img src="/browser.svg" alt="Browser Exam Crack" className="h-32 w-auto object-contain group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-4 left-4 rounded bg-[#c43030]/90 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                Flashkick
              </div>
              <div className="absolute top-4 right-4 text-[11px] text-[#9a8a8a] font-medium">BRW</div>
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-ink mb-3">Browser Exam Crack</h3>
              <p className="text-[15px] text-sub leading-relaxed mb-5">Crack any browser-based OA with the help of an invisible AI overlay</p>
              <div className="mb-5">
                <span className="text-[12px] font-semibold text-accent uppercase tracking-wider">For browser-level exams only</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-[12px] font-medium text-accent/80 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5">Invisible overlay</span>
                <span className="text-[12px] font-medium text-accent/80 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5">Bypasses lockdown</span>
                <span className="text-[12px] font-medium text-accent/80 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5">AutoType answers</span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      <div className="text-center mt-10">
        <a href="/ozark" className="inline-flex items-center gap-2 rounded-xl bg-[#c43030] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#a02525] hover:scale-105">
          Explore Ozark Features
        </a>
      </div>
    </section>
  );
}
