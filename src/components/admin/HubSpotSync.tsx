import React from 'react';
import { Loader2 } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { hubspot } from '../../lib/hubspot';
import toast from 'react-hot-toast';

interface HubSpotSyncProps {
  type: 'booking' | 'enquiry';
  id: string;
  synced?: boolean;
}

const HubSpotSync: React.FC<HubSpotSyncProps> = ({ type, id, synced }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (type === 'booking') {
        await hubspot.syncBooking(id);
      } else {
        await hubspot.syncEnquiry(id);
      }
    },
    onSuccess: () => {
      toast.success('Successfully synced to HubSpot');
    },
    onError: () => {
      toast.error('Failed to sync with HubSpot');
    }
  });

  if (synced) {
    return (
      <span className="text-sm text-green-600">
        Synced to HubSpot
      </span>
    );
  }

  return (
    <button
      onClick={() => mutate()}
      disabled={isPending}
      className="inline-flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50"
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : null}
      Sync to HubSpot
    </button>
  );
};

export default HubSpotSync;