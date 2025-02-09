import { LucideIcon } from 'lucide-react';

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Package {
  title: string;
  location: string;
  duration: string;
  groupSize: string;
  price: string;
  image: string;
  features: string[];
  tag?: string;
}