export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  images?: string[];
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  assured?: boolean;
  highlights: string[];
  specs: Record<string, string>;
  seller: string;
  description?: string;
};

const img = (seed: string, w = 400, h = 400) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;

const make = (
  id: number,
  name: string,
  brand: string,
  category: string,
  price: number,
  mrp: number,
  rating: number,
  reviews: number,
  assured = true,
): Product => ({
  id: String(id),
  name,
  brand,
  category,
  image: img(`${brand}-${id}`),
  images: [img(`${brand}-${id}-1`, 600, 600), img(`${brand}-${id}-2`, 600, 600), img(`${brand}-${id}-3`, 600, 600), img(`${brand}-${id}-4`, 600, 600)],
  price,
  mrp,
  rating,
  reviews,
  assured,
  highlights: [
    "1 Year Warranty",
    "Free Delivery",
    "10 Days Replacement",
    "Top Brand",
  ],
  specs: {
    Brand: brand,
    Model: `${brand}-${id}`,
    Color: "Black",
    Warranty: "1 Year",
    "In The Box": "Main Unit, Charger, Manual",
  },
  seller: "RetailNet",
  description: `${brand} ${name} — Premium quality product with great features and reliability.`,
});

export const products: Product[] = [
  make(1, "Galaxy M14 5G 128GB", "Samsung", "Electronics", 12499, 18999, 4.3, 12453),
  make(2, "iPhone 14 128GB Midnight", "Apple", "Electronics", 56999, 69900, 4.6, 84321),
  make(3, "Redmi Note 13 Pro", "Redmi", "Electronics", 22999, 27999, 4.4, 23145),
  make(4, "OnePlus Nord CE 3", "OnePlus", "Electronics", 24999, 28999, 4.5, 9842),
  make(5, "boAt Airdopes 141 TWS", "boAt", "Electronics", 1199, 4490, 4.1, 142322),
  make(6, "Sony WH-1000XM5 Headphones", "Sony", "Electronics", 26990, 34990, 4.7, 5234),
  make(7, "MI 43 inch 4K Smart TV", "MI", "Electronics", 26499, 39999, 4.3, 8432),
  make(8, "HP Pavilion 15 Laptop i5", "HP", "Electronics", 56990, 72999, 4.2, 1244),
  make(9, "Lenovo IdeaPad Slim 3", "Lenovo", "Electronics", 38990, 54999, 4.1, 2156),
  make(10, "Canon EOS R50 Mirrorless", "Canon", "Electronics", 62999, 74999, 4.6, 432),

  make(11, "Men Slim Fit Casual Shirt", "Roadster", "Fashion", 599, 1499, 4.1, 23145),
  make(12, "Women Floral Maxi Dress", "Anouk", "Fashion", 899, 2499, 4.3, 12455),
  make(13, "Men's Running Shoes", "Nike", "Fashion", 2999, 4999, 4.4, 7843),
  make(14, "Leather Wallet Brown", "WildHorn", "Fashion", 449, 1999, 4.0, 12343),
  make(15, "Women Handbag", "Caprese", "Fashion", 1499, 3499, 4.2, 4521),
  make(16, "Kids T-Shirt Pack of 3", "FirstCry", "Fashion", 599, 1499, 4.3, 2342),
  make(17, "Men's Analog Watch", "Fastrack", "Fashion", 1499, 2995, 4.4, 8421),
  make(18, "Aviator Sunglasses", "Ray-Ban", "Fashion", 4999, 7999, 4.5, 1234),

  make(19, "Cotton Bedsheet King Size", "Bombay Dyeing", "Home", 899, 2199, 4.2, 5432),
  make(20, "Non-Stick Cookware Set", "Prestige", "Home", 1999, 4999, 4.3, 9842),
  make(21, "Wall Clock Modern", "Ajanta", "Home", 499, 999, 4.0, 1234),
  make(22, "Storage Container Set", "Cello", "Home", 799, 1599, 4.4, 6754),
  make(23, "Memory Foam Pillow", "Wakefit", "Home", 999, 2499, 4.5, 12343),
  make(24, "LED Bulb Pack of 4", "Philips", "Home", 449, 899, 4.4, 9852),

  make(25, "Front Load Washing Machine", "LG", "Appliances", 31990, 42999, 4.4, 3421),
  make(26, "Double Door Refrigerator", "Whirlpool", "Appliances", 26990, 35999, 4.3, 2143),
  make(27, "1.5 Ton Split AC Inverter", "Voltas", "Appliances", 32990, 49990, 4.4, 5421),
  make(28, "Microwave Oven 23L", "IFB", "Appliances", 9990, 13999, 4.3, 4321),
  make(29, "Mixer Grinder 750W", "Bajaj", "Appliances", 2499, 4495, 4.2, 18432),
  make(30, "Water Purifier RO+UV", "Kent", "Appliances", 14990, 19999, 4.5, 7621),

  make(31, "Yoga Mat 6mm Anti Slip", "Fitkit", "Sports", 599, 1499, 4.1, 4321),
  make(32, "Cricket Bat English Willow", "SG", "Sports", 4999, 7999, 4.4, 1234),
  make(33, "Football Size 5", "Nivia", "Sports", 699, 1299, 4.3, 2341),
  make(34, "Dumbbell Set 20kg", "Kore", "Sports", 1999, 3999, 4.2, 5421),

  make(35, "The Alchemist Paperback", "HarperCollins", "Books", 249, 399, 4.6, 23145),
  make(36, "Atomic Habits Hardcover", "Random House", "Books", 499, 799, 4.7, 54321),
  make(37, "Rich Dad Poor Dad", "Plata", "Books", 299, 499, 4.5, 32145),

  make(38, "Lego Classic Bricks Box", "Lego", "Toys", 1999, 2999, 4.6, 4321),
  make(39, "Remote Control Car", "Hot Wheels", "Toys", 899, 1499, 4.3, 2143),
  make(40, "Soft Teddy Bear 3ft", "Storio", "Toys", 999, 2499, 4.4, 5421),

  make(41, "Face Wash Neem 150ml", "Himalaya", "Beauty", 149, 199, 4.4, 23145),
  make(42, "Lipstick Matte Long Lasting", "Lakmé", "Beauty", 399, 650, 4.3, 12343),
  make(43, "Perfume Eau de Parfum 100ml", "Engage", "Beauty", 599, 999, 4.2, 5421),

  make(44, "Basmati Rice 5kg", "India Gate", "Grocery", 599, 799, 4.6, 18432),
  make(45, "Olive Oil 1L", "Figaro", "Grocery", 599, 899, 4.5, 5421),
  make(46, "Coffee Powder 500g", "Bru", "Grocery", 299, 399, 4.4, 8432),

  make(47, "Gaming Mouse RGB", "Logitech", "Electronics", 1999, 3999, 4.5, 4321),
  make(48, "Mechanical Keyboard", "Razer", "Electronics", 6999, 9999, 4.6, 2143),
  make(49, "Smartwatch Bluetooth", "Noise", "Electronics", 1799, 4999, 4.1, 32145),
  make(50, "Power Bank 20000mAh", "Mi", "Electronics", 1799, 2499, 4.4, 23145),
  make(51, "Bluetooth Speaker", "JBL", "Electronics", 2499, 4499, 4.5, 18432),
  make(52, "Tablet 10 inch 64GB", "Lenovo", "Electronics", 14999, 19999, 4.2, 4321),
];

export const categories = [
  { name: "Electronics", icon: "Smartphone" },
  { name: "Fashion", icon: "Shirt" },
  { name: "Home", icon: "Home" },
  { name: "Appliances", icon: "Refrigerator" },
  { name: "Sports", icon: "Dumbbell" },
  { name: "Books", icon: "BookOpen" },
  { name: "Toys", icon: "ToyBrick" },
  { name: "Beauty", icon: "Sparkles" },
  { name: "Grocery", icon: "ShoppingBasket" },
];

export const banners = [
  {
    id: 1,
    title: "Big Saving Days",
    subtitle: "Up to 80% off on Electronics",
    color: "from-blue-600 to-indigo-700",
  },
  {
    id: 2,
    title: "Fashion Carnival",
    subtitle: "Min 50% off on Top Brands",
    color: "from-pink-500 to-rose-600",
  },
  {
    id: 3,
    title: "Home Appliance Fest",
    subtitle: "No Cost EMI from ₹999/month",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: 4,
    title: "Mobile Bonanza",
    subtitle: "Exchange & Bank offers up to ₹15,000",
    color: "from-amber-500 to-orange-600",
  },
];
