import React from 'react';
import BookButton from '../BookButton';

interface AdventureCardProps {
  title: string;
  description: string;
  price: string;
  duration: string;
  image: string;
}

const AdventureCard: React.FC<AdventureCardProps> = ({
  title,
  description,
  price,
  duration,
  image
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>{duration}</span>
          <span className="font-semibold text-orange-600">{price}</span>
        </div>
        <BookButton
          title={title}
          location="Various Locations"
          price={price}
          duration={duration}
          type="adventure"
        />
      </div>
    </div>
  );
};

export default AdventureCard;