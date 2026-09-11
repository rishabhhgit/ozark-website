import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eye, Camera, Keyboard, Mic, Shield, Cpu } from "lucide-react";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  { icon: Eye, name: "Stealth Mode", desc: "Invisible to screenshots & screen share" },
  { icon: Camera, name: "Screenshot AI", desc: "Capture screen, ask AI to solve it" },
  { icon: Keyboard, name: "AutoType", desc: "AI types answers for you instantly" },
  { icon: Mic, name: "Voice Input", desc: "Speak questions, get instant answers" },
  { icon: Shield, name: "Disguise Mode", desc: "Hide as Windows Update screen" },
  { icon: Cpu, name: "Multi-Model", desc: "Switch between 8+ AI providers" },
];

export default function OzarkBox() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const headingChildren = headingRef.current?.children;
      if (headingChildren) {
        gsap.fromTo(headingChildren, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.18, ease: "power3.out", scrollTrigger: { trigger: headingRef.current, start: "top 85%", toggleActions: "play none none none" } });
      }

      const featureItems = featuresRef.current?.children;
      if (featureItems) {
        gsap.fromTo(featureItems, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: featuresRef.current, start: "top 85%", toggleActions: "play none none none" } });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative mx-auto w-full px-6 sm:px-10 py-8 md:py-10">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none opacity-15" style={{
        background: "radial-gradient(circle, rgba(196,48,48,0.04) 0%, transparent 70%)",
        filter: "blur(80px)",
      }} />

      <div ref={headingRef} className="mb-6 md:mb-8 text-center">
        <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block" style={{ opacity: 0 }}>Core Product</span>
        <h2 className="mt-2 text-4xl font-bold tracking-tight text-ink md:text-5xl lg:text-6xl" style={{ opacity: 0 }}>
          Ozark
        </h2>
        <p className="mx-auto mt-3 max-w-[60ch] text-[16px] sm:text-[18px] leading-relaxed text-sub md:text-[19px]" style={{ opacity: 0 }}>
          The invisible AI copilot for online assessments and technical interviews.
        </p>
        <div className="halloween-divider mx-auto mt-5 w-[100px]" />
      </div>

      <div className="mx-auto max-w-[1000px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
        {FEATURES.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.name}
              className="group rounded-xl border border-[rgba(196,48,48,0.08)] bg-transparent p-4 transition-all duration-300 hover:border-[rgba(196,48,48,0.2)] hover:bg-[rgba(196,48,48,0.02)]"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#c43030]/10 border border-[#c43030]/20">
                  <Icon size={14} className="text-[#c43030]" />
                </div>
                <h3 className="text-sm font-bold text-ink">{feature.name}</h3>
              </div>
              <p className="text-[13px] text-sub leading-relaxed">{feature.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-6">
        <a href="/ozark" className="inline-flex items-center gap-2 rounded-xl bg-[#c43030] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#a02525] hover:scale-105">
          Explore Ozark Features
        </a>
      </div>

      <div className="mx-auto max-w-[800px] mt-8 rounded-2xl border border-[rgba(196,48,48,0.08)] bg-transparent p-6 flex items-center gap-6">
        <img src="/globe.svg" alt="All Browser OAs" className="h-16 w-auto object-contain shrink-0" />
        <div>
          <h3 className="text-lg font-bold text-ink mb-1">All Browser-Based OAs</h3>
          <p className="text-[14px] text-sub leading-relaxed">Works on any online assessment conducted in a browser — from campus placements to coding tests.</p>
        </div>
      </div>
    </section>
  );
}
