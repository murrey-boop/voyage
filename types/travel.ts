interface BaseTravelItem {
  id: string
  title: string
  image: string
  price: number
  originalPrice?: number
}

export interface Tour extends BaseTravelItem {
  type: 'tour'
  name: string
  rating: number
  reviewsCount: number
  duration: string
  groupSize?: string
  difficulty?: string
}

export interface FlightDeal extends BaseTravelItem {
  type: 'flight'
  airline: string
  destination: string
  duration: string
  stops: number
}

export interface VisaPromo extends BaseTravelItem {
  type: 'visa'
  country: string
  processingTime: string
}

export type TravelItem = Tour | FlightDeal | VisaPromo