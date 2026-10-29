import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '@/src/context/CartContext';
import { CurrencySwitcher } from './CurrencySwitcher';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItemCount, setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between gap-8 px-6 max-w-7xl">
        {/* Zone 1: Brand (matching the modern Secha/CloudPulse geometric mark) */}
        <Link to="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-zinc-900 shrink-0 group">
          <div className="w-8 h-8 rounded-lg bg-zinc-950 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4H10V10H4V4Z" fill="currentColor" />
              <path d="M14 4H20V10H14V4Z" fill="currentColor" opacity="0.6" />
              <path d="M4 14H10V20H4V14Z" fill="currentColor" opacity="0.6" />
              <path d="M14 14H20V20H14V14Z" fill="currentColor" />
            </svg>
          </div>
          <span className="font-display font-extrabold text-xl tracking-tight text-zinc-950">CloudPulse</span>
        </Link>

        {/* Zone 2: Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-zinc-600">
          <a href="#domains" className="hover:text-zinc-950 transition-colors whitespace-nowrap">
            Domains
          </a>
          <a href="#integrations" className="hover:text-zinc-950 transition-colors whitespace-nowrap">
            Integrations
          </a>
          <a href="#hosting" className="hover:text-zinc-950 transition-colors whitespace-nowrap">
            Hosting
          </a>
          <a href="#stackcp" className="hover:text-zinc-950 transition-colors whitespace-nowrap">
            Cloud Stack
          </a>
          <a href="#faq" className="hover:text-zinc-950 transition-colors whitespace-nowrap">
            Support
          </a>
        </nav>

        {/* Zone 3: Actions & Currency */}
        <div className="flex items-center gap-3 shrink-0">
          <CurrencySwitcher />

          {/* Cart Trigger */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200/80 text-zinc-700 transition-all cursor-pointer border border-zinc-200/60"
            title="View Order Summary"
            aria-label="View Order Summary"
          >
            <ShoppingCart className="h-4.5 w-4.5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-extrabold flex items-center justify-center border-2 border-white shadow-sm">
                {cartItemCount}
              </span>
            )}
          </button>

          <Link
            to="/checkout"
            className="hidden sm:inline-block text-sm font-semibold text-zinc-700 hover:text-zinc-950 transition-colors px-2"
          >
            Login
          </Link>

          {/* Pill CTA button matching reference screenshot */}
          <Link
            to="/checkout"
            className="rounded-full bg-zinc-950 hover:bg-zinc-800 text-white px-5 py-2 text-xs md:text-sm font-semibold transition-all whitespace-nowrap shrink-0 shadow-sm"
          >
            Sign Up
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden text-zinc-700 hover:text-zinc-950 p-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-t border-zinc-200 bg-white px-6 py-6 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-3">
            <a href="#domains" className="text-base text-zinc-700 font-medium py-1" onClick={() => setIsOpen(false)}>
              Domains
            </a>
            <a href="#integrations" className="text-base text-zinc-700 font-medium py-1" onClick={() => setIsOpen(false)}>
              Integrations & Features
            </a>
            <a href="#hosting" className="text-base text-zinc-700 font-medium py-1" onClick={() => setIsOpen(false)}>
              Cloud Hosting
            </a>
            <a href="#stackcp" className="text-base text-zinc-700 font-medium py-1" onClick={() => setIsOpen(false)}>
              StackCP Control
            </a>
            <a href="#faq" className="text-base text-zinc-700 font-medium py-1" onClick={() => setIsOpen(false)}>
              Support & FAQ
            </a>
          </div>
          <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
            <Link
              to="/checkout"
              onClick={() => setIsOpen(false)}
              className="w-full h-11 rounded-full bg-zinc-950 text-white font-bold text-sm flex items-center justify-center gap-2"
            >
              Sign Up / Get Started <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
