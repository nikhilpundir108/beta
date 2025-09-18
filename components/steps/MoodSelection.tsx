import React from 'react';
import { Mountain, Waves, Building2, TreePine, Camera, Heart } from 'lucide-react';

interface MoodSelectionProps {
  selectedMood?: string;
  onSelect: (mood: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const moods = [
  {
    id: 'adventurous',
    name: 'Adventurous',
    description: 'Seeking thrills, outdoor activities, and exciting experiences',
    icon: Mountain,
    color: 'from-orange-400 to-red-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  },
  {
    id: 'relaxing',
    name: 'Relaxing',
    description: 'Beach vibes, spas, peaceful moments, and stress-free getaways',
    icon: Waves,
    color: 'from-blue-400 to-teal-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  {
    id: 'cultural',
    name: 'Cultural',
    description: 'Museums, historical sites, local traditions, and authentic experiences',
    icon: Building2,
    color: 'from-purple-400 to-pink-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  {
    id: 'nature',
    name: 'Nature Lover',
    description: 'National parks, wildlife, hiking, and connecting with nature',
    icon: TreePine,
    color: 'from-green-400 to-emerald-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  {
    id: 'photography',
    name: 'Photography',
    description: 'Scenic views, unique architecture, and Instagram-worthy spots',
    icon: Camera,
    color: 'from-indigo-400 to-blue-500',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200'
  },
  {
    id: 'romantic',
    name: 'Romantic',
    description: 'Intimate settings, sunset dinners, and couple-friendly activities',
    icon: Heart,
    color: 'from-pink-400 to-rose-500',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200'
  }
];

const MoodSelection: React.FC<MoodSelectionProps> = ({ selectedMood, onSelect, onNext, onBack }) => {
  const handleNext = () => {
    if (selectedMood) {
      onNext();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">What's your travel mood?</h3>
        <p className="text-lg text-gray-600">
          Choose the vibe that matches your ideal getaway, and we'll recommend perfect destinations
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {moods.map((mood) => {
          const IconComponent = mood.icon;
          const isSelected = selectedMood === mood.id;
          
          return (
            <div
              key={mood.id}
              onClick={() => onSelect(mood.id)}
              className={`
                ${mood.bgColor} ${mood.borderColor} cursor-pointer rounded-2xl p-6 border-2 transition-all transform hover:scale-105 hover:shadow-lg
                ${isSelected ? 'ring-4 ring-indigo-500 ring-opacity-50 shadow-xl scale-105' : 'hover:shadow-md'}
              `}
            >
              <div className="text-center">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${mood.color} shadow-lg mb-4`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{mood.name}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{mood.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!selectedMood}
          className={`px-8 py-3 rounded-xl font-semibold transition-all ${
            selectedMood
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

export default MoodSelection;