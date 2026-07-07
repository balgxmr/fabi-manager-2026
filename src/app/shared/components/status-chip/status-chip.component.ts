import { Component, Input } from '@angular/core';
import { IonChip, IonIcon } from '@ionic/angular/standalone';

const COLOR_MAP: Record<string, string> = {
  'On Time': 'success',
  'Delayed': 'warning',
  'Boarding': 'primary',
  'Departed': 'medium',
  'Cancelled': 'danger',
};

@Component({
  selector: 'app-status-chip',
  standalone: true,
  imports: [IonChip],
  template: `
    <ion-chip [color]="color" class="status-chip">
      {{ status }}
    </ion-chip>
  `,
  styles: [`
    .status-chip {
      margin: 0;
      font-weight: 500;
      font-size: 12px;
      min-height: 24px;
      --padding-start: 8px;
      --padding-end: 8px;
    }
  `],
})
export class StatusChipComponent {
  @Input() status = '';

  get color(): string {
    return COLOR_MAP[this.status] ?? 'medium';
  }
}
