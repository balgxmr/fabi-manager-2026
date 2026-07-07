import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonModal, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonButton, IonIcon, IonChip, IonSearchbar,
  IonText,
} from '@ionic/angular/standalone';
import { FlightService } from '../../core/services/flight.service';
import { CrewService } from '../../core/services/crew.service';
import { Flight, FlightStatus } from '../../core/models/flight.model';
import { KpiCardComponent } from '../../shared/components/kpi-card/kpi-card.component';
import { StatusChipComponent } from '../../shared/components/status-chip/status-chip.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { AssignCrewComponent } from '../flights/assign-crew/assign-crew.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonModal, IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonButton, IonIcon, IonChip, IonSearchbar,
    IonText,
    KpiCardComponent, StatusChipComponent, PageHeaderComponent,
    AssignCrewComponent,
  ],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
  flights: Flight[] = [];
  recentFlights: Flight[] = [];
  showAllModal = false;
  modalSearch = '';
  modalFilter: FlightStatus | 'All' = 'All';
  selectedFlight: Flight | null = null;
  showAssignModal = false;

  private crewService: CrewService;

  constructor(
    private flightService: FlightService,
    private router: Router,
    crewService: CrewService,
  ) {
    this.crewService = crewService;
    this.flights = flightService.getAll();
    this.recentFlights = this.flights.slice(0, 10);
  }

  get totalFlights(): number {
    return this.flights.length;
  }

  get onTimeFlights(): number {
    return this.flights.filter(f => f.status === 'On Time').length;
  }

  get delayedFlights(): number {
    return this.flights.filter(f => f.status === 'Delayed').length;
  }

  get totalCrewAssigned(): number {
    return this.flights.reduce((sum, f) => sum + f.crew.length, 0);
  }

  get filterOptions(): (FlightStatus | 'All')[] {
    return ['All', 'On Time', 'Delayed', 'Boarding', 'Departed', 'Cancelled'];
  }

  get filteredModalFlights(): Flight[] {
    let result = this.flights;
    if (this.modalSearch.trim()) {
      const q = this.modalSearch.toLowerCase();
      result = result.filter(
        f => f.id.toLowerCase().includes(q) || f.destination.toLowerCase().includes(q)
      );
    }
    if (this.modalFilter !== 'All') {
      result = result.filter(f => f.status === this.modalFilter);
    }
    return result;
  }

  getCrewCount(id: string): number {
    const flight = this.flights.find(f => f.id === id);
    return flight ? flight.crew.length : 0;
  }

  getCrewNames(ids: string[]): string {
    return this.crewService.getByIds(ids).map(c => c.name).join(', ');
  }

  openAllFlights(): void {
    this.modalSearch = '';
    this.modalFilter = 'All';
    this.showAllModal = true;
  }

  closeAllFlights(): void {
    this.showAllModal = false;
  }

  goToFlight(id: string): void {
    this.router.navigate(['/flights', id]);
  }

  openAssign(flight: Flight): void {
    this.selectedFlight = flight;
    this.showAssignModal = true;
  }

  closeAssign(): void {
    this.showAssignModal = false;
    this.selectedFlight = null;
  }

  onCrewSaved(): void {
    this.flights = this.flightService.getAll();
    this.recentFlights = this.flights.slice(0, 10);
  }

  getStatusColor(status: string): string {
    const map: Record<string, string> = {
      'On Time': 'success',
      Delayed: 'warning',
      Boarding: 'primary',
      Departed: 'medium',
      Cancelled: 'danger',
    };
    return map[status] ?? 'medium';
  }
}
