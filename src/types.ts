/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface StrategicDimension {
  id: string;
  name: string;
  number: string;
  description: string;
  aiCapability: string;
  humanCuration: string;
  exampleMetric: string;
  metricLabel: string;
  imageUrl?: string;
}

export interface AdvisoryExpert {
  id: string;
  name: string;
  role: string;
  avatar: string;
  formerRole: string;
  specialty: string;
  bio: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  ctaText: string;
  popular: boolean;
  tierType: 'growth' | 'elite' | 'bespoke';
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  company: string;
  avatarUrl: string;
  metrics: string;
}

export interface SimulatorPreset {
  id: string;
  question: string;
  category: string;
  shortSummary: string;
  aiBrief: string;
  advisorQuote: string;
  advisorName: string;
  advisorTitle: string;
  advisorySteps: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  readTime: string;
}
