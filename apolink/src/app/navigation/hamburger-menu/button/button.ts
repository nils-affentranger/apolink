import { Component, Input, WritableSignal, signal } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  @Input({ required: true }) isOpen!: WritableSignal<boolean>;
  hasInteracted = signal(false);

  onNavButtonClick() {
    this.hasInteracted.set(true);
    this.isOpen.update((v) => !v);
  }
}
