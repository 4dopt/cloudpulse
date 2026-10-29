import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  Loader2,
  Globe,
  Server,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Tag,
  CheckCircle2,
  Lock,
  Copy,
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useCart } from '@/src/context/CartContext';

const checkoutSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Valid email address is required'),
  company: z.string().optional(),
  address: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  zip: z.string().min(4, 'ZIP / Postal code is required'),
  country: z.string().min(2, 'Country is required'),
  paymentMethod: z.enum(['ideal', 'card', 'paypal', 'sepa']),
  idealBank: z.string().optional(),
  cardNumber: z.string().optional(),
  expiry: z.string().optional(),
  cvv: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    selectedDomain,
    selectedHosting,
    setSelectedHosting,
    billingCycle,
    setBillingCycle,
    addons,
    toggleAddon,
    formatPrice,
    calculateTotalGBP,
    promoCode,
    applyPromoCode,
    discountPercent,
    clearCart,
  } = useCart();

  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [provisionProgress, setProvisionProgress] = useState(0);
  const [provisionMessage, setProvisionMessage] = useState('Initializing Cloud Provisioning API...');
  const [successResult, setSuccessResult] = useState<{
    orderId: string;
    loginUrl: string;
    stackCpCredentials: {
      username: string;
      tempPass: string;
      cpanelUrl: string;
      nameservers: string[];
    };
  } | null>(null);

  const [copiedPass, setCopiedPass] = useState(false);
  const [inputCoupon, setInputCoupon] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<string | null>(null);

  useEffect(() => {
    const planParam = searchParams.get('plan');
    const cycleParam = searchParams.get('cycle');

    if (cycleParam === 'monthly' || cycleParam === 'annual') {
      setBillingCycle(cycleParam);
    }

    if (planParam && !selectedHosting) {
      if (planParam.includes('starter')) {
        setSelectedHosting({
          id: 'starter',
          name: 'Starter Cloud',
          monthlyPriceGBP: 4.99,
          annualPriceGBP: 3.99,
          features: ['10GB NVMe SSD Storage', 'Unlimited Bandwidth', 'Free SSL', '10 Mailboxes'],
        });
      } else if (planParam.includes('business')) {
        setSelectedHosting({
          id: 'business',
          name: 'Enterprise Elite',
          monthlyPriceGBP: 24.99,
          annualPriceGBP: 19.99,
          features: ['Unlimited NVMe Storage', 'Dedicated PHP Resources', 'PCI Compliance'],
        });
      }
    }
  }, [searchParams, selectedHosting, setBillingCycle, setSelectedHosting]);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onChange',
    defaultValues: {
      country: 'Netherlands',
      paymentMethod: 'ideal',
      idealBank: 'rabobank',
    },
  });

  const selectedPaymentMethod = watch('paymentMethod');
  const totals = calculateTotalGBP();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon) return;
    const ok = applyPromoCode(inputCoupon);
    if (ok) {
      setCouponFeedback('20% discount coupon applied successfully!');
    } else {
      setCouponFeedback('Invalid coupon code. Try WELCOME123');
    }
  };

  const handleNextStep = async () => {
    if (step === 1) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (step === 2) {
      const valid = await trigger(['firstName', 'lastName', 'email', 'address', 'city', 'zip', 'country']);
      if (valid) {
        setStep(3);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const onSubmit = async (data: CheckoutFormData) => {
    setIsProcessing(true);
    setStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setProvisionProgress(20);
    setProvisionMessage('Contacting Cloud Provisioning API & allocating NVMe container...');

    setTimeout(() => {
      setProvisionProgress(50);
      setProvisionMessage('Registering domain bindings & configuring Anycast DNS zone...');
    }, 600);

    setTimeout(() => {
      setProvisionProgress(80);
      setProvisionMessage('Injecting Let’s Encrypt Wildcard SSL & configuring StackCP user...');
    }, 1200);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          domain: selectedDomain?.domain,
          plan: selectedHosting?.id,
          cycle: billingCycle,
          addons,
        }),
      });
      const result = await response.json();

      setTimeout(() => {
        setProvisionProgress(100);
        setProvisionMessage('Setup Complete! Ready to launch.');
        setIsProcessing(false);
        setSuccessResult(result);
        clearCart();
      }, 1800);
    } catch (err) {
      console.error('Checkout failed', err);
      setIsProcessing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPass(true);
    setTimeout(() => setCopiedPass(false), 2000);
  };

  // Step 4: Success / Confirmation Screen
  if (step === 4 && successResult && !isProcessing) {
    const creds = successResult.stackCpCredentials;

    return (
      <div className="py-24 px-6 min-h-[85vh] flex items-center justify-center bg-zinc-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full bg-white border border-zinc-200/90 p-8 md:p-12 rounded-3xl shadow-xl space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h2 className="font-display text-3xl font-extrabold text-zinc-950">Order Confirmed!</h2>
            <p className="text-xs text-zinc-500">
              Order #{successResult.orderId} · Cloud Container Provisioned
            </p>
          </div>

          {/* Credentials Box */}
          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <span className="text-xs font-bold text-zinc-600 uppercase tracking-wider">
                StackCP Login Credentials
              </span>
              <span className="text-[10px] text-emerald-700 font-bold px-2 py-0.5 rounded bg-emerald-100/70">
                Active & Live
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Control Panel URL:</span>
                <a
                  href={creds.cpanelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-1 font-mono font-medium"
                >
                  {creds.cpanelUrl} <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Username:</span>
                <span className="font-mono font-bold text-zinc-900">{creds.username}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Temporary Password:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {creds.tempPass}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(creds.tempPass)}
                    className="p-1 rounded bg-zinc-200/80 hover:bg-zinc-300 text-zinc-700 transition-colors cursor-pointer"
                    title="Copy password"
                  >
                    <Copy className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>

            {copiedPass && (
              <p className="text-[11px] text-emerald-600 font-medium text-right">Password copied to clipboard!</p>
            )}

            {/* Nameservers */}
            <div className="pt-3 border-t border-zinc-200">
              <span className="text-[11px] text-zinc-500 block mb-1.5 font-medium">Primary Anycast Nameservers:</span>
              <div className="flex flex-wrap gap-1.5 font-mono text-[11px] text-zinc-700">
                {creds.nameservers.map((ns) => (
                  <span key={ns} className="px-2 py-0.5 rounded bg-white border border-zinc-200">
                    {ns}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <a
              href={successResult.loginUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/25 cursor-pointer"
            >
              Open StackCP Dashboard <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to="/"
              className="w-full h-11 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-semibold text-xs flex items-center justify-center transition-all"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Step 4: Loading / Provisioning Progress State
  if (step === 4 && isProcessing) {
    return (
      <div className="py-32 px-6 min-h-[80vh] flex items-center justify-center bg-zinc-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white border border-zinc-200 p-10 rounded-3xl text-center space-y-6 shadow-xl"
        >
          <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-zinc-950 mb-2">Setting Up Your CloudPulse Service</h3>
            <p className="text-xs text-zinc-500 font-mono">{provisionMessage}</p>
          </div>

          <div className="w-full h-2 rounded-full bg-zinc-100 overflow-hidden">
            <motion.div
              className="h-full bg-blue-600"
              initial={{ width: '0%' }}
              animate={{ width: `${provisionProgress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <p className="text-[11px] text-zinc-400">
            Please wait while CloudPulse allocates server resources and binds SSL certificates...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 md:px-6 bg-zinc-50/70 min-h-[90vh]">
      <div className="container mx-auto max-w-6xl">
        {/* Step Progress Bar */}
        <div className="flex items-center justify-center gap-3 md:gap-8 mb-12">
          {[
            { num: 1, label: 'Order Review' },
            { num: 2, label: 'Customer Details' },
            { num: 3, label: 'Payment' },
          ].map((item) => (
            <div key={item.num} className="flex items-center gap-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-all",
                  step === item.num
                    ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                    : step > item.num
                    ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                    : "bg-white border-zinc-200 text-zinc-400"
                )}
              >
                {step > item.num ? <Check className="h-4 w-4" /> : item.num}
              </div>
              <span
                className={cn(
                  "text-xs font-semibold hidden sm:inline",
                  step === item.num ? "text-zinc-950 font-bold" : "text-zinc-400"
                )}
              >
                {item.label}
              </span>
              {item.num < 3 && <div className="w-8 md:w-16 h-px bg-zinc-200" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Checkout Form Left Column */}
          <div className="lg:col-span-7 space-y-8">
            <AnimatePresence mode="wait">
              {/* STEP 1: REVIEW & ADDONS */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200/90 shadow-sm"
                >
                  <div>
                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-950">Review Your Selection</h2>
                    <p className="text-xs text-zinc-500 mt-1">Confirm chosen domain, hosting plan, and billing cadence</p>
                  </div>

                  {/* Chosen Items Cards */}
                  <div className="space-y-4">
                    {selectedDomain ? (
                      <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
                            <Globe className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-zinc-950 text-base">{selectedDomain.domain}</span>
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase">
                                {selectedDomain.action}
                              </span>
                            </div>
                            <span className="text-xs text-zinc-500">Includes Free WHOIS Privacy & Anycast DNS</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-zinc-950 text-base">
                            {formatPrice(selectedDomain.priceGBP)}
                          </span>
                          <span className="text-[10px] text-zinc-400 block">/ 1st year</span>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl bg-zinc-50 border border-dashed border-zinc-200 flex items-center justify-between">
                        <span className="text-xs text-zinc-500">No domain selected yet.</span>
                        <a href="/#domains" className="text-xs font-bold text-blue-600 hover:underline">
                          + Search Domain
                        </a>
                      </div>
                    )}

                    {selectedHosting && (
                      <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
                              <Server className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="font-bold text-zinc-950 text-base">{selectedHosting.name}</h3>
                              <span className="text-xs text-zinc-500">
                                CloudPulse Autoscaling · 100% NVMe SSD · Let’s Encrypt Wildcard SSL
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-zinc-950 text-base">
                              {formatPrice(
                                billingCycle === 'annual'
                                  ? selectedHosting.annualPriceGBP * 12
                                  : selectedHosting.monthlyPriceGBP
                              )}
                            </span>
                            <span className="text-[10px] text-zinc-400 block">
                              / {billingCycle === 'annual' ? 'year' : 'month'}
                            </span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-zinc-200/70 flex items-center justify-between">
                          <span className="text-xs text-zinc-600 font-medium">Billing Cadence:</span>
                          <div className="inline-flex p-0.5 rounded-lg bg-white border border-zinc-200 text-xs shadow-xs">
                            <button
                              type="button"
                              onClick={() => setBillingCycle('annual')}
                              className={cn(
                                "px-3 py-1 rounded-md font-semibold transition-all cursor-pointer",
                                billingCycle === 'annual'
                                  ? "bg-zinc-950 text-white"
                                  : "text-zinc-600 hover:text-zinc-950"
                              )}
                            >
                              Annual (Save 20%)
                            </button>
                            <button
                              type="button"
                              onClick={() => setBillingCycle('monthly')}
                              className={cn(
                                "px-3 py-1 rounded-md font-semibold transition-all cursor-pointer",
                                billingCycle === 'monthly'
                                  ? "bg-zinc-950 text-white"
                                  : "text-zinc-600 hover:text-zinc-950"
                              )}
                            >
                              Monthly
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Add-ons */}
                  <div className="space-y-3 pt-2">
                    <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                      Recommended Cloud Add-ons
                    </h3>

                    <div
                      onClick={() => toggleAddon('automatedBackups')}
                      className={cn(
                        "p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all",
                        addons.automatedBackups
                          ? "bg-blue-50/70 border-blue-300"
                          : "bg-zinc-50 border-zinc-200 hover:border-zinc-300"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-5 h-5 rounded-md border flex items-center justify-center transition-colors",
                            addons.automatedBackups ? "bg-blue-600 border-blue-600 text-white" : "border-zinc-300 bg-white"
                          )}
                        >
                          {addons.automatedBackups && <Check className="h-3.5 w-3.5" />}
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-zinc-950 block">
                            Daily Snapshot Backups with 30-Day Retention
                          </span>
                          <span className="text-xs text-zinc-500">
                            Automatic 1-click restore for databases, files & email
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-zinc-950">
                        +{formatPrice(billingCycle === 'annual' ? 24 : 2.5)}
                        <span className="text-zinc-400 font-normal"> / {billingCycle === 'annual' ? 'yr' : 'mo'}</span>
                      </span>
                    </div>

                    <div
                      onClick={() => toggleAddon('spamFilter')}
                      className={cn(
                        "p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all",
                        addons.spamFilter
                          ? "bg-blue-50/70 border-blue-300"
                          : "bg-zinc-50 border-zinc-200 hover:border-zinc-300"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-5 h-5 rounded-md border flex items-center justify-center transition-colors",
                            addons.spamFilter ? "bg-blue-600 border-blue-600 text-white" : "border-zinc-300 bg-white"
                          )}
                        >
                          {addons.spamFilter && <Check className="h-3.5 w-3.5" />}
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-zinc-950 block">
                            SpamExperts Enterprise Inbound Email Filtering
                          </span>
                          <span className="text-xs text-zinc-500">
                            Block 99.98% of phishing, spam, and malicious attachments
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-zinc-950">
                        +{formatPrice(billingCycle === 'annual' ? 18 : 1.99)}
                        <span className="text-zinc-400 font-normal"> / {billingCycle === 'annual' ? 'yr' : 'mo'}</span>
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                    >
                      Continue to Customer Details <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: CUSTOMER DETAILS */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200/90 shadow-sm"
                >
                  <div>
                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-950">Account & Billing Details</h2>
                    <p className="text-xs text-zinc-500 mt-1">
                      Your StackCP management credentials and invoice will be sent here
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-zinc-700 block mb-1.5">First Name *</label>
                        <input
                          {...register('firstName')}
                          placeholder="e.g. Jan"
                          className="w-full h-11 px-4 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                        />
                        {errors.firstName && (
                          <p className="text-xs text-rose-500 mt-1">{errors.firstName.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-zinc-700 block mb-1.5">Last Name *</label>
                        <input
                          {...register('lastName')}
                          placeholder="e.g. Jansen"
                          className="w-full h-11 px-4 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                        />
                        {errors.lastName && (
                          <p className="text-xs text-rose-500 mt-1">{errors.lastName.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-zinc-700 block mb-1.5">Email Address *</label>
                      <input
                        {...register('email')}
                        type="email"
                        placeholder="jan@bedrijf.nl"
                        className="w-full h-11 px-4 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-500 mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-zinc-700 block mb-1.5">
                        Company Name (Optional)
                      </label>
                      <input
                        {...register('company')}
                        placeholder="Jansen & Partners B.V."
                        className="w-full h-11 px-4 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-zinc-700 block mb-1.5">Street Address *</label>
                      <input
                        {...register('address')}
                        placeholder="Keizersgracht 42"
                        className="w-full h-11 px-4 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                      />
                      {errors.address && (
                        <p className="text-xs text-rose-500 mt-1">{errors.address.message}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-zinc-700 block mb-1.5">City *</label>
                        <input
                          {...register('city')}
                          placeholder="Amsterdam"
                          className="w-full h-11 px-4 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                        />
                        {errors.city && (
                          <p className="text-xs text-rose-500 mt-1">{errors.city.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-zinc-700 block mb-1.5">Postal Code *</label>
                        <input
                          {...register('zip')}
                          placeholder="1015 CR"
                          className="w-full h-11 px-4 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                        />
                        {errors.zip && (
                          <p className="text-xs text-rose-500 mt-1">{errors.zip.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-zinc-700 block mb-1.5">Country *</label>
                        <select
                          {...register('country')}
                          className="w-full h-11 px-3 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 focus:outline-none focus:border-blue-500 cursor-pointer"
                        >
                          <option value="Netherlands">Netherlands (NL)</option>
                          <option value="United Kingdom">United Kingdom (UK)</option>
                          <option value="Germany">Germany (DE)</option>
                          <option value="Belgium">Belgium (BE)</option>
                          <option value="United States">United States (US)</option>
                          <option value="France">France (FR)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-5 h-11 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-semibold text-xs transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <ArrowLeft className="h-4 w-4" /> Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="flex-1 h-11 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                    >
                      Continue to Payment <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: PAYMENT */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200/90 shadow-sm"
                >
                  <div>
                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-950">Payment Method</h2>
                    <p className="text-xs text-zinc-500 mt-1">
                      Choose your preferred European or global payment method
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'ideal', label: 'iDEAL (NL)', icon: '🇳🇱' },
                      { id: 'card', label: 'Credit Card', icon: '💳' },
                      { id: 'paypal', label: 'PayPal', icon: '🅿️' },
                      { id: 'sepa', label: 'SEPA Debit', icon: '🇪🇺' },
                    ].map((m) => (
                      <label
                        key={m.id}
                        className={cn(
                          "p-3.5 rounded-2xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all",
                          selectedPaymentMethod === m.id
                            ? "bg-blue-50 border-blue-600 shadow-sm text-blue-900 font-bold"
                            : "bg-zinc-50 border-zinc-200 text-zinc-600 hover:border-zinc-300"
                        )}
                      >
                        <input
                          type="radio"
                          value={m.id}
                          {...register('paymentMethod')}
                          className="sr-only"
                        />
                        <span className="text-xl mb-1">{m.icon}</span>
                        <span className="text-xs font-semibold">{m.label}</span>
                      </label>
                    ))}
                  </div>

                  {selectedPaymentMethod === 'ideal' && (
                    <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
                      <span className="text-xs font-bold text-zinc-700 block">Select your Dutch Bank:</span>
                      <select
                        {...register('idealBank')}
                        className="w-full h-11 px-4 rounded-xl bg-white border border-zinc-200 text-sm text-zinc-900 focus:outline-none focus:border-blue-500 cursor-pointer"
                      >
                        <option value="rabobank">Rabobank</option>
                        <option value="ing">ING Bank</option>
                        <option value="abnamro">ABN AMRO</option>
                        <option value="bunq">Bunq</option>
                        <option value="sns">SNS Bank</option>
                        <option value="asn">ASN Bank</option>
                        <option value="regiobank">RegioBank</option>
                        <option value="knab">Knab</option>
                      </select>
                      <p className="text-[11px] text-zinc-500">
                        You will be redirected to your trusted banking environment to authorize the payment.
                      </p>
                    </div>
                  )}

                  {selectedPaymentMethod === 'card' && (
                    <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
                      <div className="flex items-center justify-between text-xs text-zinc-500">
                        <span className="flex items-center gap-1.5 font-medium text-emerald-700">
                          <Lock className="h-3.5 w-3.5" /> 256-Bit SSL Encrypted
                        </span>
                        <span>Visa · Mastercard · Amex</span>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-zinc-700 block mb-1">Card Number</label>
                        <input
                          {...register('cardNumber')}
                          placeholder="4242 •••• •••• 4242"
                          defaultValue="4242 4242 4242 4242"
                          className="w-full h-11 px-4 rounded-xl bg-white border border-zinc-200 text-sm text-zinc-900 font-mono focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold text-zinc-700 block mb-1">Expires (MM/YY)</label>
                          <input
                            {...register('expiry')}
                            placeholder="12/28"
                            defaultValue="12/28"
                            className="w-full h-11 px-4 rounded-xl bg-white border border-zinc-200 text-sm text-zinc-900 font-mono focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-zinc-700 block mb-1">CVC / CVV</label>
                          <input
                            {...register('cvv')}
                            placeholder="123"
                            defaultValue="888"
                            className="w-full h-11 px-4 rounded-xl bg-white border border-zinc-200 text-sm text-zinc-900 font-mono focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {(selectedPaymentMethod === 'paypal' || selectedPaymentMethod === 'sepa') && (
                    <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-600 space-y-1">
                      <p className="text-zinc-900 font-bold">
                        {selectedPaymentMethod === 'paypal'
                          ? 'Instant PayPal Express Checkout'
                          : 'European SEPA Direct Debit'}
                      </p>
                      <p>
                        Your mandate will be confirmed instantly, and your CloudPulse hosting container and domain will be provisioned immediately.
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 h-12 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-semibold text-xs transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <ArrowLeft className="h-4 w-4" /> Back
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit(onSubmit)}
                      className="flex-1 h-12 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 transition-all cursor-pointer"
                    >
                      <ShieldCheck className="h-4 w-4" /> Complete Order & Launch ({formatPrice(totals.total)})
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sticky Order Summary Right Column */}
          <div className="lg:col-span-5">
            <div className="p-6 md:p-8 rounded-3xl bg-white border border-zinc-200/90 space-y-6 sticky top-24 shadow-sm">
              <h3 className="font-display text-lg font-bold text-zinc-950 pb-3 border-b border-zinc-100">
                Order Summary
              </h3>

              <div className="space-y-3 text-xs md:text-sm">
                {selectedDomain && (
                  <div className="flex justify-between text-zinc-700">
                    <div>
                      <span className="font-semibold text-zinc-950 block">{selectedDomain.domain}</span>
                      <span className="text-[11px] text-zinc-400">1st Year Registration</span>
                    </div>
                    <span className="font-bold text-zinc-950">{formatPrice(selectedDomain.priceGBP)}</span>
                  </div>
                )}

                {selectedHosting && (
                  <div className="flex justify-between text-zinc-700">
                    <div>
                      <span className="font-semibold text-zinc-950 block">{selectedHosting.name}</span>
                      <span className="text-[11px] text-zinc-400 capitalize">{billingCycle} Billing</span>
                    </div>
                    <span className="font-bold text-zinc-950">
                      {formatPrice(
                        billingCycle === 'annual'
                          ? selectedHosting.annualPriceGBP * 12
                          : selectedHosting.monthlyPriceGBP
                      )}
                    </span>
                  </div>
                )}

                {addons.automatedBackups && (
                  <div className="flex justify-between text-zinc-500 text-xs">
                    <span>Daily Automated Snapshots</span>
                    <span className="text-zinc-800 font-medium">{formatPrice(billingCycle === 'annual' ? 24 : 2.5)}</span>
                  </div>
                )}

                {addons.spamFilter && (
                  <div className="flex justify-between text-zinc-500 text-xs">
                    <span>SpamExperts Email Filter</span>
                    <span className="text-zinc-800 font-medium">{formatPrice(billingCycle === 'annual' ? 18 : 1.99)}</span>
                  </div>
                )}

                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-700 text-xs font-bold pt-1">
                    <span>Discount Coupon ({discountPercent}%)</span>
                    <span>-{formatPrice(totals.discountAmount)}</span>
                  </div>
                )}
              </div>

              {/* Coupon Code Input */}
              <form onSubmit={handleApplyCoupon} className="pt-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="Coupon: WELCOME123"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      className="w-full h-10 pl-8 pr-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 h-10 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-bold transition-all cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponFeedback && (
                  <p className="text-[11px] text-blue-600 mt-1.5 font-medium">{couponFeedback}</p>
                )}
              </form>

              {/* Total Calculation */}
              <div className="pt-4 border-t border-zinc-100 space-y-2">
                <div className="flex justify-between text-xs text-zinc-500">
                  <span>Subtotal</span>
                  <span>{formatPrice(totals.subtotal)}</span>
                </div>
                {totals.savings > 0 && (
                  <div className="flex justify-between text-xs text-emerald-700 font-medium">
                    <span>Total Discount & Savings</span>
                    <span>-{formatPrice(totals.savings)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base md:text-lg font-extrabold text-zinc-950 pt-2 border-t border-zinc-100">
                  <span>Total Due Today</span>
                  <span className="font-display text-2xl text-blue-600">{formatPrice(totals.total)}</span>
                </div>
              </div>

              {/* Guarantees */}
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-1.5 text-[11px] text-zinc-500">
                <div className="flex items-center gap-1.5 text-zinc-900 font-semibold">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>30-Day Money-Back Guarantee</span>
                </div>
                <p>
                  Zero risk. Instant provisioning via CloudPulse enterprise infrastructure with European datacenters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
