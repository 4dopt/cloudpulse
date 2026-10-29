import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/src/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'How does instant domain registration and Anycast DNS setup work?',
      answer:
        'When you purchase a domain name on CloudPulse, it is registered instantly through our cloud registrar API integration and propagated across global Anycast DNS nodes within seconds. All domains include free WHOIS privacy protection, custom DNS zone records, and email forwarding with zero hidden markups.',
    },
    {
      question: 'What makes CloudPulse Autoscaling faster than traditional cPanel shared hosting?',
      answer:
        'Unlike legacy shared hosts where hundreds of websites compete for single server CPU slices, CloudPulse autoscales your traffic across an entire cluster of Samsung NVMe SSD nodes. If your website receives a traffic surge or viral spike, resources scale immediately with no throttling, 503 errors, or downtime.',
    },
    {
      question: 'Can I register Dutch (.nl) and international domains with CloudPulse?',
      answer:
        'Yes! We provide direct registration and automated DNS management for .nl, .com, .co.uk, .eu, .de, .io, .net, and over 400 other TLDs. All domain registrations include free WHOIS privacy protection, DNS zone editing, and email forwarding.',
    },
    {
      question: 'Do you offer free website and email migration from my old host?',
      answer:
        'Absolutely. Our migration engineers and automated migration tools transfer your entire website, WordPress databases, and email mailboxes from cPanel, Plesk, GoDaddy, or Dutch hosts seamlessly with 0 downtime.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We support all primary European and international payment methods: iDEAL (direct bank transfer in the Netherlands), Credit/Debit Cards (Visa, Mastercard, Amex via Stripe), PayPal, SEPA Direct Debit, and Apple Pay.',
    },
    {
      question: 'Is there a money-back guarantee?',
      answer:
        'Yes, all CloudPulse hosting plans include an unconditional 30-day money-back guarantee. If you are not completely satisfied with our performance or support, we refund your subscription immediately—no questions asked.',
    },
  ];

  return (
    <section id="faq" className="py-24 px-6 bg-white border-b border-zinc-200/80">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-semibold mb-3">
            <HelpCircle className="h-3.5 w-3.5 text-blue-600" />
            Frequently Asked Questions
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 mb-4">
            Everything You Need to Know
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base">
            Clear, transparent answers about our high-performance cloud infrastructure, pricing, and domain management.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="rounded-2xl border border-zinc-200/90 bg-zinc-50/60 overflow-hidden transition-all hover:border-zinc-300"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-base font-bold text-zinc-950">{faq.question}</span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 text-zinc-400 shrink-0 transition-transform duration-200",
                      isOpen && "rotate-180 text-blue-600"
                    )}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 pb-5 text-sm text-zinc-600 leading-relaxed border-t border-zinc-200/70 pt-3">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
