import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle, XCircle, Server } from "lucide-react";
import { prefersReducedMotion } from "@/lib/motion";
import { PROVIDERS } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function ProvidersSection() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".provider-card");
      if (cards) {
        cards.forEach((card, i) => {
          gsap.fromTo(card,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: i * 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
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
    <section ref={sectionRef} id="providers" className="relative py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block mb-3">
            AI Providers & Models
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Connect to any AI backend
          </h2>
          <p className="mx-auto mt-4 max-w-[55ch] text-[15px] leading-relaxed text-sub">
            Ozark supports 8 built-in providers plus custom OpenAI-compatible endpoints.
            Provide API keys for cloud providers, or run locally with Ollama.
          </p>
        </div>

        {/* Providers Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROVIDERS.map((provider) => (
            <div
              key={provider.name}
              className="provider-card rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-5 transition-all duration-300 hover:border-white/[0.15] hover:shadow-md"
              style={{ opacity: 0 }}
            >
              {/* Provider Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: provider.color }}
                  />
                  <span className="text-[14px] font-bold text-ink">{provider.name}</span>
                </div>
                {provider.requiresKey ? (
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-600 bg-amber-500/10 border border-amber-500/20 rounded-full px-2 py-0.5">
                    <CheckCircle size={10} />
                    Key Required
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-green-600 bg-green-500/10 border border-green-500/20 rounded-full px-2 py-0.5">
                    <XCircle size={10} />
                    No Key Needed
                  </span>
                )}
              </div>

              {/* Models */}
              <div className="flex flex-wrap gap-1.5">
                {provider.models.map((model) => (
                  <span
                    key={model}
                    className="inline-flex rounded-md bg-ink/[0.04] border border-ink/[0.06] px-2 py-1 text-[10px] font-mono font-medium text-sub"
                  >
                    {model}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Custom Provider Card */}
          <div className="provider-card rounded-xl border border-dashed border-accent/30 bg-accent/[0.02] backdrop-blur-sm p-5 transition-all duration-300 hover:border-accent/40 hover:shadow-md" style={{ opacity: 0 }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="h-3 w-3 rounded-full bg-gradient-to-br from-accent to-accent/60" />
                <span className="text-[14px] font-bold text-ink">Custom</span>
              </div>
              <span className="flex items-center gap-1 text-[10px] font-semibold text-accent bg-accent/10 border border-accent/20 rounded-full px-2 py-0.5">
                <Server size={10} />
                Self-Hosted
              </span>
            </div>
            <p className="text-[12px] text-sub leading-relaxed">
              Add any OpenAI-compatible endpoint with name, URL, API key, and model list.
            </p>
          </div>
        </div>

        {/* Server AI Note */}
        <div className="mt-8 rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6 max-w-[600px] mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Server size={16} className="text-accent" />
            <span className="text-[13px] font-bold text-ink">Server AI (Managed)</span>
          </div>
          <p className="text-[13px] text-sub leading-relaxed">
            If connected to a backend account, you may have access to managed Server AI providers
            with usage limits. Providers are automatically disabled when limits are reached.
          </p>
        </div>
      </div>
    </section>
  );
}
