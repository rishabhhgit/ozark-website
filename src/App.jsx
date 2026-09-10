import { useMemo } from "react";
import { MotionConfig } from "framer-motion";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AppShowcase from "./components/AppShowcase";
import ProductCard from "./components/ProductCard";
import CursorMotion from "./components/CursorMotion";
import SmoothScroll from "./components/SmoothScroll";
import BackgroundMotion from "./components/BackgroundMotion";
import Service1Sections from "./lib/service1Sections";
import OzarkAlphaPage from "./components/OzarkAlphaPage";

function usePrefersReducedMotion() {
  return useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);
}

// Landing page — Hero + Showcase + ProductCard
function LandingPage() {
  return (
    <>
      <Header />
      <Hero />
      <AppShowcase />
      <ProductCard />
    </>
  );
}

// Full Service 1 content — deep dive sections
function Service1Page() {
  return (
    <>
      <Header />
      <Service1Sections />
    </>
  );
}

// Ozark Alpha page

export default function App() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <MotionConfig reducedMotion={reducedMotion ? "always" : "never"}>
      <SmoothScroll>
        <main className="min-h-screen font-sans text-ink antialiased overflow-x-hidden">
          <CursorMotion />
          <BackgroundMotion />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/ozark" element={<Service1Page />} />
              <Route path="/ozarkAlpha" element={<><Header /><OzarkAlphaPage /></>} />
            </Routes>
          </BrowserRouter>
        </main>
      </SmoothScroll>
    </MotionConfig>
  );
}
