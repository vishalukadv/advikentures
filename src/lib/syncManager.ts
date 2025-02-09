import { supabase } from './supabase';
import { analytics } from './analytics';
import { reportScheduler } from './reportScheduler';
import { seoOptimizer } from './seoOptimizer';

interface SyncState {
  lastSync: Date;
  status: 'idle' | 'syncing' | 'error';
  error?: string;
}

class SyncManager {
  private state: SyncState = {
    lastSync: new Date(),
    status: 'idle'
  };

  private subscribers: Set<(state: SyncState) => void> = new Set();

  constructor() {
    this.setupRealtimeSubscriptions();
  }

  private setupRealtimeSubscriptions() {
    // Subscribe to bookings changes
    supabase
      .channel('bookings')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, this.handleBookingChange)
      .subscribe();

    // Subscribe to enquiries changes
    supabase
      .channel('enquiries')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'enquiries' }, this.handleEnquiryChange)
      .subscribe();

    // Subscribe to analytics events
    supabase
      .channel('analytics')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'analytics_events' }, this.handleAnalyticsEvent)
      .subscribe();
  }

  private handleBookingChange = async (payload: any) => {
    try {
      this.setState({ status: 'syncing' });

      // Track the change
      analytics.trackEvent({
        name: 'booking_change',
        properties: {
          type: payload.eventType,
          bookingId: payload.new?.id
        }
      });

      // Trigger reports if needed
      if (this.shouldGenerateReport()) {
        await reportScheduler.generateReport();
      }

      this.setState({ status: 'idle', lastSync: new Date() });
    } catch (error) {
      this.handleError('Booking sync failed', error);
    }
  };

  private handleEnquiryChange = async (payload: any) => {
    try {
      this.setState({ status: 'syncing' });

      // Track the change
      analytics.trackEvent({
        name: 'enquiry_change',
        properties: {
          type: payload.eventType,
          enquiryId: payload.new?.id
        }
      });

      // Update SEO metrics if needed
      if (payload.new?.source === 'website') {
        await seoOptimizer.updateMetrics(payload.new.source_page);
      }

      this.setState({ status: 'idle', lastSync: new Date() });
    } catch (error) {
      this.handleError('Enquiry sync failed', error);
    }
  };

  private handleAnalyticsEvent = async (payload: any) => {
    try {
      const event = payload.new;

      // Update SEO metrics for page views
      if (event.event_name === 'page_view') {
        await seoOptimizer.updateMetrics(event.properties.path);
      }

      // Track conversion events
      if (event.event_name === 'conversion') {
        analytics.trackEvent({
          name: 'conversion_recorded',
          properties: event.properties
        });
      }
    } catch (error) {
      console.error('Analytics event handling failed:', error);
    }
  };

  private shouldGenerateReport(): boolean {
    const now = new Date();
    const lastSync = this.state.lastSync;
    
    // Generate report if last sync was more than 6 hours ago
    return now.getTime() - lastSync.getTime() > 6 * 60 * 60 * 1000;
  }

  private setState(partial: Partial<SyncState>) {
    this.state = { ...this.state, ...partial };
    this.notifySubscribers();
  }

  private handleError(message: string, error: any) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`${message}:`, error);
    
    this.setState({
      status: 'error',
      error: errorMessage
    });

    analytics.trackEvent({
      name: 'sync_error',
      properties: {
        message,
        error: errorMessage
      }
    });
  }

  private notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.state));
  }

  subscribe(callback: (state: SyncState) => void) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  getState(): SyncState {
    return { ...this.state };
  }

  async forceSync() {
    try {
      this.setState({ status: 'syncing' });

      // Force report generation
      await reportScheduler.generateReport();

      // Force SEO optimization
      await seoOptimizer.optimizeContent();

      this.setState({ status: 'idle', lastSync: new Date() });
    } catch (error) {
      this.handleError('Force sync failed', error);
    }
  }
}

export const syncManager = new SyncManager();