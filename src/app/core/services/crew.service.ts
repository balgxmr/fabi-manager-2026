import { Injectable } from '@angular/core';
import { CrewMember, CrewRole, CrewStatus } from '../models/crew.model';
import { MOCK_CREW } from '../mock/crew.mock';

@Injectable({ providedIn: 'root' })
export class CrewService {
  private crew = [...MOCK_CREW];

  getAll(): CrewMember[] {
    return [...this.crew];
  }

  getById(id: string): CrewMember | undefined {
    return this.crew.find(c => c.id === id);
  }

  getByIds(ids: string[]): CrewMember[] {
    return this.crew.filter(c => ids.includes(c.id));
  }

  search(term: string): CrewMember[] {
    const q = term.toLowerCase();
    return this.crew.filter(
      c => c.name.toLowerCase().includes(q) || c.role.toLowerCase().includes(q)
    );
  }

  filterByRole(role: CrewRole | 'All'): CrewMember[] {
    if (role === 'All') return this.crew;
    return this.crew.filter(c => c.role === role);
  }

  filterByStatus(status: CrewStatus | 'All'): CrewMember[] {
    if (status === 'All') return this.crew;
    return this.crew.filter(c => c.status === status);
  }
}
