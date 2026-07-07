import { Injectable } from '@angular/core';

export interface CrewMember {
  name: string;
  role: string;
}

export interface Flight {
  id: string;
  destination: string;
  time: string;
  status: 'On Time' | 'Delayed' | 'Boarding' | 'Departed';
  crew: CrewMember[];
}

@Injectable({ providedIn: 'root' })
export class FlightService {
  private flights: Flight[] = [
    { id: 'FAB-101', destination: 'Madrid', time: '14:30', status: 'On Time', crew: [] },
    { id: 'FAB-202', destination: 'Londres', time: '16:45', status: 'Boarding', crew: [] },
    { id: 'FAB-303', destination: 'Nueva York', time: '18:15', status: 'Delayed', crew: [] },
  ];

  getFlights(): Flight[] {
    return this.flights;
  }

  assignCrew(flightId: string, crew: CrewMember[]): void {
    const flight = this.flights.find(f => f.id === flightId);
    if (flight) {
      flight.crew = [...crew];
    }
  }
}
