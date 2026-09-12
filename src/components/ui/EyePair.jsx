import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

function Eye({ flip, pupilRef, lidRef }) {
  return (
    <svg viewBox="-10 -10 120 100" width="100%" height="100%" style={{ transform: flip ? "scaleX(-1)" : undefined, overflow: "visible" }}>
      {/* main eye — bold red almond shape */}
      <path
        d="M5 42C5 42 20 8 50 5C80 8 95 42 95 42C95 42 80 65 50 75C20 65 5 42 5 42Z"
        fill="#e60000"
      />
      {/* subtle highlight */}
      <path
        d="M15 38C15 38 28 15 50 12C72 15 85 38 85 38C85 38 72 22 50 19C28 22 15 38 15 38Z"
        fill="#ff3333"
        opacity="0.5"
      />
      {/* inner glow */}
      <ellipse cx="50" cy="40" rx="30" ry="18" fill="#cc0000" opacity="0.3" />
      {/* black slit pupil */}
      <g ref={pupilRef}>
        <ellipse cx="50" cy="40" rx="5" ry="25" fill="#000000" />
        <ellipse cx="50" cy="40" rx="3" ry="20" fill="#111111" />
      </g>
      {/* pupil highlight */}
      <circle cx="46" cy="30" r="2" fill="white" opacity="0.15" />
      {/* bottom shadow lines */}
      <path d="M12 55C25 65 40 70 55 68" stroke="#8a0000" strokeWidth="2.5" fill="none" opacity="0.6" />
      <path d="M15 58C28 67 42 72 57 69" stroke="#660000" strokeWidth="1.5" fill="none" opacity="0.4" />
      {/* blink lid */}
      <g ref={lidRef} style={{ transformOrigin: "50px 40px", transform: "scaleY(0)" }}>
        <path
          d="M-10 -10 L120 -10 L120 50 C120 50 100 80 50 85 C0 80 -10 50 -10 50 Z"
          fill="var(--eye-lid-bg, #0a0a0f)"
        />
      </g>
    </svg>
  );
}

export default function EyePair({
  size = 120,
  gap = 0.25,
  trackCursor = false,
  trackTarget = null,
  blink = true,
  blinkMin = 3000,
  blinkMax = 7000,
  className = "",
  style = {},
}) {
  const rootRef = useRef(null);
  const leftPupil = useRef(null);
  const rightPupil = useRef(null);
  const leftLid = useRef(null);
  const rightLid = useRef(null);

  useEffect(() => {
    if (!blink || prefersReducedMotion()) return;
    let killed = false;
    let t;
    const lids = [leftLid.current, rightLid.current].filter(Boolean);

    const doBlink = () => {
      if (killed) return;
      gsap.timeline()
        .to(lids, { scaleY: 1, duration: 0.12, ease: "power2.in" })
        .to(lids, { scaleY: 0, duration: 0.18, ease: "power2.out" }, "+=0.05");
    };
    const schedule = () => {
      const delay = blinkMin + Math.random() * (blinkMax - blinkMin);
      t = setTimeout(() => { doBlink(); schedule(); }, delay);
    };
    schedule();
    return () => { killed = true; clearTimeout(t); };
  }, [blink, blinkMin, blinkMax]);

  useEffect(() => {
    if (!trackCursor || prefersReducedMotion()) return;
    const quickL = gsap.quickTo(leftPupil.current, "x", { duration: 0.3, ease: "power2.out" });
    const quickLY = gsap.quickTo(leftPupil.current, "y", { duration: 0.3, ease: "power2.out" });
    const quickR = gsap.quickTo(rightPupil.current, "x", { duration: 0.3, ease: "power2.out" });
    const quickRY = gsap.quickTo(rightPupil.current, "y", { duration: 0.3, ease: "power2.out" });
    const RANGE_X = 8;
    const RANGE_Y = 6;

    const handleMove = (e) => {
      const el = rootRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2)));
      const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2)));
      quickL(dx * RANGE_X);
      quickLY(dy * RANGE_Y);
      quickR(dx * RANGE_X);
      quickRY(dy * RANGE_Y);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [trackCursor]);

  return (
    <div
      ref={rootRef}
      className={`flex items-center pointer-events-none ${className}`}
      style={{ width: size, gap: size * gap, ...style }}
    >
      <div style={{ width: "50%", aspectRatio: "100/80", position: "relative" }}>
        <Eye flip pupilRef={leftPupil} lidRef={leftLid} />
      </div>
      <div style={{ width: "50%", aspectRatio: "100/80", position: "relative" }}>
        <Eye pupilRef={rightPupil} lidRef={rightLid} />
      </div>
    </div>
  );
}
