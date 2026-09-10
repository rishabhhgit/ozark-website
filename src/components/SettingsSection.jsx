import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Settings, Key, Globe, MessageSquare, Server, Monitor, Eye, Palette, Cpu, Shield, Zap } from "lucide-react";
import { prefersReducedMotion } from "@/lib/motion";
import { SETTINGS_CONFIG } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  "anthropic": Key,
  "openai": Key,
  "gemini": Key,
  "groq": Key,
  "mistral": Key,
  "openrouter": Key,
  "ollama": Globe,
  "prompt": MessageSquare,
  "stealth": Eye,
  "providers": Server,
  "theme": Palette,
  "hotkey": Zap,
  "window": Monitor,
  "security": Shield,
  "model": Cpu,
};

const EXTRA_SETTINGS = [
  { key: "theme", label: "Theme", description: "Switch between light, dark, and system themes" },
  { key: "hotkey", label: "Global Hotkeys", description: "Customize all keyboard shortcuts from the Shortcuts tab" },
  { key: "window", label: "Window Behavior", description: "Control always-on-top, transparency, and taskbar visibility" },
  { key: "security", label: "Security Mode", description: "Enable disguise mode and screen-capture exclusion" },
  { key: "model", label: "Default Model", description: "Set your preferred model for each provider on startup" },
];

const ALL_SETTINGS = [...SETTINGS_CONFIG, ...EXTRA_SETTINGS];

export default function SettingsSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const noteRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const headerChildren = headerRef.current?.children;
      if (headerChildren) {
        gsap.fromTo(headerChildren, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none none" } });
      }

      const items = gridRef.current?.querySelectorAll(".setting-item");
      if (items) {
        items.forEach((item, i) => {
          gsap.fromTo(item,
            { opacity: 0, x: i % 2 === 0 ? -16 : 16 },
            {
              opacity: 1,
              x: 0,
              duration: 0.45,
              delay: i * 0.05,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 92%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }

      if (noteRef.current) {
        gsap.fromTo(noteRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: noteRef.current, start: "top 92%", toggleActions: "play none none none" } });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-[800px] px-6 md:px-10">
        <div ref={headerRef} className="text-center mb-12">
          <span className="text-[12px] sm:text-xs font-bold uppercase tracking-wider text-accent block mb-3" style={{ opacity: 0 }}>
            Settings & Configuration
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl" style={{ opacity: 0 }}>
            Everything you can customize
          </h2>
          <p className="mx-auto mt-4 max-w-[50ch] text-[15px] leading-relaxed text-sub" style={{ opacity: 0 }}>
            Click the gear icon to open Settings. All preferences are saved automatically
            to %APPDATA%\Ozark\settings.json.
          </p>
        </div>

        <div
          ref={gridRef}
          className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm overflow-hidden divide-y divide-border/20"
        >
          {ALL_SETTINGS.map((setting) => {
            const Icon = iconMap[setting.key] || Settings;
            return (
              <div
                key={setting.key}
                className="setting-item flex items-center gap-4 px-5 py-4 transition-colors hover:bg-hover/30"
                style={{ opacity: 0 }}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 border border-accent/20 flex-shrink-0">
                  <Icon size={16} className="text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[13px] font-bold text-ink">{setting.label}</h4>
                  <p className="text-[12px] text-sub leading-relaxed">{setting.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div ref={noteRef} className="mt-6 rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-5" style={{ opacity: 0 }}>
          <div className="flex items-start gap-3">
            <Server size={16} className="text-accent flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[13px] font-bold text-ink mb-1">Custom Providers</h4>
              <p className="text-[12px] text-sub leading-relaxed">
                Add your own OpenAI-compatible endpoints with: Name, Endpoint URL, API Key,
                Models (comma-separated), and Supports Images option.
                Custom providers appear in the dropdown alongside built-in ones.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
