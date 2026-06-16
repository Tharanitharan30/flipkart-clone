import type { Product } from "@/data/mockProducts";
import { ProductCard } from "./ProductCard";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export function ProductRow({
  title,
  products,
  viewAllCategory,
}: {
  title: string;
  products: Product[];
  viewAllCategory?: string;
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1400px] px-3 py-4 md:px-6 md:py-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold md:text-xl">{title}</h2>
          {viewAllCategory && (
            <Link
              to="/search"
              search={{ category: viewAllCategory, q: undefined }}
              className="flex items-center gap-1 rounded bg-fk-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-fk-blue-dark"
            >
              VIEW ALL <ChevronRight className="h-3 w-3" />
            </Link>
          )}
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scroll-snap-x no-scrollbar md:grid md:grid-cols-5 md:gap-4 md:overflow-visible">
          {products.map((p) => (
            <div key={p.id} className="w-[160px] shrink-0 sm:w-[200px] md:w-auto">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
