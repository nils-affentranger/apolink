import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RESIDENTS, Resident } from '../../shared/data';

// Local model type for the form
type CreateModel = {
  anrede: string;
  vorname: string;
  nachname: string;
  geburtsdatum: string;
  ahvNummer: string;
  zimmer: string;
};

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './create.html',
  styleUrl: './create.css',
})
export class Create {
  anredeOptions = ['Herr', 'Frau', 'Divers'];

  model = signal<CreateModel>({
    anrede: 'Herr',
    vorname: '',
    nachname: '',
    geburtsdatum: '',
    ahvNummer: '',
    zimmer: '',
  });

  constructor(private router: Router) {}

  // Helper for template to update a single field without arrow function expressions in the template
  update<K extends keyof CreateModel>(key: K, value: CreateModel[K]) {
    this.model.update((m) => ({ ...m, [key]: value }));
  }

  get canSave() {
    const m = this.model();
    return !!m.vorname && !!m.nachname && !!m.zimmer; // minimal required
  }

  save() {
    const m = this.model();
    const nextId = (RESIDENTS.at(-1)?.id ?? 0) + 1;
    const fullName = `${m.vorname} ${m.nachname}`.trim();

    const newResident: Resident = {
      id: nextId,
      name: fullName,
      room: m.zimmer,
      anrede: m.anrede,
      vorname: m.vorname,
      nachname: m.nachname,
      geburtsdatum: m.geburtsdatum,
      ahvNummer: m.ahvNummer,
    };

    RESIDENTS.push(newResident);

    this.router.navigate(['/bewohner']);
  }
}
