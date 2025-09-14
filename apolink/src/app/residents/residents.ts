import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RESIDENTS } from '../shared/data';

@Component({
  selector: 'app-residents',
  imports: [RouterLink],
  templateUrl: './residents.html',
  styleUrl: './residents.css',
})
export class Residents {
  residents = RESIDENTS;

  // Search term for filtering
  search = signal('');

  // Total number of residents
  total = computed(() => this.residents.length);

  // Filtered and sorted residents list (newest first by id)
  filteredResidents = computed(() => {
    const q = this.search().trim().toLowerCase();
    const base = [...this.residents].sort((a, b) => b.id - a.id);
    if (!q) return base;
    return base.filter((r) => r.name.toLowerCase().includes(q) || r.room.toLowerCase().includes(q));
  });

  onSearch(value: string) {
    this.search.set(value);
  }
}
