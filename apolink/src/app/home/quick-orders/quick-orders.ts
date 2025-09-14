import {
  Component,
  computed,
  signal,
  Signal,
  WritableSignal,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ORDERS } from '../../shared/data';

@Pipe({ name: 'statusDe', standalone: true })
export class StatusDePipe implements PipeTransform {
  private readonly map: Record<string, string> = {
    pending: 'In Bearbeitung',
    completed: 'Abgeschlossen',
  };

  transform(value: string): string {
    return this.map[value] ?? value;
  }
}

@Component({
  selector: 'app-quick-orders',
  imports: [DatePipe, StatusDePipe, RouterLink],
  templateUrl: './quick-orders.html',
  styleUrl: './quick-orders.css',
})
export class QuickOrders {
  currentFilter: WritableSignal<string> = signal('');

  pendingOrdersCount: Signal<number> = computed(() => this.filterOrders('pending').length);
  completedOrdersCount: Signal<number> = computed(() => this.filterOrders('completed').length);

  displayOrders: Signal<any[]> = computed(() => this.filterOrders(this.currentFilter()));

  orders = ORDERS;

  filterOrders(filter?: string) {
    if (filter) {
      return this.orders.filter((order) => order.status === filter);
    }
    return this.orders;
  }
}
