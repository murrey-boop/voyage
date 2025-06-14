export interface Currency {
  rate: number;
  code: string;
  symbol: string;
}

export interface Booking {
  id: string;
  name: string;
  image: string;
  date: string;
  price: number;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}

declare module 'amadeus' {
  interface AmadeusOptions {
    clientId: string;
    clientSecret: string;
    hostname?: string;
  }

  class Amadeus {
    constructor(options: AmadeusOptions);
    // Add any specific methods you use here, or use [key: string]: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  export = Amadeus;
}