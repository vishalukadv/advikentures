import { Car, Bus, Plane, Train } from 'lucide-react';

export const transportServices = [
  {
    icon: Car,
    title: 'Premium SUV',
    description: 'Comfortable SUVs for mountain terrain',
    capacity: '6 passengers',
    features: [
      'Professional driver',
      'Air conditioning',
      'GPS navigation',
      'First aid kit',
      'Luggage space'
    ],
    pricePerDay: '₹4,999',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
    tag: 'Most Popular'
  },
  {
    icon: Car,
    title: 'Luxury Sedan',
    description: 'Premium sedans for city travel',
    capacity: '4 passengers',
    features: [
      'Professional driver',
      'Premium interiors',
      'WiFi',
      'Refreshments',
      'Airport transfers'
    ],
    pricePerDay: '₹3,999',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2'
  },
  {
    icon: Bus,
    title: 'Group Minibus',
    description: 'Perfect for group tours',
    capacity: '12 passengers',
    features: [
      'Professional driver',
      'Air conditioning',
      'Entertainment system',
      'Luggage space',
      'Flexible scheduling'
    ],
    pricePerDay: '₹8,999',
    image: 'https://www.japjitravel.com/blog/wp-content/uploads/2017/05/Advantages-of-Hiring-a-Mini-Bus-Group-Trip.jpg'
  },
  {
    icon: Bus,
    title: 'Luxury Coach',
    description: 'Premium bus for large groups',
    capacity: '30 passengers',
    features: [
      'Professional driver',
      'Air conditioning',
      'Entertainment system',
      'Restroom',
      'Reclining seats'
    ],
    pricePerDay: '₹15,999',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957',
    tag: 'Group Travel'
  },
  {
    icon: Plane,
    title: 'Charter Flights',
    description: 'Private air travel',
    capacity: 'Up to 8 passengers',
    features: [
      'Professional crew',
      'Flexible scheduling',
      'Premium service',
      'Direct routes',
      'Luxury amenities'
    ],
    pricePerTrip: 'From ₹99,999',
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b',
    tag: 'Luxury'
  },
  {
    icon: Train,
    title: 'Luxury Train Experience',
    description: 'Heritage train journeys',
    capacity: 'Multiple coaches',
    features: [
      'Private cabins',
      'Fine dining',
      'Guided tours',
      'Entertainment',
      'Butler service'
    ],
    pricePerTrip: 'From ₹49,999',
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3',
    tag: 'Heritage'
  }
];