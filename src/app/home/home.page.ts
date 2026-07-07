import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardContent, IonChip, IonButton, IonIcon, IonText,
} from '@ionic/angular/standalone';
import { FlightService, Flight } from '../services/flight.service';
import { AssignCrewComponent } from '../assign-crew/assign-crew.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardContent, IonChip, IonButton, IonIcon, IonText,
    AssignCrewComponent,
  ],
})
export class HomePage {
  flights: Flight[];
  selectedFlight: Flight | null = null;
  showModal = false;

  constructor(private flightService: FlightService) {
    this.flights = flightService.getFlights();
  }

  getStatusColor(status: string): string {
    const map: Record<string, string> = {
      'On Time': 'success',
      Delayed: 'warning',
      Boarding: 'primary',
      Departed: 'medium',
    };
    return map[status] ?? 'medium';
  }

  openAssignCrew(flight: Flight): void {
    this.selectedFlight = flight;
    this.showModal = true;
  }

  onModalDismiss(): void {
    this.showModal = false;
    this.selectedFlight = null;
  }

  onCrewSaved(): void {
    this.flights = this.flightService.getFlights();
  }
}
