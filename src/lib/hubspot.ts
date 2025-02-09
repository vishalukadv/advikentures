import { supabase } from './supabase';

const HUBSPOT_API_KEY = import.meta.env.VITE_HUBSPOT_API_KEY;
const HUBSPOT_API_URL = 'https://api.hubapi.com/crm/v3';

interface Contact {
  email: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
}

interface Deal {
  dealname: string;
  amount: string;
  dealstage: string;
  pipeline: string;
}

export class HubSpotService {
  private async request(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${HUBSPOT_API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HubSpot API error: ${response.statusText}`);
    }
    
    return response.json();
  }

  async createContact(contact: Contact) {
    return this.request('/objects/contacts', {
      method: 'POST',
      body: JSON.stringify({
        properties: {
          ...contact
        }
      })
    });
  }

  async createDeal(deal: Deal) {
    return this.request('/objects/deals', {
      method: 'POST',
      body: JSON.stringify({
        properties: {
          ...deal
        }
      })
    });
  }

  async syncBooking(bookingId: string) {
    const { data: booking } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .single();

    if (!booking) return;

    // Create or update contact
    const contact = await this.createContact({
      email: booking.user_email
    });

    // Create deal
    await this.createDeal({
      dealname: `Booking: ${booking.activity_id}`,
      amount: booking.price,
      dealstage: booking.status === 'confirmed' ? 'closedwon' : 'appointmentscheduled',
      pipeline: 'default'
    });

    // Update booking with HubSpot IDs
    await supabase
      .from('bookings')
      .update({
        hubspot_contact_id: contact.id,
        synced_to_hubspot: true
      })
      .eq('id', bookingId);
  }

  async syncEnquiry(enquiryId: string) {
    const { data: enquiry } = await supabase
      .from('enquiries')
      .select('*')
      .eq('id', enquiryId)
      .single();

    if (!enquiry) return;

    // Create or update contact
    const contact = await this.createContact({
      email: enquiry.email,
      firstname: enquiry.name.split(' ')[0],
      lastname: enquiry.name.split(' ').slice(1).join(' ')
    });

    // Create deal
    await this.createDeal({
      dealname: `Enquiry: ${enquiry.subject}`,
      dealstage: 'qualifiedtobuy',
      pipeline: 'default'
    });

    // Update enquiry with HubSpot IDs
    await supabase
      .from('enquiries')
      .update({
        hubspot_contact_id: contact.id,
        synced_to_hubspot: true
      })
      .eq('id', enquiryId);
  }
}

export const hubspot = new HubSpotService();