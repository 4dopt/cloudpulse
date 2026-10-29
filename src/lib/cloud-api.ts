/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DomainSearchResult {
  domain: string;
  name: string;
  tld: string;
  available: boolean;
  priceGBP: number;
  renewalPriceGBP: number;
  featured?: boolean;
  tag?: string;
}

export interface HostingPackage {
  id: string;
  name: string;
  badge?: string;
  description: string;
  monthlyPriceGBP: number;
  annualPriceGBP: number;
  storage: string;
  bandwidth: string;
  sites: string;
  features: string[];
  recommended?: boolean;
}

export interface StagingPreviewResult {
  query: string;
  businessName: string;
  stagingUrl: string;
  stackCpPreviewUrl: string;
  originalSpeedScore: number;
  newSpeedScore: number;
  originalTtfbMs: number;
  newTtfbMs: number;
  status: 'ready' | 'optimizing';
  featuresApplied: string[];
  datacenter: string;
  sslType: string;
}

export class CloudApiClient {
  private apiKey: string | undefined;

  constructor(apiKey?: string) {
    this.apiKey = apiKey;
  }

  private isMock(): boolean {
    return !this.apiKey || this.apiKey === 'MY_API_KEY' || this.apiKey === 'MY_TWENTYI_API_KEY';
  }

  async searchDomains(rawQuery: string): Promise<DomainSearchResult[]> {
    const query = rawQuery.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '');
    const parts = query.split('.');
    const baseName = parts[0] || 'mysite';
    const searchedTld = parts.length > 1 ? `.${parts.slice(1).join('.')}` : null;

    if (this.isMock()) {
      await new Promise((resolve) => setTimeout(resolve, 600));

      const standardTlds: Array<{
        tld: string;
        price: number;
        renewal: number;
        featured?: boolean;
        tag?: string;
      }> = [
        { tld: '.nl', price: 6.99, renewal: 8.99, featured: true, tag: 'Dutch Favorite' },
        { tld: '.com', price: 9.99, renewal: 12.99, featured: true, tag: 'Global Standard' },
        { tld: '.co.uk', price: 6.49, renewal: 8.49, featured: true, tag: 'UK Popular' },
        { tld: '.eu', price: 5.99, renewal: 8.99, tag: 'European Union' },
        { tld: '.de', price: 7.49, renewal: 9.99, tag: 'Germany' },
        { tld: '.io', price: 34.99, renewal: 42.99, tag: 'Tech & SaaS' },
        { tld: '.net', price: 11.99, renewal: 14.99 },
        { tld: '.store', price: 2.99, renewal: 28.99, tag: 'Ecommerce Sale' },
        { tld: '.app', price: 13.99, renewal: 16.99, tag: 'Secured HTTPS' },
      ];

      // If user typed a specific extension like "myname.nl", prioritize it
      const sortedTlds = [...standardTlds];
      if (searchedTld) {
        const foundIdx = sortedTlds.findIndex((t) => t.tld === searchedTld);
        if (foundIdx > -1) {
          const [matched] = sortedTlds.splice(foundIdx, 1);
          sortedTlds.unshift(matched);
        } else {
          sortedTlds.unshift({
            tld: searchedTld,
            price: 12.99,
            renewal: 15.99,
            featured: true,
            tag: 'Exact Search',
          });
        }
      }

      return sortedTlds.map((item, index) => {
        // High likelihood that primary searched domain is available for positive UX
        const isAvailable = index === 0 ? true : Math.random() > 0.25;
        return {
          domain: `${baseName}${item.tld}`,
          name: baseName,
          tld: item.tld,
          available: isAvailable,
          priceGBP: item.price,
          renewalPriceGBP: item.renewal,
          featured: item.featured,
          tag: item.tag,
        };
      });
    }

    return [];
  }

  async getHostingPackages(): Promise<HostingPackage[]> {
    if (this.isMock()) {
      return [
        {
          id: 'starter',
          name: 'Starter Cloud',
          badge: 'Ideal for Small Business',
          description: 'High-speed cloud hosting designed for local businesses, portfolios, and blogs.',
          monthlyPriceGBP: 4.99,
          annualPriceGBP: 3.99,
          storage: '10GB NVMe SSD',
          bandwidth: 'Unlimited 10Gbps',
          sites: '1 Website',
          features: [
            '10GB Ultra-Fast NVMe SSD Storage',
            'Unlimited Bandwidth on 10Gbps Network',
            'Free Wildcard SSL by Let’s Encrypt',
            '10 Professional 10GB Mailboxes',
            'Automated Daily Cloud Backups',
            'StackCP Custom Control Panel',
            'PHP 8.2 & 8.3 with OPCache',
          ],
          recommended: false,
        },
        {
          id: 'pro',
          name: 'Business Pro',
          badge: 'Most Popular / Recommended',
          description: 'Autoscaling performance with staging sandbox and 1-click WordPress acceleration.',
          monthlyPriceGBP: 12.99,
          annualPriceGBP: 9.99,
          storage: 'Unlimited NVMe SSD',
          bandwidth: 'Unlimited Autoscaling',
          sites: '10 Websites',
          features: [
            'Unlimited 100% NVMe SSD Storage',
            'CloudPulse Autoscaling Platform',
            'Free .nl or .com Domain for 1st Year',
            'Unlimited Business Email Accounts',
            '1-Click Staging & Testing Sandbox',
            'Enterprise DDoS Protection & Malware Scan',
            'LiteSpeed / Redis Object Caching',
            'Free Seamless Migration with Zero Downtime',
          ],
          recommended: true,
        },
        {
          id: 'business',
          name: 'Enterprise Elite',
          badge: 'High-Traffic & Agencies',
          description: 'Isolated container resources, PCI compliance, and prioritized 24/7 SLA engineering support.',
          monthlyPriceGBP: 24.99,
          annualPriceGBP: 19.99,
          storage: 'Unlimited NVMe SSD',
          bandwidth: 'Dedicated Uncapped Bandwidth',
          sites: 'Unlimited Websites',
          features: [
            'Unlimited NVMe Storage & Sites',
            'Dedicated Containerized PHP Resources',
            'Automated Hourly Snapshot Backups',
            'Full PCI-DSS Level 1 Compliance',
            'Priority 15-Minute SLA Support Ticket Response',
            'Custom White-Label StackCP Dashboard',
            'Advanced Web Application Firewall (WAF)',
            'Multi-Region Anycast DNS',
          ],
          recommended: false,
        },
      ];
    }
    return [];
  }

  async generateSandboxPreview(query: string): Promise<StagingPreviewResult> {
    await new Promise((resolve) => setTimeout(resolve, 1400));
    const clean = query.trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '').replace(/^www\./, '');
    const base = clean.split('.')[0] || 'demo-company';
    const displayName = base.charAt(0).toUpperCase() + base.slice(1).replace(/[-_]/g, ' ');

    return {
      query: clean,
      businessName: displayName,
      stagingUrl: `https://preview.cloudpulse.io/sandbox/${base}`,
      stackCpPreviewUrl: `https://stackcp.cloudpulse.io/manage/preview-${base}`,
      originalSpeedScore: Math.floor(Math.random() * 15) + 52, // 52 - 67
      newSpeedScore: 99,
      originalTtfbMs: Math.floor(Math.random() * 300) + 720, // 720 - 1020ms
      newTtfbMs: 18,
      status: 'ready',
      featuresApplied: [
        'Automated Autoscaling Cloud Container Provisioned',
        'NVMe Read Caching Activated (18ms TTFB)',
        'HTTP/3 and Brotli Compression Enabled',
        'Free Let’s Encrypt Wildcard SSL Injected',
        'Redis Object Cache & OpCache Warmed Up',
      ],
      datacenter: 'Amsterdam AMS-IX / London LON-1 Multi-Homed',
      sslType: 'Let’s Encrypt Wildcard ECC 384-bit',
    };
  }

  async processCheckout(data: any): Promise<{
    success: boolean;
    orderId: string;
    loginUrl: string;
    stackCpCredentials: {
      username: string;
      tempPass: string;
      cpanelUrl: string;
      nameservers: string[];
    };
  }> {
    if (this.isMock()) {
      await new Promise((resolve) => setTimeout(resolve, 1800));
      const orderId = `CP-${Math.floor(100000 + Math.random() * 900000)}`;
      const username = `cp_${(data.firstName || 'user').toLowerCase().replace(/[^a-z]/g, '').slice(0, 8)}_${Math.floor(100 + Math.random() * 900)}`;

      return {
        success: true,
        orderId,
        loginUrl: `https://stackcp.cloudpulse.io/login?token=auth_${Math.random().toString(36).substring(2)}`,
        stackCpCredentials: {
          username,
          tempPass: 'CloudPulse!2026#' + Math.floor(1000 + Math.random() * 9000),
          cpanelUrl: 'https://stackcp.cloudpulse.io',
          nameservers: ['ns1.cloudpulse-dns.eu', 'ns2.cloudpulse-dns.eu', 'ns3.cloudpulse-dns.co.uk'],
        },
      };
    }
    return {
      success: false,
      orderId: '',
      loginUrl: '',
      stackCpCredentials: {
        username: '',
        tempPass: '',
        cpanelUrl: '',
        nameservers: [],
      },
    };
  }
}
