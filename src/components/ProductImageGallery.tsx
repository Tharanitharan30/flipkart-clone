import { useState } from "react";

export function ProductImageGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col gap-3 md:flex-row">
      {/* Thumbs */}
      <div className="order-2 flex gap-2 overflow-x-auto md:order-1 md:flex-col">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setActive(i)}
            onMouseEnter={() => setActive(i)}
            className={`h-16 w-16 shrink-0 overflow-hidden rounded border-2 bg-white ${
              i === active ? "border-fk-blue" : "border-border"
            }`}
            aria-label={`Show image ${i + 1}`}
          >
            <img src={src} alt={`${alt} ${i + 1}`} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
      {/* Main */}
      <div className="order-1 flex-1 overflow-hidden rounded bg-white md:order-2">
        <div className="aspect-square w-full">
          <img src={images[active]} alt={alt} className="h-full w-full object-contain" />
        </div>
      </div>
    </div>
  );
}
