import { Component } from '@angular/core';
import { QuickAccess } from './quick-access/quick-access';
import { QuickOrders } from './quick-orders/quick-orders';
import { QuickResidents } from './quick-residents/quick-residents';

@Component({
  selector: 'app-home',
  imports: [QuickAccess, QuickOrders, QuickResidents],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
