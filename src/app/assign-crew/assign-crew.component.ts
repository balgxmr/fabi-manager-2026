import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonModal, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonButton, IonItem, IonLabel, IonInput,
  IonList, IonText, IonIcon,
} from '@ionic/angular/standalone';
import { Flight, FlightService } from '../services/flight.service';

@Component({
  selector: 'app-assign-crew',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonModal, IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonButton, IonItem, IonLabel, IonInput,
    IonList, IonText, IonIcon,
  ],
  templateUrl: './assign-crew.component.html',
  styleUrls: ['./assign-crew.component.scss'],
})
export class AssignCrewComponent {
  @Input() isOpen = false;
  @Input() flight: Flight | null = null;
  @Output() didDismiss = new EventEmitter<void>();
  @Output() crewSaved = new EventEmitter<string>();

  newMemberName = '';
  newMemberRole = '';

  constructor(private flightService: FlightService) {}

  addMember(): void {
    if (this.newMemberName.trim() && this.newMemberRole.trim() && this.flight) {
      this.flight.crew.push({
        name: this.newMemberName.trim(),
        role: this.newMemberRole.trim(),
      });
      this.newMemberName = '';
      this.newMemberRole = '';
    }
  }

  removeMember(index: number): void {
    if (this.flight) {
      this.flight.crew.splice(index, 1);
    }
  }

  save(): void {
    if (this.flight) {
      this.flightService.assignCrew(this.flight.id, this.flight.crew);
      this.crewSaved.emit(this.flight.id);
    }
    this.close();
  }

  close(): void {
    this.didDismiss.emit();
  }
}
