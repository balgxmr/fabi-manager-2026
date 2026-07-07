import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { FlightService } from '../../../core/services/flight.service';
import { CrewService } from '../../../core/services/crew.service';
import { Flight } from '../../../core/models/flight.model';
import { CrewMember } from '../../../core/models/crew.model';
import { StatusChipComponent } from '../../../shared/components/status-chip/status-chip.component';
import { AssignCrewComponent } from '../assign-crew/assign-crew.component';

interface TimelineEvent {
  label: string;
  time: string;
  icon: string;
  status: 'done' | 'current' | 'upcoming';
}

@Component({
  selector: 'app-flight-detail',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    IonContent, IonButton, IonIcon,
    StatusChipComponent, AssignCrewComponent,
  ],
  templateUrl: './flight-detail.page.html',
  styleUrls: ['./flight-detail.page.scss'],
})
export class FlightDetailPage implements OnInit {
  flight: Flight | undefined;
  assignedCrew: CrewMember[] = [];
  showAssignModal = false;

  timeline: TimelineEvent[] = [];

  constructor(
    private route: ActivatedRoute,
    private flightService: FlightService,
    private crewService: CrewService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.flight = this.flightService.getById(id);
      if (this.flight) {
        this.assignedCrew = this.crewService.getByIds(this.flight.crew);
        this.buildTimeline();
      }
    }
  }

  private buildTimeline(): void {
    if (!this.flight) return;
    const base = this.flight.time;
    const [h, m] = base.split(':').map(Number);

    this.timeline = [
      { label: 'Scheduled', time: base, icon: 'calendar-outline', status: 'done' },
      { label: 'Check-in Opens', time: `${String(h - 2).padStart(2, '0')}:${String(m).padStart(2, '0')}`, icon: 'clipboard-outline', status: 'done' },
      { label: 'Boarding', time: `${String(h - 1).padStart(2, '0')}:${String(m).padStart(2, '0')}`, icon: 'walk-outline', status: this.flight.status === 'Boarding' || this.flight.status === 'Departed' ? 'done' : this.flight.status === 'Delayed' ? 'current' : 'upcoming' },
      { label: 'Departed', time: base, icon: 'airplane-outline', status: this.flight.status === 'Departed' ? 'done' : this.flight.status === 'Boarding' ? 'current' : 'upcoming' },
    ];
  }

  openAssign(): void {
    this.showAssignModal = true;
  }

  closeAssign(): void {
    this.showAssignModal = false;
  }

  onCrewSaved(): void {
    if (this.flight) {
      const updated = this.flightService.getById(this.flight.id);
      if (updated) {
        this.flight = updated;
        this.assignedCrew = this.crewService.getByIds(updated.crew);
      }
    }
  }
}
