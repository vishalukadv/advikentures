import React from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import BookingCalendar from './booking/BookingCalendar';
import { sendNotificationEmail } from '../lib/email';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName: string;
  price: string;
}

const EnquiryModal: React.FC<EnquiryModalProps> = ({ isOpen, onClose, packageName, price }) => {
  const { register, handleSubmit, setValue, watch, reset, formState: { errors, isSubmitting } } = useForm();
  const selectedDate = watch('bookingDate');

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
          package_name: packageName,
          booking_date: data.bookingDate,
          num_travelers: data.travelers,
          subject: `Enquiry for ${packageName}`,
          message: `Interested in ${packageName} package. Price: ${price}`,
          status: 'pending'
        }]);

      if (error) throw error;

      // Send notification email
      const emailSent = await sendNotificationEmail({
        type: 'enquiry',
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          altPhone: data.altPhone,
          packageName,
          bookingDate: data.bookingDate,
          travelers: data.travelers,
          price,
          subject: `New Enquiry: ${packageName}`,
          message: `
            Package: ${packageName}
            Price: ${price}
            Date: ${new Date(data.bookingDate).toLocaleDateString()}
            Travelers: ${data.travelers}
            
            Contact Details:
            Name: ${data.name}
            Email: ${data.email}
            Phone: ${data.phone}
            Alt Phone: ${data.altPhone || 'N/A'}
          `
        }
      });

      if (!emailSent) {
        console.warn('Email notification not sent, but enquiry was recorded');
      }

      toast.success('Thank you for your enquiry! We will contact you soon.');
      reset(); // Reset form
      onClose();
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit enquiry. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Book {packageName}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <div className="bg-orange-50 p-4 rounded-lg mb-4">
            <p className="text-orange-800 font-medium">Special Offer!</p>
            <p className="text-sm text-orange-700">Pay 10% advance and get an additional 10% discount on your total booking amount.</p>
          </div>
          <p className="text-gray-600">Package Price: <span className="font-semibold">{price}</span></p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                className="w-full px-4 py-2 border rounded-md"
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name.message as string}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                className="w-full px-4 py-2 border rounded-md"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message as string}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                {...register('phone', { required: 'Phone number is required' })}
                className="w-full px-4 py-2 border rounded-md"
              />
              {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message as string}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alternative Phone Number
              </label>
              <input
                type="tel"
                {...register('altPhone')}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Travel Date *
            </label>
            <BookingCalendar
              onSelect={(date) => setValue('bookingDate', date)}
              selectedDate={selectedDate}
            />
            {errors.bookingDate && <span className="text-red-500 text-sm">{errors.bookingDate.message as string}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Travelers *
            </label>
            <input
              type="number"
              min="1"
              max="20"
              {...register('travelers', { required: 'Number of travelers is required', min: 1, max: 20 })}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.travelers && <span className="text-red-500 text-sm">{errors.travelers.message as string}</span>}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              Note: Full payment can be made on spot. To avail the additional 10% discount, you can pay 10% advance. Our team will contact you with payment details.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnquiryModal;