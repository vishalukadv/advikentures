import React from 'react';
import { cn } from '../../utils/cn';

interface GalleryItemProps {
  src: string;
  alt: string;
  className?: string;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ src, alt, className }) => (
  <div className={cn("group relative overflow-hidden rounded-lg cursor-pointer", className)}>
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
      <p className="text-white p-4 text-sm font-medium">{alt}</p>
    </div>
  </div>
);

const GalleryGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <GalleryItem
        src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba"
        alt="Mountain Trekking"
        className="row-span-2"
      />
      <GalleryItem
        src="https://images.unsplash.com/photo-1522163182402-834f871fd851"
        alt="Rock Climbing"
      />
      <GalleryItem
        src="https://images.unsplash.com/photo-1506126613408-eca07ce68773"
        alt="Yoga Session"
      />
      <GalleryItem
        src="https://images.unsplash.com/photo-1544984243-ec57ea16fe25"
        alt="Bungee Jumping"
        className="row-span-2"
      />
      <GalleryItem
        src="https://images.unsplash.com/photo-1571896349842-33c89424de2d"
        alt="Luxury Stay"
      />
      <GalleryItem
        src="https://images.unsplash.com/photo-1685550904048-023814c6c9b5"
        alt="River Rafting"
      />
      <GalleryItem
        src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4"
        alt="Camping"
      />
      <GalleryItem
        src="https://images.unsplash.com/photo-1648853070657-6d58398bee93"
        alt="Zip Lining"
      />
      <GalleryItem
        src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b"
        alt="Wellness Retreat"
      />
      <GalleryItem
        src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba"
        alt="Night Camping"
        className="col-span-2"
      />
    </div>
  );
};

export default GalleryGrid;