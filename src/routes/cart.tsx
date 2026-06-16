import { createFileRoute, Link } from "@tanstack/react-router";
import { CartItem } from "@/components/CartItem";
import { PriceSummaryCard } from "@/components/PriceSummaryCard";
import { useCart, formatINR } from "@/hooks/useCart";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "My Cart — Flipkart Clone" },
      { name: "description", content: "Review your cart and proceed to checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, clear } = useCart();
  const [showMobile, setShowMobile] = useState(false);

  const onPlaceOrder = () => {
    alert("Order placed! (demo)");
    clear();
  };

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-[1400px] py-12 text-center">
        <div className="mx-auto max-w-md rounded bg-white px-6 py-12">
          <ShoppingCart className="mx-auto h-16 w-16 text-fk-muted" />
          <h1 className="mt-4 text-xl font-semibold">Your cart is empty</h1>
          <p className="mt-2 text-sm text-fk-muted">Add items to it now.</p>
          <Link to="/" className="mt-6 inline-block rounded bg-fk-blue px-6 py-2 text-sm font-semibold text-white">
            Shop Now
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1400px] pb-24 md:px-4 md:pt-3 md:pb-6">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_360px]">
        <section className="rounded bg-white">
          <h2 className="border-b border-border px-4 py-3 font-semibold">My Cart ({items.length})</h2>
          <div>
            {items.map((it) => <CartItem key={it.product.id} item={it} />)}
          </div>
          <div className="hidden border-t border-border bg-fk-gray px-4 py-3 text-right md:block">
            <button
              onClick={onPlaceOrder}
              className="rounded bg-fk-orange px-8 py-3 text-sm font-semibold uppercase text-white shadow hover:brightness-95"
            >
              Place Order
            </button>
          </div>
        </section>

        <aside className="hidden md:block">
          <div className="sticky top-24">
            <PriceSummaryCard onPlaceOrder={onPlaceOrder} />
          </div>
        </aside>
      </div>

      {/* Mobile bottom summary */}
      <div className="fixed inset-x-0 bottom-16 z-30 border-t border-border bg-white p-3 md:hidden">
        <div className="flex items-center justify-between">
          <div>
            <button onClick={() => setShowMobile(true)} className="text-xs font-semibold text-fk-blue underline">
              View price details
            </button>
            <div className="text-base font-semibold">{formatINR(items.reduce((s, i) => s + i.product.price * i.qty, 0))}</div>
          </div>
          <button
            onClick={onPlaceOrder}
            className="rounded bg-fk-orange px-6 py-3 text-sm font-semibold uppercase text-white"
          >
            Place Order
          </button>
        </div>
      </div>

      {showMobile && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobile(false)} />
          <div className="absolute inset-x-0 bottom-0 rounded-t-xl bg-white p-3">
            <PriceSummaryCard onPlaceOrder={() => { setShowMobile(false); onPlaceOrder(); }} />
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
