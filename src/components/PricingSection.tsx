import React from 'react';
import { Check, ShieldCheck, Zap, Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useCart } from '@/src/context/CartContext';
import { useNavigate } from 'react-router-dom';

export function PricingSection() {
  const {
    billingCycle,
    setBillingCycle,
    formatPrice,
    selectedHosting,
    setSelectedHosting,
    setIsCartOpen,
  } = useCart();

  const plans = [
    {
      id: 'starter',
      name: 'Starter Cloud',
      badge: 'Small Business & Personal',
      description: 'Ideal for local Dutch & European businesses, personal blogs, and showcase sites.',
      monthlyPriceGBP: 4.99,
      annualPriceGBP: 3.99,
      storage: '10GB NVMe SSD',
      sites: '1 Website Included',
      features: [
        '10GB Ultra-Fast NVMe SSD Storage',
        'Unlimited 10Gbps Bandwidth',
        'Free Let’s Encrypt Wildcard SSL',
        '10 Professional 10GB Mailboxes',
        'StackCP Modern Control Panel',
        'Automated Daily Cloud Backups',
        'Free Instant Setup in 30 Seconds',
      ],
      recommended: false,
    },
    {
      id: 'pro',
      name: 'Business Pro',
      badge: 'Most Popular Choice',
      description: 'Autoscaling cloud performance with staging sandbox and 1-click WordPress acceleration.',
      monthlyPriceGBP: 12.99,
      annualPriceGBP: 9.99,
      storage: 'Unlimited NVMe SSD',
      sites: '10 Websites Included',
      features: [
        'Unlimited 100% NVMe SSD Storage',
        'High-Speed Autoscaling Cloud Cluster',
        'Free .nl or .com Domain (Annual Plan)',
        'Unlimited Business Mailboxes (10GB each)',
        '1-Click Staging & Cloning Sandbox',
        'Redis Object Cache & OpCache Acceleration',
        'Automated Daily Backups with 30-day Retention',
        'Free Zero-Downtime Website Migration',
      ],
      recommended: true,
    },
    {
      id: 'business',
      name: 'Enterprise Elite',
      badge: 'Agencies & High-Traffic Stores',
      description: 'Isolated container resources, full PCI compliance, and prioritized 24/7 SLA engineering support.',
      monthlyPriceGBP: 24.99,
      annualPriceGBP: 19.99,
      storage: 'Unlimited NVMe SSD',
      sites: 'Unlimited Websites',
      features: [
        'Unlimited NVMe Storage & Websites',
        'Dedicated Containerized PHP Memory (1024MB)',
        'Automated Hourly Snapshot Backups',
        'Full PCI-DSS Level 1 Compliance',
        'Priority 15-Minute SLA Support Response',
        'Advanced Web Application Firewall (WAF)',
        'Multi-Region Anycast DNS Nodes',
        'White-Label StackCP Reseller Options',
      ],
      recommended: false,
    },
  ];

  const handleSelectPlan = (plan: (typeof plans)[0]) => {
    setSelectedHosting({
      id: plan.id,
      name: plan.name,
      monthlyPriceGBP: plan.monthlyPriceGBP,
      annualPriceGBP: plan.annualPriceGBP,
      features: plan.features,
    });
    setIsCartOpen(true);
  };

  return (
    <section id="hosting" className="py-24 px-6 bg-zinc-50/80 border-t border-b border-zinc-200/80 relative">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3">
            <Zap className="h-3.5 w-3.5 text-blue-600" />
            CloudPulse Autoscaling Cloud Hosting
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 mb-4">
            Transparent Pricing, Zero Hidden Fees
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base mb-8">
            All plans include 100% NVMe SSD storage, free Let’s Encrypt Wildcard SSL, daily backups, and our 30-day money-back guarantee.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center p-1 bg-white rounded-2xl border border-zinc-200 shadow-sm">
            <button
              type="button"
              onClick={() => setBillingCycle('annual')}
              className={cn(
                "px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5",
                billingCycle === 'annual'
                  ? "bg-zinc-950 text-white shadow-sm"
                  : "text-zinc-600 hover:text-zinc-950"
              )}
            >
              Annual Billing
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                SAVE 20%
              </span>
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={cn(
                "px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer",
                billingCycle === 'monthly'
                  ? "bg-zinc-950 text-white shadow-sm"
                  : "text-zinc-600 hover:text-zinc-950"
              )}
            >
              Monthly Billing
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const isSelected = selectedHosting?.id === plan.id;
            const price = billingCycle === 'annual' ? plan.annualPriceGBP : plan.monthlyPriceGBP;

            return (
              <div
                key={plan.id}
                className={cn(
                  "relative flex flex-col justify-between p-8 rounded-3xl border transition-all duration-300",
                  plan.recommended
                    ? "bg-white border-2 border-blue-600 shadow-xl shadow-blue-500/10 lg:-translate-y-2 z-20"
                    : "bg-white border-zinc-200/90 shadow-sm hover:shadow-md hover:border-zinc-300 z-10"
                )}
              >
                {/* Popular Pill */}
                {plan.recommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[11px] uppercase tracking-widest font-extrabold px-4 py-1 rounded-full shadow-md shadow-blue-500/30 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> {plan.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-extrabold text-2xl text-zinc-950">{plan.name}</h3>
                    {!plan.recommended && (
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-zinc-500 text-xs sm:text-sm mb-6 leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Price Block */}
                  <div className="mb-6 pb-6 border-b border-zinc-100">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-display font-extrabold text-4xl sm:text-5xl text-zinc-950 tracking-tight">
                        {formatPrice(price)}
                      </span>
                      <span className="text-zinc-500 text-sm font-medium">/month</span>
                    </div>
                    <span className="text-xs text-zinc-400 mt-1 block">
                      {billingCycle === 'annual'
                        ? `Billed annually at ${formatPrice(price * 12)} / year`
                        : 'Billed monthly, cancel anytime'}
                    </span>
                  </div>

                  {/* Highlights Strip */}
                  <div className="grid grid-cols-2 gap-2 mb-6 text-xs text-zinc-700">
                    <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-100 text-center">
                      <span className="text-zinc-400 block text-[10px] uppercase font-bold">Storage</span>
                      <span className="font-bold text-zinc-900">{plan.storage}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-100 text-center">
                      <span className="text-zinc-400 block text-[10px] uppercase font-bold">Websites</span>
                      <span className="font-bold text-zinc-900">{plan.sites}</span>
                    </div>
                  </div>

                  {/* Feature List */}
                  <div className="space-y-3 mb-8">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
                      Everything Included:
                    </span>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-600">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA */}
                <button
                  type="button"
                  onClick={() => handleSelectPlan(plan)}
                  className={cn(
                    "w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm",
                    isSelected
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20"
                      : plan.recommended
                      ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20"
                      : "bg-zinc-950 hover:bg-zinc-800 text-white"
                  )}
                >
                  {isSelected ? (
                    <>
                      <Check className="h-4 w-4" /> Selected in Cart
                    </>
                  ) : (
                    <>
                      Choose {plan.name} <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* 30-Day Money-Back Guarantee Strip */}
        <div className="mt-14 max-w-3xl mx-auto p-4 rounded-2xl bg-white border border-zinc-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-zinc-900">Unconditional 30-Day Money-Back Guarantee</h4>
              <p className="text-xs text-zinc-500">
                Test our high-speed cloud hosting with zero risk. If you are not completely satisfied, receive a full refund.
              </p>
            </div>
          </div>
          <a
            href="#domains"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 whitespace-nowrap cursor-pointer"
          >
            Search Available Domains →
          </a>
        </div>
      </div>
    </section>
  );
}
