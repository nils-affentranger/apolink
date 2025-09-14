import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Residents } from './residents/residents';
import { Orders } from './orders/orders';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'bewohner', component: Residents },
  { path: 'bestellungen', component: Orders },
];
