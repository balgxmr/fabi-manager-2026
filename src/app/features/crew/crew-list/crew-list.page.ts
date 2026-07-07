import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonChip } from '@ionic/angular/standalone';
import { CrewService } from '../../../core/services/crew.service';
import { CrewMember, CrewRole, CrewStatus } from '../../../core/models/crew.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

const ROLE_COLORS: Record<string, string> = {
  'Captain': '#0054e9',
  'First Officer': '#22c55e',
  'Cabin Lead': '#f59e0b',
  'Flight Attendant': '#ec4899',
};

const STATUS_COLORS: Record<string, string> = {
  'Available': '#22c55e',
  'On Flight': '#0054e9',
  'Standby': '#f59e0b',
  'Off Duty': '#94a3b8',
};

@Component({
  selector: 'app-crew-list',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonChip,
    PageHeaderComponent, SearchBarComponent, EmptyStateComponent,
  ],
  templateUrl: './crew-list.page.html',
  styleUrls: ['./crew-list.page.scss'],
})
export class CrewListPage {
  allCrew: CrewMember[];
  searchQuery = '';
  roleFilter: CrewRole | 'All' = 'All';
  statusFilter: CrewStatus | 'All' = 'All';

  constructor(private crewService: CrewService) {
    this.allCrew = crewService.getAll();
  }

  get roles(): (CrewRole | 'All')[] {
    return ['All', 'Captain', 'First Officer', 'Cabin Lead', 'Flight Attendant'];
  }

  get statuses(): (CrewStatus | 'All')[] {
    return ['All', 'Available', 'On Flight', 'Standby', 'Off Duty'];
  }

  get filteredCrew(): CrewMember[] {
    let result = this.allCrew;

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(
        c => c.name.toLowerCase().includes(q) || c.role.toLowerCase().includes(q)
      );
    }

    if (this.roleFilter !== 'All') {
      result = result.filter(c => c.role === this.roleFilter);
    }

    if (this.statusFilter !== 'All') {
      result = result.filter(c => c.status === this.statusFilter);
    }

    return result;
  }

  getRoleColor(role: string): string {
    return ROLE_COLORS[role] ?? '#64748b';
  }

  getStatusColor(status: string): string {
    return STATUS_COLORS[status] ?? '#94a3b8';
  }

  onSearch(query: string): void {
    this.searchQuery = query;
  }
}
