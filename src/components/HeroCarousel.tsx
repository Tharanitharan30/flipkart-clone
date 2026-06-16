import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { banners } from "@/data/mockProducts";

export function HeroCarousel() {
  const [i, setI] = useState(0);
  const n = banners.length;

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % n), 4500);
    return () => clearInterval(t);
  }, [n]);

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="relative h-40 sm:h-56 md:h-72 lg:h-80">
        {banners.map((b, idx) => (
          <div
            key={b.id}
            className={`absolute inset-0 transition-opacity duration-700 ${idx === i ? "opacity-100" : "opacity-0"}`}
            aria-hidden={idx !== i}
          >
            <div className={`flex h-full w-full items-center justify-center bg-gradient-to-r ${b.color} px-6 text-white`}>
              <div className="text-center">
                <h2 className="text-2xl font-bold sm:text-4xl md:text-5xl">{b.title}</h2>
                <p className="mt-2 text-sm sm:text-lg md:text-xl">{b.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        aria-label="Previous slide"
        onClick={() => setI((p) => (p - 1 + n) % n)}
        className="absolute left-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-fk-text shadow-md hover:bg-white"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        aria-label="Next slide"
        onClick={() => setI((p) => (p + 1) % n)}
        className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-fk-text shadow-md hover:bg-white"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => setI(idx)}
            className={`h-2 rounded-full transition-all ${idx === i ? "w-6 bg-white" : "w-2 bg-white/60"}`}
          />
        ))}
      </div>
    </div>
  );
}
