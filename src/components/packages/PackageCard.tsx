import React, { useState } from 'react';
import { MapPin, Calendar, Users, Check } from 'lucide-react';
import { Package } from '../../types';
import { useForm } from 'react-hook-form';
import { supabase } from '../../lib/supabase';
import { sendNotificationEmail } from '../../lib/email';
import toast from 'react-hot-toast';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageDetails: Package;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, packageDetails }) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      // Insert into enquiries table
      const { error } = await supabase
        .from('enquiries')
        .insert([{
          name: data.name,
          email: data.email,
          phone: data.phone,
          alt_phone: data.altPhone,
          package_name: packageDetails.title,
          booking_date: data.travelDate,
          num_travelers: data.travelers,
          subject: `Booking Request: ${packageDetails.title}`,
          message: `Package booking request received`,
          status: 'pending'
        }]);

      if (error) throw error;

      // Send notification email
      const emailSent = await sendNotificationEmail({
        type: 'booking',
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          altPhone: data.altPhone,
          packageName: packageDetails.title,
          bookingDate: data.travelDate,
          travelers: data.travelers,
          price: packageDetails.price,
          subject: `New Booking Request: ${packageDetails.title}`,
          message: `
            Package Details:
            Name: ${packageDetails.title}
            Location: ${packageDetails.location}
            Price: ${packageDetails.price}
            Travel Date: ${new Date(data.travelDate).toLocaleDateString()}
            Duration: ${packageDetails.duration}
            
            Customer Details:
            Name: ${data.name}
            Email: ${data.email}
            Phone: ${data.phone}
            Alt Phone: ${data.altPhone || 'N/A'}
            Number of Travelers: ${data.travelers}
            
            Special Requests:
            ${data.specialRequests || 'None'}
          `
        }
      });

      if (!emailSent) {
        console.warn('Email notification not sent, but booking was recorded');
      }

      toast.success('Thank you for your booking request! We will contact you soon to confirm your reservation.');
      reset();
      onClose();
    } catch (error) {
      console.error('Booking submission error:', error);
      toast.error('Failed to submit booking request. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Book {packageDetails.title}</h2>
        <p className="text-gray-600 mb-6">Fill in your details to request a booking</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name *</label>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name.message as string}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email *</label>
              <input
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message as string}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone *</label>
              <input
                type="tel"
                {...register('phone', { required: 'Phone number is required' })}
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
              />
              {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message as string}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Alternative Phone</label>
              <input
                type="tel"
                {...register('altPhone')}
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Travel Date *</label>
              <input
                type="date"
                {...register('travelDate', { required: 'Travel date is required' })}
                min={new Date().toISOString().split('T')[0]}
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
              />
              {errors.travelDate && <span className="text-red-500 text-sm">{errors.travelDate.message as string}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Number of Travelers *</label>
              <input
                type="number"
                {...register('travelers', { 
                  required: 'Number of travelers is required',
                  min: { value: 1, message: 'Minimum 1 traveler required' },
                  max: { value: 20, message: 'Maximum 20 travelers allowed' }
                })}
                min="1"
                max="20"
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
              />
              {errors.travelers && <span className="text-red-500 text-sm">{errors.travelers.message as string}</span>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Special Requests</label>
            <textarea
              {...register('specialRequests')}
              rows={3}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
              placeholder="Any special requirements or requests..."
            />
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-orange-800">
              Package Details:
              <br />
              Price: {packageDetails.price}
              <br />
              Duration: {packageDetails.duration}
              <br />
              Location: {packageDetails.location}
            </p>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const PackageCard: React.FC<Package> = (packageDetails) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img 
          src={packageDetails.image} 
          alt={packageDetails.title} 
          className="w-full h-48 object-cover"
        />
        {packageDetails.tag && (
          <span className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {packageDetails.tag}
          </span>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{packageDetails.title}</h3>
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-gray-600">
            <MapPin className="h-5 w-5 mr-2 text-orange-600" />
            <span>{packageDetails.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="h-5 w-5 mr-2 text-orange-600" />
            <span>{packageDetails.duration}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="h-5 w-5 mr-2 text-orange-600" />
            <span>{packageDetails.groupSize}</span>
          </div>
        </div>
        <div className="space-y-2 mb-6">
          {packageDetails.features.map((feature, index) => (
            <div key={index} className="flex items-center text-gray-600">
              <Check className="h-4 w-4 mr-2 text-orange-600 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-orange-600">{packageDetails.price}</span>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        packageDetails={packageDetails}
      />
    </div>
  );
};

export default PackageCard;