import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";
import { SHORTCUTS } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function Shortcuts() {
  const sectionRef = useRef(null);
  const tableRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      if (tableRef.current) {
        gsap.fromTo(tableRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: tableRef.current,
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
      <div className="mx-auto max-w-[800px] px-6 md:px-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block mb-3">
            Keyboard Shortcuts
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Control everything from anywhere
          </h2>
          <p className="mx-auto mt-4 max-w-[45ch] text-[15px] leading-relaxed text-sub">
            Global hotkeys work even when Ozark is in the background. No need to switch windows.
          </p>
        </div>

        {/* Shortcuts Table */}
        <div
          ref={tableRef}
          className="rounded-xl overflow-hidden"
          style={{ opacity: 0 }}
        >
          {/* Header */}
          <div className="grid grid-cols-[1fr_1fr] gap-4 px-6 py-4 border-b border-border/30">
            <span className="text-[13px] font-bold text-sub">Shortcut</span>
            <span className="text-[13px] font-bold text-sub">Action</span>
          </div>

          {/* Rows */}
          {SHORTCUTS.map((s, i) => (
            <div
              key={s.action}
              className={`grid grid-cols-[1fr_1fr] gap-4 px-6 py-3.5 transition-colors hover:bg-hover/30 ${i % 2 === 0 ? "bg-bg/30" : "bg-transparent"}`}
            >
              <div className="flex items-center gap-1.5">
                {s.keys.map((k, ki) => (
                  <span key={ki} className="flex items-center gap-1.5">
                    <kbd className="inline-flex h-7 min-w-[28px] items-center justify-center rounded-lg bg-ink/[0.08] border border-ink/[0.06] px-2 font-mono text-[12px] font-semibold text-ink shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                      {k}
                    </kbd>
                    {ki < s.keys.length - 1 && (
                      <span className="text-[11px] text-sub/40 font-medium">+</span>
                    )}
                  </span>
                ))}
              </div>
              <span className="text-[13px] text-sub flex items-center">{s.action}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
