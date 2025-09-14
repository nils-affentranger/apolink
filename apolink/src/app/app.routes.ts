import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Residents } from './residents/residents';
import { Orders } from './orders/orders';
import { Create as ResidentCreate } from './residents/create/create';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'bewohner', component: Residents },
  { path: 'bewohner/neu', component: ResidentCreate },
  { path: 'bestellungen', component: Orders },
];
