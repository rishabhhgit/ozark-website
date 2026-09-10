import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Monitor, Cpu, HardDrive, CheckCircle } from "lucide-react";
import { prefersReducedMotion } from "@/lib/motion";
import { SYSTEM_REQUIREMENTS } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function SystemRequirements() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(contentRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-[1000px] px-6 md:px-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block mb-3">
            System Requirements
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
            What you need to run Ozark
          </h2>
        </div>

        {/* Requirements Grid */}
        <div
          ref={contentRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          style={{ opacity: 0 }}
        >
          {/* OS */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 border border-accent/20">
              <Monitor size={20} className="text-accent" />
            </div>
            <h3 className="mb-2 text-sm font-bold text-ink">Operating System</h3>
            <p className="text-[13px] text-sub leading-relaxed">{SYSTEM_REQUIREMENTS.os}</p>
          </div>

          {/* Runtime */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 border border-accent/20">
              <Cpu size={20} className="text-accent" />
            </div>
            <h3 className="mb-2 text-sm font-bold text-ink">.NET Runtime</h3>
            <p className="text-[13px] text-sub leading-relaxed">{SYSTEM_REQUIREMENTS.runtime}</p>
          </div>

          {/* Disk */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 border border-accent/20">
              <HardDrive size={20} className="text-accent" />
            </div>
            <h3 className="mb-2 text-sm font-bold text-ink">Disk Space</h3>
            <div className="text-[13px] text-sub leading-relaxed">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <CheckCircle size={12} className="text-green-500" />
                <span>Framework: {SYSTEM_REQUIREMENTS.disk.framework}</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <CheckCircle size={12} className="text-green-500" />
                <span>Self-contained: {SYSTEM_REQUIREMENTS.disk.selfContained}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RAM */}
        <div className="mt-6 rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6 text-center max-w-[400px] mx-auto">
          <h3 className="mb-2 text-sm font-bold text-ink">Memory</h3>
          <p className="text-[13px] text-sub">{SYSTEM_REQUIREMENTS.ram}</p>
        </div>
      </div>
    </section>
  );
}
