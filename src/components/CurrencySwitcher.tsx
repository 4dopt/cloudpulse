import React from 'react';
import { useCart, Currency } from '@/src/context/CartContext';
import { cn } from '@/src/lib/utils';

export function CurrencySwitcher({ className }: { className?: string }) {
  const { currency, setCurrency } = useCart();

  const currencies: Array<{ id: Currency; label: string; symbol: string }> = [
    { id: 'EUR', label: 'EUR', symbol: '€' },
    { id: 'GBP', label: 'GBP', symbol: '£' },
    { id: 'USD', label: 'USD', symbol: '$' },
  ];

  return (
    <div className={cn("inline-flex items-center rounded-lg bg-zinc-100 p-0.5 border border-zinc-200/80 text-xs", className)}>
      {currencies.map((c) => (
        <button
          key={c.id}
          type="button"
          onClick={() => setCurrency(c.id)}
          className={cn(
            "px-2 py-0.5 rounded-md font-semibold transition-all cursor-pointer whitespace-nowrap",
            currency === c.id
              ? "bg-white text-zinc-950 shadow-sm"
              : "text-zinc-500 hover:text-zinc-900"
          )}
          title={`Switch currency to ${c.label} (${c.symbol})`}
        >
          {c.symbol} {c.label}
        </button>
      ))}
    </div>
  );
}
