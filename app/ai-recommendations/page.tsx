'use client';

import { useState, useEffect } from 'react';
import { Heart, Star, User, Search, Filter, Camera, Upload, MessageCircle, Trophy, Leaf, MapPin, Calendar, Zap, Gift, DollarSign, Users as UsersIcon, Award } from 'lucide-react';
import { aiEngine, mockItems, mockCharities } from './ai-engine';

interface Donation {
  id: number;
  charity: string;
  points: number;
  date: string;
  impact: string;
}

interface UserData {
  id: string;
  name: string;
  points: number;
}

const AIRecommendationsPage = () => {
  const [currentUser, setCurrentUser] = useState<UserData>({ id: 'user123', name: 'You', points: 45 });
  const [activeTab, setActiveTab] = useState('browse');
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedLifeEvent, setSelectedLifeEvent] = useState('');
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [moodRecommendations, setMoodRecommendations] = useState<any[]>([]);
  const [lifeEventRecommendations, setLifeEventRecommendations] = useState<any[]>([]);
  const [donationHistory, setDonationHistory] = useState<Donation[]>([
    { id: 1, charity: "Fashion Revolution", points: 20, date: "2 days ago", impact: "20 clothes recycled" },
    { id: 2, charity: "Textile Recycling International", points: 30, date: "1 week ago", impact: "3 trees planted" }
  ]);

  useEffect(() => {
    // Generate general recommendations
    const generalRecs = aiEngine.generateRecommendations(currentUser.id, mockItems, 'general');
    setRecommendations(generalRecs);
  }, [currentUser.id]);

  const handleMoodChange = (mood: string) => {
    setSelectedMood(mood);
    if (mood) {
      const moodRecs = aiEngine.getMoodBasedRecommendations(currentUser.id, mockItems, mood);
      setMoodRecommendations(moodRecs);
    } else {
      setMoodRecommendations([]);
    }
  };

  const handleLifeEventChange = (event: string) => {
    setSelectedLifeEvent(event);
    if (event) {
      const eventRecs = aiEngine.getLifeEventRecommendations(currentUser.id, mockItems, event);
      setLifeEventRecommendations(eventRecs);
    } else {
      setLifeEventRecommendations([]);
    }
  };

  const handleInteraction = (item: any, action: string) => {
    aiEngine.updateUserProfile(currentUser.id, { item, action });
    
    // Refresh recommendations after interaction
    const newRecs = aiEngine.generateRecommendations(currentUser.id, mockItems, 'general');
    setRecommendations(newRecs);
  };

  const handleDonation = (charity: any, donationAmount: number) => {
    if (currentUser.points >= donationAmount) {
      const impact = aiEngine.makeDonation(currentUser.id, charity.id, donationAmount);
      
      // Update user points
      setCurrentUser(prev => ({ ...prev, points: prev.points - donationAmount }));
      
      // Add to donation history
      const newDonation: Donation = {
        id: Date.now(),
        charity: charity.name,
        points: donationAmount,
        date: "Just now",
        impact: `${impact.clothesRecycled} clothes recycled, ${impact.treesPlanted} trees planted`
      };
      setDonationHistory(prev => [newDonation, ...prev]);
      
      alert(`Successfully donated ${donationAmount} points to ${charity.name}!`);
    } else {
      alert("Not enough points for this donation.");
    }
  };

  const ItemCard = ({ item, showAiScore = false }: { item: any; showAiScore?: boolean }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="bg-gray-200 h-48 flex items-center justify-center">
        <Camera className="w-12 h-12 text-gray-400" />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
          {showAiScore && item.aiScore && (
            <div className="flex items-center bg-blue-100 px-2 py-1 rounded-full">
              <Zap className="w-3 h-3 text-blue-600 mr-1" />
              <span className="text-xs text-blue-600 font-medium">
                {Math.round(item.aiScore * 100)}%
              </span>
            </div>
          )}
        </div>
        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm bg-gray-100 px-2 py-1 rounded">{item.size}</span>
          <span className="text-sm font-medium text-green-600">{item.points} points</span>
        </div>
        <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
          <span className="flex items-center">
            <User className="w-3 h-3 mr-1" />
            {item.uploader}
          </span>
          <span className="flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            {item.location}
          </span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => handleInteraction(item, 'like')}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4" />
            Request Swap
          </button>
          <button 
            onClick={() => handleInteraction(item, 'wishlist')}
            className="bg-gray-100 text-gray-700 py-2 px-3 rounded-md hover:bg-gray-200 transition-colors"
          >
            <Star className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const CharityCard = ({ charity, onDonate }: { charity: any; onDonate: (charity: any, amount: number) => void }) => {
    const [donationAmount, setDonationAmount] = useState(charity.minDonation);

    return (
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-start gap-4 mb-4">
          <div className="text-3xl">{charity.logo}</div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-800 mb-1">{charity.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{charity.description}</p>
            <div className="flex items-center text-xs text-gray-500 gap-4">
              <span className="flex items-center">
                <DollarSign className="w-3 h-3 mr-1" />
                ${charity.totalRaised.toLocaleString()} raised
              </span>
              <span className="flex items-center">
                <UsersIcon className="w-3 h-3 mr-1" />
                {charity.supporters.toLocaleString()} supporters
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Gift className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium">Impact: {charity.impact}</span>
          </div>
          <p className="text-xs text-gray-600">{charity.conversionRate}</p>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Donation Amount (Points)
            </label>
            <input
              type="number"
              min={charity.minDonation}
              max={currentUser.points}
              value={donationAmount}
              onChange={(e) => setDonationAmount(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Minimum: {charity.minDonation} points
            </p>
          </div>
          
          <button
            onClick={() => onDonate(charity, donationAmount)}
            disabled={donationAmount < charity.minDonation || donationAmount > currentUser.points}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Gift className="w-4 h-4" />
            Donate {donationAmount} Points
          </button>
        </div>
      </div>
    );
  };

  const AIRecommendationSection = ({ 
    title, 
    items, 
    subtitle, 
    icon: Icon 
  }: { 
    title: string; 
    items: any[]; 
    subtitle?: string; 
    icon: React.ComponentType<{ className?: string }> 
  }) => (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      </div>
      {subtitle && <p className="text-gray-600 mb-4">{subtitle}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} showAiScore={true} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-green-600">ReWear</h1>
              <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                AI-Powered
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => setActiveTab('browse')}
                className={`${activeTab === 'browse' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'} pb-2`}
              >
                Browse
              </button>
              <button 
                onClick={() => setActiveTab('recommendations')}
                className={`${activeTab === 'recommendations' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'} pb-2`}
              >
                AI Recommendations
              </button>
              <button 
                onClick={() => setActiveTab('charity')}
                className={`${activeTab === 'charity' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'} pb-2`}
              >
                Charity Donations
              </button>
            </nav>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-green-100 px-3 py-1 rounded-full">
                <Leaf className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-sm font-medium text-green-600">{currentUser.points} points</span>
              </div>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white shadow-md">
        <div className="flex justify-around py-2">
          <button 
            onClick={() => setActiveTab('browse')}
            className={`flex flex-col items-center p-2 ${activeTab === 'browse' ? 'text-blue-600' : 'text-gray-500'}`}
          >
            <Search className="w-5 h-5" />
            <span className="text-xs mt-1">Browse</span>
          </button>
          <button 
            onClick={() => setActiveTab('recommendations')}
            className={`flex flex-col items-center p-2 ${activeTab === 'recommendations' ? 'text-blue-600' : 'text-gray-500'}`}
          >
            <Zap className="w-5 h-5" />
            <span className="text-xs mt-1">AI Recs</span>
          </button>
          <button 
            onClick={() => setActiveTab('charity')}
            className={`flex flex-col items-center p-2 ${activeTab === 'charity' ? 'text-blue-600' : 'text-gray-500'}`}
          >
            <Gift className="w-5 h-5" />
            <span className="text-xs mt-1">Donate</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'browse' && (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Items</h1>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center bg-white rounded-lg border px-4 py-2 flex-1 max-w-md">
                  <Search className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Search items..."
                    className="outline-none w-full"
                  />
                </div>
                <button className="flex items-center bg-white border rounded-lg px-4 py-2 hover:bg-gray-50">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockItems.map(item => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">AI Recommendations</h1>
              <p className="text-gray-600 mb-6">
                Our AI analyzes your preferences, style, and needs to suggest the perfect items for you.
              </p>
              
              {/* AI Controls */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4">Personalize Your Experience</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Mood
                    </label>
                    <select
                      value={selectedMood}
                      onChange={(e) => handleMoodChange(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select your mood...</option>
                      <option value="confident">Confident & Bold</option>
                      <option value="comfortable">Comfortable & Relaxed</option>
                      <option value="adventurous">Adventurous & Unique</option>
                      <option value="professional">Professional & Polished</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Life Event
                    </label>
                    <select
                      value={selectedLifeEvent}
                      onChange={(e) => handleLifeEventChange(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select life event...</option>
                      <option value="new_job">Starting New Job</option>
                      <option value="casual_lifestyle">Embracing Casual Lifestyle</option>
                      <option value="social_events">More Social Events</option>
                      <option value="fitness_journey">Fitness Journey</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* General AI Recommendations */}
            <AIRecommendationSection
              title="Recommended For You"
              items={recommendations}
              subtitle="Based on your style preferences and browsing history"
              icon={Star}
            />

            {/* Mood-Based Recommendations */}
            {selectedMood && moodRecommendations.length > 0 && (
              <AIRecommendationSection
                title={`Perfect for Your ${selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)} Mood`}
                items={moodRecommendations}
                subtitle="Items that match your current emotional state"
                icon={Heart}
              />
            )}

            {/* Life Event Recommendations */}
            {selectedLifeEvent && lifeEventRecommendations.length > 0 && (
              <AIRecommendationSection
                title="Perfect for Your Life Event"
                items={lifeEventRecommendations}
                subtitle="Items specifically chosen for your current life situation"
                icon={Calendar}
              />
            )}
          </div>
        )}

        {activeTab === 'charity' && (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Charity Donations</h1>
              <p className="text-gray-600 mb-6">
                Convert your ReWear points into donations for sustainable fashion charities and make a positive impact on the world.
              </p>
              
              {/* Impact Summary */}
              <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-green-600" />
                  Your Impact Summary
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {aiEngine.getUserProfile(currentUser.id).totalDonated}
                    </div>
                    <div className="text-sm text-gray-600">Points Donated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {aiEngine.getUserProfile(currentUser.id).charityImpact.clothesRecycled}
                    </div>
                    <div className="text-sm text-gray-600">Clothes Recycled</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {aiEngine.getUserProfile(currentUser.id).charityImpact.treesPlanted}
                    </div>
                    <div className="text-sm text-gray-600">Trees Planted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {aiEngine.getUserProfile(currentUser.id).charityImpact.wasteReduced}kg
                    </div>
                    <div className="text-sm text-gray-600">Waste Reduced</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Available Charities */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Featured Charities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockCharities.map(charity => (
                  <CharityCard
                    key={charity.id}
                    charity={charity}
                    onDonate={handleDonation}
                  />
                ))}
              </div>
            </div>

            {/* Donation History */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Donations</h2>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {donationHistory.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {donationHistory.map(donation => (
                      <div key={donation.id} className="p-4 flex justify-between items-center">
                        <div>
                          <div className="font-medium text-gray-800">{donation.charity}</div>
                          <div className="text-sm text-gray-600">{donation.impact}</div>
                          <div className="text-xs text-gray-500">{donation.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-green-600">{donation.points} points</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <Gift className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No donations yet. Start making an impact today!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AIRecommendationsPage;
