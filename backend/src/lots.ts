export type Lot = {
  id: number;
  title: string;
  price: number;
  owner: string | null;
  resale: boolean;
  endsAt: number;
};

export const lots: Lot[] = [
  {
    id: 1,
    title: "🚗 Tesla Model X",
    price: 1000,
    owner: null,
    resale: false,
    endsAt: Date.now() + 30000
  },
  {
    id: 2,
    title: "🏠 Luxury House",
    price: 5000,
    owner: null,
    resale: false,
    endsAt: Date.now() + 40000
  },
  {
    id: 3,
    title: "🏝️ Private Villa",
    price: 10000,
    owner: null,
    resale: false,
    endsAt: Date.now() + 50000
  }
];
