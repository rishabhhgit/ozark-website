import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      gsap.set(el, { opacity: 1, y: 0, filter: "blur(0px)" });
      return;
    }

    const {
      y = 30,
      opacity = 0,
      duration = 1.1,
      delay = 0,
      ease = "power2.out",
      start = "top 88%",
    } = options;

    gsap.set(el, { opacity, y, filter: "blur(2px)" });

    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, []);

  return ref;
}

export function useGsapStagger(options = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const {
      selector = "> *",
      y = 25,
      opacity = 0,
      duration = 0.9,
      stagger = 0.06,
      ease = "power2.out",
      start = "top 85%",
    } = options;

    const children = container.querySelectorAll(selector);
    if (!children.length) return;

    gsap.set(children, { opacity, y });

    const tween = gsap.to(children, {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease,
      scrollTrigger: {
        trigger: container,
        start,
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) st.kill();
      });
    };
  }, []);

  return containerRef;
}

export function useGsapTextReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const text = el.textContent;
    el.innerHTML = "";
    el.style.visibility = "visible";

    const chars = text.split("").map((char) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.display = "inline-block";
      span.style.opacity = "0";
      el.appendChild(span);
      return span;
    });

    const {
      duration = 0.04,
      stagger = 0.03,
      delay = 0,
      ease = "power2.out",
      start = "top 85%",
    } = options;

    const tween = gsap.to(chars, {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      delay,
      ease,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.kill();
      el.textContent = text;
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, []);

  return ref;
}

export function useGsapParallax(speed = 0.3) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const tween = gsap.to(el, {
      yPercent: speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, []);

  return ref;
}

export function useGsapScrollProgress(callback) {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => callback(self.progress),
    });

    return () => st.kill();
  }, []);
}

export { gsap, ScrollTrigger };
