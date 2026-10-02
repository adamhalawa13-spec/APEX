import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, OrderStatus, ProductCategory, CollectionName, UserProfile } from '../types';
import { PRODUCTS } from '../data/products';

export type ViewMode =
  | 'home'
  | 'shop'
  | 'collections'
  | 'about'
  | 'account'
  | 'checkout'
  | 'admin';

interface ShopContextType {
  // Navigation / View
  currentView: ViewMode;
  setCurrentView: (view: ViewMode) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;
  
  // Filtering & Category presets
  categoryFilter: ProductCategory;
  setCategoryFilter: (category: ProductCategory) => void;
  collectionFilter: CollectionName | 'ALL';
  setCollectionFilter: (collection: CollectionName | 'ALL') => void;
  genderFilter: 'all' | 'men' | 'women';
  setGenderFilter: (gender: 'all' | 'men' | 'women') => void;
  goToCategory: (category: ProductCategory) => void;
  goToCollection: (collection: CollectionName) => void;
  goToGender: (gender: 'men' | 'women') => void;

  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  updateCartQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  shippingFee: number;
  cartTotal: number;

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Modals
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;

  // Orders
  orders: Order[];
  placeOrder: (orderData: Omit<Order, 'orderId' | 'date' | 'status' | 'trackingNumber' | 'estimatedDelivery'>) => Order;
  activeOrder: Order | null;
  setActiveOrder: (order: Order | null) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  cancelOrder: (orderId: string) => void;

  // User Auth
  currentUser: UserProfile | null;
  login: (email: string, password?: string) => boolean;
  signup: (profileData: { email: string; fullName: string; phone: string; address: string; city: string; district?: string }) => void;
  logout: () => void;

  // Admin Atelier Panel
  isAdmin: boolean;
  loginAdmin: (passkey: string) => boolean;
  logoutAdmin: () => void;
  printingOrder: Order | null;
  setPrintingOrder: (order: Order | null) => void;

  // Apple Pay Wallet
  applePayBalance: number;
  topUpApplePay: (amount: number) => void;
  setApplePayBalance: (amount: number) => void;
  deductApplePay: (amount: number) => boolean;

  // Quick feedback notification
  toastMessage: string | null;
  showToast: (message: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentViewState] = useState<ViewMode>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory>('ALL');
  const [collectionFilter, setCollectionFilter] = useState<CollectionName | 'ALL'>('ALL');
  const [genderFilter, setGenderFilter] = useState<'all' | 'men' | 'women'>('all');

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('apex_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('apex_wishlist');
      return saved ? JSON.parse(saved) : ['apex-essential-hoodie'];
    } catch {
      return ['apex-essential-hoodie'];
    }
  });

  // No fake pre-seeded orders: only real customer orders placed in this store
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('apex_orders');
      if (!saved) return [];
      const parsed: Order[] = JSON.parse(saved);
      // Strip out any legacy test orders
      return parsed.filter(
        (o) => o.orderId !== 'APX-84920' && o.orderId !== 'APX-91204'
      );
    } catch {
      return [];
    }
  });

  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // User Auth State: starts completely empty for a new customer
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('apex_user');
      if (!saved) return null;
      const parsed: UserProfile = JSON.parse(saved);
      // Remove mock user
      if (parsed.email === 'omar.elsayed@example.com') {
        localStorage.removeItem('apex_user');
        return null;
      }
      return parsed;
    } catch {
      return null;
    }
  });

  // Admin Atelier State
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem('apex_admin_logged') === 'true';
    } catch {
      return false;
    }
  });

  // Receipt Modal State
  const [printingOrder, setPrintingOrder] = useState<Order | null>(null);

  // Apple Pay Wallet Balance State (defaults to 2,500 EGP for realistic test scenarios)
  const [applePayBalance, setApplePayBalanceState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('apex_apple_pay_balance');
      return saved !== null ? Number(saved) : 2500;
    } catch {
      return 2500;
    }
  });

  const setApplePayBalance = (amount: number) => {
    const val = Math.max(0, Math.round(amount));
    setApplePayBalanceState(val);
    try {
      localStorage.setItem('apex_apple_pay_balance', String(val));
    } catch (e) {
      console.error(e);
    }
    showToast(`Apple Wallet balance set to EGP ${val.toLocaleString()}`);
  };

  const topUpApplePay = (amount: number) => {
    const validAmount = Math.max(0, Math.round(amount));
    setApplePayBalanceState((prev) => {
      const updated = prev + validAmount;
      try {
        localStorage.setItem('apex_apple_pay_balance', String(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
    showToast(`Added EGP ${validAmount.toLocaleString()} to Apple Wallet`);
  };

  const deductApplePay = (amount: number): boolean => {
    if (applePayBalance < amount) {
      return false;
    }
    const updated = applePayBalance - amount;
    setApplePayBalanceState(updated);
    try {
      localStorage.setItem('apex_apple_pay_balance', String(updated));
    } catch (e) {
      console.error(e);
    }
    return true;
  };

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('apex_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('apex_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('apex_admin_logged', isAdmin ? 'true' : 'false');
    } catch (e) {
      console.error(e);
    }
  }, [isAdmin]);

  const login = (email: string, password?: string): boolean => {
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address');
      return false;
    }
    // Check if user previously saved profile in registry
    let existingProfile: UserProfile | null = null;
    try {
      const registry = localStorage.getItem('apex_users_registry');
      if (registry) {
        const users: UserProfile[] = JSON.parse(registry);
        existingProfile = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase()) || null;
      }
    } catch (e) {
      console.error(e);
    }

    if (existingProfile) {
      setCurrentUser(existingProfile);
      showToast(`Welcome back, ${existingProfile.fullName}`);
      return true;
    }

    // If new login without prior registry, initialize profile
    const user: UserProfile = {
      id: `usr_${Date.now()}`,
      email: email.trim().toLowerCase(),
      fullName: email.split('@')[0].toUpperCase(),
      phone: '',
      address: '',
      city: 'Cairo',
      district: '',
      registeredAt: new Date().toISOString().split('T')[0],
    };
    setCurrentUser(user);
    showToast(`Welcome to APEX, ${user.fullName}`);
    return true;
  };

  const signup = (profileData: {
    email: string;
    fullName: string;
    phone: string;
    address: string;
    city: string;
    district?: string;
  }) => {
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      email: profileData.email.trim().toLowerCase(),
      fullName: profileData.fullName.trim(),
      phone: profileData.phone.trim(),
      address: profileData.address.trim(),
      city: profileData.city.trim(),
      district: profileData.district?.trim() || '',
      registeredAt: new Date().toISOString().split('T')[0],
    };

    setCurrentUser(newUser);

    // Save into users registry so their address persists across sessions
    try {
      const registry = localStorage.getItem('apex_users_registry');
      const users: UserProfile[] = registry ? JSON.parse(registry) : [];
      const updated = users.filter((u) => u.email !== newUser.email).concat(newUser);
      localStorage.setItem('apex_users_registry', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    showToast(`Account registered. Address saved for all future orders.`);
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Signed out of APEX account');
  };

  const loginAdmin = (passkey: string): boolean => {
    // Only opened by owner with password (Adouma1234)
    const normalized = passkey.trim();
    const valid = normalized === 'Adouma1234' || normalized.toLowerCase() === 'adouma1234';
    if (valid) {
      setIsAdmin(true);
      showToast('Owner access verified. Welcome to APEX Atelier Control.');
      setCurrentView('admin');
      return true;
    }
    showToast('Incorrect owner password. Access restricted.');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    showToast('Admin session closed.');
    setCurrentView('home');
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) => {
      const updated = prev.map((ord) =>
        ord.orderId === orderId ? { ...ord, status } : ord
      );
      try {
        localStorage.setItem('apex_orders', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
    showToast(`Order #${orderId} status updated to ${status}`);
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) => {
      const updated = prev.map((ord) =>
        ord.orderId === orderId ? { ...ord, status: 'CANCELLED' as OrderStatus } : ord
      );
      try {
        localStorage.setItem('apex_orders', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
    showToast(`Order #${orderId} has been successfully cancelled.`);
  };

  useEffect(() => {
    try {
      localStorage.setItem('apex_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('apex_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('apex_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 2800);
  };

  const setCurrentView = (view: ViewMode) => {
    setCurrentViewState(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  const goToCategory = (category: ProductCategory) => {
    setCategoryFilter(category);
    setCollectionFilter('ALL');
    setCurrentView('shop');
  };

  const goToCollection = (collection: CollectionName) => {
    setCollectionFilter(collection);
    setCategoryFilter('ALL');
    setCurrentView('shop');
  };

  const goToGender = (gender: 'men' | 'women') => {
    setGenderFilter(gender);
    setCategoryFilter('ALL');
    setCollectionFilter('ALL');
    setCurrentView('shop');
  };

  const addToCart = (product: Product, size: string, color: string, quantity: number = 1) => {
    const itemKey = `${product.id}-${size}-${color}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.id === itemKey ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: itemKey, product, size, color, quantity }];
    });
    showToast(`Added ${product.name} (${size}) to bag`);
    setIsCartOpen(true);
  };

  const updateCartQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    showToast('Item removed from bag');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  // Zero shipping fees on all orders
  const shippingFee = 0;
  const cartTotal = cartSubtotal;

  const placeOrder = (
    orderData: Omit<Order, 'orderId' | 'date' | 'status' | 'trackingNumber' | 'estimatedDelivery'>
  ): Order => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newOrder: Order = {
      ...orderData,
      orderId: `APX-${randomNum}`,
      date: new Date().toISOString().split('T')[0],
      status: 'ORDER PLACED',
      customerEmail: currentUser ? currentUser.email : orderData.customer.email,
      trackingNumber: `EG-APX-${randomNum + 50000}`,
      estimatedDelivery: 'In 2 business days',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    clearCart();

    // If no user was signed in, automatically create profile for convenience
    if (!currentUser && orderData.customer.email) {
      signup({
        email: orderData.customer.email,
        fullName: orderData.customer.fullName,
        phone: orderData.customer.phone,
        address: orderData.customer.address,
        city: orderData.customer.city,
        district: orderData.customer.district,
      });
    }

    return newOrder;
  };

  return (
    <ShopContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedProduct,
        setSelectedProduct,
        openProductModal,
        closeProductModal,
        categoryFilter,
        setCategoryFilter,
        collectionFilter,
        setCollectionFilter,
        genderFilter,
        setGenderFilter,
        goToCategory,
        goToCollection,
        goToGender,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        shippingFee,
        cartTotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isSearchOpen,
        setIsSearchOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        orders,
        placeOrder,
        activeOrder,
        setActiveOrder,
        updateOrderStatus,
        cancelOrder,
        currentUser,
        login,
        signup,
        logout,
        isAdmin,
        loginAdmin,
        logoutAdmin,
        printingOrder,
        setPrintingOrder,
        applePayBalance,
        topUpApplePay,
        setApplePayBalance,
        deductApplePay,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
