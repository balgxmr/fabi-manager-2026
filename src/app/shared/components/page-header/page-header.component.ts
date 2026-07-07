import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface Breadcrumb {
  label: string;
  path?: string;
}

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page-header">
      @if (breadcrumbs.length) {
        <nav class="breadcrumb">
          @for (crumb of breadcrumbs; track crumb; let last = $last) {
            @if (crumb.path && !last) {
              <a [routerLink]="crumb.path">{{ crumb.label }}</a>
              <span class="separator">/</span>
            } @else {
              <span class="current">{{ crumb.label }}</span>
            }
          }
        </nav>
      }
      <div class="title-row">
        <h1>{{ title }}</h1>
        <div class="actions">
          <ng-content select="[actions]" />
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-header {
      margin-bottom: 24px;
    }
    .breadcrumb {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      color: var(--text-secondary);
      margin-bottom: 8px;
    }
    .breadcrumb a {
      color: var(--ion-color-primary);
      text-decoration: none;
    }
    .breadcrumb a:hover {
      text-decoration: underline;
    }
    .separator {
      color: #cbd5e1;
    }
    .current {
      color: var(--text-secondary);
    }
    .title-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    h1 {
      font-size: 24px;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0;
      line-height: 1.2;
    }
    .actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `],
})
export class PageHeaderComponent {
  @Input() title = '';
  @Input() breadcrumbs: Breadcrumb[] = [];
}
