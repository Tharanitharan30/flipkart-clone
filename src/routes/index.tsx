import { createFileRoute } from "@tanstack/react-router";
import { HeroCarousel } from "@/components/HeroCarousel";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ProductRow } from "@/components/ProductRow";
import { Footer } from "@/components/Footer";
import { products } from "@/data/mockProducts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flipkart Clone — Online Shopping for Electronics, Fashion, Home & More" },
      { name: "description", content: "Shop the latest electronics, fashion, home & appliances at the lowest prices." },
    ],
  }),
  component: Home,
});

function Home() {
  const electronics = products.filter((p) => p.category === "Electronics").slice(0, 10);
  const fashion = products.filter((p) => p.category === "Fashion").slice(0, 10);
  const appliances = products.filter((p) => p.category === "Appliances").slice(0, 10);
  const dealOfDay = [...products].sort((a, b) => (b.mrp - b.price) - (a.mrp - a.price)).slice(0, 10);
  const recommended = [...products].sort((a, b) => b.rating - a.rating).slice(0, 10);

  return (
    <main>
      <div className="mx-auto max-w-[1400px] px-0 pt-2 md:px-4 md:pt-3">
        <CategoryGrid />
        <div className="mt-2 md:mt-3">
          <HeroCarousel />
        </div>
      </div>

      <div className="mt-2 space-y-2 md:mt-3 md:space-y-3">
        <ProductRow title="Deal of the Day" products={dealOfDay} />
        <ProductRow title="Best of Electronics" products={electronics} viewAllCategory="Electronics" />
        <ProductRow title="Top Offers in Fashion" products={fashion} viewAllCategory="Fashion" />
        <ProductRow title="Best of Appliances" products={appliances} viewAllCategory="Appliances" />
        <ProductRow title="Recommended for You" products={recommended} />
      </div>

      <Footer />
    </main>
  );
}
