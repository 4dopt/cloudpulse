import React from 'react';
import { Cloud, Shield, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-950 text-zinc-400 text-sm pt-16 pb-12">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-14">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-white group">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-zinc-950 shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H10V10H4V4Z" fill="currentColor" />
                  <path d="M14 4H20V10H14V4Z" fill="currentColor" opacity="0.6" />
                  <path d="M4 14H10V20H4V14Z" fill="currentColor" opacity="0.6" />
                  <path d="M14 14H20V20H14V14Z" fill="currentColor" />
                </svg>
              </div>
              <span className="font-display font-extrabold text-white text-xl">CloudPulse</span>
            </Link>
            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed max-w-sm">
              Premium cloud hosting and domain reseller platform powered by CloudPulse Autoscaling infrastructure. European Datacenters in Amsterdam (AMS-IX) & London (LON-1) with 100% NVMe SSD performance.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px] text-zinc-300">
              <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/10">
                🇳🇱 AMS-IX Amsterdam
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/10">
                🇬🇧 LINX London
              </span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                AVG / GDPR Compliant
              </span>
            </div>
          </div>

          {/* Hosting */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Cloud Hosting</h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li><a href="#hosting" className="hover:text-white transition-colors">Shared NVMe Cloud</a></li>
              <li><a href="#hosting" className="hover:text-white transition-colors">Managed WordPress</a></li>
              <li><a href="#hosting" className="hover:text-white transition-colors">Autoscaling Cloud Nodes</a></li>
              <li><a href="#stackcp" className="hover:text-white transition-colors">StackCP Dashboard</a></li>
              <li><a href="#hosting" className="hover:text-white transition-colors">Enterprise Reseller</a></li>
            </ul>
          </div>

          {/* Domains */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Domains</h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li><a href="#domains" className="hover:text-white transition-colors">.nl Domain Registration</a></li>
              <li><a href="#domains" className="hover:text-white transition-colors">.com & .co.uk Domains</a></li>
              <li><a href="#domains" className="hover:text-white transition-colors">Free Domain Transfers</a></li>
              <li><a href="#domains" className="hover:text-white transition-colors">Anycast DNS Management</a></li>
              <li><a href="#domains" className="hover:text-white transition-colors">WHOIS Privacy Protection</a></li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Company & Legal</h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ & Knowledgebase</a></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Privacy & Cookie Policy</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Service Level Agreement (SLA)</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">30-Day Money-Back Policy</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span>© 2026 CloudPulse Ltd · Enterprise Cloud Hosting & Domains</span>
            <span>·</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              All Systems Operational (99.99%)
            </span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <span>ISO 27001 Certified Facilities</span>
            <span>·</span>
            <span>iDEAL, Card, PayPal & SEPA Supported</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
