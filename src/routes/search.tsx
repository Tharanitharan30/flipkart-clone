import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { products } from "@/data/mockProducts";
import { ProductCard } from "@/components/ProductCard";
import { FilterSidebar, defaultFilters, type Filters } from "@/components/FilterSidebar";
import { SortBar, type SortKey } from "@/components/SortBar";
import { Footer } from "@/components/Footer";
import { SlidersHorizontal, X } from "lucide-react";

const searchSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
});

export const Route = createFileRoute("/search")({
  validateSearch: searchSchema,
  head: ({ match }) => ({
    meta: [
      {
        title: `${match.search.category || match.search.q || "Search"} — Flipkart Clone`,
      },
      { name: "description", content: "Browse products by category, brand, price and rating." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q, category } = Route.useSearch();
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [sort, setSort] = useState<SortKey>("relevance");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 12;

  const pool = useMemo(() => {
    let r = products;
    if (category) r = r.filter((p) => p.category === category);
    if (q) {
      const t = q.toLowerCase();
      r = r.filter(
        (p) =>
          p.name.toLowerCase().includes(t) ||
          p.brand.toLowerCase().includes(t) ||
          p.category.toLowerCase().includes(t),
      );
    }
    return r;
  }, [q, category]);

  const filtered = useMemo(() => {
    let r = pool;
    if (filters.brands.length) r = r.filter((p) => filters.brands.includes(p.brand));
    r = r.filter((p) => p.price <= filters.maxPrice && p.price >= filters.minPrice);
    if (filters.minRating) r = r.filter((p) => p.rating >= filters.minRating);
    if (filters.minDiscount) {
      r = r.filter((p) => ((p.mrp - p.price) / p.mrp) * 100 >= filters.minDiscount);
    }
    switch (sort) {
      case "price-asc": r = [...r].sort((a, b) => a.price - b.price); break;
      case "price-desc": r = [...r].sort((a, b) => b.price - a.price); break;
      case "rating": r = [...r].sort((a, b) => b.rating - a.rating); break;
    }
    return r;
  }, [pool, filters, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);
  const title = category || (q ? `Results for "${q}"` : "All Products");

  return (
    <main className="mx-auto max-w-[1400px] px-0 py-2 md:px-4 md:py-3">
      <div className="px-3 pb-2 text-xs text-fk-muted md:px-0">
        Home / <span className="text-fk-text">{title}</span>
      </div>

      <div className="flex gap-3">
        {/* Sidebar desktop */}
        <div className="hidden w-64 shrink-0 md:block">
          <FilterSidebar pool={pool} filters={filters} onChange={(f) => { setFilters(f); setPage(1); }} />
        </div>

        <div className="min-w-0 flex-1 rounded bg-white">
          <div className="border-b border-border px-4 py-3">
            <h1 className="text-base font-semibold md:text-lg">{title}</h1>
            <p className="text-xs text-fk-muted">Showing {filtered.length} products</p>
          </div>

          <SortBar value={sort} onChange={setSort} total={filtered.length} />

          {/* Mobile filter button */}
          <div className="flex items-center justify-between border-b border-border px-3 py-2 md:hidden">
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-2 rounded border border-border px-3 py-1.5 text-sm font-medium"
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>
            <span className="text-xs text-fk-muted">Page {page} / {totalPages}</span>
          </div>

          {pageItems.length === 0 ? (
            <div className="p-12 text-center text-fk-muted">No products match your filters.</div>
          ) : (
            <div className="grid grid-cols-2 gap-2 p-2 md:grid-cols-4 md:gap-3 md:p-4">
              {pageItems.map((p) => (
                <ProductCard key={p.id} product={p} compact />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 border-t border-border py-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded border border-border px-3 py-1.5 text-sm disabled:opacity-50"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`h-9 w-9 rounded text-sm ${
                    page === i + 1 ? "bg-fk-blue text-white" : "border border-border"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded border border-border px-3 py-1.5 text-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDrawerOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-hidden rounded-t-xl bg-white">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h3 className="font-semibold">Filters</h3>
              <button onClick={() => setDrawerOpen(false)} aria-label="Close filters">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="h-[70vh]">
              <FilterSidebar
                pool={pool}
                filters={filters}
                onChange={(f) => { setFilters(f); setPage(1); }}
                onClose={() => setDrawerOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
