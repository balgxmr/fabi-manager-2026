import { Component, Input } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [IonIcon],
  template: `
    <div class="kpi-card">
      <div class="kpi-icon" [style.background]="iconBg">
        <ion-icon [name]="icon" />
      </div>
      <div class="kpi-body">
        <span class="kpi-value">{{ value }}</span>
        <span class="kpi-label">{{ label }}</span>
      </div>
      @if (trend) {
        <div class="kpi-trend" [class.down]="trend < 0">
          <ion-icon [name]="trend >= 0 ? 'arrow-up-outline' : 'arrow-down-outline'" />
          {{ trend >= 0 ? '+' : '' }}{{ trend }}%
        </div>
      }
    </div>
  `,
  styles: [`
    .kpi-card {
      background: var(--card-bg);
      border-radius: 12px;
      border: 1px solid var(--border-color);
      padding: 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      cursor: default;
      position: relative;
    }
    .kpi-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
    }
    .kpi-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .kpi-icon ion-icon {
      font-size: 24px;
      color: #fff;
    }
    .kpi-body {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .kpi-value {
      font-size: 28px;
      font-weight: 700;
      color: var(--text-primary);
      line-height: 1.1;
    }
    .kpi-label {
      font-size: 13px;
      color: var(--text-secondary);
      font-weight: 500;
    }
    .kpi-trend {
      position: absolute;
      right: 16px;
      bottom: 12px;
      font-size: 12px;
      font-weight: 600;
      color: var(--kpi-trend-up);
      display: flex;
      align-items: center;
      gap: 2px;
    }
    .kpi-trend.down {
      color: var(--kpi-trend-down);
    }
    .kpi-trend ion-icon {
      font-size: 14px;
    }
  `],
})
export class KpiCardComponent {
  @Input() icon = '';
  @Input() label = '';
  @Input() value: string | number = '';
  @Input() trend: number | null = null;
  @Input() iconBg = '#0054e9';
}
