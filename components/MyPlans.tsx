import React, { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Users, DollarSign, Play, Edit, Trash2, AlertTriangle, Phone, Mail, Star } from 'lucide-react';
import { TravelPlan, LocalVendor } from '../types/travel';

interface MyPlansProps {
  plans: TravelPlan[];
  onBack: () => void;
}

const mockLocalVendors: LocalVendor[] = [
  {
    id: '1',
    name: 'Maya Pottery Studio',
    type: 'artisan',
    description: 'Traditional pottery making with 3rd generation artisan',
    rating: 4.8,
    verified: true,
    location: { lat: 0, lng: 0, name: 'Old Town Square' },
    contact: { phone: '+1-555-0123', whatsapp: '+1-555-0123' },
    services: ['Pottery classes', 'Custom ceramics', 'Workshops'],
    priceRange: '$25-50'
  },
  {
    id: '2',
    name: 'Local Adventure Guide',
    type: 'guide',
    description: 'Expert guide for hidden trails and secret spots',
    rating: 4.9,
    verified: true,
    location: { lat: 0, lng: 0, name: 'Mountain Base' },
    contact: { email: 'guide@local.com', phone: '+1-555-0124' },
    services: ['Hiking tours', 'Photography spots', 'Cultural experiences'],
    priceRange: '$40-80/day'
  }
];

const MyPlans: React.FC<MyPlansProps> = ({ plans, onBack }) => {
  const [selectedPlan, setSelectedPlan] = useState<TravelPlan | null>(null);
  const [activePlan, setActivePlan] = useState<TravelPlan | null>(null);
  const [showVendors, setShowVendors] = useState(false);

  const startTrip = (plan: TravelPlan) => {
    setActivePlan(plan);
    setShowVendors(true);
  };

  if (activePlan && showVendors) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <button
              onClick={() => setShowVendors(false)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Trip Plan
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mt-2">
              Active Trip: {activePlan.destination?.name}
            </h2>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Safety Warning */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-red-600 mr-3 mt-1" />
              <div>
                <h4 className="font-semibold text-red-800 mb-2">Safety Alert: Local Scam Awareness</h4>
                <div className="text-red-700 text-sm space-y-1">
                  <p>• Avoid unlicensed taxi drivers who approach you at tourist spots</p>
                  <p>• Don't accept food or drinks from strangers</p>
                  <p>• Be cautious of "too good to be true" deals on tours or souvenirs</p>
                  <p>• Only book services through verified vendors shown below</p>
                </div>
              </div>
            </div>
          </div>

          {/* Local Transport Options */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
            <h4 className="font-semibold text-blue-800 mb-4">🚲 Local Transport Options</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <h5 className="font-semibold text-gray-900 mb-2">E-Bike Rental</h5>
                <p className="text-sm text-gray-600 mb-2">Eco-friendly way to explore the city</p>
                <p className="text-green-600 font-semibold">$15/day</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <h5 className="font-semibold text-gray-900 mb-2">Scooter Sharing</h5>
                <p className="text-sm text-gray-600 mb-2">Quick transport for short distances</p>
                <p className="text-green-600 font-semibold">$2/ride</p>
              </div>
            </div>
          </div>

          {/* Verified Local Vendors */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">🎯 Verified Local Vendors Near You</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {mockLocalVendors.map((vendor) => (
                <div key={vendor.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-1">{vendor.name}</h4>
                      <p className="text-sm text-gray-600 capitalize">{vendor.type}</p>
                    </div>
                    <div className="flex items-center bg-green-100 px-2 py-1 rounded-full">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-1"></div>
                      <span className="text-xs text-green-800 font-semibold">Verified</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{vendor.description}</p>

                  <div className="flex items-center mb-3">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="ml-1 text-sm font-semibold text-gray-900">{vendor.rating}</span>
                    <span className="ml-2 text-sm text-gray-600">• {vendor.priceRange}</span>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Services:</p>
                    <div className="flex flex-wrap gap-1">
                      {vendor.services.map((service, index) => (
                        <span key={index} className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-700">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {vendor.contact.phone && (
                      <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </button>
                    )}
                    {vendor.contact.email && (
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
                        <Mail className="h-4 w-4 mr-1" />
                        Email
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <button
              onClick={() => setSelectedPlan(null)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to My Plans
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mt-2">
              Trip to {selectedPlan.destination?.name}
            </h2>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Trip Overview */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Trip Details</h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-3" />
                    {selectedPlan.tripDetails?.days} days starting {new Date(selectedPlan.tripDetails?.startDate || '').toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-3" />
                    {selectedPlan.tripDetails?.people} {selectedPlan.tripDetails?.people === 1 ? 'person' : 'people'}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-3" />
                    Budget: ${selectedPlan.tripDetails?.budget?.toLocaleString()}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-3" />
                    {selectedPlan.mood} mood • {selectedPlan.destination?.type} destination
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Selected Itinerary</h3>
                {selectedPlan.selectedItinerary && (
                  <div className="bg-indigo-50 rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-900 mb-2">
                      {selectedPlan.selectedItinerary.title}
                    </h4>
                    <p className="text-2xl font-bold text-green-600 mb-3">
                      ${Math.round(selectedPlan.selectedItinerary.totalCost).toLocaleString()}
                    </p>
                    <div className="space-y-1">
                      {selectedPlan.selectedItinerary.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-start text-sm text-indigo-700">
                          <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 mr-2 flex-shrink-0" />
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Day by Day Itinerary */}
          {selectedPlan.selectedItinerary && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Day-by-Day Itinerary</h3>
              <div className="space-y-6">
                {selectedPlan.selectedItinerary.days.map((day, index) => (
                  <div key={index} className="border-l-4 border-indigo-500 pl-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Day {day.day}</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Places to visit:</p>
                        <ul className="space-y-1">
                          {day.places.map((place, placeIndex) => (
                            <li key={placeIndex} className="text-sm text-gray-600 flex items-center">
                              <MapPin className="h-3 w-3 mr-2 text-indigo-500" />
                              {place.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Accommodation & Transport:</p>
                        <p className="text-sm text-gray-600">🏨 {day.accommodation?.name}</p>
                        <p className="text-sm text-gray-600">🚗 {day.transport}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => startTrip(selectedPlan)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center"
            >
              <Play className="h-5 w-5 mr-2" />
              Start Trip
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center">
              <Edit className="h-5 w-5 mr-2" />
              Edit Plan
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center">
              <Trash2 className="h-5 w-5 mr-2" />
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </button>
          <h2 className="text-2xl font-bold text-gray-900 mt-2">My Travel Plans</h2>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {plans.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-12 border border-white/20 max-w-md mx-auto">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No travel plans yet</h3>
              <p className="text-gray-600 mb-6">Create your first personalized itinerary to get started!</p>
              <button
                onClick={onBack}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all"
              >
                Start Planning
              </button>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan)}
                className="cursor-pointer bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 hover:shadow-xl transition-all transform hover:scale-105"
              >
                {plan.destination?.image && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={plan.destination.image}
                      alt={plan.destination.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900">{plan.destination?.name}</h3>
                    <span className={`
                      px-2 py-1 rounded-full text-xs font-semibold
                      ${plan.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                        plan.status === 'active' ? 'bg-blue-100 text-blue-800' :
                        plan.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                        'bg-yellow-100 text-yellow-800'}
                    `}>
                      {plan.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {plan.tripDetails?.days} days
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {plan.tripDetails?.people} {plan.tripDetails?.people === 1 ? 'person' : 'people'}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2" />
                      ${plan.tripDetails?.budget?.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      Created {new Date(plan.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPlans;