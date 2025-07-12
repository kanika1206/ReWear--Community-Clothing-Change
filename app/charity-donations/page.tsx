'use client';

import { useState } from 'react';
import { Heart, Trophy, Leaf, Gift, ChevronRight, Award } from 'lucide-react';

interface Charity {
  id: string;
  name: string;
  description: string;
  logo: string;
  minDonation: number;
  totalRaised: number;
  supporters: number;
  impact: string;
  conversionRate: string;
  pointsRequired: number;
  icon: 'trophy' | 'leaf' | 'award';
}

const mockCharities: Charity[] = [
  {
    id: '1',
    name: 'Fashion Revolution',
    description: 'Campaigning for a clean, safe, fair, transparent and accountable fashion industry',
    logo: '👕',
    minDonation: 10,
    totalRaised: 50000,
    supporters: 2500,
    impact: '10 clothes recycled per 100 points',
    conversionRate: '100 points = 10 items recycled',
    pointsRequired: 100,
    icon: 'trophy'
  },
  {
    id: '2',
    name: 'Textile Recycling International',
    description: 'Reducing the environmental impact of textile waste through recycling',
    logo: '♻️',
    minDonation: 5,
    totalRaised: 35000,
    supporters: 1800,
    impact: '1 tree planted per 50 points',
    conversionRate: '50 points = 1 tree',
    pointsRequired: 50,
    icon: 'leaf'
  },
  {
    id: '3',
    name: 'Sustainable Apparel Coalition',
    description: 'Transforming the fashion industry through sustainable practices',
    logo: '🌍',
    minDonation: 20,
    totalRaised: 75000,
    supporters: 3200,
    impact: '1kg waste reduced per 25 points',
    conversionRate: '25 points = 1kg waste reduced',
    pointsRequired: 25,
    icon: 'award'
  }
];

interface Donation {
  id: number;
  charity: string;
  points: number;
  date: string;
  impact: string;
}

const CharityDonationsPage = () => {
  const [currentPoints, setCurrentPoints] = useState(45);
  const [donationHistory, setDonationHistory] = useState<Donation[]>([
    { id: 1, charity: "Fashion Revolution", points: 20, date: "2 days ago", impact: "2 clothes recycled" },
    { id: 2, charity: "Textile Recycling International", points: 30, date: "1 week ago", impact: "1 tree planted" }
  ]);

  const handleDonate = (charityId: string, points: number) => {
    if (currentPoints >= points) {
      const charity = mockCharities.find(c => c.id === charityId);
      if (charity) {
        const newDonation: Donation = {
          id: Date.now(),
          charity: charity.name,
          points: points,
          date: 'Just now',
          impact: `${points / charity.pointsRequired} ${charity.impact.split(' ').slice(1).join(' ')}`
        };
        
        setDonationHistory([newDonation, ...donationHistory]);
        setCurrentPoints(prev => prev - points);
        
        // Here you would typically make an API call to update the user's points
        // and record the donation in your database
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold mb-6">Support a Cause</h1>
            <p className="text-gray-600 mb-8">
              Your points can make a difference. Donate to support sustainable fashion initiatives and environmental causes.
            </p>

            {/* Available Charities */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Featured Charities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockCharities.map((charity) => (
                  <div key={charity.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{charity.name}</h3>
                        <p className="text-gray-600 text-sm mt-1">{charity.description}</p>
                      </div>
                      <div className="bg-emerald-50 p-2 rounded-full">
                        {charity.icon === 'trophy' ? (
                          <Trophy className="w-6 h-6 text-emerald-600" />
                        ) : charity.icon === 'leaf' ? (
                          <Leaf className="w-6 h-6 text-emerald-600" />
                        ) : (
                          <Award className="w-6 h-6 text-emerald-600" />
                        )}
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500">Impact:</span>
                        <span className="text-sm font-medium">{charity.impact}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Points needed:</span>
                        <span className="text-emerald-600 font-semibold">{charity.pointsRequired}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDonate(charity.id, charity.pointsRequired)}
                      disabled={currentPoints < charity.pointsRequired}
                      className={`mt-4 w-full py-2 px-4 rounded-full flex items-center justify-center gap-2 ${
                        currentPoints >= charity.pointsRequired
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:opacity-90'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Donate {charity.pointsRequired} points
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:w-1/3">
            <div className="bg-gray-50 rounded-xl p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-4">Your Impact</h2>
              
              {/* Points Balance */}
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Available Points</p>
                    <p className="text-2xl font-bold">{currentPoints}</p>
                  </div>
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <Gift className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Earn more points by completing challenges</p>
              </div>

              {/* Donation History */}
              <div>
                <h3 className="font-medium mb-3">Recent Donations</h3>
                {donationHistory.length > 0 ? (
                  <div className="space-y-4">
                    {donationHistory.map((donation) => (
                      <div key={donation.id} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                        <div className="bg-emerald-50 p-2 rounded-full">
                          <Heart className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <span className="font-medium">{donation.charity}</span>
                            <span className="text-emerald-600 font-medium">-{donation.points} pts</span>
                          </div>
                          <p className="text-xs text-gray-500">{donation.impact} • {donation.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No donations yet. Make your first donation today!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharityDonationsPage;
