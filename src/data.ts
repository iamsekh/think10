/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StrategicDimension, AdvisoryExpert, Testimonial, SimulatorPreset, BlogPost } from './types';

export const STRATEGIC_DIMENSIONS: StrategicDimension[] = [
  {
    id: 'brand',
    name: 'Brand Development & Positioning',
    number: '01',
    description: 'Build an impactful, cohesive brand story, premium visual identity, and positioning that stands out in the GCC luxury and lifestyle market.',
    aiCapability: 'Automated narrative refinement, competitor brand positioning matrices, and targeted customer avatar profiling tools.',
    humanCuration: 'A retail brand director reviews your brand guidelines, typography, and assets to elevate your overall market perception.',
    exampleMetric: 'Brand Recall Index',
    metricLabel: 'Enhanced premium positioning and consumer loyalty',
    imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'retail-ops',
    name: 'Retail Storefront Operations',
    number: '02',
    description: 'Streamline physical in-store processes, staff hiring and training, storefront layout design, and inventory workflows for maximum retail success.',
    aiCapability: 'Foot-traffic flow optimization models, employee roster planning tools, and local shopfront compliance checklists.',
    humanCuration: 'A former retail operations lead from Chalhoub Group audits your store layout and designs staff KPI frameworks.',
    exampleMetric: 'Sales Per Square Foot',
    metricLabel: 'Optimized space efficiency and checkout conversion',
    imageUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'marketplace',
    name: 'Marketplace Integration Strategy',
    number: '03',
    description: 'Deploy a high-yielding omnichannel sales strategy across primary regional marketplaces to build a unified GCC brand footprint.',
    aiCapability: 'Multi-platform pricing calculators, regional sales event calendars, and cross-channel listings optimization.',
    humanCuration: 'A marketplace advisor reviews your seller profile health and guides you on platform commission negotiation.',
    exampleMetric: 'Omnichannel Sales Velocity',
    metricLabel: 'Cohesive pricing and unified brand control',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'amazon',
    name: 'Amazon UAE Strategy & Ads',
    number: '04',
    description: 'Establish your brand on Amazon UAE. Optimize product listing keyword relevance and construct profitable Amazon PPC (AMS) campaigns.',
    aiCapability: 'Listing index evaluation, automated backend keyword generation, and PPC keyword bidding suggestions.',
    humanCuration: 'An Amazon account growth expert reviews your catalog structure, runs audits, and designs campaign strategies.',
    exampleMetric: 'RoAS (Return on Ad Spend)',
    metricLabel: 'Engineered target exceeding 4.0x on product campaigns',
    imageUrl: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'noon',
    name: 'Noon UAE FBN Optimization',
    number: '05',
    description: 'Master Fulfilled by Noon (FBN) logistics. Manage your seller dashboard, inventory health, and leverage Noon platform sales events.',
    aiCapability: 'Real-time Noon FBN inventory tracking models, automated shipping plan generation, and price-tracker alerts.',
    humanCuration: 'A former Noon Marketplace Director audits your listing health and helps resolve FBN warehouse shipping challenges.',
    exampleMetric: 'Express Delivery Badging',
    metricLabel: 'Up to +30% visibility increase using FBN logistics',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'tiktok',
    name: 'TikTok Shop & Live Commerce',
    number: '06',
    description: 'Leverage the viral growth of TikTok Shop in the UAE. Design content guidelines, manage affiliates, and structure high-converting live sales.',
    aiCapability: 'Trending audio matching scripts, video engagement hook templates, and affiliate outreach email generators.',
    humanCuration: 'A social commerce strategist helps draft affiliate commission structures and designs script structures for live streams.',
    exampleMetric: 'TikTok Store Conversion',
    metricLabel: 'Direct social commerce conversion optimization',
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'pricing',
    name: 'Pricing & Margin Optimization',
    number: '07',
    description: 'Calibrate your retail and e-commerce pricing strategy to maximize gross margin profiles while staying highly attractive to UAE consumers.',
    aiCapability: 'Dynamic competitor price matching algorithms, import/export duty matrices, and localized discount simulators.',
    humanCuration: 'A retail pricing advisor conducts margin audits and designs tiered pricing architectures for new product lines.',
    exampleMetric: 'Gross Margin Percentage',
    metricLabel: 'Target margin optimization set to exceed 65%',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'cashflow',
    name: 'Cash Flow & Sourcing Management',
    number: '08',
    description: 'Secure reliable working capital solutions and optimize manufacturer lead times to purchase inventory seamlessly during peak sales quarters.',
    aiCapability: 'Cash runway modeling, inventory order volume prediction models, and local supply chain risk logs.',
    humanCuration: 'A retail finance CFO structures inventory credit lines and guides you through factory/supplier contract negotiations.',
    exampleMetric: 'Cash Conversion Cycle',
    metricLabel: 'Days inventory outstanding reduced to under 45 days',
    imageUrl: 'https://images.unsplash.com/photo-1580519542036-ed47f3e42214?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'marketing',
    name: 'Omnichannel Digital Marketing',
    number: '09',
    description: 'Elevate your online marketing return on investment (ROAS). Maximize customer retention via email, SMS, and WhatsApp marketing campaigns.',
    aiCapability: 'Ad creative text copywriters, customer segment cohort generators, and automated WhatsApp flow models.',
    humanCuration: 'A digital growth strategist reviews your ad accounts (Meta, Google, TikTok) and designs custom acquisition budgets.',
    exampleMetric: 'Customer Lifetime Value (LTV)',
    metricLabel: 'Repeat purchase rate improved by up to 25%',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'talent',
    name: 'Team Building & Operations',
    number: '10',
    description: 'Design key roles, hire competent e-commerce store managers, retain top-tier retail staff, and build a motivated scale-up team.',
    aiCapability: 'Role outline generators, GCC-specific compensation benchmarks, and interview vetting guides.',
    humanCuration: 'A human resources advisor guides you through hiring processes, onboarding design, and staff incentive systems.',
    exampleMetric: 'Staff Retention Rate',
    metricLabel: 'Highly cohesive work culture with >90% team retention',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000'
  }
];

export const ADVISORY_EXPERTS: AdvisoryExpert[] = [
  {
    id: 'amira',
    name: 'Amira Al-Mansoori',
    role: 'Senior Retail Operations Advisor',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200',
    formerRole: 'Former Operations Lead at Chalhoub Group',
    specialty: 'Omnichannel Retail & Storefront Scale',
    bio: 'Amira has scaled retail brands across the GCC for over 15 years. She specializes in boutique layout efficiency, staff training frameworks, and physical distribution operations.'
  },
  {
    id: 'fatima',
    name: 'Fatima Al-Kamali',
    role: 'E-Commerce Marketplace Partner',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200',
    formerRole: 'Former Marketplace Director at Noon UAE',
    specialty: 'Noon, Amazon UAE & Social Commerce',
    bio: 'Fatima managed seller partnerships and platform growth initiatives at Noon UAE. She guides Think10 members on list optimization, keyword advertising, and FBN logistics.'
  },
  {
    id: 'sarah',
    name: 'Sarah Jenkins',
    role: 'Brand Strategy & Creative Director',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200',
    formerRole: 'Former Creative Director at Majid Al Futtaim Fashion',
    specialty: 'Premium Branding & Visual Storytelling',
    bio: 'Sarah is an expert in brand communication. She collaborates with e-commerce and retail founders to build luxury brand systems, premium packaging, and high-end design.'
  },
  {
    id: 'marcus',
    name: 'Marcus Vance',
    role: 'Financial Advisory Partner',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
    formerRole: 'Former Venture Partner at ME Retail Syndicate',
    specialty: 'Sourcing, Inventory Sizing & Cash Flow',
    bio: 'Marcus focuses on the numbers that drive scale. He assists retail founders with cash runway modeling, factory negotiations, inventory capital designs, and banking relations.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote: "Think10 completely changed my approach to retail. With the guidance of Amira, we successfully opened our second boutique in Abu Dhabi and doubled our e-commerce sales on Noon within six months. I finally feel like I'm not building alone.",
    author: "Yasmin Al-Maktoum",
    title: "Founder & Creative Director",
    company: "Maison de Fleur (Dubai Boutique)",
    avatarUrl: "https://images.unsplash.com/photo-1534751516642-a131ffd473fd?auto=format&fit=crop&q=80&w=150&h=150",
    metrics: "2 Retail Locations | +180% YoY Growth"
  },
  {
    id: 'test-2',
    quote: "Zyne AI helped us flag a major pricing margin leakage in our Shopify store. Then, Fatima helped us restructure our Amazon UAE PPC ads, which cut our acquisition cost by 35%. The hybrid model of AI and real UAE consultants is genius.",
    author: "Dina H. Al-Ghurair",
    title: "Founder & Chief Executive Officer",
    company: "Zora Beauty",
    avatarUrl: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=150&h=150",
    metrics: "AED 3.2M Annual Sales | CAC Reduced by 35%"
  }
];

export const SIMULATOR_PRESETS: SimulatorPreset[] = [
  {
    id: 'marketplace-launch',
    question: 'How do we successfully launch our fashion brand on Amazon UAE and Noon without getting lost in search listings?',
    category: 'Marketplace Strategy',
    shortSummary: 'Optimize listing indexing, configure localized FBN/FBA logistics, and build search prominence.',
    aiBrief: `Launching on Amazon UAE and Noon requires a two-fold approach of search visibility optimization and logistical readiness.

1. **Keyword Indexing for GCC Buyers**: Standardize listing descriptions to capture local shopping terms. Ensure Arabic translations are idiomatic rather than machine-translated to maximize search relevancy.
2. **Logistical Strategy (FBN & FBA)**: Split inventory between Fulfilled by Noon (FBN) and Fulfilled by Amazon (FBA) to qualify for Prime/Express tags. This immediately boosts search visibility and click-through rates by up to 40%.
3. **PPC Ad Campaigns**: Launch precise exact-match keyword campaigns targeting high-intent UAE search queries rather than broad auto-targeting.`,
    advisorQuote: "Winning on Noon and Amazon isn't just about ads—it's about prime delivery badging. Getting your inventory into FBN/FBA is the fastest way to build consumer trust in the region.",
    advisorName: "Fatima Al-Kamali",
    advisorTitle: "E-Commerce Marketplace Partner (Former Director at Noon UAE)",
    advisorySteps: [
      "Configure Amazon Seller Central and Noon Partner registry profiles",
      "Translate and optimize search listing metadata for local GCC buyers",
      "Calculate initial inventory split for FBA and FBN distribution centers",
      "Human Audit: Product listing optimization review with Fatima"
    ]
  },
  {
    id: 'cashflow-inventory',
    question: 'We are struggling with inventory cash flow cycles. How do we fund purchase orders for our e-commerce store during high-demand quarters?',
    category: 'Cash Flow',
    shortSummary: 'Establish inventory financing channels, optimize lead times, and restructure working capital terms.',
    aiBrief: `To sustain purchase orders during peak quarters, you must optimize supplier payment windows and tap into retail-focused working capital.

1. **Supplier Negotiation**: Request a shift from 100% upfront payments to a 30/70 payment split (30% deposit, 70% upon bill of lading approval). This preserves cash for marketing during production.
2. **Inventory Financing**: Partner with regional non-dilutive e-commerce funding platforms to secure inventory advances based on historic storefront sales data.
3. **Buffer Management**: Set strict safety-stock triggers based on seasonal sales velocities to prevent over-stocking slow items.`,
    advisorQuote: "Cash flow is the lifeblood of retail. Negotiating favorable payment terms with your manufacturers keeps cash in your business when you need to acquire customers.",
    advisorName: "Marcus Vance",
    advisorTitle: "Financial Advisory Partner (Former Venture Partner at ME Retail Syndicate)",
    advisorySteps: [
      "Map seasonal e-commerce sales velocity data and peak inventory targets",
      "Draft supplier renegotiation briefs for payment term adjustments",
      "Connect store data to regional inventory finance platforms",
      "Human Audit: Cash flow forecast review and supplier negotiation setup with Marcus"
    ]
  },
  {
    id: 'brand-positioning',
    question: 'How do we elevate our brand identity to appeal to premium women consumers in the UAE and expand our retail presence?',
    category: 'Brand Development',
    shortSummary: 'Refine visual brand assets, construct an emotional storytelling narrative, and design premium unboxing experiences.',
    aiBrief: `Targeting premium consumers in the GCC requires establishing high perceived brand value through elevated storytelling and visual aesthetics.

1. **Emotional Narrative**: Center your brand on community and empowerment. Female founders in the UAE resonate deeply with brands that champion local enterprise and luxury.
2. **Visual Consistency**: Audit typography, color palettes, and photography assets. Ensure your digital and physical footprints reflect high-end luxury standards (e.g. minimalist layouts, elegant packaging).
3. **VIP Customer Retention**: Launch a highly personalized customer experience with hand-written notes, premium unboxing details, and exclusive early access to new collections.`,
    advisorQuote: "Premium brand value isn't just in the product—it is in the story. In the UAE, luxury is in the details of the unboxing experience and the community you build.",
    advisorName: "Sarah Jenkins",
    advisorTitle: "Brand Strategy & Creative Director (Former Creative Director at MAF Fashion)",
    advisorySteps: [
      "Audit current digital brand assets, unboxing materials, and typography guidelines",
      "Refine the core brand narrative messaging for premium GCC audiences",
      "Outline VIP community engagement and custom packaging designs",
      "Human Audit: Brand visual hierarchy and storytelling review with Sarah"
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'How Zyne AI Predicts E-Commerce Inventory Shortages Before They Happen',
    category: 'AI & Data',
    excerpt: 'Discover how predictive analytics is saving GCC retailers millions by optimizing cash flow and preventing stock-outs during peak seasons.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    date: 'Oct 12, 2024',
    readTime: '4 min read'
  },
  {
    id: 'blog-2',
    title: 'The Shift to Omnichannel: Why Single-Channel Retail is Dying in the UAE',
    category: 'Retail Strategy',
    excerpt: 'Consumers expect a seamless transition from your Instagram page to your physical boutique to your Noon storefront. Here is how to unify your channels.',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
    date: 'Oct 05, 2024',
    readTime: '6 min read'
  },
  {
    id: 'blog-3',
    title: 'Mastering Amazon UAE: The Anatomy of a High-Converting Listing',
    category: 'Marketplace',
    excerpt: 'We analyze the top 1% of Amazon UAE listings to show you how indexing, FBA readiness, and PPC structure guarantee page-one visibility.',
    imageUrl: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&q=80&w=800',
    date: 'Sep 28, 2024',
    readTime: '5 min read'
  }
];
