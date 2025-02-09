import React from 'react';
import { LucideIcon } from 'lucide-react';
import AdventureCard from './AdventureCard';

interface ActivityProps {
  title: string;
  description: string;
  price: string;
  duration: string;
  image: string;
}

interface CategoryProps {
  title: string;
  description: string;
  icon: LucideIcon;
  activities: ActivityProps[];
}

const AdventureCategory: React.FC<CategoryProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  activities 
}) => {
  return (
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-6">
        <Icon className="h-8 w-8 text-orange-600" />
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      </div>
      <p className="text-gray-600 mb-8">{description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <AdventureCard key={activity.title} {...activity} />
        ))}
      </div>
    </div>
  );
};

export default AdventureCategory;