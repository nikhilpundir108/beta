import React, { useState, useEffect } from 'react';
import { Loader, Sparkles, MapPin, Calendar, DollarSign, Save, Eye } from 'lucide-react';
import { TravelPlan, GeneratedItinerary } from '../../types/travel';

interface PlanGenerationProps {
  planData: Partial<TravelPlan>;
  onComplete: () => void;
  onBack: () => void;
}

const generateItineraries = (planData: Partial<TravelPlan>): GeneratedItinerary[] => {
  const { tripDetails, destination, accommodation, placesToVisit } = planData;
  
  if (!tripDetails || !destination || !placesToVisit) return [];

  const itineraries: GeneratedItinerary[] = [
    {
      id: '1',
      title: 'Balanced Explorer',
      days: Array.from({ length: tripDetails.days }, (_, i) => ({
        day: i + 1,
        places: placesToVisit.slice(0, Math.min(2, placesToVisit.length)),
        accommodation: accommodation!,
        meals: planData.foodPreferences || [],
        transport: planData.travelMode?.name || 'Local transport'
      })),
      totalCost: (tripDetails.budget * 0.85),
      highlights: [
        'Perfect mix of popular and hidden attractions',
        'Optimized for comfort and discovery',
        'Includes local food experiences'
      ]
    },
    {
      id: '2',
      title: 'Adventure Seeker',
      days: Array.from({ length: tripDetails.days }, (_, i) => ({
        day: i + 1,
        places: placesToVisit.filter(p => p.isHidden || p.type.includes('Adventure')),
        accommodation: accommodation!,
        meals: planData.foodPreferences || [],
        transport: planData.travelMode?.name || 'Local transport'
      })),
      totalCost: (tripDetails.budget * 0.75),
      highlights: [
        'Focus on hidden gems and unique experiences',
        'More authentic, less touristy',
        'Budget-friendly with amazing discoveries'
      ]
    },
    {
      id: '3',
      title: 'Comfort Focused',
      days: Array.from({ length: tripDetails.days }, (_, i) => ({
        day: i + 1,
        places: placesToVisit.filter(p => !p.isHidden),
        accommodation: accommodation!,
        meals: planData.foodPreferences || [],
        transport: planData.travelMode?.name || 'Local transport'
      })),
      totalCost: (tripDetails.budget * 0.95),
      highlights: [
        'Popular attractions with easy access',
        'Comfortable pace and well-known amenities',
        'Perfect for first-time visitors'
      ]
    }
  ];

  return itineraries;
};

const PlanGeneration: React.FC<PlanGenerationProps> = ({ planData, onComplete, onBack }) => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [itineraries, setItineraries] = useState<GeneratedItinerary[]>([]);
  const [selectedItinerary, setSelectedItinerary] = useState<GeneratedItinerary | null>(null);

  useEffect(() => {
    // Simulate AI generation
    const timer = setTimeout(() => {
      const generated = generateItineraries(planData);
      setItineraries(generated);
      setIsGenerating(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [planData]);

  const handleSavePlan = () => {
    if (selectedItinerary) {
      // Update plan data with selected itinerary
      planData.selectedItinerary = selectedItinerary;
      planData.status = 'confirmed';
      onComplete();
    }
  };

  if (isGenerating) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 border border-white/20 shadow-xl">
          <Loader className="h-16 w-16 text-indigo-600 animate-spin mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Generating Your Perfect Itinerary</h3>
          <p className="text-gray-600 mb-6">
            Our AI is analyzing your preferences, budget, and destination to create personalized travel plans...
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Optimizing schedule
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              Finding hidden gems
            </div>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              Calculating costs
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <Sparkles className="h-8 w-8 text-yellow-500 mr-3" />
          Your Personalized Itineraries
        </h3>
        <p className="text-lg text-gray-600">
          Choose the travel plan that best matches your style and preferences
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {itineraries.map((itinerary) => {
          const isSelected = selectedItinerary?.id === itinerary.id;
          
          return (
            <div
              key={itinerary.id}
              onClick={() => setSelectedItinerary(itinerary)}
              className={`
                cursor-pointer rounded-2xl p-6 border-2 transition-all transform hover:scale-105 hover:shadow-lg bg-white
                ${isSelected ? 'ring-4 ring-indigo-500 ring-opacity-50 shadow-xl scale-105 border-indigo-500' : 'border-gray-200 hover:shadow-md'}
              `}
            >
              <div className="mb-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">{itinerary.title}</h4>
                <div className="text-2xl font-bold text-green-600 mb-4">
                  ${Math.round(itinerary.totalCost).toLocaleString()}
                </div>
                
                <div className="space-y-2 mb-4">
                  {itinerary.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 mr-2 flex-shrink-0" />
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h5 className="font-semibold text-gray-900 mb-3">Day-by-day preview:</h5>
                <div className="space-y-2">
                  {itinerary.days.slice(0, 3).map((day, index) => (
                    <div key={index} className="text-xs text-gray-600">
                      <span className="font-medium">Day {day.day}:</span> {day.places.map(p => p.name).join(', ')}
                    </div>
                  ))}
                  {itinerary.days.length > 3 && (
                    <div className="text-xs text-gray-500 italic">
                      ...and {itinerary.days.length - 3} more days
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedItinerary && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-200 mb-8">
          <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Eye className="h-6 w-6 mr-2 text-indigo-600" />
            Selected Plan: {selectedItinerary.title}
          </h4>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h5 className="font-semibold text-gray-900 mb-3">Trip Overview</h5>
              <div className="space-y-2 text-sm text-gray-600">
                <div>📅 Duration: {planData.tripDetails?.days} days</div>
                <div>🏨 Accommodation: {planData.accommodation?.name}</div>
                <div>🚗 Transport: {planData.travelMode?.name || 'Own vehicle'}</div>
                <div>💰 Estimated Cost: ${Math.round(selectedItinerary.totalCost).toLocaleString()}</div>
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold text-gray-900 mb-3">Key Highlights</h5>
              <div className="space-y-2">
                {selectedItinerary.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start text-sm text-gray-600">
                    <Sparkles className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                    {highlight}
                  </div>
                ))}
              </div>
            </div>
          </div>
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
          onClick={handleSavePlan}
          disabled={!selectedItinerary}
          className={`px-8 py-3 rounded-xl font-semibold transition-all flex items-center ${
            selectedItinerary
              ? 'bg-green-600 hover:bg-green-700 text-white transform hover:scale-105 shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Save className="h-5 w-5 mr-2" />
          Save My Plan
        </button>
      </div>
    </div>
  );
};

export default PlanGeneration;