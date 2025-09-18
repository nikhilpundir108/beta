import React from 'react';
import { MapPin, Clock, DollarSign, Eye, Plus, X } from 'lucide-react';
import { Destination, PlaceToVisit } from '../../types/travel';

interface PlacesToVisitProps {
  destination: Destination;
  days: number;
  selectedPlaces: PlaceToVisit[];
  onUpdate: (places: PlaceToVisit[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const getPlacesByDestination = (destination: Destination): PlaceToVisit[] => {
  const places = [
    {
      id: '1',
      name: 'Main Historic Center',
      type: 'Historical Site',
      description: 'Explore the heart of the city with centuries of history',
      estimatedTime: '3-4 hours',
      cost: 15,
      isHidden: false
    },
    {
      id: '2',
      name: 'Local Artisan Quarter',
      type: 'Cultural District',
      description: 'Hidden neighborhood where local craftspeople work and sell their art',
      estimatedTime: '2-3 hours',
      cost: 0,
      isHidden: true
    },
    {
      id: '3',
      name: 'Famous Viewpoint',
      type: 'Scenic Spot',
      description: 'Panoramic views perfect for photos and sunset watching',
      estimatedTime: '1-2 hours',
      cost: 10,
      isHidden: false
    },
    {
      id: '4',
      name: 'Secret Waterfall Trail',
      type: 'Nature Trail',
      description: 'Lesser-known hiking trail leading to a pristine waterfall',
      estimatedTime: '4-5 hours',
      cost: 0,
      isHidden: true
    },
    {
      id: '5',
      name: 'Traditional Market',
      type: 'Local Market',
      description: 'Authentic market where locals shop for daily necessities',
      estimatedTime: '2 hours',
      cost: 5,
      isHidden: false
    },
    {
      id: '6',
      name: 'Underground Cave System',
      type: 'Adventure Site',
      description: 'Unexplored caves with unique geological formations',
      estimatedTime: '3-4 hours',
      cost: 25,
      isHidden: true
    }
  ];

  return places;
};

const PlacesToVisit: React.FC<PlacesToVisitProps> = ({
  destination,
  days,
  selectedPlaces,
  onUpdate,
  onNext,
  onBack
}) => {
  const availablePlaces = getPlacesByDestination(destination);
  
  const togglePlace = (place: PlaceToVisit) => {
    const isSelected = selectedPlaces.some(p => p.id === place.id);
    if (isSelected) {
      onUpdate(selectedPlaces.filter(p => p.id !== place.id));
    } else {
      onUpdate([...selectedPlaces, place]);
    }
  };

  const hiddenGems = availablePlaces.filter(p => p.isHidden);
  const popularPlaces = availablePlaces.filter(p => !p.isHidden);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Places to explore in {destination.name}</h3>
        <p className="text-lg text-gray-600">
          Select the places you'd like to visit. We recommend mixing popular spots with hidden gems!
        </p>
      </div>

      {/* Selected Places Summary */}
      {selectedPlaces.length > 0 && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 mb-8">
          <h4 className="font-semibold text-indigo-800 mb-3">
            Selected Places ({selectedPlaces.length}) - Estimated Cost: ${selectedPlaces.reduce((sum, p) => sum + p.cost, 0)}
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedPlaces.map(place => (
              <span
                key={place.id}
                className="bg-white border border-indigo-200 px-3 py-1 rounded-full text-sm flex items-center"
              >
                {place.name}
                <button
                  onClick={() => togglePlace(place)}
                  className="ml-2 text-indigo-600 hover:text-indigo-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Popular Places */}
      <div className="mb-10">
        <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <MapPin className="h-6 w-6 mr-2 text-blue-600" />
          Popular Attractions
        </h4>
        <div className="grid md:grid-cols-2 gap-6">
          {popularPlaces.map((place) => {
            const isSelected = selectedPlaces.some(p => p.id === place.id);
            
            return (
              <div
                key={place.id}
                onClick={() => togglePlace(place)}
                className={`
                  cursor-pointer rounded-2xl p-6 border-2 transition-all transform hover:scale-105 hover:shadow-lg bg-white
                  ${isSelected ? 'ring-4 ring-indigo-500 ring-opacity-50 shadow-xl scale-105 border-indigo-500' : 'border-gray-200 hover:shadow-md'}
                `}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                    {place.type}
                  </span>
                  {isSelected && (
                    <Plus className="h-5 w-5 text-indigo-600 transform rotate-45" />
                  )}
                </div>
                
                <h5 className="text-lg font-bold text-gray-900 mb-2">{place.name}</h5>
                <p className="text-gray-600 text-sm mb-4">{place.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {place.estimatedTime}
                  </div>
                  <div className="flex items-center text-green-600 font-semibold">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {place.cost === 0 ? 'Free' : `$${place.cost}`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hidden Gems */}
      <div className="mb-8">
        <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Eye className="h-6 w-6 mr-2 text-green-600" />
          Hidden Gems & Local Favorites
        </h4>
        <div className="grid md:grid-cols-2 gap-6">
          {hiddenGems.map((place) => {
            const isSelected = selectedPlaces.some(p => p.id === place.id);
            
            return (
              <div
                key={place.id}
                onClick={() => togglePlace(place)}
                className={`
                  cursor-pointer rounded-2xl p-6 border-2 transition-all transform hover:scale-105 hover:shadow-lg bg-gradient-to-br from-green-50 to-emerald-50
                  ${isSelected ? 'ring-4 ring-indigo-500 ring-opacity-50 shadow-xl scale-105 border-indigo-500' : 'border-green-200 hover:shadow-md'}
                `}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                    <Eye className="h-3 w-3 mr-1" />
                    {place.type}
                  </span>
                  {isSelected && (
                    <Plus className="h-5 w-5 text-indigo-600 transform rotate-45" />
                  )}
                </div>
                
                <h5 className="text-lg font-bold text-gray-900 mb-2">{place.name}</h5>
                <p className="text-gray-600 text-sm mb-4">{place.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {place.estimatedTime}
                  </div>
                  <div className="flex items-center text-green-600 font-semibold">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {place.cost === 0 ? 'Free' : `$${place.cost}`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-8">
        <div className="flex items-start">
          <Eye className="h-6 w-6 text-yellow-600 mr-3 mt-1" />
          <div>
            <h4 className="font-semibold text-yellow-800 mb-2">Promoting Unexplored Areas</h4>
            <p className="text-yellow-700 text-sm">
              Hidden gems are carefully selected locations that offer authentic experiences while being easily accessible 
              from popular destinations. Visiting these places helps support local communities in lesser-known areas.
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

export default PlacesToVisit;