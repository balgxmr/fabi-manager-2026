import { CrewMember, CrewRole, CrewStatus } from '../models/crew.model';

const names = [
  'Elena Voss', 'Marcus Chen', 'Sofia Reyes', 'James Okonkwo',
  'Amara Singh', 'Liam O\'Brien', 'Yuki Tanaka', 'Carlos Mendes',
  'Fatima Al-Rashid', 'Dmitri Volkov', 'Priya Kapoor', 'Thomas Wagner',
  'Aisha Mohamed', 'Henrik Larsson', 'Mei Lin', 'Giovanni Rossi',
  'Olga Petrova', 'Ahmed Hassan', 'Claire Dubois', 'Diego Fernandez',
  'Nadia Kuznetsova', 'Raj Patel', 'Ingrid Johansson', 'Kai Yamamoto',
];

const roles: CrewRole[] = [
  'Captain', 'Captain', 'Captain', 'Captain', 'Captain', 'Captain', 'Captain', 'Captain',
  'First Officer', 'First Officer', 'First Officer', 'First Officer', 'First Officer', 'First Officer',
  'Cabin Lead', 'Cabin Lead', 'Cabin Lead', 'Cabin Lead',
  'Flight Attendant', 'Flight Attendant', 'Flight Attendant', 'Flight Attendant', 'Flight Attendant', 'Flight Attendant',
];

const statuses: CrewStatus[] = [
  'Available', 'Available', 'Available', 'Available', 'Available', 'Available',
  'Available', 'Available', 'Available', 'Available', 'Available', 'Available',
  'On Flight', 'On Flight', 'On Flight', 'On Flight', 'On Flight', 'On Flight',
  'Standby', 'Standby', 'Standby', 'Standby',
  'Off Duty', 'Off Duty',
];

const certificationsByRole: Record<string, string[]> = {
  'Captain': ['Boeing 737', 'Airbus A320', 'Boeing 787'],
  'First Officer': ['Airbus A320', 'Boeing 737'],
  'Cabin Lead': ['Boeing 737', 'Airbus A320', 'Boeing 787', 'Airbus A350'],
  'Flight Attendant': ['Boeing 737', 'Airbus A320'],
};

export const MOCK_CREW: CrewMember[] = names.map((name, i) => ({
  id: `CRW-${(101 + i).toString().padStart(3, '0')}`,
  name,
  role: roles[i],
  status: statuses[i],
  hoursThisMonth: Math.floor(Math.random() * 80) + 80,
  certifications: certificationsByRole[roles[i]],
}));
