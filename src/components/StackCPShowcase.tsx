import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Shield,
  Mail,
  Cpu,
  History,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Link } from 'react-router-dom';

export function StackCPShowcase() {
  const [activeTab, setActiveTab] = useState<'wordpress' | 'security' | 'email' | 'php' | 'backups'>('wordpress');
  const [redisActive, setRedisActive] = useState(true);
  const [wafActive, setWafActive] = useState(true);
  const [autoSslActive, setAutoSslActive] = useState(true);

  const tabs = [
    { id: 'wordpress' as const, label: '1-Click Staging & WP', icon: LayoutDashboard },
    { id: 'security' as const, label: 'Security & Wildcard SSL', icon: Shield },
    { id: 'email' as const, label: '10GB Mailboxes & Webmail', icon: Mail },
    { id: 'php' as const, label: 'PHP 8.3 & Cache Tuning', icon: Cpu },
    { id: 'backups' as const, label: 'Snapshot Backups', icon: History },
  ];

  return (
    <section id="stackcp" className="py-24 px-6 bg-white border-b border-zinc-200/80 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            Included Free With Every Plan
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 mb-4">
            Next-Gen StackCP Control Panel
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base">
            Say goodbye to dated, cluttered cPanel interfaces. StackCP gives you blazing-fast, intuitive control over your websites, databases, DNS, and staging environments.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-2xl bg-zinc-100 border border-zinc-200 max-w-4xl mx-auto mb-8 shadow-xs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap",
                  isActive
                    ? "bg-white text-zinc-950 shadow-sm font-bold"
                    : "text-zinc-600 hover:text-zinc-950"
                )}
              >
                <Icon className={cn("h-4 w-4", isActive ? "text-blue-600" : "text-zinc-400")} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dashboard Canvas */}
        <div className="rounded-3xl border border-zinc-200/90 bg-zinc-50/70 p-6 sm:p-10 shadow-sm relative">
          <div className="flex items-center justify-between pb-6 border-b border-zinc-200 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-display font-extrabold text-xs shadow-xs">
                CP
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-950 font-bold text-sm">StackCP Control Center</span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                    Live Demo
                  </span>
                </div>
                <span className="text-xs text-zinc-500">Managing: yourcompany.nl (Autoscaling Cloud Cluster)</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              Get Full Access <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'wordpress' && (
              <motion.div
                key="wp"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                <div className="space-y-4">
                  <h3 className="font-display text-2xl font-bold text-zinc-950">Instant Staging & Cloning</h3>
                  <p className="text-zinc-600 text-sm leading-relaxed">
                    Test plugins, themes, and code in a sandboxed duplicate environment. When ready, merge changes back to production in one click with automated database sync and zero downtime.
                  </p>
                  <ul className="space-y-2 text-xs text-zinc-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" /> 1-Click WordPress, WooCommerce & Drupal installation
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Automated core & plugin updates with rollback safety
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Built-in WordPress CLI (wp-cli) and Git deployment
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-xs space-y-4">
                  <div className="flex items-center justify-between text-xs text-zinc-500 pb-3 border-b border-zinc-100 font-semibold">
                    <span>Environment</span>
                    <span>Status</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 border border-zinc-200/70">
                    <div>
                      <span className="text-sm font-semibold text-zinc-950 block">Production (Live)</span>
                      <span className="text-xs text-zinc-500 font-mono">https://yourcompany.nl</span>
                    </div>
                    <span className="text-xs text-emerald-700 font-bold px-2 py-1 rounded bg-emerald-50">Active</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 border border-zinc-200/70">
                    <div>
                      <span className="text-sm font-semibold text-zinc-950 block">Staging Sandbox</span>
                      <span className="text-xs text-zinc-500 font-mono">https://staging.yourcompany.nl</span>
                    </div>
                    <button
                      type="button"
                      className="text-xs text-white font-bold px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 cursor-pointer shadow-xs"
                    >
                      Push to Live
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div
                key="security"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                <div className="space-y-4">
                  <h3 className="font-display text-2xl font-bold text-zinc-950">Automated SSL & Security Suite</h3>
                  <p className="text-zinc-600 text-sm leading-relaxed">
                    Protect every sub-domain automatically with free Wildcard SSL certificates by Let’s Encrypt. Our enterprise WAF inspects requests in real time to neutralize bots, SQL injection, and DDoS threats.
                  </p>
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-zinc-200/80">
                      <span className="text-xs font-semibold text-zinc-800">Web Application Firewall (WAF)</span>
                      <button
                        type="button"
                        onClick={() => setWafActive(!wafActive)}
                        className="cursor-pointer"
                      >
                        {wafActive ? <ToggleRight className="h-6 w-6 text-emerald-600" /> : <ToggleLeft className="h-6 w-6 text-zinc-400" />}
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-zinc-200/80">
                      <span className="text-xs font-semibold text-zinc-800">Auto-Renewing Wildcard SSL</span>
                      <button
                        type="button"
                        onClick={() => setAutoSslActive(!autoSslActive)}
                        className="cursor-pointer"
                      >
                        {autoSslActive ? <ToggleRight className="h-6 w-6 text-emerald-600" /> : <ToggleLeft className="h-6 w-6 text-zinc-400" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-zinc-200/80 space-y-3 font-mono text-xs shadow-xs">
                  <div className="text-zinc-400 font-bold">// Security Audit Log</div>
                  <div className="text-emerald-700">✓ SSL Certificate: Active (Expires in 89 days)</div>
                  <div className="text-emerald-700">✓ HTTP/3 Protocol: Enabled via ALPN</div>
                  <div className="text-emerald-700">✓ Automated Malware Scans: 0 threats detected</div>
                  <div className="text-blue-600">ℹ 1,482 brute-force login attempts mitigated today</div>
                </div>
              </motion.div>
            )}

            {activeTab === 'email' && (
              <motion.div
                key="email"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                <div className="space-y-4">
                  <h3 className="font-display text-2xl font-bold text-zinc-950">Professional 10GB Mailboxes</h3>
                  <p className="text-zinc-600 text-sm leading-relaxed">
                    Create clean corporate email addresses (e.g. `info@yourcompany.nl` or `sales@yourcompany.com`) backed by SpamExperts filtering, auto-responders, and modern webmail.
                  </p>
                  <ul className="space-y-2 text-xs text-zinc-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" /> IMAP, POP3, and SMTP support for Outlook & Apple Mail
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Built-in DKIM, SPF, and DMARC 1-click wizard
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-zinc-200/80 space-y-3 shadow-xs">
                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/70 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-semibold text-zinc-950 block">info@yourcompany.nl</span>
                      <span className="text-xs text-zinc-500">10GB Quota · 2.1GB Used</span>
                    </div>
                    <span className="text-xs font-bold text-blue-600">Open Webmail</span>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/70 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-semibold text-zinc-950 block">support@yourcompany.nl</span>
                      <span className="text-xs text-zinc-500">10GB Quota · 450MB Used</span>
                    </div>
                    <span className="text-xs font-bold text-blue-600">Open Webmail</span>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'php' && (
              <motion.div
                key="php"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                <div className="space-y-4">
                  <h3 className="font-display text-2xl font-bold text-zinc-950">PHP 8.3 & Performance Tuning</h3>
                  <p className="text-zinc-600 text-sm leading-relaxed">
                    Switch between PHP 7.4, 8.1, 8.2, and 8.3 per directory or per domain. Enable Redis object cache and adjust memory limits up to 1024MB effortlessly.
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-zinc-600 font-medium">Active PHP Version:</span>
                    <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-xs font-mono font-bold">
                      PHP 8.3 (JIT Enabled)
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-zinc-200/80 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 border border-zinc-200/70">
                    <span className="text-xs font-semibold text-zinc-800">Redis Object Caching</span>
                    <button
                      type="button"
                      onClick={() => setRedisActive(!redisActive)}
                      className="cursor-pointer"
                    >
                      {redisActive ? <ToggleRight className="h-6 w-6 text-emerald-600" /> : <ToggleLeft className="h-6 w-6 text-zinc-400" />}
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 border border-zinc-200/70">
                    <span className="text-xs font-semibold text-zinc-800">Memory Limit</span>
                    <span className="text-xs font-mono font-bold text-zinc-700">512MB / 1024MB Max</span>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'backups' && (
              <motion.div
                key="backups"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                <div className="space-y-4">
                  <h3 className="font-display text-2xl font-bold text-zinc-950">Timeline Snapshot Backups</h3>
                  <p className="text-zinc-600 text-sm leading-relaxed">
                    Automated snapshots are saved to geographically separate storage arrays every day. Restore an entire website, a single MySQL database, or just one file with a single click.
                  </p>
                  <ul className="space-y-2 text-xs text-zinc-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" /> 30 days of rolling daily backup retention
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Zero performance penalty during backup snapshots
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-zinc-200/80 space-y-2.5 shadow-xs">
                  <div className="text-xs font-bold text-zinc-500 mb-2">Available Snapshots</div>
                  {['Today at 03:00 AM (Daily Automated)', 'Yesterday at 03:00 AM', '2 days ago at 03:00 AM'].map((snap) => (
                    <div key={snap} className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 border border-zinc-200/70">
                      <span className="text-xs font-medium text-zinc-800">{snap}</span>
                      <button
                        type="button"
                        className="text-xs text-blue-600 hover:text-blue-700 font-bold cursor-pointer"
                      >
                        Restore
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
