import { supabase } from './supabase';
import { analytics } from './analytics';

interface NotificationData {
  name: string;
  email: string;
  phone: string;
  altPhone?: string;
  packageName: string;
  bookingDate: string;
  travelers: number;
  price: string;
  subject: string;
  message: string;
}

interface NotificationRequest {
  type: 'enquiry' | 'booking' | 'analytics';
  data: NotificationData;
}

export async function sendNotificationEmail(request: NotificationRequest): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('email_notifications')
      .insert([{
        type: request.type,
        recipient: 'info@advikentures.com',
        subject: request.data.subject,
        client_reference: `${request.type}_${Date.now()}`,
        client_metadata: {
          email: request.data.email,
          name: request.data.name,
          phone: request.data.phone,
          altPhone: request.data.altPhone,
          package: request.data.packageName,
          date: request.data.bookingDate,
          travelers: request.data.travelers,
          price: request.data.price,
          message: request.data.message
        }
      }])
      .select()
      .single();

    if (error) {
      throw error;
    }

    analytics.trackEvent({
      name: 'notification_created',
      properties: {
        type: request.type,
        status: 'success',
        notification_id: data.id
      }
    });

    return true;
  } catch (error) {
    console.error(`Failed to create ${request.type} notification:`, error);
    
    analytics.trackEvent({
      name: 'notification_failed',
      properties: {
        type: request.type,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    });

    return false;
  }
}