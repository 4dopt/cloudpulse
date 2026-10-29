import React, { createContext, useContext, useState, useEffect } from 'react';

export type Currency = 'EUR' | 'GBP' | 'USD';

export interface SelectedDomain {
  domain: string;
  priceGBP: number;
  tld: string;
  action: 'register' | 'transfer';
}

export interface SelectedHosting {
  id: string;
  name: string;
  monthlyPriceGBP: number;
  annualPriceGBP: number;
  features: string[];
}

export interface CartAddons {
  automatedBackups: boolean;
  spamFilter: boolean;
  dedicatedIp: boolean;
}

interface CartContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountGBP: number) => string;
  currencySymbol: string;
  selectedDomain: SelectedDomain | null;
  setSelectedDomain: (d: SelectedDomain | null) => void;
  selectedHosting: SelectedHosting | null;
  setSelectedHosting: (h: SelectedHosting | null) => void;
  billingCycle: 'monthly' | 'annual';
  setBillingCycle: (cycle: 'monthly' | 'annual') => void;
  addons: CartAddons;
  toggleAddon: (key: keyof CartAddons) => void;
  promoCode: string;
  setPromoCode: (code: string) => void;
  discountPercent: number;
  applyPromoCode: (code: string) => boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  calculateTotalGBP: () => {
    subtotal: number;
    discountAmount: number;
    total: number;
    savings: number;
  };
  cartItemCount: number;
  clearCart: () => void;
}

const EXCHANGE_RATES: Record<Currency, { rate: number; symbol: string; prefix: boolean }> = {
  EUR: { rate: 1.18, symbol: '€', prefix: true },
  GBP: { rate: 1.0, symbol: '£', prefix: true },
  USD: { rate: 1.28, symbol: '$', prefix: true },
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('EUR'); // Default to EUR for European audience
  const [selectedDomain, setSelectedDomain] = useState<SelectedDomain | null>(() => {
    try {
      const saved = localStorage.getItem('cloudpulse_domain');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [selectedHosting, setSelectedHosting] = useState<SelectedHosting | null>(() => {
    try {
      const saved = localStorage.getItem('cloudpulse_hosting');
      return saved ? JSON.parse(saved) : {
        id: 'pro',
        name: 'Business Pro',
        monthlyPriceGBP: 12.99,
        annualPriceGBP: 9.99,
        features: ['50GB NVMe SSD Storage', 'Unlimited Bandwidth', '10 Websites', 'Free Wildcard SSL', '1-Click Staging', 'Daily Automated Backups'],
      };
    } catch {
      return null;
    }
  });

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [addons, setAddons] = useState<CartAddons>({
    automatedBackups: true,
    spamFilter: false,
    dedicatedIp: false,
  });
  const [promoCode, setPromoCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (selectedDomain) {
      localStorage.setItem('cloudpulse_domain', JSON.stringify(selectedDomain));
    } else {
      localStorage.removeItem('cloudpulse_domain');
    }
  }, [selectedDomain]);

  useEffect(() => {
    if (selectedHosting) {
      localStorage.setItem('cloudpulse_hosting', JSON.stringify(selectedHosting));
    } else {
      localStorage.removeItem('cloudpulse_hosting');
    }
  }, [selectedHosting]);

  const formatPrice = (amountGBP: number): string => {
    const config = EXCHANGE_RATES[currency];
    const converted = amountGBP * config.rate;
    return `${config.symbol}${converted.toFixed(2)}`;
  };

  const currencySymbol = EXCHANGE_RATES[currency].symbol;

  const toggleAddon = (key: keyof CartAddons) => {
    setAddons((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const applyPromoCode = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'WELCOME' || clean === 'CLOUDPULSE20' || clean === 'CLOUDPULSE') {
      setDiscountPercent(20);
      setPromoCode(clean);
      return true;
    }
    return false;
  };

  const calculateTotalGBP = () => {
    let subtotal = 0;
    let savings = 0;

    // Hosting price
    if (selectedHosting) {
      if (billingCycle === 'annual') {
        const fullPrice = selectedHosting.monthlyPriceGBP * 12;
        const discountedAnnual = selectedHosting.annualPriceGBP * 12;
        subtotal += discountedAnnual;
        savings += fullPrice - discountedAnnual;
      } else {
        subtotal += selectedHosting.monthlyPriceGBP;
      }
    }

    // Domain price
    if (selectedDomain) {
      subtotal += selectedDomain.priceGBP;
    }

    // Addons
    if (addons.automatedBackups) {
      subtotal += billingCycle === 'annual' ? 24.0 : 2.5;
    }
    if (addons.spamFilter) {
      subtotal += billingCycle === 'annual' ? 18.0 : 1.99;
    }
    if (addons.dedicatedIp) {
      subtotal += billingCycle === 'annual' ? 36.0 : 3.5;
    }

    const discountAmount = subtotal * (discountPercent / 100);
    const total = Math.max(0, subtotal - discountAmount);

    return {
      subtotal,
      discountAmount,
      total,
      savings: savings + discountAmount,
    };
  };

  const cartItemCount = (selectedDomain ? 1 : 0) + (selectedHosting ? 1 : 0);

  const clearCart = () => {
    setSelectedDomain(null);
    setSelectedHosting(null);
    setDiscountPercent(0);
    setPromoCode('');
  };

  return (
    <CartContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        currencySymbol,
        selectedDomain,
        setSelectedDomain,
        selectedHosting,
        setSelectedHosting,
        billingCycle,
        setBillingCycle,
        addons,
        toggleAddon,
        promoCode,
        setPromoCode,
        discountPercent,
        applyPromoCode,
        isCartOpen,
        setIsCartOpen,
        calculateTotalGBP,
        cartItemCount,
        clearCart,
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
