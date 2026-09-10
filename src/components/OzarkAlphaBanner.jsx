import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Zap, Eye, Lock, ChevronRight, Star } from "lucide-react";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  {
    name: "Safe Exam Browser",
    abbr: "SEB",
    icon: Shield,
    color: "#3b82f6",
  },
  {
    name: "Mettl Secure Browser",
    abbr: "MSB",
    icon: Lock,
    color: "#8b5cf6",
  },
  {
    name: "HackerRank",
    abbr: "HRB",
    icon: Zap,
    color: "#10b981",
  },
];

const FEATURES = [
  "Stealth invisibility to proctoring",
  "Screenshot & screen-share protection",
  "AI-powered instant solutions",
  "Human-like AutoType engine",
  "Disguise mode (Windows Update)",
  "Voice input with Whisper AI",
];

export default function OzarkAlphaBanner() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const productsRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none none" },
      });

      tl.fromTo(cardRef.current, { opacity: 0, y: 60, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }, 0);
      tl.fromTo(titleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.3);

      const productItems = productsRef.current?.children;
      if (productItems?.length) {
        tl.fromTo(productItems, { opacity: 0, x: -30, scale: 0.9 }, { opacity: 1, x: 0, scale: 1, duration: 0.5, stagger: 0.12, ease: "back.out(1.5)" }, 0.5);
      }

      const featureItems = featuresRef.current?.children;
      if (featureItems?.length) {
        tl.fromTo(featureItems, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power3.out" }, 0.8);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative mx-auto w-full px-6 sm:px-10 py-20 sm:py-28">
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(139,58,238,0.06) 0%, transparent 70%)", filter: "blur(100px)" }} />
      </div>

      <div ref={cardRef} className="relative max-w-[1100px] mx-auto rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#0f0f1a] via-[#12121f] to-[#0a0a14] overflow-hidden shadow-2xl" style={{ opacity: 0 }}>
        {/* Top gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />

        <div className="p-8 sm:p-12 lg:p-16">
          {/* Header */}
          <div ref={titleRef} className="mb-12 sm:mb-16" style={{ opacity: 0 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 mb-6">
              <Star size={12} className="text-purple-400" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300">Premium Bundle</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Ozark <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Alpha</span>
            </h2>
            <p className="text-base sm:text-lg text-white/50 max-w-[600px] leading-relaxed">
              The ultimate exam bypass toolkit. One subscription unlocks stealth access to all supported secure browsers.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Products included */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white/30 mb-6">Included Products</h3>
              <div ref={productsRef} className="space-y-4">
                {PRODUCTS.map((product) => {
                  const Icon = product.icon;
                  return (
                    <div key={product.abbr} className="group flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]" style={{ opacity: 0 }}>
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl" style={{ backgroundColor: `${product.color}15`, border: `1px solid ${product.color}30` }}>
                        <Icon size={20} style={{ color: product.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white">{product.name}</div>
                        <div className="text-xs text-white/30 font-mono">{product.abbr}</div>
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-white/20 bg-white/[0.05] px-2 py-1 rounded">Included</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white/30 mb-6">Key Capabilities</h3>
              <div ref={featuresRef} className="space-y-3">
                {FEATURES.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-white/60" style={{ opacity: 0 }}>
                    <ChevronRight size={14} className="text-purple-400/70 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-10">
                <a href="/ozarkAlpha" className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-600/20">
                  <Eye size={16} />
                  Explore Ozark Alpha
                  <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
