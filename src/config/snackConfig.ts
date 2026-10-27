export interface FlavorConfig {
  id: 'original' | 'sweet' | 'savory';
  name: string;
  tagline: string;
  badge: string;
  description: string;
  longDescription: string;
  colorScheme: {
    bgPastel: string;        // Soft pastel card/section background
    bgHeader: string;        // Accent header background
    primaryAccent: string;   // Vibrant tone for CTA buttons & badges
    badgeColor: string;      // Pill text & icon color
    borderColor: string;     // Border accent
    textColor: string;       // Deep readable text color
    gradient: string;        // Visual gradient for pouch mockup
  };
  tasteNotes: string[];
  ingredients: string[];
  nutrition: {
    calories: number;
    protein: string;
    fiber: string;
    sugar: string;
    totalFat: string;
    sodium: string;
  };
  rating: number;
  reviewCount: number;
  highlightText: string;
}

export interface BundleOption {
  id: string;
  label: string;
  count: number;
  pricePerBag: number;
  totalPrice: number;
  savingsText?: string;
  isPopular?: boolean;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  content: string;
  rating: number;
  flavor: string;
  avatarBg: string;
}

export const BRAND_CONFIG = {
  companyName: "SNACK CO.",
  tagline: "Better Snacking Starts Here",
  productName: "Crunchy Snack Bites",
  subhead: "Air-popped organic whole grains crisped to golden perfection in 100% cold-pressed avocado oil. Mindfully crafted, delightfully crunchy, and zero guilt.",
  academicDisclaimer: "🎓 NYU AI-First Business Venture Assessment Prototype — For Academic Demonstration Only",
  freeShippingThreshold: 35.00,
  
  // Rotating marquee announcements
  marqueeItems: [
    "✨ FREE CAMPUS SHIPPING ON ORDERS OVER $35",
    "🌱 100% AIR-POPPED WHOLE GRAINS",
    "🥑 CRAFTED WITH COLD-PRESSED AVOCADO OIL",
    "💛 NO SEED OILS OR ARTIFICIAL NASTIES",
    "🎒 THE OFFICIAL CAMPUS SNACK OF STUDY MARATHONS",
    "⚡ ONLY 110 CALORIES PER GENEROUS SERVING",
  ],

  // Core Flavors
  flavors: [
    {
      id: "original" as const,
      name: "Original Sea Salt",
      tagline: "Crisp, Light & Wholesomely Salted",
      badge: "Classic Crowd Favorite",
      description: "Air-popped whole grain bites delicately coated in pure avocado oil and hand-harvested pink Himalayan sea salt.",
      longDescription: "Our signature original crunch that started it all. Every kernel is popped under hot air pressure and dusted with micro-ground pink sea salt for an even, melt-in-your-mouth crunch that satisfies salty cravings without greasy fingers.",
      colorScheme: {
        bgPastel: "#FEF9C3",      // Soft Butter Yellow
        bgHeader: "#FEF08A",
        primaryAccent: "#EAB308",
        badgeColor: "#854D0E",
        borderColor: "#FACC15",
        textColor: "#713F12",
        gradient: "from-[#FEF08A] via-[#FDE047] to-[#EAB308]"
      },
      tasteNotes: ["Crisp Air-Popped Crunch", "Himalayan Mineral Salt", "Rich Buttery Avocado Finish"],
      ingredients: ["Organic Whole Grain Yellow Corn", "Cold-Pressed Avocado Oil", "Pink Himalayan Sea Salt"],
      nutrition: {
        calories: 110,
        protein: "3g",
        fiber: "4g",
        sugar: "0g",
        totalFat: "4.5g",
        sodium: "120mg"
      },
      rating: 4.9,
      reviewCount: 348,
      highlightText: "Zero sugar, just pure sea salt and golden crunch."
    },
    {
      id: "sweet" as const,
      name: "Sweet Cinnamon Glaze",
      tagline: "Warm Cinnamon & Golden Maple Glaze",
      badge: "Sweet Tooth Approved",
      description: "A cozy dusting of organic Ceylon cinnamon, golden maple crystals, and a pinch of salt for a dreamy sweet crunch.",
      longDescription: "Like your favorite churro or cinnamon bun, reimagined as a featherlight, crunchy air-popped bite. We lightly caramelize organic maple sap and dust it with warm, fragrant Ceylon cinnamon.",
      colorScheme: {
        bgPastel: "#FFEDD5",      // Soft Blush Peach
        bgHeader: "#FED7AA",
        primaryAccent: "#F97316",
        badgeColor: "#9A3412",
        borderColor: "#FB923C",
        textColor: "#7C2D12",
        gradient: "from-[#FED7AA] via-[#FDBA74] to-[#FB923C]"
      },
      tasteNotes: ["Fragrant Ceylon Cinnamon", "Caramelized Maple Crystal", "Warm Vanilla Undertone"],
      ingredients: ["Organic Whole Grain Corn", "Pure Coconut Oil", "Organic Maple Sugar", "Ceylon Cinnamon", "Sea Salt"],
      nutrition: {
        calories: 120,
        protein: "2g",
        fiber: "3g",
        sugar: "3g",
        totalFat: "4.0g",
        sodium: "85mg"
      },
      rating: 4.8,
      reviewCount: 284,
      highlightText: "Only 3g of natural maple sugar — zero high fructose corn syrup."
    },
    {
      id: "savory" as const,
      name: "Savory Herb & Garlic",
      tagline: "Smoky Umami with Garden Rosemary",
      badge: "Savory Umami Crunch",
      description: "Roasted garlic, vitamin-rich nutritional yeast umami, and crushed rosemary leaves for a gourmet savory sensation.",
      longDescription: "A culinary-inspired explosion of flavor. Roasted organic garlic cloves, fragrant rosemary, and savory nutritional yeast come together to deliver rich cheese-like umami that is 100% plant-based and dairy-free.",
      colorScheme: {
        bgPastel: "#CCFBF1",      // Soft Mint Teal
        bgHeader: "#99F6E4",
        primaryAccent: "#0D9488",
        badgeColor: "#115E59",
        borderColor: "#2DD4BF",
        textColor: "#134E4A",
        gradient: "from-[#CCFBF1] via-[#5EEAD4] to-[#14B8A6]"
      },
      tasteNotes: ["Slow-Roasted Garlic", "Cheesy Nutritional Yeast Umami", "Garden Fresh Rosemary"],
      ingredients: ["Organic Whole Grain Corn", "Cold-Pressed Avocado Oil", "Nutritional Yeast", "Garlic Powder", "Onion Powder", "Crushed Rosemary", "Sea Salt"],
      nutrition: {
        calories: 110,
        protein: "4g",
        fiber: "4g",
        sugar: "0g",
        totalFat: "4.5g",
        sodium: "135mg"
      },
      rating: 5.0,
      reviewCount: 216,
      highlightText: "Cheesy, garlic umami taste without a single drop of dairy."
    }
  ],

  // Bundle sizes with volume discounts
  bundles: [
    {
      id: "single",
      label: "Single Bag",
      count: 1,
      pricePerBag: 4.49,
      totalPrice: 4.49,
      savingsText: "Standard Trial"
    },
    {
      id: "3pack",
      label: "3-Pack Sampler",
      count: 3,
      pricePerBag: 3.99,
      totalPrice: 11.97,
      savingsText: "Save 11%"
    },
    {
      id: "6pack",
      label: "6-Pack Party Box",
      count: 6,
      pricePerBag: 3.49,
      totalPrice: 20.94,
      savingsText: "Save 22% • Most Popular",
      isPopular: true
    },
    {
      id: "12pack",
      label: "12-Pack Semester Stash",
      count: 12,
      pricePerBag: 2.99,
      totalPrice: 35.88,
      savingsText: "Save 33% • Free Shipping"
    }
  ] as BundleOption[],

  // Brand Pillars for Homepage
  brandPillars: [
    {
      title: "100% Air-Popped",
      icon: "💨",
      description: "No deep fryers, no heavy grease. We expand each grain with hot air for featherlight texture and unbeatable crunch.",
      badge: "Light & Crisp"
    },
    {
      title: "Cold-Pressed Avocado Oil",
      icon: "🥑",
      description: "Heart-healthy fats only. We never use cheap industrial seed oils (canola, corn, soy) that inflame the body.",
      badge: "Clean Good Fats"
    },
    {
      title: "Clean Kitchen Ingredients",
      icon: "🌱",
      description: "Ingredients you actually recognize and can pronounce. Non-GMO, whole grain, gluten-free, and vegan-friendly.",
      badge: "Real Food"
    },
    {
      title: "Eco-Conscious Packaging",
      icon: "♻️",
      description: "Our pouches use 40% less plastic than traditional snack bags and are fully recyclable through our university drop program.",
      badge: "Planet Positive"
    }
  ],

  // "How We Snack Up" Comparison Matrix (LesserEvil signature feature)
  comparisonMatrix: [
    {
      feature: "Cooking Method",
      snackCo: "Air-Popped with Hot Air",
      traditional: "Deep-Fried in Boiling Vats",
      advantage: true
    },
    {
      feature: "Oils Used",
      snackCo: "100% Pure Avocado & Coconut Oil",
      traditional: "Cheap Inflammatory Seed & Palm Oils",
      advantage: true
    },
    {
      feature: "Artificial Additives & Dyes",
      snackCo: "Zero (Pure Herbs, Spices & Salts)",
      traditional: "Yellow #6, MSG, & Artificial Flavors",
      advantage: true
    },
    {
      feature: "Calories per Bag",
      snackCo: "110 Clean Calories",
      traditional: "220+ Heavy Calories",
      advantage: true
    },
    {
      feature: "Study Focus (Brain Fog)",
      snackCo: "Light, Sustained Clean Energy",
      traditional: "Carb Coma & Greasy Fingers",
      advantage: true
    }
  ],

  // Social Proof & Testimonials
  testimonials: [
    {
      id: "t1",
      author: "Maya Lin",
      role: "NYU Stern Business Student",
      content: "These Crunchy Snack Bites saved my midterm week. The Savory Herb flavor tastes like high-end restaurant garlic toast, but it's completely light and non-greasy!",
      rating: 5,
      flavor: "Savory Herb & Garlic",
      avatarBg: "bg-emerald-100 text-emerald-800"
    },
    {
      id: "t2",
      author: "Jordan Hayes",
      role: "Tisch Film Major & Foodie",
      content: "The aesthetic of the packaging caught my eye on campus, but the Sweet Cinnamon flavor is what made me subscribe to the 12-pack stash. Unreal crunch.",
      rating: 5,
      flavor: "Sweet Cinnamon Glaze",
      avatarBg: "bg-orange-100 text-orange-800"
    },
    {
      id: "t3",
      author: "Dr. Evelyn Vance",
      role: "Holistic Nutritionist & Visiting Lecturer",
      content: "Finally, a snack company that swaps toxic seed oils for cold-pressed avocado oil without compromising on mouthwatering flavor. Outstanding product architecture.",
      rating: 5,
      flavor: "Original Sea Salt",
      avatarBg: "bg-amber-100 text-amber-800"
    }
  ] as Testimonial[],

  // Demo Promotional Codes
  promoCodes: {
    "NYUAI": { discount: 5.00, type: "fixed", description: "NYU AI Venture Assessment $5 Off" },
    "CAMPUSCRUNCH": { discount: 0.15, type: "percent", description: "15% Off Student Welcome" },
    "FREESHIP": { discount: 0, type: "shipping", description: "Free Standard Campus Delivery" }
  }
};
