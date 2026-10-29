import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DomainSearch } from '../components/DomainSearch';
import { NarrativeSection } from '../components/NarrativeSection';
import { DiscoveryDiagramSection } from '../components/DiscoveryDiagramSection';
import { DatacenterLatency } from '../components/DatacenterLatency';
import { StackCPShowcase } from '../components/StackCPShowcase';
import { PricingSection } from '../components/PricingSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FAQSection } from '../components/FAQSection';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  // Live simulated countdown timer matching screenshot: "01D : 04H : 34M : 36S"
  const [timeLeft, setTimeLeft] = useState({ d: 1, h: 4, m: 34, s: 36 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: 59, s: 59 };
        if (prev.h > 0) return { ...prev, h: prev.h - 1, m: 59, s: 59 };
        return { ...prev, s: 59 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const format2 = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="overflow-hidden bg-white text-zinc-900">
      {/* HERO SECTION WITH LUSH PASTEL MESH GRADIENT & BROWSER MOCKUP */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 px-4 md:px-6 bg-dot-grid">
        {/* Background ambient lighting */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[650px] -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-[550px] h-[550px] bg-gradient-to-tr from-cyan-400/35 via-blue-500/25 to-indigo-400/20 blur-[130px] rounded-full" />
          <div className="absolute top-[20%] right-[5%] w-[500px] h-[500px] bg-gradient-to-bl from-purple-400/30 via-pink-400/20 to-blue-600/25 blur-[140px] rounded-full" />
        </div>

        <div className="container mx-auto text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Promo Countdown Chip */}
            <div className="inline-flex flex-col sm:flex-row items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-zinc-200/90 shadow-sm text-xs font-semibold text-zinc-700 mb-6">
              <span className="text-zinc-500">Don't miss the Cyber Week deals</span>
              <span className="font-mono font-bold text-zinc-950 bg-zinc-100 px-2.5 py-0.5 rounded-full border border-zinc-200 text-[11px]">
                {format2(timeLeft.d)}D : {format2(timeLeft.h)}H : {format2(timeLeft.m)}M : {format2(timeLeft.s)}S
              </span>
            </div>

            {/* Display Headline in Bricolage Grotesque */}
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-zinc-950 mb-5 leading-[1.08]">
              Search Buy Domains Quickly
            </h1>

            {/* Subtitle */}
            <p className="text-zinc-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
              Search and buy domain names quickly using our streamlined, secure domain marketplace.
            </p>

            {/* CTA Button Pair */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              <Link
                to="/checkout"
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
              >
                Start for free
              </Link>
              <a
                href="#hosting"
                className="px-6 py-3 rounded-xl bg-white hover:bg-zinc-50 text-zinc-800 font-semibold text-sm border border-zinc-200 shadow-sm transition-all cursor-pointer"
              >
                View Hosting Plans
              </a>
            </div>
          </motion.div>

          {/* Floating Interactive Browser Window with Domain Search */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <DomainSearch />
          </motion.div>
        </div>
      </section>

      {/* CONTRAST PARTNER LOGO STRIP */}
      <section className="bg-gradient-to-r from-zinc-950 via-slate-900 to-zinc-950 py-10 px-6 border-t border-b border-white/10 text-white">
        <div className="container mx-auto max-w-6xl flex flex-wrap items-center justify-center md:justify-between gap-8 text-zinc-400 font-bold text-sm tracking-tight opacity-90">
          <div className="flex items-center gap-2 text-white text-base">
            <span className="font-display font-extrabold text-lg text-white">Medium</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-300">
            <span className="text-sm font-semibold">INTERCOM</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-300">
            <span className="font-mono text-sm tracking-widest text-emerald-400 font-bold">splunk&gt;</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-300">
            <span className="text-sm font-semibold">LaunchDarkly ➔</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-300">
            <span className="text-sm font-semibold">maze</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-300">
            <span className="text-sm font-semibold">Culture Amp</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-300">
            <span className="text-sm font-semibold">mailchimp</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-300">
            <span className="text-sm font-semibold">DocuSign</span>
          </div>
        </div>
      </section>

      {/* NARRATIVE SECTION: "Build and launch" with Highlighted Phrases & Dot Matrix Globe */}
      <NarrativeSection />

      {/* DISCOVERY DIAGRAM & BENCHMARK BAR CHARTS */}
      <DiscoveryDiagramSection />

      {/* HOSTING TIERS & PRICING */}
      <PricingSection />

      {/* AUTOSCALING STACKCP CONTROL PANEL TOUR */}
      <StackCPShowcase />

      {/* EUROPEAN & GLOBAL DATACENTER LATENCY TESTER */}
      <DatacenterLatency />

      {/* CUSTOMER TESTIMONIALS */}
      <TestimonialsSection />

      {/* FAQ SECTION */}
      <FAQSection />

      {/* FINAL HIGH-CONVERTING CTA BANNER */}
      <section className="py-20 px-6 bg-white border-t border-zinc-200">
        <div className="container mx-auto max-w-5xl">
          <div className="rounded-3xl bg-zinc-950 text-white p-10 md:p-16 text-center shadow-xl space-y-6 relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
                Ready in 30 Seconds
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Claim Your Domain & Launch Your Cloud Today
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                Join over 1,200 European businesses and creators on CloudPulse’s autoscaling cloud platform with our 30-day money-back guarantee.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/checkout"
                  className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer"
                >
                  Get Started <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#hosting"
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/10 transition-all cursor-pointer"
                >
                  Explore Hosting Tiers
                </a>
              </div>
            </div>

            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[100px] pointer-events-none rounded-full" />
          </div>
        </div>
      </section>
    </div>
  );
}
