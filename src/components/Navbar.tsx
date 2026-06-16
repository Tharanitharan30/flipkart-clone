import { Link, useNavigate } from "@tanstack/react-router";
import { Search, ShoppingCart, ChevronDown, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { categories } from "@/data/mockProducts";

export function Navbar() {
  const { count } = useCart();
  const [q, setQ] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    nav({ to: "/search", search: { q: q.trim() || undefined, category: undefined } });
  };

  return (
    <header className="sticky top-0 z-40 bg-fk-blue text-white shadow-md">
      <div className="mx-auto flex max-w-[1400px] items-center gap-2 px-3 py-2.5 md:px-6 md:py-3">
        {/* Logo */}
        <Link to="/" className="flex shrink-0 flex-col leading-none">
          <span className="text-lg font-bold italic">Flipkart</span>
          <span className="flex items-center gap-1 text-[10px] italic text-white/90">
            Explore <span className="font-semibold text-fk-yellow">Plus</span>
            <span className="text-fk-yellow">✦</span>
          </span>
        </Link>

        {/* Search */}
        <form onSubmit={submit} className="ml-2 flex flex-1 items-center md:ml-6 md:max-w-[600px]">
          <div className="flex w-full items-center rounded-sm bg-white px-3 py-2 text-fk-text">
            <Search className="mr-2 h-4 w-4 text-fk-blue" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search for products, brands and more"
              aria-label="Search products"
              className="w-full bg-transparent text-sm outline-none placeholder:text-fk-muted"
            />
          </div>
        </form>

        {/* Desktop actions */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            to="/login"
            className="rounded-sm bg-white px-8 py-1.5 text-sm font-semibold text-fk-blue hover:bg-white/95"
          >
            Login
          </Link>
          <button className="flex items-center gap-1 text-sm font-semibold" aria-label="More options">
            More <ChevronDown className="h-4 w-4" />
          </button>
          <Link to="/cart" className="relative flex items-center gap-2 text-sm font-semibold">
            <ShoppingCart className="h-5 w-5" />
            Cart
            {count > 0 && (
              <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-fk-orange px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="ml-1 md:hidden"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Category strip (desktop) */}
      <div className="hidden border-t border-white/10 bg-white text-fk-text shadow-sm md:block">
        <div className="mx-auto flex max-w-[1400px] items-center gap-8 overflow-x-auto px-6 py-2 no-scrollbar">
          {categories.map((c) => (
            <Link
              key={c.name}
              to="/search"
              search={{ category: c.name, q: undefined }}
              className="whitespace-nowrap text-sm font-medium hover:text-fk-blue"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMenuOpen(false)} />
          <aside className="absolute right-0 top-0 h-full w-72 bg-white text-fk-text shadow-xl">
            <div className="flex items-center justify-between bg-fk-blue px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <User className="h-6 w-6" />
                <span className="font-semibold">Hello, Guest</span>
              </div>
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col py-2">
              <Link to="/login" onClick={() => setMenuOpen(false)} className="px-4 py-3 hover:bg-fk-gray">
                Login / Signup
              </Link>
              <Link to="/cart" onClick={() => setMenuOpen(false)} className="px-4 py-3 hover:bg-fk-gray">
                My Cart {count > 0 && <span className="ml-1 text-xs text-fk-muted">({count})</span>}
              </Link>
              <div className="mt-2 px-4 py-2 text-xs font-semibold uppercase text-fk-muted">Categories</div>
              {categories.map((c) => (
                <Link
                  key={c.name}
                  to="/search"
                  search={{ category: c.name, q: undefined }}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2.5 text-sm hover:bg-fk-gray"
                >
                  {c.name}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </header>
  );
}
