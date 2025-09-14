import { Component, Input, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  @Input({ required: true }) isOpen!: WritableSignal<boolean>;

  closeSidebar() {
    this.isOpen.set(false);
  }
}
