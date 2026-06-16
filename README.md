# 🛒 Flipkart Frontend Clone

A pixel-perfect, fully responsive frontend clone of Flipkart — India's largest e-commerce platform — built with **React**, **Vite**, **Tailwind CSS**, and **React Router v6**.

---

## 🖥️ Live Preview

> _Deploy to Vercel or Netlify and paste your live URL here._

---

## 📸 Screenshots

| Home Page | Product Detail | Cart |
|-----------|---------------|------|
| _(add screenshot)_ | _(add screenshot)_ | _(add screenshot)_ |

---

## ✨ Features

- 🏠 **Home Page** — Hero carousel, Deal of the Day, Category grid, Product sections
- 🔍 **Search & Filter** — Live search on mock data, sidebar filters (brand, price, rating, discount)
- 📦 **Product Detail** — Image gallery, offers section, ratings, specifications table
- 🛒 **Cart** — Add/remove items, quantity stepper, dynamic price summary
- 📱 **Mobile-First** — Bottom navigation bar, swipeable carousels, collapsible filter drawer
- 🎨 **Flipkart Design System** — Exact blue/orange color scheme, Assured badges, discount overlays
- ⚡ **No Backend** — Fully powered by static mock JSON data (50+ products)

---

## 🗂️ Project Structure

```
flipkart-clone/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Navbar/
│   │   │   └── Navbar.jsx
│   │   ├── ProductCard/
│   │   │   └── ProductCard.jsx
│   │   ├── HeroCarousel/
│   │   │   └── HeroCarousel.jsx
│   │   ├── FilterSidebar/
│   │   │   └── FilterSidebar.jsx
│   │   ├── BottomNav/
│   │   │   └── BottomNav.jsx
│   │   ├── CategoryGrid/
│   │   │   └── CategoryGrid.jsx
│   │   ├── StarRating/
│   │   │   └── StarRating.jsx
│   │   └── Badge/
│   │       └── Badge.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── SearchResults.jsx
│   │   ├── ProductDetail.jsx
│   │   └── Cart.jsx
│   ├── data/
│   │   └── mockProducts.js
│   ├── hooks/
│   │   └── useCart.js
│   ├── context/
│   │   └── CartContext.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI framework |
| **Vite** | Build tool & dev server |
| **Tailwind CSS** | Utility-first styling |
| **React Router v6** | Client-side routing |
| **Context API** | Global cart state management |
| **Lucide React** | Icons |

---

## 📄 Pages

### 🏠 Home Page `/`
- Responsive navbar with search bar, login button, cart icon with badge
- Secondary category navigation with icons
- Auto-sliding hero carousel with arrow and dot controls
- Deal of the Day — horizontally scrollable on mobile, grid on desktop
- Category quick-access grid
- Product sections: Best of Electronics, Top Offers, Recommended for You

### 🔍 Search / Category Page `/search` or `/category/:name`
- Collapsible filter drawer on mobile, sidebar on desktop
- Filters: brand, price range slider, rating, discount
- Sort by: Relevance, Price (Low–High), Price (High–Low), Rating
- 2-column grid on mobile, 4-column grid on desktop
- Pagination

### 📦 Product Detail Page `/product/:id`
- Swipeable image gallery with thumbnail strip
- MRP strikethrough, discounted price, % off badge
- Bank offers, EMI, exchange offer cards
- Seller info section
- Sticky "ADD TO CART" + "BUY NOW" buttons on mobile
- Highlights list and specifications table
- Customer reviews with rating breakdown bars

### 🛒 Cart Page `/cart`
- Cart item cards with quantity stepper and remove button
- Price Details summary (sticky on desktop, bottom sheet on mobile)
- "PLACE ORDER" CTA button

### 🔐 Login Modal
- Phone / Email tab toggle
- OTP input UI

---

## 🎨 Design Tokens

| Token | Value | Usage |
|---|---|---|
| Primary Blue | `#2874F0` | Navbar, buttons, links |
| CTA Orange | `#FB641B` | Buy Now, offers |
| Page Background | `#F1F3F6` | App background |
| Card Background | `#FFFFFF` | Product cards |
| Star Rating | `#FFD700` | Rating stars |
| Success Green | `#388E3C` | Discount, in-stock |

---

## 📱 Mobile Responsiveness

- **Bottom navigation bar** — fixed, with Home / Categories / Cart / Account icons
- **Swipeable carousels** — CSS `scroll-snap` based
- **Filter drawer** — slides up from bottom on mobile
- **Sticky CTA bar** — Add to Cart / Buy Now on product page
- **2-column product grid** on screens `< 768px`
- **Touch-friendly tap targets** — minimum `44px`

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>= 18.x`
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Tharanitharan30/flipkart-clone.git

# 2. Navigate into the project
cd flipkart-clone

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be running at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 🧩 Key Components

| Component | Description |
|---|---|
| `<Navbar />` | Responsive top bar with search, login, cart |
| `<HeroCarousel />` | Auto-play banner slider with dots & arrows |
| `<ProductCard />` | Image, name, rating, price, discount badge |
| `<CategoryGrid />` | Icon-based category quick access |
| `<FilterSidebar />` | Desktop filters (brand, price, rating) |
| `<FilterDrawer />` | Mobile bottom-sheet filter panel |
| `<SortBar />` | Sort options for search/category pages |
| `<ProductImageGallery />` | Swipeable image viewer with thumbnails |
| `<PriceSummaryCard />` | Cart price breakdown with CTA |
| `<CartItem />` | Individual cart row with qty & remove |
| `<BottomNav />` | Mobile-only fixed bottom navigation |
| `<StarRating />` | Interactive or display star rating |
| `<Badge />` | Discount %, Flipkart Assured, offer tags |

---

## 📦 Mock Data

All product data lives in `src/data/mockProducts.js`. It includes 50+ products across categories like Electronics, Fashion, Home, and Appliances.

Each product object follows this shape:

```js
{
  id: "1",
  name: "Samsung Galaxy S24 Ultra",
  category: "Electronics",
  brand: "Samsung",
  price: 124999,
  mrp: 134999,
  discount: 7,
  rating: 4.5,
  reviews: 12430,
  image: "https://...",
  assured: true,
  badge: "Best Seller"
}
```

---

## 🛒 Cart State

Cart is managed globally via React Context (`CartContext`). The `useCart` hook provides:

```js
const { cartItems, addToCart, removeFromCart, updateQty, cartTotal } = useCart();
```

---

## 📋 TODO / Roadmap

- [ ] Add wishlist feature
- [ ] Add login/auth flow with mock JWT
- [ ] Integrate real product API (FakeStoreAPI or custom)
- [ ] Add order history page
- [ ] Add animations with Framer Motion
- [ ] PWA support

---

## 🤝 Contributing

Pull requests are welcome! Please open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is for **educational purposes only**. Flipkart is a trademark of Flipkart Private Limited. This clone is not affiliated with or endorsed by Flipkart.

---

## 👨‍💻 Author

**Tharanitharan** — [GitHub](https://github.com/Tharanitharan30) · [LinkedIn](https://linkedin.com/in/tharanitharan)

> _"If you crack the system, first understand the system."_

---

⭐ If you found this project helpful, please give it a star!
