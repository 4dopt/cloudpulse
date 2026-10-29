import React from 'react';
import { Star, CheckCircle } from 'lucide-react';

export function TestimonialsSection() {
  const reviews = [
    {
      name: 'Lars van den Berg',
      role: 'Founder, Studio Noordwijk',
      location: 'The Hague, Netherlands',
      content:
        'The staging preview blew our minds. We tested our WordPress store before paying a single euro, and our TTFB plummeted from 850ms to 20ms. The CloudPulse infrastructure handles Black Friday traffic without a flinch.',
      stars: 5,
      avatar: 'LB',
    },
    {
      name: 'Sophie de Jong',
      role: 'Digital Director, De Jong & Partners',
      location: 'Amsterdam, Netherlands',
      content:
        'Having local .nl domains combined with AMS-IX ultra-low latency gives our client sites an enormous SEO and speed advantage. StackCP is 10x cleaner and faster than cPanel ever was.',
      stars: 5,
      avatar: 'SJ',
    },
    {
      name: 'Marcus Thorne',
      role: 'CTO, PulseCommerce Ltd',
      location: 'London, United Kingdom',
      content:
        'CloudPulse reseller platform is the gold standard. We run 45 client websites with automated timeline backups, free Let’s Encrypt wildcard certificates, and 1-click staging. Absolutely remarkable.',
      stars: 5,
      avatar: 'MT',
    },
  ];

  return (
    <section className="py-24 px-6 bg-zinc-50 border-b border-zinc-200/80 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-1 text-amber-500 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-xs font-bold text-zinc-900 ml-2 font-display">4.9 / 5 Rating</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-zinc-950 tracking-tight mb-4">
            Loved by 1,200+ Businesses & Digital Agencies
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base">
            See why ambitious creators and companies across the Netherlands, the UK, and Europe trust CloudPulse.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.name}
              className="p-6 rounded-3xl bg-white border border-zinc-200/90 shadow-sm hover:shadow-md hover:border-zinc-300 transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.stars)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-zinc-700 leading-relaxed italic">
                  "{rev.content}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-zinc-100">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 font-display">
                  {rev.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-zinc-950">{rev.name}</span>
                    <CheckCircle className="h-3.5 w-3.5 text-blue-600" />
                  </div>
                  <span className="text-xs text-zinc-500 block">{rev.role} · {rev.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
