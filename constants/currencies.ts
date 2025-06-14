
// Extend  Currency type to include  'rate' property
export interface Currency {
  code: string;
  symbol: string;
  rate: number;
}

//TODO: Fetch real-time exchange rates from a reliable API
export const currencies: Currency[] = [
  { code: 'KES', symbol: 'KSh', rate: 1 }, // Default
  { code: 'RWF', symbol: 'FRw', rate: 0.0907 }, // 1 RWF = 0.0907 KES
  { code: 'TZS', symbol: 'TSh', rate: 0.0479 }, // 1 TZS = 0.0479 KES
  { code: 'UGX', symbol: 'USh', rate: 0.0353 }, // 1 UGX = 0.0353 KES
  { code: 'ETB', symbol: 'Br', rate: 1.0772 }, // Placeholder: 1 ETB = 1.0772 KES
  { code: 'ERN', symbol: 'Nfk', rate: 8.6177 }, // Placeholder: 1 ERN = 8.6177 KES
  { code: 'USD', symbol: '$', rate: 129.2653 }, // 1 USD = 129.2653 KES
  { code: 'EUR', symbol: '€', rate: 145.1585 }, // 1 EUR = 145.1585 KES
  { code: 'GBP', symbol: '£', rate: 171.7548 }, // 1 GBP = 171.7548 KES
];

export const defaultCurrency = currencies.find((c) => c.code === 'KES')!;