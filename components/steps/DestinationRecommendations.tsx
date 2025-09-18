import React from 'react';
import { MapPin, DollarSign, Star, Eye } from 'lucide-react';
import { Destination } from '../../types/travel';

interface DestinationRecommendationsProps {
  mood: string;
  budget: number;
  selectedDestination?: Destination;
  onSelect: (destination: Destination) => void;
  onNext: () => void;
  onBack: () => void;
}

const getDestinationsByMood = (mood: string, budget: number): Destination[] => {
  const allDestinations = {
    adventurous: [
      {
        id: '1',
        name: 'Patagonia, Chile',
        description: 'Epic hiking trails, glaciers, and rugged landscapes perfect for adventure seekers',
        image: 'https://images.pexels.com/photos/417050/pexels-photo-417050.jpeg',
        type: 'unexplored' as const,
        estimatedCost: 1200
      },
      {
        id: '2',
        name: 'Queenstown, New Zealand',
        description: 'Bungee jumping, skydiving, and extreme sports capital of the world',
        image: 'https://images.pexels.com/photos/1430677/pexels-photo-1430677.jpeg',
        type: 'mainstream' as const,
        estimatedCost: 1500
      }
    ],
    relaxing: [
      {
        id: '3',
        name: 'Goa, India',
        description: 'Pristine beaches, wellness retreats, and peaceful coastal vibes',
        image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg',
        type: 'mainstream' as const,
        estimatedCost: 800
      },
      {
        id: '4',
        name: 'Faroe Islands',
        description: 'Remote Nordic paradise with dramatic cliffs and serene landscapes',
        image: 'https://images.pexels.com/photos/1139541/pexels-photo-1139541.jpeg',
        type: 'unexplored' as const,
        estimatedCost: 1100
      }
    ],
    cultural: [
      {
        id: '5',
        name: 'Kyoto, Japan',
        description: 'Ancient temples, traditional ryokans, and rich cultural heritage',
        image: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg',
        type: 'mainstream' as const,
        estimatedCost: 1300
      },
      {
        id: '6',
        name: 'Bhutan',
        description: 'Last Buddhist kingdom with untouched traditions and stunning monasteries',
        image: 'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg',
        type: 'unexplored' as const,
        estimatedCost: 1400
      }
    ]
  };

  return (allDestinations[mood as keyof typeof allDestinations] || allDestinations.adventurous)
    .filter(dest => dest.estimatedCost <= budget * 1.2);
};

const DestinationRecommendations: React.FC<DestinationRecommendationsProps> = ({
  mood,
  budget,
  selectedDestination,
  onSelect,
  onNext,
  onBack
}) => {
  const destinations = getDestinationsByMood(mood, budget);

  const handleNext = () => {
    if (selectedDestination) {
      onNext();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Perfect destinations for your {mood} mood</h3>
        <p className="text-lg text-gray-600">
          Based on your preferences, we've curated these amazing destinations within your budget
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {destinations.map((destination) => {
          const isSelected = selectedDestination?.id === destination.id;
          
          return (
            <div
              key={destination.id}
              onClick={() => onSelect(destination)}
              className={`
                cursor-pointer rounded-2xl overflow-hidden bg-white border-2 transition-all transform hover:scale-105 hover:shadow-xl
                ${isSelected ? 'ring-4 ring-indigo-500 ring-opacity-50 shadow-xl scale-105 border-indigo-500' : 'border-gray-200 hover:shadow-lg'}
              `}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-semibold
                    ${destination.type === 'unexplored' 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'bg-blue-100 text-blue-800 border border-blue-200'
                    }
                  `}>
                    {destination.type === 'unexplored' ? (
                      <><Eye className="h-3 w-3 inline mr-1" />Hidden Gem</>
                    ) : (
                      <><Star className="h-3 w-3 inline mr-1" />Popular</>
                    )}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-xl font-bold text-white mb-2 drop-shadow-lg">
                    {destination.name}
                  </h4>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {destination.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-700">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm capitalize">{destination.type} destination</span>
                  </div>
                  <div className="flex items-center text-green-600 font-semibold">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>${destination.estimatedCost.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {destinations.length === 0 && (
        <div className="text-center py-12 bg-white/50 rounded-2xl border border-gray-200">
          <p className="text-gray-600 mb-4">No destinations found within your budget for the {mood} mood.</p>
          <p className="text-sm text-gray-500">Try adjusting your budget or selecting a different mood.</p>
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!selectedDestination}
          className={`px-8 py-3 rounded-xl font-semibold transition-all ${
            selectedDestination
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white transform hover:scale-105 shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default DestinationRecommendations;