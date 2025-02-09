import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { Award, Heart, Globe, Shield } from 'lucide-react';
import Timeline from '../components/about/Timeline';
import Stats from '../components/about/Stats';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'Our love for adventure and wellness drives everything we do'
    },
    {
      icon: Shield,
      title: 'Safety',
      description: 'Your safety is our top priority with certified instructors and equipment'
    },
    {
      icon: Globe,
      title: 'Sustainability',
      description: 'We promote responsible tourism and environmental conservation'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to providing exceptional experiences since 2015'
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      <section className="py-24 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="About Advikentures"
            subtitle="Your Journey to Adventure and Wellness Begins Here"
          />
          
          <div className="prose prose-lg mx-auto text-gray-600 mb-16">
            <p className="lead">
              Since 2015, Advikentures has been at the forefront of transforming adventure and wellness tourism in India. What started as a dream to combine thrilling experiences with mindful practices has grown into India's premier adventure tourism company.
            </p>
            <p>
              Our journey began in the spiritual heart of India - Rishikesh, where we recognized the unique opportunity to blend the country's rich spiritual heritage with its diverse landscapes perfect for adventure sports. Today, we operate across multiple locations, from the mighty Himalayas to the serene beaches of Goa.
            </p>
            <p>
              With a team of over 200 certified instructors, wellness experts, and adventure specialists, we've served more than 50,000 travelers from across the globe. Our commitment to safety, sustainability, and exceptional experiences has earned us multiple industry awards and recognitions.
            </p>
          </div>

          <Stats />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-600 mb-4">
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
              </div>
            ))}
          </div>

          <div className="mt-24">
            <h2 className="text-3xl font-bold text-center mb-16">Our Journey</h2>
            <Timeline />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;