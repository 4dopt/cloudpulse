import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NarrativeSection() {
  return (
    <section className="py-24 px-6 bg-white border-b border-zinc-200/80 overflow-hidden relative">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Block with highlighted callout phrases */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">
              Build and launch
            </span>

            {/* Stylized Statement matching the screenshot */}
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-950 leading-[1.2] tracking-tight">
              <span className="inline-block bg-blue-600 text-white px-2.5 py-1 rounded-lg mr-2 shadow-xs">
                Building a brand used to mean dealing with
              </span>
              <span className="inline-block bg-amber-600 text-white px-2.5 py-1 rounded-lg shadow-xs">
                inefficient tools and time-consuming processes
              </span>{' '}
              to secure a domain.
            </h2>

            <div className="space-y-4 pt-2">
              <p className="font-display text-xl sm:text-2xl font-bold text-zinc-800 leading-snug">
                Today, one simple platform lets you search, buy, and launch domains instantly.
              </p>
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed max-w-xl">
                Building a brand used to require fragmented registrars, delayed propagation, and hidden renewal markups. CloudPulse connects directly to our autoscaling NVMe cloud infrastructure with automated DNS and 1-click staging.
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/checkout"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
              >
                Start for free <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Side: Dotted Matrix Globe Graphic with WWW */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <div className="relative w-72 h-72 sm:w-88 sm:h-88 flex items-center justify-center opacity-85">
              {/* Dot Matrix Wireframe Globe SVG */}
              <svg viewBox="0 0 400 400" className="w-full h-full text-zinc-300" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Globe Rings */}
                <circle cx="200" cy="200" r="160" stroke="currentColor" strokeWidth="3" strokeDasharray="6 6" />
                <ellipse cx="200" cy="200" rx="160" ry="60" stroke="currentColor" strokeWidth="2.5" strokeDasharray="5 5" />
                <ellipse cx="200" cy="200" rx="80" ry="160" stroke="currentColor" strokeWidth="2.5" strokeDasharray="5 5" />
                <line x1="40" y1="200" x2="360" y2="200" stroke="currentColor" strokeWidth="3" strokeDasharray="6 6" />
                <line x1="200" y1="40" x2="200" y2="360" stroke="currentColor" strokeWidth="3" strokeDasharray="6 6" />

                {/* Dotted Coordinate Nodes */}
                {[
                  [120, 140], [280, 140], [140, 260], [260, 260],
                  [200, 120], [200, 280], [100, 200], [300, 200]
                ].map(([x, y], idx) => (
                  <circle key={idx} cx={x} cy={y} r="4" fill="#2563eb" />
                ))}

                {/* Central Stylized "WWW" in Dotted Matrix Font */}
                <text
                  x="200"
                  y="225"
                  textAnchor="middle"
                  fontFamily="Bricolage Grotesque, Inter, sans-serif"
                  fontWeight="900"
                  fontSize="68"
                  letterSpacing="4"
                  fill="#0f172a"
                  fillOpacity="0.22"
                  stroke="#2563eb"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                >
                  WWW
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Counter Strip */}
        <div className="mt-16 pt-10 border-t border-zinc-200/80 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <span className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-950 block">500K+</span>
            <span className="text-xs text-zinc-500 font-medium">Domains Registered</span>
          </div>
          <div>
            <span className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-950 block">98%</span>
            <span className="text-xs text-zinc-500 font-medium">Customer Satisfaction</span>
          </div>
          <div>
            <span className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-950 block">120+</span>
            <span className="text-xs text-zinc-500 font-medium">Extensions Supported</span>
          </div>
        </div>
      </div>
    </section>
  );
}
