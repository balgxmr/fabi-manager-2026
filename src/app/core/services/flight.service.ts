import { Injectable } from '@angular/core';
import { Flight, FlightStatus } from '../models/flight.model';
import { MOCK_FLIGHTS } from '../mock/flights.mock';

@Injectable({ providedIn: 'root' })
export class FlightService {
  private flights = [...MOCK_FLIGHTS];

  getAll(): Flight[] {
    return [...this.flights];
  }

  getById(id: string): Flight | undefined {
    return this.flights.find(f => f.id === id);
  }

  search(term: string): Flight[] {
    const q = term.toLowerCase();
    return this.flights.filter(
      f => f.id.toLowerCase().includes(q) || f.destination.toLowerCase().includes(q)
    );
  }

  filterByStatus(status: FlightStatus | 'All'): Flight[] {
    if (status === 'All') return this.flights;
    return this.flights.filter(f => f.status === status);
  }

  assignCrew(flightId: string, crewIds: string[]): void {
    const flight = this.flights.find(f => f.id === flightId);
    if (flight) {
      flight.crew = [...crewIds];
    }
  }
}
