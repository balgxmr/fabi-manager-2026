import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  template: `
    <div class="skeleton-group">
      @for (_ of [].constructor(count); track $index) {
        @if (type === 'card') {
          <div class="skeleton-card">
            <div class="skeleton skeleton-icon"></div>
            <div class="skeleton skeleton-text-lg"></div>
            <div class="skeleton skeleton-text-sm"></div>
          </div>
        } @else if (type === 'table-row') {
          <div class="skeleton-row">
            @for (_ of [].constructor(6); track $index) {
              <div class="skeleton skeleton-cell"></div>
            }
          </div>
        }
      }
    </div>
  `,
  styles: [`
    .skeleton-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .skeleton-card {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 20px;
      border-radius: 12px;
      border: 1px solid var(--border-color);
      background: var(--card-bg);
    }
    .skeleton-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
    }
    .skeleton-text-lg {
      height: 28px;
      width: 60%;
    }
    .skeleton-text-sm {
      height: 14px;
      width: 40%;
    }
    .skeleton-row {
      display: flex;
      gap: 16px;
      padding: 12px 16px;
    }
    .skeleton-cell {
      flex: 1;
      height: 16px;
    }
  `],
})
export class SkeletonLoaderComponent {
  @Input() type: 'card' | 'table-row' = 'card';
  @Input() count = 3;
}
