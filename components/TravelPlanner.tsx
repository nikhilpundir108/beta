import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { TravelPlan, TripDetails } from '../types/travel';
import TripDetailsForm from './steps/TripDetailsForm';
import MoodSelection from './steps/MoodSelection';
import DestinationRecommendations from './steps/DestinationRecommendations';
import TravelModeSelection from './steps/TravelModeSelection';
import AccommodationFood from './steps/AccommodationFood';
import PlacesToVisit from './steps/PlacesToVisit';
import PlanGeneration from './steps/PlanGeneration';

interface TravelPlannerProps {
  onSavePlan: (plan: TravelPlan) => void;
  onBack: () => void;
}

const steps = [
  { id: 1, title: 'Trip Details', component: 'tripDetails' },
  { id: 2, title: 'Select Mood', component: 'mood' },
  { id: 3, title: 'Destinations', component: 'destinations' },
  { id: 4, title: 'Travel Mode', component: 'travelMode' },
  { id: 5, title: 'Stay & Eat', component: 'accommodation' },
  { id: 6, title: 'Places', component: 'places' },
  { id: 7, title: 'Generate Plan', component: 'generate' }
];

const TravelPlanner: React.FC<TravelPlannerProps> = ({ onSavePlan, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [planData, setPlanData] = useState<Partial<TravelPlan>>({
    status: 'draft',
    createdAt: new Date().toISOString(),
    foodPreferences: [],
    placesToVisit: []
  });

  const updatePlanData = (data: Partial<TravelPlan>) => {
    setPlanData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    if (planData.tripDetails && planData.mood && planData.destination) {
      onSavePlan(planData as TravelPlan);
    }
  };

  const renderStep = () => {
    const currentStepData = steps.find(step => step.id === currentStep);
    
    switch (currentStepData?.component) {
      case 'tripDetails':
        return (
          <TripDetailsForm
            data={planData.tripDetails}
            onUpdate={(tripDetails: TripDetails) => updatePlanData({ tripDetails })}
            onNext={nextStep}
          />
        );
      case 'mood':
        return (
          <MoodSelection
            selectedMood={planData.mood}
            onSelect={(mood: string) => updatePlanData({ mood })}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 'destinations':
        return (
          <DestinationRecommendations
            mood={planData.mood!}
            budget={planData.tripDetails?.budget || 0}
            selectedDestination={planData.destination}
            onSelect={(destination) => updatePlanData({ destination })}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 'travelMode':
        return (
          <TravelModeSelection
            selectedMode={planData.travelMode}
            onSelect={(travelMode) => updatePlanData({ travelMode })}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 'accommodation':
        return (
          <AccommodationFood
            budget={planData.tripDetails?.budget || 0}
            destination={planData.destination!}
            selectedAccommodation={planData.accommodation}
            selectedFood={planData.foodPreferences ?? []}
            onAccommodationSelect={(accommodation) => updatePlanData({ accommodation })}
            onFoodSelect={(foodPreferences) => updatePlanData({ foodPreferences })}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 'places':
        return (
          <PlacesToVisit
            destination={planData.destination!}
            days={planData.tripDetails?.days || 1}
            selectedPlaces={planData.placesToVisit ?? []}
            onUpdate={(placesToVisit) => updatePlanData({ placesToVisit })}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 'generate':
        return (
          <PlanGeneration
            planData={planData}
            onComplete={handleComplete}
            onBack={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </button>
            <div className="text-sm text-gray-600">
              Step {currentStep} of {steps.length}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center space-x-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all
                  ${currentStep > step.id 
                    ? 'bg-green-500 text-white' 
                    : currentStep === step.id 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }
                `}>
                  {currentStep > step.id ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    step.id
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    w-12 h-1 mx-2 rounded transition-colors
                    ${currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'}
                  `} />
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-3 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {steps.find(step => step.id === currentStep)?.title}
            </h2>
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {renderStep()}
      </div>
    </div>
  );
};

export default TravelPlanner;