import { supabase } from './supabase';

interface EventData {
  name: string;
  properties?: Record<string, any>;
  category?: string;
  value?: number;
}

interface UserSession {
  sessionId: string;
  startTime: number;
  lastActive: number;
  pageViews: number;
  interactions: number;
}

class Analytics {
  private currentSession: UserSession;
  private readonly sessionTimeout = 30 * 60 * 1000; // 30 minutes

  constructor() {
    this.currentSession = this.initSession();
    this.setupSessionTracking();
  }

  private initSession(): UserSession {
    return {
      sessionId: crypto.randomUUID(),
      startTime: Date.now(),
      lastActive: Date.now(),
      pageViews: 1,
      interactions: 0
    };
  }

  private setupSessionTracking() {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.updateSession();
      }
    });

    ['click', 'scroll', 'mousemove', 'keypress'].forEach(eventType => {
      document.addEventListener(eventType, () => {
        this.currentSession.interactions++;
        this.updateSession();
      });
    });

    window.addEventListener('popstate', () => this.trackPageView());
  }

  private updateSession() {
    const now = Date.now();
    if (now - this.currentSession.lastActive > this.sessionTimeout) {
      this.currentSession = this.initSession();
    }
    this.currentSession.lastActive = now;
  }

  private async track(event: EventData) {
    try {
      if (import.meta.env.DEV) return;

      this.updateSession();

      const { error } = await supabase
        .from('analytics_events')
        .insert([{
          event_name: event.name,
          properties: {
            ...event.properties,
            category: event.category,
            value: event.value,
            sessionId: this.currentSession.sessionId,
            sessionDuration: Date.now() - this.currentSession.startTime,
            pageViews: this.currentSession.pageViews,
            interactions: this.currentSession.interactions,
            referrer: document.referrer,
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            deviceType: this.getDeviceType(),
            timeSpentOnPage: this.getTimeOnPage()
          },
          user_agent: navigator.userAgent,
          url: window.location.href,
          timestamp: new Date().toISOString()
        }]);

      if (error) {
        console.warn('Analytics event not recorded:', error.message);
      }
    } catch (error) {
      console.warn('Failed to track event:', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  private getDeviceType(): string {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return 'tablet';
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      return 'mobile';
    }
    return 'desktop';
  }

  private getTimeOnPage(): number {
    return Math.floor((Date.now() - this.currentSession.startTime) / 1000);
  }

  trackEvent(event: EventData) {
    this.track(event).catch(() => {});
  }

  trackPageView() {
    this.currentSession.pageViews++;
    this.trackEvent({
      name: 'page_view',
      category: 'engagement',
      properties: {
        path: window.location.pathname,
        title: document.title
      }
    });
  }

  trackClick(element: string, category: string = 'interaction') {
    this.trackEvent({
      name: 'click',
      category,
      properties: { element }
    });
  }

  trackFormSubmission(formId: string, success: boolean) {
    this.trackEvent({
      name: 'form_submission',
      category: 'conversion',
      properties: {
        formId,
        success
      }
    });
  }

  trackBookingStart() {
    this.trackEvent({
      name: 'booking_start',
      category: 'conversion'
    });
  }

  trackBookingComplete(value: number) {
    this.trackEvent({
      name: 'booking_complete',
      category: 'conversion',
      value
    });
  }
}

export const analytics = new Analytics();