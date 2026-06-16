import { Link } from "@tanstack/react-router";
import { categories } from "@/data/mockProducts";
import {
  Smartphone, Shirt, Home, Refrigerator, Dumbbell, BookOpen, ToyBrick, Sparkles, ShoppingBasket,
} from "lucide-react";

const ICON_MAP = {
  Smartphone, Shirt, Home, Refrigerator, Dumbbell, BookOpen, ToyBrick, Sparkles, ShoppingBasket,
} as const;

export function CategoryGrid() {
  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-[1400px] grid-cols-4 gap-3 px-3 py-4 sm:grid-cols-5 md:grid-cols-9 md:gap-2 md:px-6">
        {categories.map((c) => {
          const Icon = ICON_MAP[c.icon as keyof typeof ICON_MAP];
          return (
            <Link
              key={c.name}
              to="/search"
              search={{ category: c.name, q: undefined }}
              className="group flex flex-col items-center gap-2 rounded-md p-2 text-center hover:bg-fk-gray"
            >
              <div className="grid h-14 w-14 place-items-center rounded-full bg-fk-blue/10 text-fk-blue transition group-hover:bg-fk-blue group-hover:text-white">
                <Icon className="h-7 w-7" />
              </div>
              <span className="line-clamp-1 text-xs font-medium md:text-sm">{c.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
