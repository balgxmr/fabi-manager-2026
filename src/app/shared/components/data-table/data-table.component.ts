import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ColumnConfig {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            @for (col of columns; track col.key) {
              <th
                [style.width]="col.width"
                [class.sortable]="col.sortable"
                (click)="col.sortable && onSort(col.key)"
              >
                {{ col.label }}
                @if (col.sortable && sortKey === col.key) {
                  <span class="sort-arrow">{{ sortDir === 'asc' ? ' ▲' : ' ▼' }}</span>
                }
              </th>
            }
          </tr>
        </thead>
        <tbody>
          @for (row of rows; track row; let i = $index) {
            <tr (click)="rowClick.emit(row)" class="data-row">
              @for (col of columns; track col.key) {
                <td>{{ row[col.key] }}</td>
              }
            </tr>
          }
          @if (rows.length === 0) {
            <tr>
              <td [attr.colspan]="columns.length" class="empty-cell">
                <ng-content select="[empty]" />
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .table-wrapper {
      overflow-x: auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
    }
    thead {
      position: sticky;
      top: 0;
      z-index: 1;
    }
    th {
      text-align: left;
      padding: 12px 16px;
      font-weight: 600;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--text-secondary);
      background: #f8fafc;
      border-bottom: 1px solid var(--border-color);
      white-space: nowrap;
      user-select: none;
    }
    th.sortable {
      cursor: pointer;
    }
    th.sortable:hover {
      color: var(--ion-color-primary);
    }
    .sort-arrow {
      font-size: 10px;
    }
    td {
      padding: 12px 16px;
      border-bottom: 1px solid var(--border-color);
      color: var(--text-primary);
    }
    tr:last-child td {
      border-bottom: none;
    }
    .data-row {
      cursor: pointer;
      transition: background 0.15s ease;
    }
    .data-row:hover td {
      background: #f8fafc;
    }
    .data-row:active td {
      background: #f1f5f9;
    }
    .empty-cell {
      text-align: center;
      padding: 48px 16px;
      color: var(--text-secondary);
    }
  `],
})
export class DataTableComponent {
  @Input() columns: ColumnConfig[] = [];
  @Input() rows: Record<string, unknown>[] = [];
  @Input() sortKey = '';
  @Input() sortDir: 'asc' | 'desc' = 'asc';
  @Output() sortChange = new EventEmitter<{ key: string; dir: 'asc' | 'desc' }>();
  @Output() rowClick = new EventEmitter<Record<string, unknown>>();

  onSort(key: string): void {
    const dir = this.sortKey === key && this.sortDir === 'asc' ? 'desc' : 'asc';
    this.sortChange.emit({ key, dir });
  }
}
