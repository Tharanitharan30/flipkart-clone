import { formatINR, useCart } from "@/hooks/useCart";

export function PriceSummaryCard({ onPlaceOrder }: { onPlaceOrder: () => void }) {
  const { items, total } = useCart();
  const mrpTotal = items.reduce((s, i) => s + i.product.mrp * i.qty, 0);
  const discount = mrpTotal - total;
  const delivery = total > 500 ? 0 : 40;
  const final = total + delivery;

  return (
    <div className="rounded bg-white">
      <h3 className="border-b border-border px-4 py-3 text-sm font-semibold uppercase text-fk-muted">
        Price Details
      </h3>
      <dl className="space-y-3 px-4 py-4 text-sm">
        <Row label={`Price (${items.length} item${items.length === 1 ? "" : "s"})`} value={formatINR(mrpTotal)} />
        <Row label="Discount" value={`− ${formatINR(discount)}`} valueClass="text-fk-green" />
        <Row
          label="Delivery Charges"
          value={delivery === 0 ? "FREE" : formatINR(delivery)}
          valueClass={delivery === 0 ? "text-fk-green" : ""}
        />
        <div className="my-2 border-t border-dashed border-border" />
        <div className="flex items-center justify-between text-base font-semibold">
          <dt>Total Amount</dt>
          <dd>{formatINR(final)}</dd>
        </div>
        <p className="text-sm font-medium text-fk-green">You will save {formatINR(discount)} on this order</p>
      </dl>
      <div className="p-4 pt-0">
        <button
          onClick={onPlaceOrder}
          disabled={items.length === 0}
          className="w-full rounded-sm bg-fk-orange py-3 text-sm font-semibold uppercase tracking-wide text-white shadow hover:brightness-95 disabled:opacity-50"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

function Row({ label, value, valueClass = "" }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-fk-text">{label}</dt>
      <dd className={valueClass}>{value}</dd>
    </div>
  );
}
