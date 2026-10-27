import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { AnnouncementBar } from './components/common/AnnouncementBar';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { DemoToolbar } from './components/common/DemoToolbar';
import { CartDrawer } from './components/cart/CartDrawer';
import { ProductQuickView } from './components/shop/ProductQuickView';

// Homepage Sections
import { HeroSection } from './components/sections/HeroSection';
import { FeaturedSection } from './components/sections/FeaturedSection';
import { ComparisonTable } from './components/sections/ComparisonTable';
import { FlavorShowcase } from './components/sections/FlavorShowcase';
import { Testimonials } from './components/sections/Testimonials';

// Other Views
import { ShopPage } from './components/shop/ShopPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { OrderSuccessView } from './components/checkout/OrderSuccessView';

const MainViewRouter: React.FC = () => {
  const { currentView } = useCart();

  switch (currentView) {
    case 'shop':
      return <ShopPage />;
    case 'checkout':
      return <CheckoutPage />;
    case 'confirmation':
      return <OrderSuccessView />;
    case 'home':
    default:
      return (
        <main>
          <HeroSection />
          <FeaturedSection />
          <ComparisonTable />
          <FlavorShowcase />
          <Testimonials />
        </main>
      );
  }
};

export const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-snack-cream text-snack-dark selection:bg-snack-yellow selection:text-snack-dark">
      {/* Top Banner & Marquee */}
      <AnnouncementBar />

      {/* Main Navigation */}
      <Navbar />

      {/* Dynamic View Content */}
      <div className="flex-1">
        <MainViewRouter />
      </div>

      {/* Footer */}
      <Footer />

      {/* Slide-out Cart Drawer */}
      <CartDrawer />

      {/* Ingredients & Nutrition Modal */}
      <ProductQuickView />

      {/* NYU Presentation Customizer Drawer */}
      <DemoToolbar />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
};

export default App;
