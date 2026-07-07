import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonIcon, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [IonIcon, IonButton],
  template: `
    <div class="empty-state">
      <ion-icon [name]="icon" class="empty-icon" />
      <p class="empty-message">{{ message }}</p>
      @if (actionLabel) {
        <ion-button fill="outline" (click)="action.emit()">
          {{ actionLabel }}
        </ion-button>
      }
    </div>
  `,
  styles: [`
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 48px 24px;
      text-align: center;
      gap: 12px;
    }
    .empty-icon {
      font-size: 48px;
      color: #cbd5e1;
    }
    .empty-message {
      font-size: 15px;
      color: var(--text-secondary);
      margin: 0;
      max-width: 280px;
    }
  `],
})
export class EmptyStateComponent {
  @Input() icon = 'folder-open-outline';
  @Input() message = 'No data found';
  @Input() actionLabel = '';
  @Output() action = new EventEmitter<void>();
}
