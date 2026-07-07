export interface CrewMember {
  id: string;
  name: string;
  role: CrewRole;
  status: CrewStatus;
  hoursThisMonth: number;
  certifications: string[];
}

export type CrewRole = 'Captain' | 'First Officer' | 'Cabin Lead' | 'Flight Attendant';
export type CrewStatus = 'Available' | 'On Flight' | 'Standby' | 'Off Duty';
