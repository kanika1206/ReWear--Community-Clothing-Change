'use client';

import { useState } from 'react';
import { Camera, ChevronRight, Leaf, Search } from 'lucide-react';
import Link from 'next/link';

// Mock data for demonstration
interface Recommendation {
  id: number;
  title: string;
  description: string;
  size: string;
  points: number;
  uploader: string;
  location: string;
}

const mockRecommendations: Recommendation[] = [
  { id: 1, title: 'Casual Outfit', description: 'Perfect for everyday wear', size: 'M', points: 30, uploader: 'Jane D.', location: 'New York' },
  { id: 2, title: 'Formal Attire', description: 'Great for special occasions', size: 'L', points: 50, uploader: 'John S.', location: 'Los Angeles' },
  { id: 3, title: 'Summer Dress', description: 'Light and comfortable', size: 'S', points: 25, uploader: 'Emma W.', location: 'Miami' },
];

const AIRecommendationsPage = () => {
  const [currentUser] = useState({ points: 45 });

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Points */}
        <div className="flex justify-end mb-6">
          <div className="flex items-center bg-green-100 px-4 py-2 rounded-full">
            <Leaf className="w-4 h-4 text-green-600 mr-2" />
            <span className="text-sm font-medium text-green-700">{currentUser.points} points available</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">AI Style Assistant</h1>
            <p className="text-gray-600">Discover personalized fashion recommendations</p>
          </div>
          
          {/* Search and Filter */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for outfits..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
              <option>All Categories</option>
              <option>Casual</option>
              <option>Formal</option>
              <option>Work</option>
              <option>Sports</option>
            </select>
          </div>
          
          {/* Recommendations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockRecommendations.map(item => (
              <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <Camera className="w-12 h-12 text-gray-400" />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <span className="text-sm font-medium text-emerald-600">{item.points} pts</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Size: {item.size}</span>
                    <span>{item.uploader}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Charity Donation Banner */}
          <div className="mt-12 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-emerald-800 mb-2">Make an Impact</h3>
                <p className="text-emerald-700">Donate your points to support sustainable fashion initiatives and environmental causes. Your contributions help reduce textile waste and promote eco-friendly practices in the fashion industry.</p>
              </div>
              <Link 
                href="/charity-donations" 
                className="flex-shrink-0 bg-white text-emerald-700 hover:bg-emerald-50 border-2 border-emerald-200 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors hover:shadow-md"
              >
                Donate Now
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIRecommendationsPage;
