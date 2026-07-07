import { Flight, FlightStatus } from '../models/flight.model';

const destinations = [
  'Madrid', 'London', 'New York', 'Paris', 'Tokyo', 'Dubai',
  'Rome', 'Berlin', 'Amsterdam', 'Singapore', 'Barcelona',
  'Lisbon', 'Miami', 'Chicago', 'Toronto', 'Sydney',
];

const statuses: FlightStatus[] = ['On Time', 'On Time', 'On Time', 'Delayed', 'Boarding', 'Departed', 'On Time', 'On Time', 'Cancelled'];

const aircraft = [
  'Boeing 737-800', 'Airbus A320neo', 'Boeing 787-9',
  'Airbus A350-900', 'Boeing 777-300ER', 'Airbus A330-300',
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomTime(): string {
  const h = String(Math.floor(Math.random() * 18) + 6).padStart(2, '0');
  const m = String(Math.floor(Math.random() * 4) * 15).padStart(2, '0');
  return `${h}:${m}`;
}

function randomGate(): string {
  const letter = Math.random() > 0.5 ? 'A' : 'B';
  const num = Math.floor(Math.random() * 20) + 1;
  return `${letter}${num}`;
}

export const MOCK_FLIGHTS: Flight[] = Array.from({ length: 40 }, (_, i) => ({
  id: `FAB-${(101 + i).toString().padStart(3, '0')}`,
  destination: destinations[i % destinations.length],
  time: randomTime(),
  gate: randomGate(),
  terminal: `T${Math.floor(Math.random() * 3) + 1}`,
  aircraft: randomItem(aircraft),
  status: randomItem(statuses),
  crew: [],
}));
