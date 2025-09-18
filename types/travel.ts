export interface TripDetails {
  days: number;
  startDate: string;
  budget: number;
  people: number;
}

export interface MoodOption {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  type: 'mainstream' | 'unexplored';
  estimatedCost: number;
}

export interface TravelMode {
  id: string;
  name: string;
  icon: string;
  description: string;
  estimatedCost?: number;
}

export interface Accommodation {
  id: string;
  name: string;
  type: 'hotel' | 'homestay' | 'resort';
  priceRange: string;
  rating: number;
  description: string;
  isLocal: boolean;
}

export interface FoodOption {
  id: string;
  name: string;
  type: 'restaurant' | 'street_food' | 'local_eatery';
  cuisine: string;
  priceRange: string;
  rating: number;
  isLocal: boolean;
}

export interface PlaceToVisit {
  id: string;
  name: string;
  type: string;
  description: string;
  estimatedTime: string;
  cost: number;
  isHidden: boolean;
}

export interface GeneratedItinerary {
  id: string;
  title: string;
  days: Array<{
    day: number;
    places: PlaceToVisit[];
    accommodation: Accommodation;
    meals: FoodOption[];
    transport: string;
  }>;
  totalCost: number;
  highlights: string[];
}

export interface TravelPlan {
  id?: string;
  tripDetails: TripDetails;
  mood: string;
  destination: Destination;
  travelMode?: TravelMode;
  accommodation?: Accommodation;
  foodPreferences: FoodOption[];
  placesToVisit: PlaceToVisit[];
  selectedItinerary?: GeneratedItinerary;
  status: 'draft' | 'confirmed' | 'active' | 'completed';
  createdAt: string;
}

export interface LocalVendor {
  id: string;
  name: string;
  type: 'artisan' | 'guide' | 'transport' | 'food' | 'experience';
  description: string;
  rating: number;
  verified: boolean;
  location: {
    lat: number;
    lng: number;
    name: string;
  };
  contact: {
    phone?: string;
    email?: string;
    whatsapp?: string;
  };
  services: string[];
  priceRange: string;
}