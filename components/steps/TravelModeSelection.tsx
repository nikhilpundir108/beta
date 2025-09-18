import React from 'react';
import { Plane, Train, Car, SkipForward } from 'lucide-react';
import { TravelMode } from '../../types/travel';

interface TravelModeSelectionProps {
  selectedMode?: TravelMode;
  onSelect: (mode?: TravelMode) => void;
  onNext: () => void;
  onBack: () => void;
}

const travelModes: TravelMode[] = [
  {
    id: 'plane',
    name: 'Flight',
    icon: 'plane',
    description: 'Fast and convenient for long distances',
    estimatedCost: 400
  },
  {
    id: 'train',
    name: 'Train',
    icon: 'train',
    description: 'Scenic routes and comfortable journey',
    estimatedCost: 150
  },
  {
    id: 'taxi',
    name: 'Taxi/Ride Service',
    icon: 'car',
    description: 'Door-to-door convenience and flexibility',
    estimatedCost: 200
  }
];

const TravelModeSelection: React.FC<TravelModeSelectionProps> = ({
  selectedMode,
  onSelect,
  onNext,
  onBack
}) => {
  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'plane': return Plane;
      case 'train': return Train;
      case 'car': return Car;
      default: return Car;
    }
  };

  const handleSkip = () => {
    onSelect(undefined);
    onNext();
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">How would you like to travel?</h3>
        <p className="text-lg text-gray-600">
          Choose your preferred mode of transportation, or skip if you have your own vehicle
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {travelModes.map((mode) => {
          const IconComponent = getIcon(mode.icon);
          const isSelected = selectedMode?.id === mode.id;
          
          return (
            <div
              key={mode.id}
              onClick={() => onSelect(mode)}
              className={`
                cursor-pointer rounded-2xl p-6 border-2 transition-all transform hover:scale-105 hover:shadow-lg bg-white
                ${isSelected ? 'ring-4 ring-indigo-500 ring-opacity-50 shadow-xl scale-105 border-indigo-500' : 'border-gray-200 hover:shadow-md'}
              `}
            >
              <div className="text-center">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg mb-4">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{mode.name}</h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{mode.description}</p>
                {mode.estimatedCost && (
                  <div className="text-green-600 font-semibold">
                    ~${mode.estimatedCost}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-8">
        <div className="flex items-start">
          <SkipForward className="h-6 w-6 text-yellow-600 mr-3 mt-1" />
          <div>
            <h4 className="font-semibold text-yellow-800 mb-2">Have your own transportation?</h4>
            <p className="text-yellow-700 text-sm">
              You can skip this step if you're driving your own vehicle or have already arranged transportation.
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
        <div className="flex space-x-4">
          <button
            onClick={handleSkip}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold transition-all"
          >
            Skip - I have transport
          </button>
          <button
            onClick={handleNext}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelModeSelection;