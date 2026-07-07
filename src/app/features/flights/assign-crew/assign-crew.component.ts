import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonModal, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonButton, IonIcon, IonSearchbar,
  IonItem, IonLabel, IonList, IonAvatar, IonChip, IonText,
} from '@ionic/angular/standalone';
import { Flight } from '../../../core/models/flight.model';
import { CrewMember } from '../../../core/models/crew.model';
import { FlightService } from '../../../core/services/flight.service';
import { CrewService } from '../../../core/services/crew.service';
import { StatusChipComponent } from '../../../shared/components/status-chip/status-chip.component';

@Component({
  selector: 'app-assign-crew',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonModal, IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonButton, IonIcon, IonSearchbar,
    IonItem, IonLabel, IonList, IonAvatar, IonChip, IonText,
    StatusChipComponent,
  ],
  templateUrl: './assign-crew.component.html',
  styleUrls: ['./assign-crew.component.scss'],
})
export class AssignCrewComponent {
  @Input() isOpen = false;
  @Input() flight: Flight | null = null;
  @Output() didDismiss = new EventEmitter<void>();
  @Output() crewSaved = new EventEmitter<string>();

  selectedIds: string[] = [];
  searchQuery = '';
  allCrew: CrewMember[] = [];

  constructor(
    private flightService: FlightService,
    private crewService: CrewService,
  ) {
    this.allCrew = crewService.getAll();
  }

  ngOnChanges(): void {
    if (this.flight) {
      this.selectedIds = [...this.flight.crew];
    }
  }

  get filteredCrew(): CrewMember[] {
    const q = this.searchQuery.toLowerCase().trim();
    let result = this.allCrew;
    if (q) {
      result = result.filter(
        c => c.name.toLowerCase().includes(q) || c.role.toLowerCase().includes(q)
      );
    }
    return result;
  }

  get assignedCrew(): CrewMember[] {
    return this.crewService.getByIds(this.selectedIds);
  }

  get unassignedCrew(): CrewMember[] {
    return this.filteredCrew.filter(c => !this.selectedIds.includes(c.id));
  }

  isSelected(id: string): boolean {
    return this.selectedIds.includes(id);
  }

  toggleMember(id: string): void {
    if (this.isSelected(id)) {
      this.selectedIds = this.selectedIds.filter(i => i !== id);
    } else {
      this.selectedIds = [...this.selectedIds, id];
    }
  }

  save(): void {
    if (this.flight) {
      this.flightService.assignCrew(this.flight.id, this.selectedIds);
      this.crewSaved.emit(this.flight.id);
    }
    this.close();
  }

  close(): void {
    this.didDismiss.emit();
  }
}
