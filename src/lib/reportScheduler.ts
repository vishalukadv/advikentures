import { generateDailyReport } from './dailyReport';

class ReportScheduler {
  private timer: NodeJS.Timeout | null = null;
  private readonly reportTime = '00:00'; // Midnight

  start() {
    // Calculate initial delay until next report time
    const now = new Date();
    const [hours, minutes] = this.reportTime.split(':').map(Number);
    const nextReport = new Date(now);
    nextReport.setHours(hours, minutes, 0, 0);
    
    if (nextReport <= now) {
      nextReport.setDate(nextReport.getDate() + 1);
    }

    const delay = nextReport.getTime() - now.getTime();

    // Schedule first report
    this.timer = setTimeout(() => {
      this.runReport();
      // Schedule subsequent reports every 24 hours
      this.timer = setInterval(this.runReport, 24 * 60 * 60 * 1000);
    }, delay);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private async runReport() {
    try {
      await generateDailyReport();
      console.log('Daily report generated successfully');
    } catch (error) {
      console.error('Failed to generate daily report:', error);
    }
  }
}

export const reportScheduler = new ReportScheduler();