import { Minus, Plus } from "lucide-react";
import type { CartItem as CartItemType } from "@/hooks/useCart";
import { formatINR, useCart } from "@/hooks/useCart";

export function CartItem({ item }: { item: CartItemType }) {
  const { setQty, remove } = useCart();
  const { product, qty } = item;
  const pct = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="flex gap-4 border-b border-border bg-white p-4">
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded bg-fk-gray sm:h-32 sm:w-32">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <h3 className="line-clamp-2 text-sm font-medium sm:text-base">{product.name}</h3>
        <p className="text-xs text-fk-muted">Seller: {product.seller}</p>
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-xs text-fk-muted line-through">{formatINR(product.mrp)}</span>
          <span className="text-base font-semibold">{formatINR(product.price)}</span>
          <span className="text-xs font-semibold text-fk-green">{pct}% off</span>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQty(product.id, qty - 1)}
              aria-label="Decrease quantity"
              className="grid h-7 w-7 place-items-center rounded-full border border-border text-fk-text hover:bg-fk-gray"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="min-w-6 rounded border border-border px-2 py-0.5 text-center text-sm">{qty}</span>
            <button
              onClick={() => setQty(product.id, qty + 1)}
              aria-label="Increase quantity"
              className="grid h-7 w-7 place-items-center rounded-full border border-border text-fk-text hover:bg-fk-gray"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <button
            onClick={() => remove(product.id)}
            className="text-xs font-semibold uppercase tracking-wide text-fk-text hover:text-fk-blue"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
