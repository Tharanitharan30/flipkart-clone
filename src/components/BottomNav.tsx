import { Link, useRouterState } from "@tanstack/react-router";
import { Home, LayoutGrid, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/hooks/useCart";

export function BottomNav() {
  const { count } = useCart();
  const path = useRouterState({ select: (s) => s.location.pathname });

  const tabs = [
    { to: "/", label: "Home", icon: Home, active: path === "/" },
    { to: "/search", label: "Categories", icon: LayoutGrid, active: path.startsWith("/search") },
    { to: "/cart", label: "Cart", icon: ShoppingCart, active: path === "/cart", badge: count },
    { to: "/login", label: "Account", icon: User, active: path === "/login" },
  ] as const;

  return (
    <nav
      aria-label="Bottom navigation"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-white pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="grid grid-cols-4">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <li key={t.label}>
              <Link
                to={t.to}
                search={t.to === "/search" ? { q: undefined, category: undefined } : undefined}
                className={`relative flex min-h-[56px] flex-col items-center justify-center gap-0.5 text-[11px] ${
                  t.active ? "text-fk-blue" : "text-fk-muted"
                }`}
              >
                <Icon className="h-5 w-5" />
                {t.label}
                {"badge" in t && t.badge && t.badge > 0 ? (
                  <span className="absolute right-1/4 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-fk-orange px-1 text-[9px] font-bold text-white">
                    {t.badge}
                  </span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
