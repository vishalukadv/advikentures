import { analytics } from './analytics';
import { supabase } from './supabase';

interface SEOMetrics {
  pageViews: number;
  timeOnPage: number;
  bounceRate: number;
  conversionRate: number;
}

interface ContentUpdate {
  path: string;
  title?: string;
  description?: string;
  keywords?: string[];
  headings?: string[];
}

class SEOOptimizer {
  private readonly updateInterval = 24 * 60 * 60 * 1000; // 24 hours
  private timer: NodeJS.Timeout | null = null;

  start() {
    try {
      // Initial optimization
      this.optimizeContent();

      // Schedule regular updates
      this.timer = setInterval(() => {
        this.optimizeContent();
      }, this.updateInterval);

      console.log('SEO Optimizer started successfully');
    } catch (error) {
      console.error('Failed to start SEO Optimizer:', error);
    }
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private async optimizeContent() {
    try {
      // Get performance metrics for all pages
      const metrics = await this.getPageMetrics();
      
      // Generate content updates based on metrics
      const updates = this.generateContentUpdates(metrics);
      
      // Apply updates
      await this.applyUpdates(updates);

      // Track successful optimization
      analytics.trackEvent({
        name: 'seo_optimization_complete',
        properties: {
          timestamp: new Date().toISOString(),
          pagesOptimized: updates.length
        }
      });
    } catch (error) {
      console.error('SEO optimization failed:', error);
      
      // Track optimization failure
      analytics.trackEvent({
        name: 'seo_optimization_failed',
        properties: {
          timestamp: new Date().toISOString(),
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      });
    }
  }

  private async getPageMetrics(): Promise<Record<string, SEOMetrics>> {
    try {
      const { data: events } = await supabase
        .from('analytics_events')
        .select('*')
        .gte('timestamp', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

      if (!events) return {};

      const metrics = events.reduce((acc, event) => {
        const path = event.properties.path;
        if (!acc[path]) {
          acc[path] = {
            pageViews: 0,
            timeOnPage: 0,
            bounceRate: 0,
            conversionRate: 0
          };
        }

        // Update metrics based on event type
        if (event.event_name === 'page_view') {
          acc[path].pageViews++;
          acc[path].timeOnPage += event.properties.timeSpentOnPage || 0;
        } else if (event.event_name === 'form_submission' && event.properties.success) {
          const totalViews = acc[path].pageViews || 1;
          acc[path].conversionRate = ((acc[path].conversionRate * totalViews) + 1) / totalViews;
        }

        return acc;
      }, {} as Record<string, SEOMetrics>);

      // Calculate averages and bounce rates
      Object.keys(metrics).forEach(path => {
        const m = metrics[path];
        m.timeOnPage = m.timeOnPage / m.pageViews;
        m.bounceRate = events.filter(e => 
          e.properties.path === path && 
          e.properties.timeSpentOnPage < 10
        ).length / m.pageViews;
      });

      return metrics;
    } catch (error) {
      console.error('Failed to fetch page metrics:', error);
      throw error;
    }
  }

  private generateContentUpdates(metrics: Record<string, SEOMetrics>): ContentUpdate[] {
    const updates: ContentUpdate[] = [];

    Object.entries(metrics).forEach(([path, pageMetrics]) => {
      if (this.isHighPerforming(pageMetrics)) return;

      const update: ContentUpdate = {
        path,
        ...this.generateOptimizations(path, pageMetrics)
      };

      updates.push(update);
    });

    return updates;
  }

  private isHighPerforming(metrics: SEOMetrics): boolean {
    return (
      metrics.timeOnPage > 120 && // More than 2 minutes average time on page
      metrics.bounceRate < 0.3 && // Less than 30% bounce rate
      metrics.conversionRate > 0.02 // More than 2% conversion rate
    );
  }

  private generateOptimizations(path: string, metrics: SEOMetrics) {
    analytics.trackEvent({
      name: 'seo_optimization_attempt',
      properties: { path, metrics }
    });

    const updates: Partial<ContentUpdate> = {};

    if (metrics.bounceRate > 0.6) {
      updates.description = 'Consider improving page content and user engagement.';
    }

    if (metrics.timeOnPage < 30) {
      updates.description = 'Consider adding more engaging content or interactive elements.';
    }

    if (metrics.conversionRate < 0.01) {
      updates.description = 'Review call-to-action placement and effectiveness.';
    }

    return updates;
  }

  private async applyUpdates(updates: ContentUpdate[]) {
    for (const update of updates) {
      try {
        analytics.trackEvent({
          name: 'seo_update_applied',
          properties: {
            path: update.path,
            changes: Object.keys(update).filter(key => key !== 'path')
          }
        });

        await supabase
          .from('seo_optimizations')
          .insert([{
            path: update.path,
            changes: update,
            applied_at: new Date().toISOString()
          }]);

      } catch (error) {
        console.error(`Failed to apply SEO update for ${update.path}:`, error);
        
        analytics.trackEvent({
          name: 'seo_update_failed',
          properties: {
            path: update.path,
            error: error instanceof Error ? error.message : 'Unknown error'
          }
        });
      }
    }
  }
}

export const seoOptimizer = new SEOOptimizer();