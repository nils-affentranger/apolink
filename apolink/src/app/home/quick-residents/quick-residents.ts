import { Component, computed, signal, Signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RESIDENTS } from '../../shared/data';

@Component({
  selector: 'app-quick-residents',
  imports: [RouterLink],
  templateUrl: './quick-residents.html',
  styleUrl: './quick-residents.css',
})
export class QuickResidents {
  // Search term for filtering residents
  searchTerm: WritableSignal<string> = signal('');

  // Centralized residents list
  residents = RESIDENTS;

  // Total number of residents
  totalResidents: Signal<number> = computed(() => this.residents.length);

  // Display logic:
  // - when search is empty: show the latest 3 added (by highest id)
  // - when searching: show the top 4 matches (newest first)
  displayResidents: Signal<typeof this.residents> = computed(() => {
    const q = this.searchTerm().trim().toLowerCase();
    const sortedByNewest = [...this.residents].sort((a, b) => b.id - a.id);

    if (!q) {
      return sortedByNewest.slice(0, 3);
    }

    const filtered = sortedByNewest.filter(
      (r) => r.name.toLowerCase().includes(q) || r.room.toLowerCase().includes(q)
    );
    return filtered.slice(0, 4);
  });

  onSearch(value: string) {
    this.searchTerm.set(value);
  }
}
