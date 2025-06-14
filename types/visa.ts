export interface VisaPromo {
  id: string;
  country: string;
  title: string;
  price: number;
  image: string;
  isFavorite?: boolean; // Optional field for favorite status
  description?: string; // Optional field for additional details
  validity?:number;
}