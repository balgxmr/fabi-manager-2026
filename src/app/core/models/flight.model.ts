export interface Flight {
  id: string;
  destination: string;
  time: string;
  gate: string;
  terminal: string;
  aircraft: string;
  status: FlightStatus;
  crew: string[];
}

export type FlightStatus = 'On Time' | 'Delayed' | 'Boarding' | 'Departed' | 'Cancelled';
