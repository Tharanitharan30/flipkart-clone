import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { products } from "@/data/mockProducts";
import { ProductImageGallery } from "@/components/ProductImageGallery";
import { StarRating } from "@/components/StarRating";
import { AssuredBadge } from "@/components/Badge";
import { Footer } from "@/components/Footer";
import { formatINR, useCart } from "@/hooks/useCart";
import { Zap, ShoppingCart, Tag, RefreshCw, Truck } from "lucide-react";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }): import("@/data/mockProducts").Product => {
    const p = products.find((x) => x.id === params.id);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.name} — Flipkart Clone` },
            { name: "description", content: loaderData.description ?? loaderData.name },
            { property: "og:title", content: loaderData.name },
            { property: "og:description", content: loaderData.description ?? loaderData.name },
            { property: "og:image", content: loaderData.image },
          ],
        }
      : {},
  component: ProductPage,
  notFoundComponent: () => (
    <div className="p-12 text-center">
      <h1 className="text-xl font-semibold">Product not found</h1>
      <Link to="/" className="mt-4 inline-block text-fk-blue">Back home</Link>
    </div>
  ),
});

function ProductPage() {
  const p = Route.useLoaderData();
  const { add } = useCart();
  const nav = useNavigate();
  const pct = Math.round(((p.mrp - p.price) / p.mrp) * 100);

  const onAdd = () => add(p, 1);
  const onBuy = () => { add(p, 1); nav({ to: "/cart" }); };

  const related = products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 5);

  return (
    <main className="mx-auto max-w-[1400px] pb-24 md:pb-6 md:px-4 md:pt-3">
      <div className="grid grid-cols-1 gap-4 bg-white p-3 md:grid-cols-[420px_1fr] md:p-6">
        {/* Gallery */}
        <div>
          <div className="md:sticky md:top-24">
            <ProductImageGallery images={p.images ?? [p.image]} alt={p.name} />
            <div className="mt-4 hidden gap-3 md:flex">
              <button
                onClick={onAdd}
                className="flex flex-1 items-center justify-center gap-2 rounded-sm border border-fk-blue bg-white py-3 text-sm font-semibold uppercase tracking-wide text-fk-blue hover:bg-fk-blue/5"
              >
                <ShoppingCart className="h-4 w-4" /> Add to Cart
              </button>
              <button
                onClick={onBuy}
                className="flex flex-1 items-center justify-center gap-2 rounded-sm bg-fk-orange py-3 text-sm font-semibold uppercase tracking-wide text-white shadow hover:brightness-95"
              >
                <Zap className="h-4 w-4" /> Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <div>
            <p className="text-xs text-fk-muted">{p.brand} · {p.category}</p>
            <h1 className="mt-1 text-lg font-medium md:text-xl">{p.name}</h1>
            <div className="mt-2 flex items-center gap-3">
              <StarRating rating={p.rating} reviews={p.reviews} size="md" />
              {p.assured && <AssuredBadge />}
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-semibold">{formatINR(p.price)}</span>
              <span className="text-base text-fk-muted line-through">{formatINR(p.mrp)}</span>
              <span className="text-base font-semibold text-fk-green">{pct}% off</span>
            </div>
            <p className="mt-1 text-xs text-fk-green">Inclusive of all taxes</p>
          </div>

          {/* Offers */}
          <div>
            <h3 className="mb-2 text-sm font-semibold">Available offers</h3>
            <ul className="space-y-2 text-sm">
              <Offer icon={<Tag className="h-4 w-4 text-fk-green" />} label="Bank Offer" text="10% off on HDFC Bank Credit Card, up to ₹1500" />
              <Offer icon={<RefreshCw className="h-4 w-4 text-fk-green" />} label="Exchange Offer" text="Up to ₹15,000 off on exchange" />
              <Offer icon={<Truck className="h-4 w-4 text-fk-green" />} label="No Cost EMI" text="No Cost EMI from ₹999/month. Standard EMI also available" />
            </ul>
          </div>

          {/* Seller */}
          <p className="text-sm">
            Seller: <span className="font-semibold text-fk-blue">{p.seller}</span> — 4.5★ rated
          </p>

          {/* Highlights & Specs */}
          <div className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase text-fk-muted">Highlights</h3>
              <ul className="list-disc space-y-1 pl-5 text-sm">
                {p.highlights.map((h) => <li key={h}>{h}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase text-fk-muted">Specifications</h3>
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(p.specs).map(([k, v]) => (
                    <tr key={k} className="border-b border-border last:border-b-0">
                      <td className="w-1/3 py-2 pr-2 text-fk-muted">{k}</td>
                      <td className="py-2">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Reviews */}
          <div className="border-t border-border pt-4">
            <h3 className="mb-3 text-base font-semibold">Ratings & Reviews</h3>
            <div className="flex flex-col gap-6 sm:flex-row">
              <div className="text-center">
                <div className="text-4xl font-semibold">{p.rating.toFixed(1)}★</div>
                <div className="text-xs text-fk-muted">{p.reviews.toLocaleString("en-IN")} ratings</div>
              </div>
              <div className="flex-1 space-y-1.5">
                {[5, 4, 3, 2, 1].map((s) => {
                  const w = Math.max(2, Math.round((s === Math.round(p.rating) ? 70 : s > p.rating ? 8 : 20)));
                  return (
                    <div key={s} className="flex items-center gap-3 text-xs">
                      <span className="w-3">{s}</span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-fk-gray">
                        <div className="h-full bg-fk-green" style={{ width: `${w}%` }} />
                      </div>
                      <span className="w-10 text-right text-fk-muted">{w}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {[
                { name: "Rahul S.", text: "Great product, exactly as described. Fast delivery.", r: 5 },
                { name: "Priya K.", text: "Good value for money. Recommended!", r: 4 },
              ].map((rev) => (
                <div key={rev.name} className="rounded border border-border p-3">
                  <div className="flex items-center gap-2">
                    <StarRating rating={rev.r} showReviews={false} />
                    <span className="text-sm font-medium">{rev.name}</span>
                  </div>
                  <p className="mt-1 text-sm text-fk-text">{rev.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-3 bg-white p-4 md:p-6">
          <h2 className="mb-3 text-lg font-semibold">Similar Products</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {related.map((r) => (
              <Link key={r.id} to="/product/$id" params={{ id: r.id }} className="block rounded p-2 hover:shadow">
                <div className="aspect-square overflow-hidden rounded bg-fk-gray">
                  <img src={r.image} alt={r.name} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <p className="mt-2 line-clamp-2 text-sm">{r.name}</p>
                <p className="text-sm font-semibold">{formatINR(r.price)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />

      {/* Sticky mobile bar */}
      <div className="fixed inset-x-0 bottom-16 z-30 grid grid-cols-2 border-t border-border bg-white md:hidden">
        <button
          onClick={onAdd}
          className="flex items-center justify-center gap-2 bg-white py-3.5 text-sm font-semibold uppercase text-fk-blue"
        >
          <ShoppingCart className="h-4 w-4" /> Add to Cart
        </button>
        <button
          onClick={onBuy}
          className="flex items-center justify-center gap-2 bg-fk-orange py-3.5 text-sm font-semibold uppercase text-white"
        >
          <Zap className="h-4 w-4" /> Buy Now
        </button>
      </div>
    </main>
  );
}

function Offer({ icon, label, text }: { icon: React.ReactNode; label: string; text: string }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-0.5">{icon}</span>
      <span>
        <span className="font-semibold">{label}</span> · {text}
      </span>
    </li>
  );
}
