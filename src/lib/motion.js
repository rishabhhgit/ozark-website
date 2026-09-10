import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Utilities ──
export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isTouchDevice = () =>
  typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);

// ── Scroll-Triggered Animations ──

export function scrollReveal(element, options = {}) {
  if (!element || prefersReducedMotion()) return null;
  const {
    y = 40, x = 0, opacity = 0, duration = 1.1, start = "top 88%",
    ease = "power2.out", scale = 1, rotateX = 0, rotateY = 0, filter = "blur(2px)",
  } = options;

  gsap.set(element, { opacity, y, x, scale, rotateX, rotateY, filter });

  return gsap.to(element, {
    opacity: 1, y: 0, x: 0, scale: 1, rotateX: 0, rotateY: 0, filter: "blur(0px)",
    duration, ease,
    scrollTrigger: { trigger: element, start, toggleActions: "play none none none" },
  });
}

export function scrollStagger(container, options = {}) {
  if (!container || prefersReducedMotion()) return null;
  const {
    selector = "> *", y = 30, x = 0, opacity = 0, duration = 0.9,
    stagger = 0.08, start = "top 85%", ease = "power2.out",
  } = options;

  const children = container.querySelectorAll(selector);
  if (!children.length) return null;

  gsap.set(children, { opacity, y, x });

  return gsap.to(children, {
    opacity: 1, y: 0, x: 0, duration, stagger, ease,
    scrollTrigger: { trigger: container, start, toggleActions: "play none none none" },
  });
}

export function parallax(element, options = {}) {
  if (!element || prefersReducedMotion()) return null;
  const { speed = 0.3, axis = "y", start = "top bottom", end = "bottom top" } = options;
  const props = axis === "y" ? { yPercent: speed * 100 } : { xPercent: speed * 100 };

  return gsap.to(element, {
    ...props, ease: "none",
    scrollTrigger: { trigger: element, start, end, scrub: 1.5 },
  });
}

// ── Interactive Effects ──

export function magneticButton(element, options = {}) {
  if (!element || prefersReducedMotion() || isTouchDevice()) return null;
  const { strength = 0.3, duration = 0.4 } = options;

  const handleMove = (e) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    gsap.to(element, {
      x: (e.clientX - centerX) * strength,
      y: (e.clientY - centerY) * strength,
      duration, ease: "power2.out",
    });
  };

  const handleLeave = () => {
    gsap.to(element, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
  };

  element.addEventListener("mousemove", handleMove);
  element.addEventListener("mouseleave", handleLeave);

  return () => {
    element.removeEventListener("mousemove", handleMove);
    element.removeEventListener("mouseleave", handleLeave);
  };
}

export function cardTilt(element, options = {}) {
  if (!element || prefersReducedMotion() || isTouchDevice()) return null;
  const { maxTilt = 3, perspective = 1000, scale = 1.02, speed = 400 } = options;

  const handleMove = (e) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    gsap.to(element, {
      rotateX: (mouseY / (rect.height / 2)) * -maxTilt,
      rotateY: (mouseX / (rect.width / 2)) * maxTilt,
      scale, transformPerspective: perspective,
      duration: speed / 1000, ease: "power2.out",
    });

    // Dynamic shadow based on cursor position
    const shadowX = (mouseX / rect.width) * 10;
    const shadowY = (mouseY / rect.height) * 10;
    element.style.boxShadow = `${shadowX}px ${shadowY}px 30px rgba(0,0,0,0.08), ${shadowX * 0.5}px ${shadowY * 0.5}px 15px rgba(0,0,0,0.04)`;
  };

  const handleLeave = () => {
    gsap.to(element, {
      rotateX: 0, rotateY: 0, scale: 1,
      duration: 0.6, ease: "elastic.out(1, 0.5)",
    });
    element.style.boxShadow = "";
  };

  element.addEventListener("mousemove", handleMove);
  element.addEventListener("mouseleave", handleLeave);

  return () => {
    element.removeEventListener("mousemove", handleMove);
    element.removeEventListener("mouseleave", handleLeave);
  };
}

// ── Spotlight Effect ──
export function spotlightEffect(element) {
  if (!element || prefersReducedMotion() || isTouchDevice()) return null;

  const handleMove = (e) => {
    const rect = element.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    element.style.setProperty("--spotlight-x", `${x}%`);
    element.style.setProperty("--spotlight-y", `${y}%`);
  };

  element.addEventListener("mousemove", handleMove);
  return () => element.removeEventListener("mousemove", handleMove);
}

// ── Ripple Effect ──
export function createRipple(e, element) {
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  const ripple = document.createElement("span");
  ripple.className = "ripple-effect";
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  element.style.position = "relative";
  element.style.overflow = "hidden";
  element.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);
}

// ── Floating Animation (GSAP) ──
export function floatingAnimation(element, options = {}) {
  if (!element || prefersReducedMotion()) return null;
  const { yRange = 8, xRange = 4, rotation = 1, duration = 4, delay = 0 } = options;

  return gsap.to(element, {
    y: `+=${yRange}`,
    x: `+=${xRange}`,
    rotation,
    duration,
    delay,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });
}

// ── Mouse Parallax ──
export function mouseParallax(element, options = {}) {
  if (!element || prefersReducedMotion() || isTouchDevice()) return null;
  const { strength = 20, container = document.body } = options;

  const handleMove = (e) => {
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const moveX = (e.clientX - centerX) / rect.width;
    const moveY = (e.clientY - centerY) / rect.height;

    gsap.to(element, {
      x: moveX * strength,
      y: moveY * strength,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  container.addEventListener("mousemove", handleMove, { passive: true });
  return () => container.removeEventListener("mousemove", handleMove);
}

// ── Gradient Follow ──
export function gradientFollow(element) {
  if (!element || prefersReducedMotion() || isTouchDevice()) return null;

  const handleMove = (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    element.style.background = `radial-gradient(circle 300px at ${x}px ${y}px, rgba(196,48,48,0.04) 0%, transparent 80%)`;
  };

  const handleLeave = () => {
    element.style.background = `radial-gradient(circle 200px at 50% 50%, rgba(196,48,48,0.02) 0%, transparent 80%)`;
  };

  element.addEventListener("mousemove", handleMove);
  element.addEventListener("mouseleave", handleLeave);
  return () => {
    element.removeEventListener("mousemove", handleMove);
    element.removeEventListener("mouseleave", handleLeave);
  };
}

// ── Reveal Mask Animation ──
export function revealMask(element, options = {}) {
  if (!element || prefersReducedMotion()) return null;
  const { direction = "right", duration = 0.8, start = "top 85%" } = options;

  const clipFrom = direction === "right" ? "inset(0 100% 0 0)"
    : direction === "left" ? "inset(0 0 0 100%)"
    : direction === "bottom" ? "inset(100% 0 0 0)"
    : "inset(0 100% 0 0)";

  gsap.set(element, { clipPath: clipFrom });

  return gsap.to(element, {
    clipPath: "inset(0 0% 0 0)",
    duration,
    ease: "power3.inOut",
    scrollTrigger: { trigger: element, start, toggleActions: "play none none none" },
  });
}

// ── Staggered Text Reveal ──
export function staggeredTextReveal(container, options = {}) {
  if (!container || prefersReducedMotion()) return null;
  const { y = 30, duration = 0.6, stagger = 0.08, start = "top 85%" } = options;

  const children = container.children;
  if (!children.length) return null;

  gsap.set(children, { opacity: 0, y });

  return gsap.to(children, {
    opacity: 1, y: 0, duration, stagger, ease: "power3.out",
    scrollTrigger: { trigger: container, start, toggleActions: "play none none none" },
  });
}

// ── Hooks ──

export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tween = scrollReveal(el, options);
    return () => {
      tween?.kill();
      ScrollTrigger.getAll().forEach((st) => { if (st.trigger === el) st.kill(); });
    };
  }, []);
  return ref;
}

export function useParallax(speed = 0.3) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tween = parallax(el, { speed });
    return () => {
      tween?.kill();
      ScrollTrigger.getAll().forEach((st) => { if (st.trigger === el) st.kill(); });
    };
  }, []);
  return ref;
}

export function useCardTilt(options = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cleanup = cardTilt(el, options);
    return cleanup;
  }, []);
  return ref;
}

export function useMagnetic(options = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cleanup = magneticButton(el, options);
    return cleanup;
  }, []);
  return ref;
}

export function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return pos;
}

export function useCursorGlow(ref, options = {}) {
  const { color = "rgba(196,48,48,0.04)", size = 300 } = options;
  const glowRef = useRef(null);

  useEffect(() => {
    const el = ref?.current || glowRef.current;
    if (!el || prefersReducedMotion() || isTouchDevice()) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.background = `radial-gradient(circle ${size}px at ${x}px ${y}px, ${color} 0%, transparent 80%)`;
    };

    const handleLeave = () => {
      el.style.background = `radial-gradient(circle ${size}px at 50% 50%, ${color} 0%, transparent 80%)`;
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [ref]);

  return ref || glowRef;
}

export { gsap, ScrollTrigger };
