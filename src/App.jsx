import { useMemo } from "react";
import { MotionConfig } from "framer-motion";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AppShowcase from "./components/AppShowcase";
import ProductCard from "./components/ProductCard";
import OzarkAlphaBanner from "./components/OzarkAlphaBanner";
import CursorMotion from "./components/CursorMotion";
import SmoothScroll from "./components/SmoothScroll";
import BackgroundMotion from "./components/BackgroundMotion";
import Service1Sections from "./lib/service1Sections";

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
      <OzarkAlphaBanner />
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

// Ozark Alpha placeholder page
function OzarkAlphaPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <img src="/eyes-logo.png" alt="Ozark Alpha" className="w-20 h-20 mx-auto mb-6 object-contain" />
          <h1 className="text-4xl font-bold text-ink mb-4">Ozark Alpha</h1>
          <p className="text-sub text-lg">Coming soon. Content will be added here.</p>
        </div>
      </div>
    </>
  );
}

export default function App() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <MotionConfig reducedMotion={reducedMotion ? "always" : "never"}>
      <SmoothScroll>
        <main className="min-h-screen bg-bg font-sans text-ink antialiased overflow-x-hidden">
          <CursorMotion />
          <BackgroundMotion />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/ozark" element={<Service1Page />} />
              <Route path="/ozarkAlpha" element={<OzarkAlphaPage />} />
            </Routes>
          </BrowserRouter>
        </main>
      </SmoothScroll>
    </MotionConfig>
  );
}
