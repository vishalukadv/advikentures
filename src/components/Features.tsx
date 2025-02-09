import React from 'react';
import { Mountain, Flower2, Home, Tent, Car } from 'lucide-react';
import FeatureCard from './FeatureCard';
import SectionTitle from './SectionTitle';
import { Feature } from '../types';

const features: Feature[] = [
  {
    icon: Mountain,
    title: 'Adventure Sports',
    description: 'Experience thrilling activities from rafting to paragliding',
  },
  {
    icon: Flower2,
    title: 'Yoga Retreats',
    description: 'Find inner peace with our guided wellness programs',
  },
  {
    icon: Home,
    title: 'Comfortable Stays',
    description: 'Luxurious accommodations in scenic locations',
  },
  {
    icon: Tent,
    title: 'Camping',
    description: 'Connect with nature in our eco-friendly camps',
  },
  {
    icon: Car,
    title: 'Transport Services',
    description: 'Hassle-free travel with our personalized transport',
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Experience the Extraordinary"
          subtitle="Discover our range of services designed for your ultimate adventure"
        />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;