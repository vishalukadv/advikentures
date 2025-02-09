import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import BookButton from '../BookButton';

interface TransportCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  capacity: string;
  features: string[];
  price: string;
  image: string;
  tag?: string;
}

const TransportCard: React.FC<TransportCardProps> = ({
  icon: Icon,
  title,
  description,
  capacity,
  features,
  price,
  image,
  tag
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        {tag && (
          <span className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {tag}
          </span>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Icon className="h-6 w-6 text-orange-600" />
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="text-sm text-gray-600 mb-4">
          <span className="font-medium">Capacity:</span> {capacity}
        </div>
        <div className="space-y-2 mb-6">
          {features.map((feature) => (
            <div key={feature} className="flex items-center text-gray-600">
              <span className="w-2 h-2 bg-orange-600 rounded-full mr-2" />
              {feature}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold text-orange-600">{price}</span>
          <BookButton
            title={title}
            location="Pan India"
            price={price}
            type="transport"
          />
        </div>
      </div>
    </div>
  );
};

export default TransportCard;