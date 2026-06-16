import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/mockProducts";
import { StarRating } from "./StarRating";
import { AssuredBadge } from "./Badge";
import { formatINR } from "@/hooks/useCart";

export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const pct = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="group block rounded-md bg-white p-3 transition hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden rounded bg-fk-gray">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
      </div>
      <div className="mt-3 space-y-1">
        <h3 className={`line-clamp-2 font-medium text-fk-text ${compact ? "text-sm" : "text-sm md:text-base"}`}>
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <StarRating rating={product.rating} reviews={product.reviews} />
          {product.assured && <AssuredBadge />}
        </div>
        <div className="flex flex-wrap items-baseline gap-2 pt-1">
          <span className="text-base font-semibold text-fk-text">{formatINR(product.price)}</span>
          <span className="text-xs text-fk-muted line-through">{formatINR(product.mrp)}</span>
          {pct > 0 && <span className="text-xs font-semibold text-fk-green">{pct}% off</span>}
        </div>
      </div>
    </Link>
  );
}
