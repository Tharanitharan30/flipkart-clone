import { useMemo } from "react";
import type { Product } from "@/data/mockProducts";

export type Filters = {
  brands: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
  minDiscount: number;
};

export const defaultFilters: Filters = {
  brands: [],
  minPrice: 0,
  maxPrice: 100000,
  minRating: 0,
  minDiscount: 0,
};

export function FilterSidebar({
  pool,
  filters,
  onChange,
  onClose,
}: {
  pool: Product[];
  filters: Filters;
  onChange: (f: Filters) => void;
  onClose?: () => void;
}) {
  const brands = useMemo(() => Array.from(new Set(pool.map((p) => p.brand))).sort(), [pool]);

  const toggleBrand = (b: string) => {
    const next = filters.brands.includes(b)
      ? filters.brands.filter((x) => x !== b)
      : [...filters.brands, b];
    onChange({ ...filters, brands: next });
  };

  return (
    <aside className="flex h-full flex-col bg-white text-sm md:rounded-md">
      <div className="flex items-center justify-between border-b border-border px-4 py-3 md:py-4">
        <h3 className="text-base font-semibold">Filters</h3>
        <button
          onClick={() => onChange(defaultFilters)}
          className="text-xs font-semibold uppercase text-fk-blue hover:underline"
        >
          Clear All
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3">
        <Section title="Price">
          <div className="flex items-center gap-2 pb-2 text-xs text-fk-muted">
            <span>₹0</span>
            <span className="ml-auto">₹{filters.maxPrice.toLocaleString("en-IN")}+</span>
          </div>
          <input
            type="range"
            min={500}
            max={100000}
            step={500}
            value={filters.maxPrice}
            onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
            className="w-full accent-[var(--fk-blue)]"
            aria-label="Max price"
          />
        </Section>

        <Section title="Brand">
          <div className="max-h-48 space-y-2 overflow-y-auto pr-1">
            {brands.map((b) => (
              <label key={b} className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(b)}
                  onChange={() => toggleBrand(b)}
                  className="h-4 w-4 accent-[var(--fk-blue)]"
                />
                {b}
              </label>
            ))}
          </div>
        </Section>

        <Section title="Customer Rating">
          {[4, 3, 2].map((r) => (
            <label key={r} className="flex cursor-pointer items-center gap-2 py-1 text-sm">
              <input
                type="radio"
                name="rating"
                checked={filters.minRating === r}
                onChange={() => onChange({ ...filters, minRating: r })}
                className="h-4 w-4 accent-[var(--fk-blue)]"
              />
              {r}★ & above
            </label>
          ))}
        </Section>

        <Section title="Discount">
          {[10, 25, 40, 60].map((d) => (
            <label key={d} className="flex cursor-pointer items-center gap-2 py-1 text-sm">
              <input
                type="radio"
                name="discount"
                checked={filters.minDiscount === d}
                onChange={() => onChange({ ...filters, minDiscount: d })}
                className="h-4 w-4 accent-[var(--fk-blue)]"
              />
              {d}% or more
            </label>
          ))}
        </Section>
      </div>

      {onClose && (
        <div className="border-t border-border bg-white p-3 md:hidden">
          <button
            onClick={onClose}
            className="w-full rounded bg-fk-blue py-3 text-sm font-semibold text-white"
          >
            Apply Filters
          </button>
        </div>
      )}
    </aside>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-border py-3">
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-fk-text">{title}</h4>
      {children}
    </div>
  );
}
