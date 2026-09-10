import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download, Key, MessageSquare, Shield, ArrowRight } from "lucide-react";
import { prefersReducedMotion } from "@/lib/motion";
import { HOW_IT_WORKS } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  download: Download,
  key: Key,
  chat: MessageSquare,
  shield: Shield,
};

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const stepsRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const steps = stepsRef.current?.querySelectorAll(".step-card");
      if (steps) {
        steps.forEach((step, i) => {
          gsap.fromTo(step,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: i * 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: step,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="how-it-works" className="relative py-24 md:py-36 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block mb-3">
            Simple Setup
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-ink md:text-5xl lg:text-6xl">
            Up and running in 60 seconds
          </h2>
          <p className="mx-auto mt-4 max-w-[50ch] text-[16px] sm:text-[18px] leading-relaxed text-sub">
            No accounts, no installation wizards, no cloud sync. Just download, add your keys, and start asking.
          </p>
        </div>

        {/* Steps Grid */}
        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {HOW_IT_WORKS.map((step, i) => {
            const Icon = iconMap[step.icon] || Download;
            return (
              <div
                key={step.step}
                className="step-card relative group rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-8 transition-all duration-300 hover:border-white/[0.15] hover:shadow-lg"
                style={{ opacity: 0 }}
              >
                {/* Step Number */}
                <div className="absolute -top-3 -left-1 text-[64px] font-bold text-accent/[0.07] leading-none select-none">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="relative mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 transition-all duration-300 group-hover:bg-accent/15 group-hover:scale-110">
                  <Icon size={20} className="text-accent" />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-lg font-bold text-ink">{step.title}</h3>
                <p className="text-[14px] leading-relaxed text-sub">{step.body}</p>

                {/* Connector Arrow (hidden on last item) */}
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10">
                    <ArrowRight size={16} className="text-border" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm px-6 py-3">
            <span className="text-[13px] text-sub">System Requirements:</span>
            <span className="text-[13px] font-semibold text-ink">Windows 10/11 (64-bit)</span>
            <span className="text-border">|</span>
            <span className="text-[13px] font-semibold text-ink">.NET 6+ Runtime</span>
          </div>
        </div>
      </div>
    </section>
  );
}
