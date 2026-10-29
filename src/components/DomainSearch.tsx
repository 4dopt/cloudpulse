import React, { useState } from 'react';
import { Search, Loader2, Check, ArrowRight, Sparkles, Globe, ShieldCheck, ChevronDown, CheckCircle2, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/src/lib/utils';
import { DomainSearchResult } from '@/src/lib/cloud-api';
import { useCart } from '@/src/context/CartContext';

export function DomainSearch() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<DomainSearchResult[] | null>(null);
  const [activeTab, setActiveTab] = useState<'search' | 'ai' | 'extensions'>('search');
  const [selectedTldFilter, setSelectedTldFilter] = useState('All');
  const [aiIndustry, setAiIndustry] = useState('tech');

  const { formatPrice, selectedDomain, setSelectedDomain, setIsCartOpen } = useCart();

  // Curated showcase domains matching the exact screenshot
  const defaultShowcaseDomains = [
    {
      name: 'spectrasurf',
      extensions: ['.nl', '.com', '.pro'],
      discountBadge: 'Save 64% by purchasing these domains together',
      priceGBP: 5.99,
      available: true,
    },
    {
      name: 'quantumleap',
      extensions: ['.com', '.eu', '.net'],
      discountBadge: null,
      priceGBP: 14.99,
      available: true,
    },
    {
      name: 'novadrive',
      extensions: ['.io', '.nl', '.site'],
      discountBadge: 'Save 50% by purchasing these domains together',
      priceGBP: 9.99,
      available: true,
    },
    {
      name: 'zenithpath',
      extensions: ['.store', '.com'],
      discountBadge: null,
      priceGBP: 6.49,
      available: true,
    },
  ];

  const handleSearch = async (e?: React.FormEvent, customQuery?: string) => {
    e?.preventDefault();
    const searchTarget = customQuery || query;
    if (!searchTarget || searchTarget.length < 2) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/domains/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchTarget }),
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Domain search failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectDomain = (result: { domain: string; priceGBP: number; tld: string }) => {
    setSelectedDomain({
      domain: result.domain,
      priceGBP: result.priceGBP,
      tld: result.tld,
      action: 'register',
    });
    setIsCartOpen(true);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Category switcher pills (Domain Search, AI Generator, Extensions) as in reference image */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <button
          type="button"
          onClick={() => setActiveTab('search')}
          className={cn(
            "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-sm",
            activeTab === 'search'
              ? "bg-white text-blue-600 border border-blue-200/80 shadow-blue-500/10 font-bold"
              : "bg-white/80 text-zinc-600 border border-zinc-200 hover:text-zinc-950 hover:bg-white"
          )}
        >
          <Globe className="h-4 w-4 text-blue-500" />
          <span>Domain Search</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('ai')}
          className={cn(
            "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-sm",
            activeTab === 'ai'
              ? "bg-white text-blue-600 border border-blue-200/80 shadow-blue-500/10 font-bold"
              : "bg-white/80 text-zinc-600 border border-zinc-200 hover:text-zinc-950 hover:bg-white"
          )}
        >
          <Sparkles className="h-4 w-4 text-purple-500" />
          <span>AI Generator</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('extensions')}
          className={cn(
            "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-sm",
            activeTab === 'extensions'
              ? "bg-white text-blue-600 border border-blue-200/80 shadow-blue-500/10 font-bold"
              : "bg-white/80 text-zinc-600 border border-zinc-200 hover:text-zinc-950 hover:bg-white"
          )}
        >
          <span className="text-zinc-500">📦</span>
          <span>Extensions (.nl, .com, .io)</span>
        </button>
      </div>

      {/* The Floating Browser Window Mockup (matches reference screenshot exactly) */}
      <div className="rounded-2xl sm:rounded-3xl border border-zinc-200/80 bg-white shadow-2xl shadow-zinc-900/10 overflow-hidden text-left relative z-20">
        {/* Browser Chrome Header */}
        <div className="h-11 bg-zinc-50/90 border-b border-zinc-200/80 px-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>

          <div className="flex-1 max-w-sm h-7 rounded-md bg-white border border-zinc-200/80 px-3 flex items-center justify-center gap-1.5 text-xs text-zinc-500 font-mono shadow-xs">
            <span className="text-zinc-400">🔒</span>
            <span className="text-zinc-800 font-medium">cloudpulse.io/domains</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-[10px]">
              CP
            </div>
          </div>
        </div>

        {/* Browser Interior Canvas */}
        <div className="p-5 sm:p-8 space-y-6 bg-white">
          {/* Internal Top Bar / Subheader */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-100">
            <div>
              <h3 className="font-display font-extrabold text-xl text-zinc-950">Find your perfect domain</h3>
              <p className="text-xs text-zinc-500">Search and secure the domain name best suited for your brand.</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              <span>Instant Automated Registration</span>
            </div>
          </div>

          {/* Search Box Card with glowing active border as in screenshot */}
          <div className="p-3 sm:p-4 rounded-2xl border-2 border-blue-500/70 bg-white shadow-lg shadow-blue-500/5 space-y-3">
            <div className="flex items-center gap-4 text-xs font-semibold text-zinc-500 border-b border-zinc-100 pb-2.5">
              <button
                type="button"
                onClick={() => setActiveTab('search')}
                className={cn(
                  "flex items-center gap-1.5 pb-1 cursor-pointer transition-colors",
                  activeTab === 'search' ? "text-blue-600 font-bold border-b-2 border-blue-600 -mb-2.5" : "hover:text-zinc-900"
                )}
              >
                <Globe className="h-3.5 w-3.5" /> Domain search
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('ai')}
                className={cn(
                  "flex items-center gap-1.5 pb-1 cursor-pointer transition-colors",
                  activeTab === 'ai' ? "text-blue-600 font-bold border-b-2 border-blue-600 -mb-2.5" : "hover:text-zinc-900"
                )}
              >
                <Sparkles className="h-3.5 w-3.5 text-purple-500" /> AI domain generator
              </button>
            </div>

            {/* Input Row */}
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Type domain address (e.g. bakkerij.nl, secha.com, cloudpulse.io)..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 text-sm text-zinc-900 bg-zinc-50 border border-zinc-200/90 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-zinc-400"
                />
              </div>

              {/* TLD Filter Select */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={selectedTldFilter}
                  onChange={(e) => setSelectedTldFilter(e.target.value)}
                  className="h-11 px-3 text-xs font-semibold text-zinc-700 bg-zinc-50 border border-zinc-200/90 rounded-xl focus:outline-none cursor-pointer"
                >
                  <option value="All">All Extensions</option>
                  <option value=".nl">.nl (Dutch)</option>
                  <option value=".com">.com (Global)</option>
                  <option value=".eu">.eu (Europe)</option>
                  <option value=".io">.io (Tech)</option>
                  <option value=".co.uk">.co.uk (UK)</option>
                </select>

                <button
                  type="submit"
                  disabled={isLoading || !query.trim()}
                  className="h-11 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-blue-500/20 disabled:opacity-50 shrink-0"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Search Domains'}
                </button>
              </div>
            </form>
          </div>

          {/* "Claim a Domain That Stands Out" Highlight Banner from screenshot */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-zinc-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 block mb-1">
                Claim a Domain That Stands Out
              </span>
              <h4 className="text-sm sm:text-base font-bold">Secure a standout domain to elevate your brand identity.</h4>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t md:border-t-0 md:border-l border-white/15 pt-3 md:pt-0 md:pl-6 text-center shrink-0">
              <div>
                <span className="font-display font-bold text-sm sm:text-base block text-white">2.4 million</span>
                <span className="text-[10px] text-zinc-400">Domains Managed</span>
              </div>
              <div>
                <span className="font-display font-bold text-sm sm:text-base block text-emerald-400">450K</span>
                <span className="text-[10px] text-zinc-400">Available Today</span>
              </div>
              <div>
                <span className="font-display font-bold text-sm sm:text-base block text-cyan-400">600+</span>
                <span className="text-[10px] text-zinc-400">Supported TLDs</span>
              </div>
            </div>
          </div>

          {/* Domain Available Rows List */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between text-xs font-semibold text-zinc-500 pb-2 border-b border-zinc-100">
              <span className="text-zinc-700 font-bold">
                {results ? 'Live Search Results' : 'Recommended Brandable Domains'}
              </span>
              <span className="text-zinc-400">1st Year Transparent Pricing</span>
            </div>

            {/* If live search results exist, show them */}
            {results && results.length > 0 ? (
              <div className="space-y-2">
                {results.map((item) => {
                  const isSelected = selectedDomain?.domain === item.domain;
                  return (
                    <div
                      key={item.domain}
                      className={cn(
                        "p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 group",
                        isSelected
                          ? "bg-blue-50/80 border-blue-400 text-blue-900"
                          : "bg-zinc-50/70 border-zinc-200/70 hover:bg-white hover:border-zinc-300"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white border border-zinc-200 flex items-center justify-center text-xs font-bold text-zinc-700">
                          {item.tld}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-zinc-900 text-sm sm:text-base">{item.domain}</span>
                            {item.tag && (
                              <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-blue-100 text-blue-700">
                                {item.tag}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-zinc-500">Free WHOIS Privacy & DNS Included</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="font-bold text-zinc-900 text-sm sm:text-base">
                            {formatPrice(item.priceGBP)}
                          </span>
                          <span className="text-[10px] text-zinc-400 block">/ 1st yr</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSelectDomain({ domain: item.domain, priceGBP: item.priceGBP, tld: item.tld })}
                          className={cn(
                            "px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
                            isSelected
                              ? "bg-emerald-600 text-white shadow-sm"
                              : "bg-blue-600 hover:bg-blue-500 text-white shadow-sm"
                          )}
                        >
                          {isSelected ? '✓ Selected' : 'Select Domain'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Showcase Rows matching screenshot */
              <div className="space-y-2.5">
                {defaultShowcaseDomains.map((item) => {
                  const fullDomain = `${item.name}${item.extensions[0]}`;
                  const isSelected = selectedDomain?.domain === fullDomain;

                  return (
                    <div
                      key={item.name}
                      className="p-3.5 rounded-xl border border-zinc-200/80 bg-zinc-50/60 hover:bg-white hover:border-zinc-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-bold text-zinc-900 text-base">{item.name}</span>
                        <div className="flex items-center gap-1">
                          {item.extensions.map((ext) => (
                            <span
                              key={ext}
                              className="text-[11px] font-mono font-semibold px-1.5 py-0.5 rounded bg-zinc-200/70 text-zinc-700"
                            >
                              {ext}
                            </span>
                          ))}
                        </div>
                        {item.discountBadge && (
                          <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                            {item.discountBadge}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 self-end sm:self-auto w-full sm:w-auto">
                        <div className="text-right">
                          <span className="font-bold text-zinc-950 text-sm sm:text-base">
                            {formatPrice(item.priceGBP)}
                          </span>
                          <span className="text-[10px] text-zinc-400 block">/ 1st yr</span>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            handleSelectDomain({
                              domain: fullDomain,
                              priceGBP: item.priceGBP,
                              tld: item.extensions[0],
                            })
                          }
                          className="px-3.5 py-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                        >
                          Select <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
