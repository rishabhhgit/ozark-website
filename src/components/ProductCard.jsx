import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { ShoppingCart, ArrowUpRight } from "lucide-react";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  {
    id: 1,
    name: "Safe Exam Browser Crack",
    tag: "SE B",
    badge: "Flashkick",
    description: "Bypass restrictions and regain control in exam environments with enhanced functionality.",
    price: "₹1999",
    bgGradient: "from-[#1a1a2e] via-[#16213e] to-[#0f3460]",
    image: "/seb.webp",
  },
  {
    id: 2,
    name: "Mettl Secure Browser Crack",
    tag: "MSB",
    badge: null,
    description: "Mettl Secure Browser Crack to cheat on Mettl exams.",
    price: "₹1999",
    bgGradient: "from-[#1a1a2e] via-[#1e293b] to-[#0f172a]",
    image: "/mercel-mettl.png",
  },
  {
    id: 3,
    name: "HackerRank Bypass",
    tag: "HRB",
    badge: "Flashkick",
    description: "Bypass HackerRank proctoring and detect restrictions with advanced stealth technology.",
    price: "₹1999",
    bgGradient: "from-[#1a1a2e] via-[#1c2333] to-[#0d1b2a]",
    image: "/hackerrank.svg",
  },
];

function ProductCardItem({ product, index }) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current, { opacity: 0, y: 50, scale: 0.95 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.8, delay: index * 0.15, ease: "power3.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 85%", toggleActions: "play none none none" }
      });
    });

    return () => ctx.revert();
  }, [index]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <Link to="/ozarkAlpha">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] shadow-2xl transition-all duration-300 hover:border-white/[0.15] hover:scale-[1.02]"
        style={{ opacity: 0 }}
      >
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-500"
            style={{
              background: `radial-gradient(circle 300px at ${coords.x}px ${coords.y}px, rgba(196,48,48,0.06) 0%, transparent 80%)`,
            }}
          />
        )}

        <div className="flex flex-col h-full">
          <div className={`relative aspect-[16/10] bg-gradient-to-br ${product.bgGradient} flex items-center justify-center p-8 overflow-hidden`}>
            <div className="absolute inset-0 opacity-20" style={{
              background: "radial-gradient(circle at 30% 40%, rgba(234,179,8,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(59,130,246,0.2) 0%, transparent 50%)",
            }} />
            <img src={product.image} alt={product.name} className="relative w-40 h-40 md:w-48 md:h-48 object-contain drop-shadow-2xl" />
            {product.badge && (
              <div className="absolute top-3 left-3 rounded bg-purple-600/90 px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">
                {product.badge}
              </div>
            )}
            <div className="absolute top-3 right-3 text-[10px] text-white/30 font-medium">
              {product.tag}
            </div>
            <div className="absolute top-3 right-3">
              <ArrowUpRight size={14} className="text-white/20" />
            </div>
          </div>

          <div className="p-5 md:p-6 flex flex-col flex-1">
            <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
            <p className="text-sm text-white/50 mb-4 leading-relaxed flex-1 min-h-[60px]">{product.description}</p>

            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-white/30 block mb-0.5">From</span>
                <span className="text-xl font-bold text-white">{product.price}</span>
              </div>
              <button className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-500 transition-colors shadow-lg shadow-purple-600/30">
                <ShoppingCart size={16} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ProductCard() {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className="relative mx-auto w-full px-6 sm:px-10 overflow-hidden min-h-screen flex items-center justify-center">
      <div className="mx-auto max-w-[1400px] w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {PRODUCTS.map((product, idx) => (
          <ProductCardItem key={product.id} product={product} index={idx} />
        ))}
      </div>
    </section>
  );
}
