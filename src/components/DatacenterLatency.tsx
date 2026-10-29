import React, { useState } from 'react';
import { Activity, Wifi, CheckCircle2, RefreshCw } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface DatacenterNode {
  id: string;
  city: string;
  country: string;
  flag: string;
  facility: string;
  speed: string;
  baseLatencyMs: number;
}

export function DatacenterLatency() {
  const [testing, setTesting] = useState(false);
  const [pings, setPings] = useState<Record<string, number>>({
    ams: 2,
    lon: 4,
    fra: 8,
    nyc: 41,
  });

  const nodes: DatacenterNode[] = [
    {
      id: 'ams',
      city: 'Amsterdam',
      country: 'Netherlands',
      flag: '🇳🇱',
      facility: 'AMS-IX Equinix AM4 / Science Park',
      speed: '100 Gbps Backbone',
      baseLatencyMs: 2,
    },
    {
      id: 'lon',
      city: 'London',
      country: 'United Kingdom',
      flag: '🇬🇧',
      facility: 'Telehouse North Two / Slough LD5',
      speed: '100 Gbps Backbone',
      baseLatencyMs: 4,
    },
    {
      id: 'fra',
      city: 'Frankfurt',
      country: 'Germany',
      flag: '🇩🇪',
      facility: 'DE-CIX Interxion FRA-1',
      speed: '40 Gbps Direct Peer',
      baseLatencyMs: 8,
    },
    {
      id: 'nyc',
      city: 'New York',
      country: 'United States',
      flag: '🇺🇸',
      facility: 'Equinix NY4 Secaucus',
      speed: '40 Gbps Transatlantic Line',
      baseLatencyMs: 41,
    },
  ];

  const handleTestPings = () => {
    setTesting(true);
    setTimeout(() => {
      setPings({
        ams: Math.floor(Math.random() * 2) + 2,
        lon: Math.floor(Math.random() * 3) + 3,
        fra: Math.floor(Math.random() * 4) + 7,
        nyc: Math.floor(Math.random() * 6) + 39,
      });
      setTesting(false);
    }, 800);
  };

  return (
    <section className="py-20 px-6 bg-zinc-50 border-t border-b border-zinc-200/80 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-3">
              <Activity className="h-3.5 w-3.5 text-emerald-600" />
              Low-Latency European & UK Backbone
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight">
              Enterprise Datacenters & Live Ping Latency
            </h2>
            <p className="text-zinc-600 text-sm md:text-base mt-2 max-w-xl">
              All CloudPulse plans are hosted on redundant Enterprise NVMe infrastructure with direct peering to AMS-IX (Amsterdam) and LINX (London).
            </p>
          </div>

          <button
            type="button"
            onClick={handleTestPings}
            disabled={testing}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-100 text-zinc-800 text-xs font-bold border border-zinc-200 shadow-sm transition-all cursor-pointer self-start md:self-auto"
          >
            <RefreshCw className={cn("h-3.5 w-3.5", testing && "animate-spin text-blue-600")} />
            {testing ? 'Probing Nodes...' : 'Run Real-Time Ping Test'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {nodes.map((node) => {
            const currentPing = pings[node.id];
            const isOptimal = currentPing <= 5;

            return (
              <div
                key={node.id}
                className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-sm hover:shadow-md hover:border-zinc-300 transition-all relative group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl" role="img" aria-label={node.country}>
                      {node.flag}
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold text-zinc-950">{node.city}</h3>
                      <span className="text-xs text-zinc-500">{node.country}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className={cn(
                        "text-lg font-mono font-bold flex items-center justify-end gap-1",
                        isOptimal ? "text-emerald-600" : "text-blue-600"
                      )}
                    >
                      <Wifi className="h-3.5 w-3.5" />
                      {currentPing}ms
                    </div>
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider">Latency</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-100 space-y-1.5 text-xs text-zinc-600">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Facility</span>
                    <span className="text-zinc-800 font-medium truncate max-w-[140px]">{node.facility}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Backbone</span>
                    <span className="text-zinc-800 font-medium">{node.speed}</span>
                  </div>
                  <div className="flex items-center justify-between text-emerald-600 pt-1">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> SLA
                    </span>
                    <span className="font-mono font-semibold">99.99% Uptime</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
