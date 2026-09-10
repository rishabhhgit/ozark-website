import { useEffect, useRef, useMemo, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import EyePair from "./ui/EyePair";

// ── Ambient dust particles (CSS-only) ──
function Particles() {
  const particles = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 10,
      duration: Math.random() * 15 + 10,
      opacity: Math.random() * 0.12 + 0.03,
    })), []);

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-ink/10"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animation: `particle-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </>
  );
}

// ── Ember particles (rising embers, CSS-only) ──
function EmberParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 5 + 2,
      delay: Math.random() * 8,
      duration: Math.random() * 12 + 8,
      opacity: Math.random() * 0.25 + 0.1,
    })), []);

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            background: "radial-gradient(circle, rgba(196,48,48,0.5) 0%, rgba(196,48,48,0) 70%)",
            animation: `golden-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </>
  );
}

// ── Ember shimmer lines ──
function EmberShimmer() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[1, 2].map((i) => (
        <div key={i} className="golden-shimmer-line absolute h-[1px] opacity-0" style={{ top: `${20 + i * 30}%`, left: 0, width: "25%", background: "linear-gradient(90deg, transparent, rgba(196,48,48,0.2), transparent)" }} />
      ))}
    </div>
  );
}

// ── Floating bats (CSS-only) ──
function FloatingBats() {
  const bats = useMemo(() =>
    Array.from({ length: 2 }, (_, i) => ({
      id: i,
      left: `${-10 + i * 55}%`,
      top: `${8 + Math.random() * 35}%`,
      size: 18 + Math.random() * 12,
      duration: 22 + Math.random() * 12,
      delay: i * 4,
      opacity: 0.05 + Math.random() * 0.04,
    })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {bats.map((bat) => (
        <div
          key={bat.id}
          className="absolute"
          style={{
            width: bat.size,
            height: bat.size * 0.6,
            opacity: bat.opacity,
            animation: `bat-fly ${bat.duration}s linear ${bat.delay}s infinite`,
          }}
        >
          <svg viewBox="0 0 60 36" fill="#8a3030" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="30" cy="20" rx="6" ry="8" />
            <path d="M24 18C20 14 12 10 4 12C8 16 12 18 16 20C12 22 8 26 4 30C12 28 20 24 24 22Z" style={{ animation: "bat-wing 0.3s ease-in-out infinite alternate" }} />
            <path d="M36 18C40 14 48 10 56 12C52 16 48 18 44 20C48 22 52 26 56 30C48 28 40 24 36 22Z" style={{ animation: "bat-wing 0.3s ease-in-out infinite alternate-reverse" }} />
            <circle cx="27" cy="18" r="1.5" fill="#1a1a1f" />
            <circle cx="33" cy="18" r="1.5" fill="#1a1a1f" />
          </svg>
        </div>
      ))}
    </div>
  );
}

// ── Fog layer (CSS-only) ──
function FogLayer() {
  return (
    <div className="absolute bottom-0 left-0 w-[120%] h-[150px] pointer-events-none opacity-[0.02] animate-fog" style={{ background: "linear-gradient(to top, rgba(140,40,40,0.3), transparent)", filter: "blur(30px)" }} />
  );
}

// ── Blood moon glow ──
function MoonGlow() {
  return (
    <div className="absolute top-[5%] right-[8%] w-[120px] h-[120px] pointer-events-none opacity-[0.06] moon-glow">
      <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, rgba(196,48,48,0.4) 0%, rgba(100,30,30,0.1) 40%, transparent 70%)", filter: "blur(20px)" }} />
    </div>
  );
}

// ── Spider webs ──
function SpiderWebs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="absolute -top-3 -left-3 opacity-[0.05]" width="140" height="140" viewBox="0 0 150 150" fill="none">
        <path d="M0 0L150 150" stroke="#8a3030" strokeWidth="0.5" />
        <path d="M0 0L150 100" stroke="#8a3030" strokeWidth="0.5" />
        <path d="M0 0L100 150" stroke="#8a3030" strokeWidth="0.5" />
        <path d="M0 0L150 50" stroke="#8a3030" strokeWidth="0.5" />
        <path d="M0 0L50 150" stroke="#8a3030" strokeWidth="0.5" />
        <circle cx="0" cy="0" r="30" stroke="#8a3030" strokeWidth="0.3" fill="none" />
        <circle cx="0" cy="0" r="60" stroke="#8a3030" strokeWidth="0.3" fill="none" />
        <circle cx="0" cy="0" r="90" stroke="#8a3030" strokeWidth="0.3" fill="none" />
      </svg>
    </div>
  );
}

// ── Magic dust (embers) ──
function MagicDust() {
  const particles = useMemo(() =>
    Array.from({ length: 3 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 6,
      duration: 4 + Math.random() * 4,
    })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div key={p.id} className="absolute rounded-full" style={{ left: p.left, top: p.top, width: p.size, height: p.size, background: "radial-gradient(circle, rgba(196,48,48,0.4) 0%, transparent 70%)", animation: `particle-float ${p.duration}s ease-in-out ${p.delay}s infinite`, opacity: 0.12 }} />
      ))}
    </div>
  );
}

// ── Watching Eyes — the ghosts of this theme. Small glowing eye-pairs that
// float, peek, and occasionally all snap open at once ("haunted" moment). ──
function WatchingEyes({ isHaunted }) {
  const eyes = useMemo(() => [
    { id: 1, left: 6, top: 16, size: 46, baseOpacity: 0.12, speed: 18 },
    { id: 2, left: 87, top: 20, size: 40, baseOpacity: 0.1, speed: 22 },
    { id: 3, left: 82, top: 58, size: 44, baseOpacity: 0.11, speed: 20 },
    { id: 4, left: 10, top: 48, size: 36, baseOpacity: 0.09, speed: 24 },
    { id: 5, left: 50, top: 40, size: 26, baseOpacity: 0.07, speed: 16 },
    { id: 6, left: 72, top: 84, size: 30, baseOpacity: 0.08, speed: 19 },
    { id: 7, left: 33, top: 8, size: 34, baseOpacity: 0.08, speed: 25 },
    { id: 8, left: 93, top: 42, size: 30, baseOpacity: 0.07, speed: 21 },
    { id: 9, left: 3, top: 72, size: 34, baseOpacity: 0.08, speed: 23 },
  ], []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {eyes.map((e) => (
        <div
          key={e.id}
          className="absolute haunted-ghost"
          style={{
            left: `${e.left}%`,
            top: `${e.top}%`,
            opacity: isHaunted ? 0.5 : e.baseOpacity,
            animation: isHaunted
              ? `ghost-chaos 0.8s ease-in-out forwards, ghost-float ${e.speed}s ease-in-out ${e.id * 0.7}s infinite`
              : `ghost-float ${e.speed}s ease-in-out ${e.id * 0.7}s infinite`,
            transition: "opacity 0.5s ease",
          }}
        >
          <EyePair size={e.size} blink glow={false} blinkMin={2500} blinkMax={8000} />
        </div>
      ))}
    </div>
  );
}

// ── Eye trail (follows scroll) ──
function EyeTrail() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (prefersReducedMotion()) return null;

  const progress = Math.min(scrollY / (document.body.scrollHeight - window.innerHeight || 1), 1);
  const count = 5;

  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
      {Array.from({ length: count }, (_, i) => {
        const threshold = i / count;
        const visible = progress > threshold;
        const fade = visible ? Math.min((progress - threshold) * count * 2, 0.22) : 0;
        const yPos = 85 - (i * 15);
        const xBase = 50 + Math.sin(i * 1.8) * 35;

        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${xBase}%`,
              top: `${yPos}%`,
              opacity: fade,
              transform: `translateY(${Math.sin(progress * 10 + i) * 8}px) rotate(${Math.sin(progress * 6 + i) * 5}deg)`,
              transition: "opacity 0.3s ease",
            }}
          >
            <EyePair size={16 + i * 3} blink={false} glow={false} />
          </div>
        );
      })}
    </div>
  );
}

// ── Edge eyes (peek from screen edges on scroll) ──
function EdgeEyes() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (prefersReducedMotion()) return null;

  const docHeight = document.body.scrollHeight - window.innerHeight || 1;
  const progress = scrollY / docHeight;

  const edges = [
    { side: "left", y: 20, threshold: 0.15, offset: 0.15 },
    { side: "right", y: 40, threshold: 0.35, offset: 0.1 },
    { side: "left", y: 65, threshold: 0.55, offset: 0.12 },
    { side: "right", y: 80, threshold: 0.75, offset: 0.08 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
      {edges.map((edge, i) => {
        const active = progress > edge.threshold;
        const peekAmount = active ? Math.min((progress - edge.threshold) / edge.offset, 1) : 0;
        const xTranslate = edge.side === "left" ? -40 + peekAmount * 40 : 40 - peekAmount * 40;

        return (
          <div
            key={i}
            className="absolute"
            style={{
              [edge.side]: peekAmount > 0 ? `${-8 + peekAmount * 8}%` : "-12%",
              top: `${edge.y}%`,
              opacity: peekAmount * 0.18,
              transform: `translateX(${xTranslate}px) rotate(${edge.side === "left" ? -15 : 15}deg)`,
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            <EyePair size={50 + i * 5} blink glow={false} />
          </div>
        );
      })}
    </div>
  );
}

// ── Haunted mode overlay ──
function HauntedOverlay({ active }) {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{
        opacity: active ? 1 : 0,
        transition: "opacity 1.5s ease-in-out",
      }}
    >
      <div className="absolute inset-0 bg-[#c43030]/[0.015]" />
    </div>
  );
}

// ── Main Background ──
export default function BackgroundMotion() {
  const containerRef = useRef(null);
  const [isHaunted, setIsHaunted] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let timeoutId;
    const scheduleHaunted = () => {
      const delay = 30000 + Math.random() * 60000;
      timeoutId = setTimeout(() => {
        setIsHaunted(true);
        setTimeout(() => {
          setIsHaunted(false);
          scheduleHaunted();
        }, 5000 + Math.random() * 2000);
      }, delay);
    };
    scheduleHaunted();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Ambient blobs — CSS animation only */}
      <div className="absolute -top-[300px] left-[10%] w-[800px] h-[800px] rounded-full opacity-38 animate-blob-drift-1" style={{ background: "radial-gradient(circle, rgba(196,48,48,0.04) 0%, transparent 70%)", filter: "blur(80px)" }} />
      <div className="absolute top-[40%] -right-[200px] w-[600px] h-[600px] rounded-full opacity-28 animate-blob-drift-2" style={{ background: "radial-gradient(circle, rgba(196,48,48,0.025) 0%, transparent 70%)", filter: "blur(100px)" }} />
      <div className="absolute top-[70%] left-[20%] w-[500px] h-[500px] rounded-full opacity-22 animate-blob-drift-3" style={{ background: "radial-gradient(circle, rgba(196,48,48,0.03) 0%, transparent 70%)", filter: "blur(90px)" }} />

      <EmberParticles />
      <EmberShimmer />
      <Particles />
      <SpiderWebs />
      <FloatingBats />
      <FogLayer />
      <MoonGlow />
      <MagicDust />
      <WatchingEyes isHaunted={isHaunted} />
      <EdgeEyes />
      <HauntedOverlay active={isHaunted} />
    </div>
  );
}
