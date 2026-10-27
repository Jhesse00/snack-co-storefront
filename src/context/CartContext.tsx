import React, { createContext, useContext, useState, useEffect } from 'react';
import { BRAND_CONFIG, FlavorConfig, BundleOption } from '../config/snackConfig';

export interface CartItem {
  id: string; // e.g. "original-6pack"
  flavorId: 'original' | 'sweet' | 'savory';
  flavorName: string;
  bundleId: string;
  bundleLabel: string;
  bagCount: number;
  unitPrice: number;
  quantity: number;
  colorScheme: FlavorConfig['colorScheme'];
}

export interface PromoInfo {
  code: string;
  discount: number;
  type: 'fixed' | 'percent' | 'shipping';
  description: string;
}

export interface OrderDetails {
  orderNumber: string;
  customerName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  shippingMethod: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  date: string;
}

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (flavor: FlavorConfig, bundle: BundleOption, quantity?: number) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  
  // Financial calculations
  subtotal: number;
  totalItemCount: number;
  freeShippingThreshold: number;
  amountUntilFreeShipping: number;
  freeShippingProgress: number;
  isFreeShipping: boolean;
  shippingCost: number;
  discountAmount: number;
  finalTotal: number;

  // Promo code
  promoCode: string;
  appliedPromo: PromoInfo | null;
  promoError: string | null;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;

  // View Navigation
  currentView: 'home' | 'shop' | 'checkout' | 'confirmation';
  setCurrentView: (view: 'home' | 'shop' | 'checkout' | 'confirmation') => void;
  selectedFlavorForModal: FlavorConfig | null;
  setSelectedFlavorForModal: (flavor: FlavorConfig | null) => void;

  // Order Details
  lastOrder: OrderDetails | null;
  completeDemoOrder: (details: Omit<OrderDetails, 'orderNumber' | 'date'>) => void;

  // Live Presentation Customizer
  customBrandName: string;
  setCustomBrandName: (name: string) => void;
  customTagline: string;
  setCustomTagline: (tagline: string) => void;
  activeHeroFlavor: 'original' | 'sweet' | 'savory';
  setActiveHeroFlavor: (flavorId: 'original' | 'sweet' | 'savory') => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('snack_co_cart');
      return saved ? JSON.parse(saved) : [
        // Seed default item for instant showcase delight
        {
          id: 'original-6pack',
          flavorId: 'original',
          flavorName: 'Original Sea Salt',
          bundleId: '6pack',
          bundleLabel: '6-Pack Party Box',
          bagCount: 6,
          unitPrice: 20.94,
          quantity: 1,
          colorScheme: BRAND_CONFIG.flavors[0].colorScheme
        }
      ];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'shop' | 'checkout' | 'confirmation'>('home');
  const [selectedFlavorForModal, setSelectedFlavorForModal] = useState<FlavorConfig | null>(null);
  const [lastOrder, setLastOrder] = useState<OrderDetails | null>(null);

  // Presentation customizer state
  const [customBrandName, setCustomBrandName] = useState(BRAND_CONFIG.companyName);
  const [customTagline, setCustomTagline] = useState(BRAND_CONFIG.tagline);
  const [activeHeroFlavor, setActiveHeroFlavor] = useState<'original' | 'sweet' | 'savory'>('original');

  // Promo code state
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<PromoInfo | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('snack_co_cart', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(prev => !prev);

  const addToCart = (flavor: FlavorConfig, bundle: BundleOption, quantity = 1) => {
    const itemId = `${flavor.id}-${bundle.id}`;
    setItems(prevItems => {
      const existing = prevItems.find(item => item.id === itemId);
      if (existing) {
        return prevItems.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prevItems,
        {
          id: itemId,
          flavorId: flavor.id,
          flavorName: flavor.name,
          bundleId: bundle.id,
          bundleLabel: bundle.label,
          bagCount: bundle.count,
          unitPrice: bundle.totalPrice,
          quantity,
          colorScheme: flavor.colorScheme
        }
      ];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems(prevItems => {
      return prevItems
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingThreshold = BRAND_CONFIG.freeShippingThreshold;
  const isFreeShipping = subtotal >= freeShippingThreshold || appliedPromo?.type === 'shipping';
  const amountUntilFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  let shippingCost = isFreeShipping || items.length === 0 ? 0 : 4.99;
  
  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.type === 'fixed') {
      discountAmount = Math.min(subtotal, appliedPromo.discount);
    } else if (appliedPromo.type === 'percent') {
      discountAmount = subtotal * appliedPromo.discount;
    }
  }

  const finalTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const applyPromoCode = (inputCode: string): boolean => {
    const clean = inputCode.trim().toUpperCase();
    setPromoError(null);
    if (!clean) {
      setPromoError('Please enter a coupon code.');
      return false;
    }
    const found = BRAND_CONFIG.promoCodes[clean as keyof typeof BRAND_CONFIG.promoCodes];
    if (found) {
      setAppliedPromo({
        code: clean,
        discount: found.discount,
        type: found.type as 'fixed' | 'percent' | 'shipping',
        description: found.description
      });
      setPromoCode(clean);
      return true;
    } else {
      setPromoError('Invalid demo code. Try "NYUAI" for $5 off or "FREESHIP"');
      return false;
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoCode('');
    setPromoError(null);
  };

  const completeDemoOrder = (details: Omit<OrderDetails, 'orderNumber' | 'date'>) => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `SNACK-${randomNum}`;
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const fullOrder: OrderDetails = {
      ...details,
      orderNumber,
      date
    };

    setLastOrder(fullOrder);
    setItems([]);
    setCurrentView('confirmation');
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        totalItemCount,
        freeShippingThreshold,
        amountUntilFreeShipping,
        freeShippingProgress,
        isFreeShipping,
        shippingCost,
        discountAmount,
        finalTotal,
        promoCode,
        appliedPromo,
        promoError,
        applyPromoCode,
        removePromoCode,
        currentView,
        setCurrentView,
        selectedFlavorForModal,
        setSelectedFlavorForModal,
        lastOrder,
        completeDemoOrder,
        customBrandName,
        setCustomBrandName,
        customTagline,
        setCustomTagline,
        activeHeroFlavor,
        setActiveHeroFlavor
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
