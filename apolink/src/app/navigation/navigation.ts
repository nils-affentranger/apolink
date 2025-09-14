import { Component, signal } from '@angular/core';
import { Button } from './hamburger-menu/button/button';
import { Menu } from './hamburger-menu/menu/menu';

@Component({
  selector: 'app-navigation',
  imports: [Button, Menu],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {
  isOpen = signal(false);
}
