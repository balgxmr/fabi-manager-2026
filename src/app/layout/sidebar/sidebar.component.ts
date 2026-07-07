import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonIcon } from '@ionic/angular/standalone';

interface NavItem {
  path: string;
  icon: string;
  label: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, IonIcon],
  template: `
    <aside class="sidebar" [class.collapsed]="collapsed()">
      <div class="sidebar-logo">
        <ion-icon name="airplane-outline" class="logo-icon" />
        @if (!collapsed()) {
          <span class="logo-text"><strong>FABI</strong> Manager</span>
        }
      </div>

      <nav class="sidebar-nav">
        @for (item of navItems; track item.path) {
          <a
            [routerLink]="[item.path]"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: item.path === '/' }"
            class="nav-item"
          >
            <ion-icon [name]="item.icon" class="nav-icon" />
            @if (!collapsed()) {
              <span class="nav-label">{{ item.label }}</span>
            }
          </a>
        }
      </nav>

      <button class="collapse-btn" (click)="toggleCollapse()">
        <ion-icon [name]="collapsed() ? 'chevron-forward-outline' : 'chevron-back-outline'" />
      </button>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 240px;
      min-width: 240px;
      height: 100vh;
      background: var(--card-bg);
      border-right: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      transition: width 0.25s ease, min-width 0.25s ease;
      position: sticky;
      top: 0;
      overflow: hidden;
    }
    .sidebar.collapsed {
      width: 64px;
      min-width: 64px;
    }
    .sidebar-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 20px 18px;
      border-bottom: 1px solid var(--border-color);
    }
    .logo-icon {
      font-size: 28px;
      color: var(--ion-color-primary);
      flex-shrink: 0;
    }
    .logo-text {
      font-size: 18px;
      color: var(--text-primary);
      white-space: nowrap;
    }
    .logo-text strong {
      font-weight: 700;
    }
    .sidebar-nav {
      flex: 1;
      padding: 12px 8px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      border-radius: 8px;
      color: var(--text-secondary);
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.15s ease;
      white-space: nowrap;
      position: relative;
    }
    .nav-item:hover {
      background: var(--sidebar-hover-bg);
      color: var(--text-primary);
    }
    .nav-item.active {
      background: var(--sidebar-active-bg);
      color: var(--ion-color-primary);
      font-weight: 600;
    }
    .nav-item.active::before {
      content: '';
      position: absolute;
      left: -8px;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 20px;
      background: var(--ion-color-primary);
      border-radius: 0 3px 3px 0;
    }
    .nav-icon {
      font-size: 22px;
      flex-shrink: 0;
    }
    .nav-label {
      line-height: 1;
    }
    .collapse-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 14px;
      border: none;
      background: transparent;
      cursor: pointer;
      color: var(--text-secondary);
      border-top: 1px solid var(--border-color);
      transition: color 0.15s;
    }
    .collapse-btn:hover {
      color: var(--text-primary);
    }
    .collapse-btn ion-icon {
      font-size: 18px;
    }
  `],
})
export class SidebarComponent {
  collapsed = signal(false);

  navItems: NavItem[] = [
    { path: '/', icon: 'grid-outline', label: 'Dashboard' },
    { path: '/flights', icon: 'airplane-outline', label: 'Flights' },
    { path: '/crew', icon: 'people-outline', label: 'Crew' },
    { path: '/reports', icon: 'bar-chart-outline', label: 'Reports' },
  ];

  toggleCollapse(): void {
    this.collapsed.update(v => !v);
  }
}
