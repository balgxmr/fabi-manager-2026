import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonIcon, IonBadge } from '@ionic/angular/standalone';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, IonIcon, IonBadge],
  template: `
    <div class="layout">
      <app-sidebar />
      <div class="layout-content">
        <header class="top-header">
          <div class="header-left">
            <span class="breadcrumb-placeholder"></span>
          </div>
          <div class="header-right">
            <span class="current-date">{{ today }}</span>
            <button class="icon-btn">
              <ion-icon name="notifications-outline" />
              <ion-badge color="danger" class="notif-badge">3</ion-badge>
            </button>
            <div class="user-avatar">EV</div>
            <span class="user-name">Elena Voss</span>
          </div>
        </header>
        <main class="main-content">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
  styles: [`
    .layout {
      display: flex;
      min-height: 100vh;
    }
    .layout-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .top-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 32px;
      background: var(--card-bg);
      border-bottom: 1px solid var(--border-color);
      height: 60px;
      flex-shrink: 0;
    }
    .header-right {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .current-date {
      font-size: 13px;
      color: var(--text-secondary);
      font-weight: 500;
    }
    .icon-btn {
      position: relative;
      background: none;
      border: none;
      cursor: pointer;
      padding: 6px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-secondary);
      transition: background 0.15s;
    }
    .icon-btn:hover {
      background: var(--sidebar-hover-bg);
    }
    .icon-btn ion-icon {
      font-size: 22px;
    }
    .notif-badge {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 10px;
      --padding-start: 4px;
      --padding-end: 4px;
      min-width: 16px;
      height: 16px;
    }
    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--ion-color-primary);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 600;
    }
    .user-name {
      font-size: 14px;
      font-weight: 500;
      color: var(--text-primary);
    }
    .main-content {
      flex: 1;
      padding: 24px 32px;
      overflow-y: auto;
    }
  `],
})
export class DashboardLayoutComponent {
  today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
