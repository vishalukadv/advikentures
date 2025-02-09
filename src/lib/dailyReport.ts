import { supabase } from './supabase';
import { sendNotificationEmail } from './email';

interface DailyStats {
  totalVisits: number;
  uniqueVisitors: number;
  averageTimeOnSite: number;
  topPages: Array<{ path: string; views: number }>;
  conversionRate: number;
  bookingCount: number;
  enquiryCount: number;
}

export async function generateDailyReport() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get all events for today
    const { data: events } = await supabase
      .from('analytics_events')
      .select('*')
      .gte('timestamp', today.toISOString());

    if (!events) return;

    // Calculate daily statistics
    const stats: DailyStats = {
      totalVisits: events.filter(e => e.event_name === 'page_view').length,
      uniqueVisitors: new Set(events.map(e => e.properties.sessionId)).size,
      averageTimeOnSite: calculateAverageTimeOnSite(events),
      topPages: getTopPages(events),
      conversionRate: calculateConversionRate(events),
      bookingCount: events.filter(e => e.event_name === 'booking_complete').length,
      enquiryCount: events.filter(e => e.event_name === 'form_submission' && e.properties.formId === 'enquiry').length
    };

    // Send email report
    await sendNotificationEmail({
      type: 'analytics',
      data: {
        name: 'Daily Analytics Report',
        email: 'info@advikentures.com',
        phone: '',
        packageName: '',
        bookingDate: new Date().toISOString(),
        travelers: 0,
        price: '',
        subject: `Analytics Report - ${new Date().toLocaleDateString()}`,
        message: generateReportHtml(stats)
      }
    });
  } catch (error) {
    console.error('Failed to generate daily report:', error);
  }
}

function calculateAverageTimeOnSite(events: any[]): number {
  const sessions = events.reduce((acc, event) => {
    if (!acc[event.properties.sessionId]) {
      acc[event.properties.sessionId] = event.properties.sessionDuration;
    }
    return acc;
  }, {});

  const durations = Object.values(sessions) as number[];
  return durations.reduce((a, b) => a + b, 0) / durations.length / 1000; // Convert to seconds
}

function getTopPages(events: any[]): Array<{ path: string; views: number }> {
  const pageViews = events
    .filter(e => e.event_name === 'page_view')
    .reduce((acc, event) => {
      const path = event.properties.path;
      acc[path] = (acc[path] || 0) + 1;
      return acc;
    }, {});

  return Object.entries(pageViews)
    .map(([path, views]) => ({ path, views: views as number }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);
}

function calculateConversionRate(events: any[]): number {
  const totalVisitors = new Set(events.map(e => e.properties.sessionId)).size;
  const conversions = events.filter(e => 
    e.event_name === 'booking_complete' || 
    (e.event_name === 'form_submission' && e.properties.success)
  ).length;

  return totalVisitors ? (conversions / totalVisitors) * 100 : 0;
}

function generateReportHtml(stats: DailyStats): string {
  return `
    <h2>Daily Analytics Report - ${new Date().toLocaleDateString()}</h2>
    
    <h3>Overview</h3>
    <ul>
      <li>Total Visits: ${stats.totalVisits}</li>
      <li>Unique Visitors: ${stats.uniqueVisitors}</li>
      <li>Average Time on Site: ${Math.round(stats.averageTimeOnSite)} seconds</li>
      <li>Conversion Rate: ${stats.conversionRate.toFixed(2)}%</li>
    </ul>

    <h3>Conversions</h3>
    <ul>
      <li>Bookings: ${stats.bookingCount}</li>
      <li>Enquiries: ${stats.enquiryCount}</li>
    </ul>

    <h3>Top Pages</h3>
    <ul>
      ${stats.topPages.map(page => `
        <li>${page.path}: ${page.views} views</li>
      `).join('')}
    </ul>
  `;
}