export type Resident = {
  id: number;
  name: string;
  room: string;
  // Optional extended fields captured when creating a resident
  anrede?: 'Herr' | 'Frau' | 'Divers' | string;
  vorname?: string;
  nachname?: string;
  geburtsdatum?: string; // YYYY-MM-DD
  ahvNummer?: string;
};

export type OrderMedicament = {
  id: number;
  productName: string;
  quantity: number;
  residentId: number; // assigned resident
};

export type Order = {
  id: number;
  status: 'pending' | 'completed'; // status applies to the whole order
  date: Date;
  items: OrderMedicament[]; // medicaments grouped by resident via residentId
};

export const RESIDENTS: Resident[] = [
  { id: 1, name: 'Anna Meier', room: 'A101' },
  { id: 2, name: 'Peter Müller', room: 'B203' },
  { id: 3, name: 'Lena Keller', room: 'C307' },
  { id: 4, name: 'Marc Steiner', room: 'A115' },
];

export const ORDERS: Order[] = [
  {
    id: 6,
    status: 'pending',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    items: [
      { id: 601, productName: 'Paracetamol 500mg', quantity: 2, residentId: 1 },
      { id: 602, productName: 'Ibuprofen 400mg', quantity: 1, residentId: 1 },
      { id: 603, productName: 'Blutzuckerteststreifen', quantity: 1, residentId: 2 },
    ],
  },
  {
    id: 5,
    status: 'pending',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    items: [
      { id: 501, productName: 'Lactulose Sirup', quantity: 1, residentId: 1 },
      { id: 502, productName: 'Vitamin D Tropfen', quantity: 2, residentId: 3 },
    ],
  },
  {
    id: 4,
    status: 'pending',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    items: [
      { id: 401, productName: 'Blutdruckmessgerät Manschette', quantity: 1, residentId: 2 },
      { id: 402, productName: 'Magnesium 300mg', quantity: 1, residentId: 2 },
    ],
  },
  {
    id: 3,
    status: 'pending',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    items: [{ id: 301, productName: 'Ibuprofen 400mg', quantity: 1, residentId: 3 }],
  },
  {
    id: 2,
    status: 'pending',
    date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
    items: [
      { id: 201, productName: 'Loperamid 2mg', quantity: 1, residentId: 1 },
      { id: 202, productName: 'Traubenzucker', quantity: 5, residentId: 1 },
    ],
  },
  {
    id: 1,
    status: 'completed',
    date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    items: [
      { id: 101, productName: 'Vitamin D Tropfen', quantity: 1, residentId: 4 },
      { id: 102, productName: 'Wundsalbe', quantity: 1, residentId: 4 },
    ],
  },
];
