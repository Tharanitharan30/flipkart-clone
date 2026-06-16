export type SortKey = "relevance" | "price-asc" | "price-desc" | "rating";

const opts: { key: SortKey; label: string }[] = [
  { key: "relevance", label: "Relevance" },
  { key: "price-asc", label: "Price -- Low to High" },
  { key: "price-desc", label: "Price -- High to Low" },
  { key: "rating", label: "Rating" },
];

export function SortBar({ value, onChange, total }: { value: SortKey; onChange: (k: SortKey) => void; total: number }) {
  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-border bg-white px-4 py-2.5 text-sm">
      <span className="font-semibold">Sort By</span>
      <div className="flex flex-wrap items-center gap-1">
        {opts.map((o) => (
          <button
            key={o.key}
            onClick={() => onChange(o.key)}
            className={`rounded-sm px-3 py-1.5 text-xs font-medium md:text-sm ${
              value === o.key ? "border-b-2 border-fk-blue text-fk-blue" : "text-fk-muted hover:text-fk-text"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
      <span className="ml-auto text-xs text-fk-muted">{total} results</span>
    </div>
  );
}
