import React from 'react';
import SectionTitle from '../components/SectionTitle';
import GalleryGrid from '../components/gallery/GalleryGrid';

const Gallery = () => {
  return (
    <div className="min-h-screen pt-16">
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Adventure Gallery"
            subtitle="Glimpses of unforgettable moments and breathtaking experiences"
          />
          <GalleryGrid />
        </div>
      </section>
    </div>
  );
};

export default Gallery;