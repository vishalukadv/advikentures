import React from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../lib/supabase';
import { sendNotificationEmail } from '../lib/email';
import toast from 'react-hot-toast';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemDetails: {
    title: string;
    location: string;
    price: string;
    duration?: string;
    type: 'package' | 'adventure' | 'yoga' | 'stay' | 'transport' | 'camping';
  };
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, itemDetails }) => {
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
          package_name: itemDetails.title,
          booking_date: data.travelDate,
          num_travelers: data.travelers,
          subject: `Booking Request: ${itemDetails.title}`,
          message: `${itemDetails.type.charAt(0).toUpperCase() + itemDetails.type.slice(1)} booking request received`,
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
          packageName: itemDetails.title,
          bookingDate: data.travelDate,
          travelers: data.travelers,
          price: itemDetails.price,
          subject: `New ${itemDetails.type} Booking Request: ${itemDetails.title}`,
          message: `
            ${itemDetails.type.toUpperCase()} BOOKING REQUEST
            
            Item Details:
            Name: ${itemDetails.title}
            Type: ${itemDetails.type}
            Location: ${itemDetails.location}
            Price: ${itemDetails.price}
            ${itemDetails.duration ? `Duration: ${itemDetails.duration}` : ''}
            Travel Date: ${new Date(data.travelDate).toLocaleDateString()}
            
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
        <h2 className="text-2xl font-bold mb-4">Book {itemDetails.title}</h2>
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
              Booking Details:
              <br />
              Price: {itemDetails.price}
              <br />
              Location: {itemDetails.location}
              {itemDetails.duration && (
                <>
                  <br />
                  Duration: {itemDetails.duration}
                </>
              )}
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

export default BookingModal;