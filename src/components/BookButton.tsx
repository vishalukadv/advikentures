import React, { useState } from 'react';
import BookingModal from './BookingModal';

interface BookButtonProps {
  title: string;
  location: string;
  price: string;
  duration?: string;
  type: 'package' | 'adventure' | 'yoga' | 'stay' | 'transport' | 'camping';
}

const BookButton: React.FC<BookButtonProps> = ({ title, location, price, duration, type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full px-4 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors"
      >
        Book Now
      </button>
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        itemDetails={{
          title,
          location,
          price,
          duration,
          type
        }}
      />
    </>
  );
};

export default BookButton;