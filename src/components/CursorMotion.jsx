import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { isTouchDevice, prefersReducedMotion } from "@/lib/motion";

export default function CursorMotion() {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorGlowRef = useRef(null);
  const cursorSpotlightRef = useRef(null);
  const cursorLabelRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const scaleRef = useRef({ x: 1, y: 1 });
  const rafRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorVariant, setCursorVariant] = useState("default");
  const [cursorLabel, setCursorLabel] = useState("");

  useEffect(() => {
    if (prefersReducedMotion() || isTouchDevice()) return;

    document.body.style.cursor = "none";
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    const glow = cursorGlowRef.current;
    const spotlight = cursorSpotlightRef.current;

    if (!cursor || !dot) return;

    const lerp = (a, b, t) => a + (b - a) * t;
    let lastTime = performance.now();

    const animate = (currentTime) => {
      const dt = Math.min((currentTime - lastTime) / 16.667, 3);
      lastTime = currentTime;

      // Calculate velocity
      velRef.current.x = mouseRef.current.x - posRef.current.x;
      velRef.current.y = mouseRef.current.y - posRef.current.y;

      const speed = Math.sqrt(velRef.current.x ** 2 + velRef.current.y ** 2);

      // Spring interpolation for position
      const springFactor = 0.14;
      posRef.current.x = lerp(posRef.current.x, mouseRef.current.x, springFactor * dt);
      posRef.current.y = lerp(posRef.current.y, mouseRef.current.y, springFactor * dt);

      // Velocity-influenced target
      const velocityInfluence = 0.1;
      const targetX = posRef.current.x + velRef.current.x * velocityInfluence;
      const targetY = posRef.current.y + velRef.current.y * velocityInfluence;

      // Velocity-based stretching
      const stretchFactor = Math.min(speed / 800, 1);
      const angle = Math.atan2(velRef.current.y, velRef.current.x);

      // Smooth scale interpolation
      const targetScaleX = 1 + stretchFactor * 0.4;
      const targetScaleY = 1 - stretchFactor * 0.15;
      scaleRef.current.x = lerp(scaleRef.current.x, targetScaleX, 0.1 * dt);
      scaleRef.current.y = lerp(scaleRef.current.y, targetScaleY, 0.1 * dt);

      gsap.set(cursor, {
        x: targetX,
        y: targetY,
        rotation: (angle * 180) / Math.PI,
        scaleX: scaleRef.current.x,
        scaleY: scaleRef.current.y,
      });
      gsap.set(dot, { x: mouseRef.current.x, y: mouseRef.current.y });

      if (glow) {
        gsap.set(glow, {
          x: lerp(posRef.current.x, mouseRef.current.x, 0.05),
          y: lerp(posRef.current.y, mouseRef.current.y, 0.05),
          scale: 1 + stretchFactor * 0.2,
        });
      }

      if (spotlight) {
        gsap.set(spotlight, { x: mouseRef.current.x, y: mouseRef.current.y });
      }

      prevMouseRef.current.x = mouseRef.current.x;
      prevMouseRef.current.y = mouseRef.current.y;

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleElementHover = (e) => {
      const target = e.target.closest("a, button, [data-cursor]");
      if (!target) {
        setCursorVariant("default");
        setCursorLabel("");
        return;
      }

      const cursorType = target.getAttribute("data-cursor");
      const cursorText = target.getAttribute("data-cursor-text");

      if (cursorText) {
        setCursorVariant("label");
        setCursorLabel(cursorText);
      } else if (cursorType) {
        setCursorVariant(cursorType);
      } else if (target.tagName === "A") {
        setCursorVariant("link");
      } else if (target.tagName === "BUTTON") {
        setCursorVariant("button");
      }
    };

    const handleCardHover = (e) => {
      const card = e.target.closest("[data-spotlight]");
      if (card && spotlight) spotlight.style.opacity = "1";
    };

    const handleCardLeave = (e) => {
      const card = e.target.closest("[data-spotlight]");
      if (card && spotlight) spotlight.style.opacity = "0";
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleElementHover);
    document.addEventListener("mouseover", handleCardHover);
    document.addEventListener("mouseout", handleCardLeave);

    return () => {
      document.body.style.cursor = "";
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleElementHover);
      document.removeEventListener("mouseover", handleCardHover);
      document.removeEventListener("mouseout", handleCardLeave);
    };
  }, []);

  const getCursorConfig = () => {
    const configs = {
      default: { w: 36, h: 36, border: "rgba(196,48,48,0.12)", bg: "rgba(196,48,48,0.03)", dotSize: 5 },
      link: { w: 56, h: 56, border: "rgba(196,48,48,0.18)", bg: "rgba(196,48,48,0.04)", dotSize: 6 },
      button: { w: 64, h: 64, border: "rgba(196,48,48,0.22)", bg: "rgba(196,48,48,0.05)", dotSize: 6 },
      expand: { w: 80, h: 80, border: "rgba(196,48,48,0.18)", bg: "rgba(196,48,48,0.04)", dotSize: 6 },
      magnetic: { w: 72, h: 72, border: "rgba(196,48,48,0.25)", bg: "rgba(196,48,48,0.06)", dotSize: 6 },
      label: { w: 88, h: 88, border: "rgba(196,48,48,0.3)", bg: "rgba(196,48,48,0.08)", dotSize: 7 },
      card: { w: 120, h: 120, border: "rgba(196,48,48,0.18)", bg: "rgba(196,48,48,0.05)", dotSize: 6 },
    };
    return configs[cursorVariant] || configs.default;
  };

  const config = getCursorConfig();

  return (
    <>
      {/* Main cursor ring with velocity stretch */}
      <div
        ref={cursorRef}
        className="cursor-ring gpu-accelerated"
        style={{
          position: "fixed", top: 0, left: 0,
          width: config.w, height: config.h, borderRadius: "50%",
          border: `1.5px solid ${config.border}`,
          backgroundColor: config.bg,
          pointerEvents: "none", zIndex: 99999,
          transform: "translate(-50%, -50%)",
          transition: "width 0.35s cubic-bezier(0.22,1,0.36,1), height 0.35s cubic-bezier(0.22,1,0.36,1), border 0.3s, background-color 0.3s",
          opacity: isVisible ? 1 : 0,
          willChange: "transform",
        }}
      />

      {/* Glow trail */}
      <div
        ref={cursorGlowRef}
        className="cursor-glow gpu-accelerated"
        style={{
          position: "fixed", top: 0, left: 0,
          width: 160, height: 160, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,48,48,0.06) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 99998,
          transform: "translate(-50%, -50%)",
          opacity: isVisible ? (cursorVariant !== "default" ? 0.9 : 0.5) : 0,
          transition: "opacity 0.4s", filter: "blur(2px)",
          willChange: "transform",
        }}
      />

      {/* Spotlight for cards */}
      <div
        ref={cursorSpotlightRef}
        className="cursor-spotlight gpu-accelerated"
        style={{
          position: "fixed", top: 0, left: 0,
          width: 350, height: 350, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,48,48,0.08) 0%, rgba(196,48,48,0.03) 40%, transparent 70%)",
          pointerEvents: "none", zIndex: 99997,
          transform: "translate(-50%, -50%)", opacity: 0,
          transition: "opacity 0.5s cubic-bezier(0.22,1,0.36,1)", filter: "blur(6px)",
          willChange: "transform",
        }}
      />

      {/* Inner dot */}
      <div
        ref={cursorDotRef}
        className="cursor-dot gpu-accelerated"
        style={{
          position: "fixed", top: 0, left: 0,
          width: config.dotSize,
          height: config.dotSize,
          backgroundColor: cursorVariant === "label" ? "#d04040" : "#c43030",
          borderRadius: "50%", pointerEvents: "none", zIndex: 100000,
          transform: "translate(-50%, -50%)",
          transition: "width 0.25s, height 0.25s, background-color 0.25s",
          opacity: isVisible ? 1 : 0,
          willChange: "transform",
        }}
      />

      {/* Label */}
      {cursorVariant === "label" && cursorLabel && (
        <div
          ref={cursorLabelRef}
          className="cursor-label gpu-accelerated"
          style={{
            position: "fixed", top: 0, left: 0,
            pointerEvents: "none", zIndex: 100001,
            transform: "translate(-50%, -50%)",
            opacity: isVisible ? 1 : 0,
            willChange: "transform",
          }}
        >
          <span className="text-[10px] font-bold text-accent uppercase tracking-widest whitespace-nowrap">
            {cursorLabel}
          </span>
        </div>
      )}
    </>
  );
}
