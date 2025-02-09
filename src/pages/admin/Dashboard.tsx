import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { format } from 'date-fns';

const Dashboard = () => {
  const { data: bookings } = useQuery({
    queryKey: ['admin-bookings'],
    queryFn: async () => {
      const { data } = await supabase
        .from('bookings')
        .select('*')
        .order('booking_date', { ascending: true });
      return data;
    }
  });

  const { data: enquiries } = useQuery({
    queryKey: ['admin-enquiries'],
    queryFn: async () => {
      const { data } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });
      return data;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bookings Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Recent Bookings</h2>
          <div className="space-y-4">
            {bookings?.map((booking) => (
              <div key={booking.id} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{booking.activity_id}</p>
                    <p className="text-sm text-gray-600">
                      {format(new Date(booking.booking_date), 'PPP')}
                    </p>
                    <p className="text-sm text-gray-600">
                      Members: {booking.num_members}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    booking.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enquiries Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Recent Enquiries</h2>
          <div className="space-y-4">
            {enquiries?.map((enquiry) => (
              <div key={enquiry.id} className="bg-white p-4 rounded-lg shadow-sm">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">{enquiry.subject}</p>
                      <p className="text-sm text-gray-600">{enquiry.name}</p>
                      <p className="text-sm text-gray-600">{enquiry.email}</p>
                    </div>
                  </div>
                  <p className="mt-2">{enquiry.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;