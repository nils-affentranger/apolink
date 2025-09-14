import { Component, computed, signal, Signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ORDERS, RESIDENTS } from '../shared/data';

@Component({
  selector: 'app-orders',
  imports: [RouterLink, DatePipe],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders {
  // Autocomplete search term (resident name or room)
  search: WritableSignal<string> = signal('');
  // Controls visibility of the suggestions dropdown
  showSuggestions: WritableSignal<boolean> = signal(false);

  residents = RESIDENTS;
  orders = ORDERS;

  // Flatten all order items for convenience in searches (+ include orderStatus and orderDate)
  private allItems = computed(() =>
    this.orders.flatMap((o) =>
      o.items.map((i) => ({ ...i, orderId: o.id, orderStatus: o.status, orderDate: o.date }))
    )
  );

  // Currently selected resident id derived from search text if it exactly matches a resident
  selectedResidentId: Signal<number | null> = computed(() => {
    const q = this.search().trim().toLowerCase();
    if (!q) return null;
    const exact = this.residents.find(
      (r) => r.name.toLowerCase() === q || r.room.toLowerCase() === q
    );
    return exact ? exact.id : null;
  });

  // Selected resident entity for UI
  selectedResident = computed(() => {
    const id = this.selectedResidentId();
    return id ? this.residents.find((r) => r.id === id) ?? null : null;
  });

  // Suggestions for autocomplete based on residents (hidden when exact match)
  suggestions: Signal<typeof this.residents> = computed(() => {
    const q = this.search().trim().toLowerCase();
    if (!q) return [];
    if (this.selectedResidentId()) return [];
    return this.residents
      .filter((r) => r.name.toLowerCase().includes(q) || r.room.toLowerCase().includes(q))
      .slice(0, 5);
  });

  // When searching -> show pending items for selected resident across all orders (order status based)
  pendingItemsForSelected = computed(() => {
    const rid = this.selectedResidentId();
    if (!rid) return [];
    return this.allItems()
      .filter((i) => i.residentId === rid && i.orderStatus === 'pending')
      .sort((a, b) => b.orderDate.getTime() - a.orderDate.getTime());
  });

  // Aggregate the pending items by product, summing quantities per product name
  pendingItemsForSelectedAggregated = computed(() => {
    const items = this.pendingItemsForSelected();
    if (items.length === 0)
      return [] as Array<{ productName: string; totalQuantity: number; lastDate: Date }>;
    const map = new Map<string, { productName: string; totalQuantity: number; lastDate: Date }>();
    for (const it of items) {
      const entry = map.get(it.productName) || {
        productName: it.productName,
        totalQuantity: 0,
        lastDate: it.orderDate,
      };
      entry.totalQuantity += it.quantity;
      if (it.orderDate > entry.lastDate) entry.lastDate = it.orderDate;
      map.set(it.productName, entry);
    }
    return Array.from(map.values()).sort((a, b) => b.lastDate.getTime() - a.lastDate.getTime());
  });

  // Default: show all orders, newest first
  allOrdersSorted: Signal<typeof this.orders> = computed(() =>
    [...this.orders].sort((a, b) => b.date.getTime() - a.date.getTime())
  );

  onSearch(value: string) {
    this.search.set(value);
    this.showSuggestions.set(!!value.trim());
  }

  chooseSuggestion(nameOrRoom: string) {
    this.search.set(nameOrRoom);
    this.showSuggestions.set(false); // hide dropdown after choosing
  }

  // Close suggestions when the input loses focus; slight delay to let suggestion click register
  onInputBlur() {
    setTimeout(() => this.showSuggestions.set(false), 120);
  }

  // Optional: when refocusing, reopen suggestions if there is a query and no exact match yet
  onInputFocus() {
    const hasQuery = !!this.search().trim();
    if (hasQuery && !this.selectedResidentId()) this.showSuggestions.set(true);
  }

  // Ensure suggestion selection happens even if blur fires first
  onSuggestionMouseDown(event: MouseEvent, nameOrRoom: string) {
    event.preventDefault();
    this.chooseSuggestion(nameOrRoom);
  }

  residentName(rid: number) {
    return this.residents.find((r) => r.id === rid)?.name ?? 'Unbekannt';
  }

  // Group items of an order by resident for UI
  groupByResident(order: { items: any[] }) {
    const map = new Map<number, any[]>();
    for (const item of order.items) {
      const list = map.get(item.residentId) ?? [];
      list.push(item);
      map.set(item.residentId, list);
    }
    return Array.from(map.entries()).map(([residentId, items]) => ({
      resident: this.residents.find((r) => r.id === residentId) || {
        id: residentId,
        name: 'Unbekannt',
        room: '-',
      },
      items,
    }));
  }

  onClearMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.search.set('');
    this.showSuggestions.set(false);
  }

  onClearClick() {
    this.search.set('');
    this.showSuggestions.set(false);
  }
}
