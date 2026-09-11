import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  {
    id: 2,
    name: "Mettl Secure Browser Crack",
    tag: "MSB",
    badge: null,
    description: "Hidden from Mettl's screen recording, browser lockdown, and webcam monitoring. Full stealth mode.",
    bgGradient: "from-[rgba(26,26,31,0.6)] via-[rgba(29,27,31,0.5)] to-[rgba(21,19,23,0.4)]",
    image: "/mercel-mettl.png",
  },
  {
    id: 3,
    name: "HackerRank Bypass",
    tag: "HRB",
    badge: "Flashkick",
    description: "Invisible AI assistance inside HackerRank. Capture questions, get instant solutions, AutoType answers.",
    bgGradient: "from-[rgba(26,26,31,0.6)] via-[rgba(28,26,30,0.5)] to-[rgba(20,18,22,0.4)]",
    image: "/hackerrank.svg",
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

      <div className="mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {PRODUCTS.map((product) => (
          <div
            key={product.id}
            className="relative overflow-hidden rounded-2xl border border-[rgba(196,48,48,0.08)] bg-transparent transition-all duration-300 hover:border-[rgba(196,48,48,0.2)] hover:scale-[1.02]"
          >
            <div className="flex flex-col h-full">
              <div className={`relative aspect-[16/10] bg-gradient-to-br ${product.bgGradient} flex items-center justify-center p-8 overflow-hidden`}>
                <div className="absolute inset-0 opacity-30" style={{
                  background: "radial-gradient(circle at 30% 40%, rgba(196,48,48,0.08) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(196,48,48,0.05) 0%, transparent 50%)",
                }} />
                <img src={product.image} alt={product.name} className="h-20 w-auto object-contain" />
                {product.badge && (
                  <div className="absolute top-3 left-3 rounded bg-[#c43030]/90 px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">
                    {product.badge}
                  </div>
                )}
                <div className="absolute top-3 right-3 text-[10px] text-[#9a8a8a] font-medium">
                  {product.tag}
                </div>
              </div>
              <div className="p-5 md:p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-ink mb-2">{product.name}</h3>
                <p className="text-sm text-sub leading-relaxed flex-1 min-h-[60px]">{product.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <a href="/ozark" className="inline-flex items-center gap-2 rounded-xl bg-[#c43030] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#a02525] hover:scale-105">
          Explore Ozark Features
        </a>
      </div>
    </section>
  );
}
