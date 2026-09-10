import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { isTouchDevice, prefersReducedMotion } from "@/lib/motion";

// Bounding boxes adjusted to tightly fit the actual eye shapes in the image
const EYE_BOXES = [
  { left: 4, top: 8, width: 41, height: 85 },  // left eye
  { left: 56, top: 8, width: 41, height: 85 }, // right eye
];

export default function AnimatedLogo({ size = 40, interactive = true }) {
  const wrapRef = useRef(null);
  const imgRef = useRef(null);
  const topLidRefs = useRef([]);
  const botLidRefs = useRef([]);
  const pupilRefs = useRef([]);
  const [isHovered, setIsHovered] = useState(false);
  const idleIntervalRef = useRef(null);

  const height = size;
  const width = size * (429 / 203);

  // Entrance: eyes open
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const topLids = topLidRefs.current.filter(Boolean);
    const botLids = botLidRefs.current.filter(Boolean);
    gsap.set([...topLids, ...botLids], { scaleY: 1 });
    gsap.to([...topLids, ...botLids], {
      scaleY: 0,
      duration: 0.6,
      ease: "power3.out",
      delay: 0.4,
      stagger: 0.06,
    });
  }, []);

  // Glow + blink + idle
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const topLids = topLidRefs.current.filter(Boolean);
    const botLids = botLidRefs.current.filter(Boolean);
    const allLids = [...topLids, ...botLids];
    const pupils = pupilRefs.current.filter(Boolean);

    // Breathing glow
    const glowTl = gsap.timeline({ repeat: -1, yoyo: true });
    glowTl.to(imgRef.current, {
      filter: "drop-shadow(0 0 8px rgba(196,48,48,0.4)) drop-shadow(0 0 20px rgba(196,48,48,0.15))",
      duration: 2.5,
      ease: "sine.inOut",
    });
    glowTl.to(imgRef.current, {
      filter: "drop-shadow(0 0 14px rgba(196,48,48,0.6)) drop-shadow(0 0 32px rgba(196,48,48,0.25))",
      duration: 1.8,
      ease: "sine.inOut",
    });

    // Natural blink: top lid does most of the work, bottom lid moves slightly
    let killed = false;
    let blinkTimeout;

    const doBlink = (pattern = "single") => {
      if (killed || !allLids.length) return;

      if (pattern === "double") {
        const tl = gsap.timeline();
        // First blink
        tl.to(topLids, { scaleY: 1, duration: 0.06, ease: "power2.in" })
          .to(botLids, { scaleY: 0.7, duration: 0.06, ease: "power2.in" }, "<")
          .to(topLids, { scaleY: 0, duration: 0.09, ease: "power2.out" }, "+=0.01")
          .to(botLids, { scaleY: 0, duration: 0.09, ease: "power2.out" }, "<")
          // Pause between blinks
          .to({}, { duration: 0.1 })
          // Second blink
          .to(topLids, { scaleY: 1, duration: 0.055, ease: "power2.in" })
          .to(botLids, { scaleY: 0.7, duration: 0.055, ease: "power2.in" }, "<")
          .to(topLids, { scaleY: 0, duration: 0.1, ease: "power2.out" }, "+=0.01")
          .to(botLids, { scaleY: 0, duration: 0.1, ease: "power2.out" }, "<");
      } else if (pattern === "slow") {
        const tl = gsap.timeline();
        tl.to(topLids, { scaleY: 1, duration: 0.12, ease: "power1.in" })
          .to(botLids, { scaleY: 0.6, duration: 0.12, ease: "power1.in" }, "<")
          .to({}, { duration: 0.06 })
          .to(topLids, { scaleY: 0, duration: 0.18, ease: "power1.out" })
          .to(botLids, { scaleY: 0, duration: 0.18, ease: "power1.out" }, "<");
      } else {
        // Single quick blink
        const tl = gsap.timeline();
        tl.to(topLids, { scaleY: 1, duration: 0.055, ease: "power3.in" })
          .to(botLids, { scaleY: 0.65, duration: 0.055, ease: "power3.in" }, "<")
          .to(topLids, { scaleY: 0, duration: 0.1, ease: "power2.out" }, "+=0.015")
          .to(botLids, { scaleY: 0, duration: 0.1, ease: "power2.out" }, "<");
      }
    };

    const scheduleBlink = () => {
      const delay = 2000 + Math.random() * 4500;
      blinkTimeout = setTimeout(() => {
        const roll = Math.random();
        if (roll < 0.18) doBlink("double");
        else if (roll < 0.28) doBlink("slow");
        else doBlink("single");
        scheduleBlink();
      }, delay);
    };
    scheduleBlink();

    // Idle look-around
    if (pupils.length && !isTouchDevice()) {
      const idleLook = () => {
        const dx = (Math.random() - 0.5) * 4;
        const dy = (Math.random() - 0.5) * 3;
        pupils.forEach((p) => {
          gsap.to(p, { x: dx, y: dy, duration: 0.6, ease: "power2.out" });
        });
      };
      idleIntervalRef.current = setInterval(() => {
        if (!document.hidden && Math.random() < 0.35) idleLook();
      }, 3200);
    }

    return () => {
      killed = true;
      clearTimeout(blinkTimeout);
      glowTl.kill();
      if (idleIntervalRef.current) clearInterval(idleIntervalRef.current);
    };
  }, []);

  // Cursor tracking
  useEffect(() => {
    if (prefersReducedMotion() || isTouchDevice() || !interactive) return;
    const pupils = pupilRefs.current.filter(Boolean);
    if (!pupils.length) return;

    if (idleIntervalRef.current) {
      clearInterval(idleIntervalRef.current);
      idleIntervalRef.current = null;
    }

    const quickX = pupils.map((p) => gsap.quickTo(p, "x", { duration: 0.3, ease: "power3.out" }));
    const quickY = pupils.map((p) => gsap.quickTo(p, "y", { duration: 0.3, ease: "power3.out" }));

    const RANGE_X = 3.5;
    const RANGE_Y = 2.5;

    const handleMouseMove = (e) => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2.5)));
      const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2.5)));
      pupils.forEach((_, i) => {
        quickX[i](dx * RANGE_X);
        quickY[i](dy * RANGE_Y);
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [interactive]);

  // Hover
  useEffect(() => {
    if (prefersReducedMotion() || isTouchDevice() || !interactive) return;
    const el = wrapRef.current;
    if (!el) return;

    const handleEnter = () => {
      setIsHovered(true);
      gsap.to(wrapRef.current, {
        scale: 1.1,
        duration: 0.4,
        ease: "elastic.out(1, 0.5)",
      });
      // Quick blink
      const topLids = topLidRefs.current.filter(Boolean);
      const botLids = botLidRefs.current.filter(Boolean);
      gsap.timeline()
        .to([...topLids, ...botLids], { scaleY: 1, duration: 0.04, ease: "power3.in" })
        .to([...topLids, ...botLids], { scaleY: 0, duration: 0.12, ease: "back.out(2)" }, "+=0.03");
    };

    const handleLeave = () => {
      setIsHovered(false);
      gsap.to(wrapRef.current, {
        scale: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });
    };

    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [interactive]);

  return (
    <div
      ref={wrapRef}
      className="relative inline-block"
      style={{
        width,
        height,
        cursor: interactive ? "pointer" : "default",
        willChange: "transform",
      }}
    >
      <img
        ref={imgRef}
        src="/eyes-logo-transparent.png"
        alt="Ozark logo"
        width={width}
        height={height}
        draggable={false}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "contain",
          filter: "drop-shadow(0 0 8px rgba(196,48,48,0.4))",
          userSelect: "none",
        }}
      />
      {EYE_BOXES.map((box, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: `${box.left}%`,
            top: `${box.top}%`,
            width: `${box.width}%`,
            height: `${box.height}%`,
            overflow: "hidden",
          }}
        >
          {/* Pupil - centered, moves with cursor */}
          <div
            ref={(el) => (pupilRefs.current[i] = el)}
            className="absolute pointer-events-none"
            style={{
              left: "50%",
              top: "50%",
              width: "28%",
              height: "38%",
              marginLeft: "-14%",
              marginTop: "-19%",
              background: "radial-gradient(circle at 40% 35%, #111118 0%, #06060a 70%)",
              borderRadius: "50%",
              boxShadow: "inset 0 0 3px rgba(196,48,48,0.06)",
              zIndex: 1,
            }}
          />
          {/* Specular highlight */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: "42%",
              top: "32%",
              width: "12%",
              height: "14%",
              background: "radial-gradient(circle, rgba(196,48,48,0.45) 0%, transparent 70%)",
              borderRadius: "50%",
              zIndex: 3,
            }}
          />
          {/* Top eyelid */}
          <div
            ref={(el) => (topLidRefs.current[i] = el)}
            className="absolute pointer-events-none"
            style={{
              left: "-5%",
              top: "-10%",
              width: "110%",
              height: "55%",
              background: "linear-gradient(180deg, #1a1a1f 60%, rgba(26,26,31,0.9) 80%, transparent 100%)",
              transform: "scaleY(0)",
              transformOrigin: "50% 0%",
              zIndex: 4,
            }}
          />
          {/* Bottom eyelid */}
          <div
            ref={(el) => (botLidRefs.current[i] = el)}
            className="absolute pointer-events-none"
            style={{
              left: "-5%",
              bottom: "-10%",
              width: "110%",
              height: "45%",
              background: "linear-gradient(0deg, #1a1a1f 60%, rgba(26,26,31,0.9) 80%, transparent 100%)",
              transform: "scaleY(0)",
              transformOrigin: "50% 100%",
              zIndex: 4,
            }}
          />
        </div>
      ))}
    </div>
  );
}
