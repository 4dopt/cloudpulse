import React, { useState } from 'react';
import { Search, CheckCircle2, ShieldCheck, ArrowRight, Zap, Globe, Sparkles } from 'lucide-react';
import { useCart } from '@/src/context/CartContext';
import { cn } from '@/src/lib/utils';
import { Link } from 'react-router-dom';

export function DiscoveryDiagramSection() {
  const { formatPrice, setSelectedDomain, setIsCartOpen } = useCart();
  const [activeCategory, setActiveCategory] = useState<'all' | 'popular' | 'premium' | 'brandable' | 'short'>('premium');
  const [activeNode, setActiveNode] = useState('smart');

  // Top TLD Cards data
  const tldPromoCards = [
    { tld: '.ORG', priceGBP: 7.99, save: '$20', desc: 'The King of Non-profits & Brands' },
    { tld: '.NL', priceGBP: 6.99, save: '€15', desc: 'Dutch National Standard (Top Pick)' },
    { tld: '.COM', priceGBP: 8.99, save: '$15', desc: 'The Global Gold Standard' },
    { tld: '.IO', priceGBP: 29.99, save: '$30', desc: 'The Choice for Modern Tech & SaaS' },
  ];

  // Diagram pills
  const branchNodes = [
    { id: 'brand', label: 'Brand-Ready Names' },
    { id: 'availability', label: 'Instant Availability' },
    { id: 'smart', label: 'Smart Suggestions', active: true },
    { id: 'extensions', label: 'Global Extensions' },
    { id: 'nofees', label: 'No Hidden Fees' },
  ];

  // Benchmark metrics
  const benchmarks = [
    { label: 'Traditional Registrars', pct: 40, color: 'bg-zinc-300' },
    { label: 'Legacy Domain Platforms', pct: 52, color: 'bg-zinc-300' },
    { label: 'Marketplace Aggregators', pct: 80, color: 'bg-zinc-400' },
    { label: 'Standard Reseller Platforms', pct: 74, color: 'bg-zinc-400' },
    { label: 'Overall CloudPulse (Autoscaling Cloud)', pct: 98, color: 'bg-blue-600', isWinner: true },
  ];

  const handleSelectPromo = (tld: string, price: number) => {
    setSelectedDomain({
      domain: `mybrand${tld.toLowerCase()}`,
      priceGBP: price,
      tld: tld.toLowerCase(),
      action: 'register',
    });
    setIsCartOpen(true);
  };

  return (
    <section id="integrations" className="py-20 px-6 bg-zinc-50/60 border-b border-zinc-200/80">
      <div className="container mx-auto max-w-6xl space-y-20">
        {/* Row 1: Top TLD Promo Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tldPromoCards.map((card) => (
            <div
              key={card.tld}
              className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-sm hover:shadow-md hover:border-blue-400/80 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-display font-extrabold text-2xl text-zinc-950">{card.tld}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200">
                    Save {card.save}
                  </span>
                </div>
                <p className="text-xs text-zinc-500">{card.desc}</p>
              </div>

              <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                <div>
                  <span className="font-display font-bold text-lg text-zinc-950">{formatPrice(card.priceGBP)}</span>
                  <span className="text-[10px] text-zinc-400 block">Renews at standard rate</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleSelectPromo(card.tld, card.priceGBP)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                >
                  Check availability →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Integrations For Every Idea - Discover Domains That Fit (Diagram Card) */}
        <div className="rounded-3xl border border-zinc-200/80 bg-white p-8 md:p-12 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                Integrations For Every Idea
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-950">
                Discover Domains That Fit
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 max-w-xl mt-1">
                Find domain names perfectly matched to your brand, business, and online goals, helping you build a strong identity and launch confidently online.
              </p>
            </div>
            <a
              href="#preview-sandbox"
              className="text-xs font-bold px-4 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-colors self-start md:self-auto"
            >
              Learn More
            </a>
          </div>

          {/* Diagram Canvas with Central Input & Curved Branching Nodes */}
          <div className="p-6 md:p-10 rounded-2xl bg-zinc-50 border border-zinc-200/70 relative overflow-hidden text-center space-y-8">
            {/* Top Central Search Bar */}
            <div className="max-w-md mx-auto p-2.5 rounded-xl bg-white border border-zinc-200 shadow-sm flex items-center justify-between text-xs text-zinc-500">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-zinc-400" />
                <span className="text-zinc-400 font-mono">Type domain address...</span>
              </div>
              <span className="text-zinc-600 font-semibold px-2 py-0.5 rounded bg-zinc-100">All ▾</span>
            </div>

            {/* SVG Curved Branching Connectors */}
            <div className="hidden md:block w-full max-w-2xl mx-auto h-16">
              <svg viewBox="0 0 600 60" className="w-full h-full text-zinc-300" fill="none">
                {/* Center to Leftmost */}
                <path d="M300 0 C 300 30, 60 20, 60 60" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                {/* Center to Mid-Left */}
                <path d="M300 0 C 300 30, 180 20, 180 60" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                {/* Center to Middle */}
                <path d="M300 0 L 300 60" stroke="#2563eb" strokeWidth="2" />
                {/* Center to Mid-Right */}
                <path d="M300 0 C 300 30, 420 20, 420 60" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                {/* Center to Rightmost */}
                <path d="M300 0 C 300 30, 540 20, 540 60" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
              </svg>
            </div>

            {/* Bottom 5 Pill Nodes matching screenshot */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {branchNodes.map((node) => (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setActiveNode(node.id)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer shadow-xs",
                    activeNode === node.id || node.active
                      ? "bg-white text-blue-600 border-blue-400 shadow-blue-500/10 font-bold scale-105"
                      : "bg-white text-zinc-700 border-zinc-200/90 hover:border-zinc-300"
                  )}
                >
                  {node.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Row 3: "Everything You Need for Domains" Filter Tabs & Multi-year Table */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-widest block mb-1">
              Why choose CloudPulse
            </span>
            <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-zinc-950">
              Everything You Need for Domains
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 mt-2">
              Everything you need to search, buy, manage, and launch domains easily from one powerful, modern platform built for speed, security, and simplicity.
            </p>
          </div>

          {/* Filter Tabs strip */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-xl bg-zinc-100 border border-zinc-200 max-w-2xl mx-auto text-xs font-semibold">
            {[
              { id: 'all', label: 'All Domains' },
              { id: 'popular', label: 'Popular Extensions' },
              { id: 'premium', label: 'Premium Domains' },
              { id: 'brandable', label: 'Brandable Names' },
              { id: 'short', label: 'Short Domains' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id as any)}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap",
                  activeCategory === tab.id
                    ? "bg-white text-zinc-950 font-bold shadow-xs"
                    : "text-zinc-600 hover:text-zinc-950"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Multi-Year Pricing Table Card */}
          <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-zinc-900">QuantumLeap Cloud Bundle</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Instant Registration
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-zinc-500">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>Secure Ownership</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/70 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-zinc-700 mb-1">
                    <span>1 Year Registration</span>
                    <span className="text-emerald-600 text-[10px]">Save $20</span>
                  </div>
                  <span className="font-display font-extrabold text-2xl text-zinc-950">{formatPrice(9.99)}</span>
                  <span className="text-[10px] text-zinc-400 block mt-0.5">Renews at standard rate</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleSelectPromo('.com', 9.99)}
                  className="w-full py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold cursor-pointer"
                >
                  Buy Now
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 flex flex-col justify-between space-y-4 relative">
                <span className="absolute -top-2.5 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white">
                  Best Value
                </span>
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-blue-950 mb-1">
                    <span>2 Years Registration</span>
                    <span className="text-blue-700 text-[10px]">Save $25</span>
                  </div>
                  <span className="font-display font-extrabold text-2xl text-blue-950">{formatPrice(18.99)}</span>
                  <span className="text-[10px] text-zinc-500 block mt-0.5">Locks in promotional pricing</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleSelectPromo('.nl', 18.99)}
                  className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer shadow-sm"
                >
                  Buy 2 Years
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/70 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-zinc-700 mb-1">
                    <span>3 Years Registration</span>
                    <span className="text-emerald-600 text-[10px]">Save $30</span>
                  </div>
                  <span className="font-display font-extrabold text-2xl text-zinc-950">{formatPrice(26.99)}</span>
                  <span className="text-[10px] text-zinc-400 block mt-0.5">Max term discount</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleSelectPromo('.io', 26.99)}
                  className="w-full py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold cursor-pointer"
                >
                  Buy 3 Years
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Row 4: "Faster, Smarter Domain Search" Benchmark Bar Chart from screenshot */}
        <div className="rounded-3xl border border-zinc-200/80 bg-white p-8 md:p-12 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
                Better Domain Experience
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-950">
                Faster, Smarter Domain Search
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 max-w-xl mt-1">
                Compare how CloudPulse outperforms traditional domain platforms with faster search, better pricing, and modern tools built for launching brands online.
              </p>
            </div>
            <a
              href="#domains"
              className="text-xs font-bold px-4 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 self-start sm:self-auto"
            >
              View All
            </a>
          </div>

          {/* Bar Chart list with striped progress bars matching screenshot */}
          <div className="space-y-5 pt-2">
            {benchmarks.map((item) => (
              <div key={item.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className={item.isWinner ? "font-bold text-blue-600" : "text-zinc-600"}>
                    {item.label}
                  </span>
                  <span className={item.isWinner ? "font-mono font-bold text-blue-600 text-sm" : "font-mono text-zinc-500"}>
                    {item.pct}%
                  </span>
                </div>

                <div className="w-full h-4 bg-zinc-100 rounded-md overflow-hidden relative">
                  <div
                    style={{ width: `${item.pct}%` }}
                    className={cn(
                      "h-full rounded-md transition-all duration-700 relative",
                      item.isWinner ? "bg-blue-600 bg-striped-pattern" : "bg-zinc-400 bg-striped-pattern-dark"
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
