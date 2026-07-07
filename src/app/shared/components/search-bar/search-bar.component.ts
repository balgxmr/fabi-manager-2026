import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonInput, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, IonInput, IonIcon],
  template: `
    <div class="search-wrapper">
      <ion-icon name="search-outline" class="search-icon" />
      <ion-input
        [placeholder]="placeholder"
        [(ngModel)]="query"
        (ionInput)="onInput()"
        fill="outline"
        class="search-input"
        clearInput
      />
    </div>
  `,
  styles: [`
    .search-wrapper {
      position: relative;
      width: 100%;
      max-width: 360px;
    }
    .search-icon {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 18px;
      color: var(--text-secondary);
      z-index: 1;
      pointer-events: none;
    }
    .search-input {
      --padding-start: 42px;
      --background: var(--card-bg);
      --border-color: var(--border-color);
      --border-radius: 8px;
      --highlight-height: 0;
      --placeholder-color: #94a3b8;
      --placeholder-opacity: 1;
    }
  `],
})
export class SearchBarComponent {
  @Input() placeholder = 'Search...';
  @Output() search = new EventEmitter<string>();

  query = '';
  private debounceTimer?: ReturnType<typeof setTimeout>;

  onInput(): void {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.search.emit(this.query);
    }, 300);
  }
}
