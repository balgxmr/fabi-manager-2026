import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';
import { FlightService } from '../../core/services/flight.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

interface DayData {
  day: string;
  onTime: number;
  delayed: number;
  cancelled: number;
}

interface DestinationData {
  name: string;
  count: number;
  pct: number;
}

interface Alert {
  icon: string;
  color: string;
  message: string;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, IonIcon, PageHeaderComponent],
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage {
  flights = this.flightService.getAll();

  weeklyData: DayData[] = [
    { day: 'Mon', onTime: 8, delayed: 2, cancelled: 0 },
    { day: 'Tue', onTime: 7, delayed: 1, cancelled: 1 },
    { day: 'Wed', onTime: 9, delayed: 0, cancelled: 0 },
    { day: 'Thu', onTime: 6, delayed: 3, cancelled: 0 },
    { day: 'Fri', onTime: 5, delayed: 2, cancelled: 1 },
    { day: 'Sat', onTime: 8, delayed: 1, cancelled: 0 },
    { day: 'Sun', onTime: 7, delayed: 2, cancelled: 0 },
  ];

  topDestinations: DestinationData[] = [];
  alerts: Alert[] = [
    { icon: 'alert-circle', color: '#f59e0b', message: 'FAB-303 delayed 45min — weather conditions over Atlantic route' },
    { icon: 'information-circle', color: '#0054e9', message: 'Crew shortage detected for 18:00–20:00 slot. 3 flights affected.' },
    { icon: 'checkmark-circle', color: '#22c55e', message: 'FAB-202 boarding completed on time — all passengers aboard' },
    { icon: 'alert-circle', color: '#ef4444', message: 'FAB-118 cancelled — aircraft maintenance issue' },
  ];

  constructor(private flightService: FlightService) {
    this.computeDestinations();
  }

  private computeDestinations(): void {
    const counts = new Map<string, number>();
    this.flights.forEach(f => {
      counts.set(f.destination, (counts.get(f.destination) ?? 0) + 1);
    });
    const sorted = [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const max = sorted[0]?.[1] ?? 1;
    this.topDestinations = sorted.map(([name, count]) => ({
      name,
      count,
      pct: (count / max) * 100,
    }));
  }

  get onTimePct(): number {
    return Math.round((this.flights.filter(f => f.status === 'On Time').length / this.flights.length) * 100);
  }

  get totalDelayed(): number {
    return this.flights.filter(f => f.status === 'Delayed').length;
  }

  get avgDelay(): string {
    return '24min';
  }

  get activeCrew(): number {
    return this.flights.reduce((s, f) => s + f.crew.length, 0);
  }

  get maxDaily(): number {
    return Math.max(...this.weeklyData.map(d => d.onTime + d.delayed + d.cancelled));
  }

  hourlyData = [
    { h: '06', v: 2 }, { h: '07', v: 3 }, { h: '08', v: 5 }, { h: '09', v: 4 },
    { h: '10', v: 3 }, { h: '11', v: 2 }, { h: '12', v: 3 }, { h: '13', v: 2 },
    { h: '14', v: 4 }, { h: '15', v: 3 }, { h: '16', v: 3 }, { h: '17', v: 4 },
    { h: '18', v: 5 }, { h: '19', v: 3 }, { h: '20', v: 2 }, { h: '21', v: 1 },
  ];

  get maxHourly(): number {
    return Math.max(...this.hourlyData.map(d => d.v));
  }

  get hourlyPoints(): string {
    return this.hourlyData
      .map((d, i) => {
        const x = (i / (this.hourlyData.length - 1)) * 460 + 10;
        const y = 105 - (d.v / this.maxHourly) * 85;
        return `${x},${y}`;
      })
      .join(' ');
  }
}
