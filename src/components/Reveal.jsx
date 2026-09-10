import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function Reveal({ children, className = "", delay = 0, direction = "up" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0, x: 0 });
      return;
    }

    const fromProps = {
      opacity: 0,
    };

    if (direction === "up") fromProps.y = 32;
    else if (direction === "down") fromProps.y = -32;
    else if (direction === "left") fromProps.x = 32;
    else if (direction === "right") fromProps.x = -32;
    else if (direction === "scale") { fromProps.scale = 0.95; fromProps.y = 16; }

    gsap.set(el, fromProps);

    const tween = gsap.to(el, {
      opacity: 1, y: 0, x: 0, scale: 1,
      duration: 0.8, delay, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => { if (st.trigger === el) st.kill(); });
    };
  }, [delay, direction]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
