import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Download } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";
import { DOWNLOAD_URL } from "@/lib/config";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const location = useLocation();
  const isOzark = location.pathname === "/ozark";
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const navRef = useRef(null);
  const progressRef = useRef(null);
  const navIndicatorRef = useRef(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollDir, setScrollDir] = useState("up");
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.fromTo(logoRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" });
      const navItems = navRef.current?.children;
      if (navItems) {
        tl.fromTo(navItems, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power3.out" }, "-=0.3");
      }

      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);

          const header = headerRef.current;
          if (!header) return;

          const currentScrollY = window.scrollY;
          if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            setScrollDir("down");
          } else {
            setScrollDir("up");
          }
          lastScrollY.current = currentScrollY;

          const bgOpacity = Math.min(progress * 10, 0.92);
          header.style.backgroundColor = `rgba(4,2,5,${bgOpacity})`;

          const blur = Math.min(progress * 15, 16);
          header.style.backdropFilter = `blur(${blur}px)`;

          const borderOpacity = Math.min(progress * 6, 0.1);
          header.style.borderBottomColor = `rgba(196,48,48,${borderOpacity})`;

          const scale = 1 - Math.min(progress * 0.02, 0.02);
          header.style.transform = `scale(${scale})`;

          const shadowOpacity = Math.min(progress * 0.08, 0.25);
          header.style.boxShadow = `0 1px ${Math.min(progress * 4, 3)}px rgba(196,48,48,${shadowOpacity})`;
        },
      });

      const sections = ["features"];
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          ScrollTrigger.create({
            trigger: el,
            start: "top center",
            end: "bottom center",
            onEnter: () => setActiveSection(id),
            onEnterBack: () => setActiveSection(id),
            onLeave: () => setActiveSection(""),
            onLeaveBack: () => setActiveSection(""),
          });
        }
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  // Update nav indicator position
  useEffect(() => {
    if (!navRef.current || !navIndicatorRef.current) return;
    const activeIdx = NAV_LINKS.findIndex((l) => l.href?.replace("#", "") === activeSection);
    if (activeIdx >= 0) {
      const item = navRef.current.children[activeIdx];
      if (item) {
        const rect = item.getBoundingClientRect();
        const navRect = navRef.current.getBoundingClientRect();
        navIndicatorRef.current.style.left = `${rect.left - navRect.left}px`;
        navIndicatorRef.current.style.width = `${rect.width}px`;
        navIndicatorRef.current.style.opacity = "1";
      }
    } else {
      navIndicatorRef.current.style.opacity = "0";
    }
  }, [activeSection]);

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 py-3.5 border-b border-transparent gpu-accelerated transition-transform duration-300 ${scrollDir === "down" && scrollProgress > 0.1 ? "-translate-y-full" : "translate-y-0"}`}
      style={{ backgroundColor: "rgba(4,2,5,0)", backdropFilter: "blur(0px)" }}
    >
      <div
        ref={progressRef}
        className="absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-accent/40 via-accent to-accent/40 gpu-accelerated"
        style={{
          width: `${scrollProgress * 100}%`,
          opacity: scrollProgress > 0.01 ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />

      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 sm:px-8">
        <div ref={logoRef} className="flex items-center gap-2.5 cursor-pointer" style={{ opacity: 0 }} data-cursor="magnetic">
          <img src="/eyes-logo.png" alt="Ozark" className="h-8 w-8 object-contain" />
          <span className="text-[15px] font-semibold tracking-tight text-ink">Ozark</span>
          <span className="hidden sm:inline rounded bg-accent/10 px-1.5 py-0.5 text-[10px] font-medium text-accent">Copilot</span>
        </div>

        <nav ref={navRef} className="hidden items-center gap-2 md:flex relative">
          {NAV_LINKS.map((link, idx) => {
            const isRoute = link.href.startsWith("/");
            const Component = isRoute ? Link : "a";
            return (
              <Component
                key={link.label}
                href={isRoute ? undefined : link.href}
                to={isRoute ? link.href : undefined}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`relative px-3 py-1.5 text-[13.5px] font-medium transition-colors duration-200 hover:text-ink ${activeSection === link.href?.replace("#", "") ? "text-ink" : "text-sub"}`}
                style={{ opacity: 0 }}
                data-cursor="link"
              >
                {hoveredIdx === idx && (
                  <span className="absolute inset-0 -z-10 rounded-md bg-hover" />
                )}
                {link.label}
              </Component>
            );
          })}
          <div ref={navIndicatorRef} className="nav-indicator" style={{ opacity: 0 }} />
        </nav>

        {isOzark && (
          <a
            href={DOWNLOAD_URL}
            className="hidden md:inline-flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-1.5 text-[12.5px] font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-[0_2px_12px_rgba(196,48,48,0.3)]"
            data-cursor="link"
          >
            <Download size={13} />
            Download
          </a>
        )}

        <button
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-hover transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Premium mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${mobileOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="border-t border-border/40 bg-bg/95 backdrop-blur-md px-6 py-4">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link, idx) => {
              const isRoute = link.href.startsWith("/");
              const Component = isRoute ? Link : "a";
              return (
                <Component
                  key={link.label}
                  href={isRoute ? undefined : link.href}
                  to={isRoute ? link.href : undefined}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-[14px] font-medium text-sub hover:text-ink rounded-lg hover:bg-hover transition-all duration-200"
                  style={{
                    animation: mobileOpen ? `fade-in-up 0.3s ease-out ${idx * 0.05}s both` : "none",
                  }}
                >
                  {link.label}
                </Component>
              );
            })}
            {isOzark && (
              <a
                href={DOWNLOAD_URL}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 text-[14px] font-semibold text-white bg-accent rounded-lg hover:bg-accent/90 transition-all duration-200 mt-1"
              >
                <Download size={14} />
                Download for Windows 11
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
