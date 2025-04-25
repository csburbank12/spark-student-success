
type NotificationSeverity = 'info' | 'warning' | 'error' | 'critical';
type NotificationMethod = 'email' | 'popup' | 'slack' | 'all';

export class NotificationService {
  private static readonly severityLevels: NotificationSeverity[] = ['info', 'warning', 'error', 'critical'];

  static shouldNotify(severity: string, minSeverityToNotify: NotificationSeverity): boolean {
    const configIndex = this.severityLevels.indexOf(minSeverityToNotify);
    const currentIndex = this.severityLevels.indexOf(severity as NotificationSeverity);
    
    return currentIndex >= configIndex;
  }

  static sendNotification({ 
    title, 
    message, 
    severity, 
    method 
  }: { 
    title: string; 
    message: string; 
    severity: string; 
    method: NotificationMethod;
  }): void {    
    switch (method) {
      case 'popup':
        this.showPopupNotification(title, message, severity);
        break;
      case 'email':
        this.sendEmailNotification(title, message, severity);
        break;
      case 'slack':
        this.sendSlackNotification(title, message, severity);
        break;
      case 'all':
        this.showPopupNotification(title, message, severity);
        this.sendEmailNotification(title, message, severity);
        this.sendSlackNotification(title, message, severity);
        break;
    }
  }

  private static showPopupNotification(title: string, message: string, severity: string): void {
    console.log(`[${severity.toUpperCase()}] ${title}: ${message}`);
    // In a real app, this would show a toast notification
  }
  
  private static sendEmailNotification(title: string, message: string, severity: string): void {
    console.log(`Would send email: [${severity.toUpperCase()}] ${title}: ${message}`);
    // In a real app, this would send an email
  }
  
  private static sendSlackNotification(title: string, message: string, severity: string): void {
    console.log(`Would send to Slack: [${severity.toUpperCase()}] ${title}: ${message}`);
    // In a real app, this would send a Slack message
  }
}
