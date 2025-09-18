import React from 'react';
import { Home, Heart, Star, Utensils } from 'lucide-react';
import { Destination, Accommodation, FoodOption } from '../../types/travel';

interface AccommodationFoodProps {
  budget: number;
  destination: Destination;
  selectedAccommodation?: Accommodation;
  selectedFood: FoodOption[];
  onAccommodationSelect: (accommodation: Accommodation) => void;
  onFoodSelect: (food: FoodOption[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const accommodations: Accommodation[] = [
  {
    id: '1',
    name: 'Local Heritage Hotel',
    type: 'hotel',
    priceRange: '$80-120/night',
    rating: 4.5,
    description: 'Family-owned hotel with authentic local charm and personalized service',
    isLocal: true
  },
  {
    id: '2',
    name: 'Traditional Homestay',
    type: 'homestay',
    priceRange: '$40-70/night',
    rating: 4.8,
    description: 'Stay with local families and experience authentic culture',
    isLocal: true
  },
  {
    id: '3',
    name: 'Luxury Resort',
    type: 'resort',
    priceRange: '$200-350/night',
    rating: 4.7,
    description: 'Premium amenities with world-class service and facilities',
    isLocal: false
  }
];

const foodOptions: FoodOption[] = [
  {
    id: '1',
    name: 'Street Food Market',
    type: 'street_food',
    cuisine: 'Local',
    priceRange: '$5-15/meal',
    rating: 4.6,
    isLocal: true
  },
  {
    id: '2',
    name: 'Family Restaurant',
    type: 'local_eatery',
    cuisine: 'Traditional',
    priceRange: '$15-30/meal',
    rating: 4.4,
    isLocal: true
  },
  {
    id: '3',
    name: 'Fine Dining',
    type: 'restaurant',
    cuisine: 'International',
    priceRange: '$50-80/meal',
    rating: 4.5,
    isLocal: false
  }
];

const AccommodationFood: React.FC<AccommodationFoodProps> = ({
  budget,
  destination,
  selectedAccommodation,
  selectedFood,
  onAccommodationSelect,
  onFoodSelect,
  onNext,
  onBack
}) => {
  const toggleFoodOption = (food: FoodOption) => {
    const isSelected = selectedFood.some(f => f.id === food.id);
    if (isSelected) {
      onFoodSelect(selectedFood.filter(f => f.id !== food.id));
    } else {
      onFoodSelect([...selectedFood, food]);
    }
  };

  const getAccommodationIcon = (type: string) => {
    switch (type) {
      case 'homestay': return Home;
      case 'resort': return Star;
      default: return Home;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Where to stay & eat</h3>
        <p className="text-lg text-gray-600">
          Choose accommodation and dining options that support the local economy
        </p>
      </div>

      {/* Accommodation Section */}
      <div className="mb-10">
        <h4 className="text-2xl font-bold text-gray-900 mb-6">Accommodation</h4>
        <div className="grid md:grid-cols-3 gap-6">
          {accommodations.map((accommodation) => {
            const IconComponent = getAccommodationIcon(accommodation.type);
            const isSelected = selectedAccommodation?.id === accommodation.id;
            
            return (
              <div
                key={accommodation.id}
                onClick={() => onAccommodationSelect(accommodation)}
                className={`
                  cursor-pointer rounded-2xl p-6 border-2 transition-all transform hover:scale-105 hover:shadow-lg bg-white
                  ${isSelected ? 'ring-4 ring-indigo-500 ring-opacity-50 shadow-xl scale-105 border-indigo-500' : 'border-gray-200 hover:shadow-md'}
                `}
              >
                <div className="flex items-start justify-between mb-4">
                  <IconComponent className="h-8 w-8 text-indigo-600" />
                  {accommodation.isLocal && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                      <Heart className="h-3 w-3 inline mr-1" />
                      Local
                    </span>
                  )}
                </div>
                
                <h5 className="text-lg font-bold text-gray-900 mb-2">{accommodation.name}</h5>
                <p className="text-gray-600 text-sm mb-3">{accommodation.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-green-600 font-semibold">{accommodation.priceRange}</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{accommodation.rating}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Food Section */}
      <div className="mb-8">
        <h4 className="text-2xl font-bold text-gray-900 mb-6">Dining Preferences</h4>
        <p className="text-gray-600 mb-6">Select all dining options you're interested in (multiple selections allowed)</p>
        
        <div className="grid md:grid-cols-3 gap-6">
          {foodOptions.map((food) => {
            const isSelected = selectedFood.some(f => f.id === food.id);
            
            return (
              <div
                key={food.id}
                onClick={() => toggleFoodOption(food)}
                className={`
                  cursor-pointer rounded-2xl p-6 border-2 transition-all transform hover:scale-105 hover:shadow-lg bg-white
                  ${isSelected ? 'ring-4 ring-indigo-500 ring-opacity-50 shadow-xl scale-105 border-indigo-500' : 'border-gray-200 hover:shadow-md'}
                `}
              >
                <div className="flex items-start justify-between mb-4">
                  <Utensils className="h-8 w-8 text-indigo-600" />
                  {food.isLocal && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                      <Heart className="h-3 w-3 inline mr-1" />
                      Local
                    </span>
                  )}
                </div>
                
                <h5 className="text-lg font-bold text-gray-900 mb-2">{food.name}</h5>
                <p className="text-gray-600 text-sm mb-1">{food.cuisine} Cuisine</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-green-600 font-semibold">{food.priceRange}</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{food.rating}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
        <div className="flex items-start">
          <Heart className="h-6 w-6 text-blue-600 mr-3 mt-1" />
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">Supporting Local Economy</h4>
            <p className="text-blue-700 text-sm">
              Options marked as "Local" directly support the destination's community and provide authentic experiences. 
              We prioritize these recommendations to boost local economic growth.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default AccommodationFood;