'use client';

// Mock data for demonstration
const mockItems = [
  {
    id: '1',
    title: 'Casual Summer Dress',
    description: 'Light and comfortable dress perfect for summer',
    image: '/products/dress1.jpg',
    category: 'dress',
    size: 'M',
    condition: 'Like New',
    points: 150,
    uploader: 'Sarah',
    location: 'New York',
    tags: ['summer', 'casual', 'dress'],
    features: {
      colors: ['blue', 'white'],
      style: 'casual',
      formality: 2,
      season: 'summer',
      occasion: 'daytime'
    }
  },
  // Add more mock items as needed
];

const mockCharities = [
  {
    id: 'charity1',
    name: 'Fashion Revolution',
    description: 'A global movement for a more sustainable fashion industry',
    logo: '👚',
    minDonation: 10,
    totalRaised: 15000,
    supporters: 1200,
    impact: 'Supports ethical fashion initiatives',
    conversionRate: '10 points = 1 item of clothing recycled'
  },
  // Add more charities as needed
];

class AIRecommendationEngine {
  private userProfiles: Record<string, any> = {};
  
  constructor() {
    // Initialize with default user profile
    this.getUserProfile('default');
  }

  // Get or create user profile
  getUserProfile(userId: string) {
    if (!this.userProfiles[userId]) {
      this.userProfiles[userId] = {
        preferences: {
          styles: [],
          colors: [],
          sizes: []
        },
        history: [],
        totalDonated: 0,
        charityImpact: {
          clothesRecycled: 0,
          treesPlanted: 0,
          wasteReduced: 0 // in kg
        }
      };
    }
    return this.userProfiles[userId];
  }

  // Update user preferences based on interaction
  updateUserProfile(userId: string, data: { item?: any; action?: string; preferences?: any }) {
    const profile = this.getUserProfile(userId);
    
    if (data.item) {
      // Add to history
      profile.history.unshift({
        itemId: data.item.id,
        action: data.action || 'viewed',
        timestamp: new Date().toISOString()
      });
      
      // Update preferences based on interaction
      if (data.action === 'like' || data.action === 'wishlist') {
        const item = data.item;
        if (item.features) {
          if (!profile.preferences.styles.includes(item.features.style)) {
            profile.preferences.styles.push(item.features.style);
          }
          item.features.colors.forEach((color: string) => {
            if (!profile.preferences.colors.includes(color)) {
              profile.preferences.colors.push(color);
            }
          });
          if (!profile.preferences.sizes.includes(item.size)) {
            profile.preferences.sizes.push(item.size);
          }
        }
      }
    }
    
    if (data.preferences) {
      profile.preferences = { ...profile.preferences, ...data.preferences };
    }
    
    return profile;
  }

  // Generate recommendations based on user profile
  generateRecommendations(userId: string, items: any[], context = 'general') {
    const profile = this.getUserProfile(userId);
    
    // Simple recommendation logic - can be enhanced with ML
    return items
      .map(item => {
        let score = 0;
        
        // Basic scoring based on user preferences
        if (item.features) {
          if (profile.preferences.styles.includes(item.features.style)) score += 30;
          
          item.features.colors.forEach((color: string) => {
            if (profile.preferences.colors.includes(color)) score += 20;
          });
          
          if (profile.preferences.sizes.includes(item.size)) score += 20;
          
          // Context-based scoring
          if (context === 'mood') {
            // Add mood-based scoring
            score += 10;
          } else if (context === 'event') {
            // Add event-based scoring
            score += 15;
          }
          
          // Add some randomness
          score += Math.random() * 10;
        }
        
        return { ...item, aiScore: score / 100 };
      })
      .sort((a, b) => b.aiScore - a.aiScore)
      .slice(0, 10); // Return top 10 recommendations
  }

  // Get mood-based recommendations
  getMoodBasedRecommendations(userId: string, items: any[], mood: string) {
    // In a real app, we would adjust recommendations based on mood
    return this.generateRecommendations(userId, items, 'mood');
  }

  // Get life event-based recommendations
  getLifeEventRecommendations(userId: string, items: any[], event: string) {
    // In a real app, we would adjust recommendations based on life event
    return this.generateRecommendations(userId, items, 'event');
  }

  // Make a donation and calculate impact
  makeDonation(userId: string, charityId: string, points: number) {
    const profile = this.getUserProfile(userId);
    const charity = mockCharities.find(c => c.id === charityId);
    
    if (!charity || points < charity.minDonation) {
      throw new Error(`Minimum donation is ${charity?.minDonation} points`);
    }
    
    // Update user's donation history
    profile.totalDonated += points;
    
    // Calculate impact (simplified)
    const impact = {
      clothesRecycled: Math.floor(points / 10), // 10 points = 1 item
      treesPlanted: Math.floor(points / 50),    // 50 points = 1 tree
      wasteReduced: Math.floor(points / 5)      // 5 points = 1kg waste reduced
    };
    
    // Update user's impact
    profile.charityImpact.clothesRecycled += impact.clothesRecycled;
    profile.charityImpact.treesPlanted += impact.treesPlanted;
    profile.charityImpact.wasteReduced += impact.wasteReduced;
    
    return impact;
  }
}

// Export a singleton instance
export const aiEngine = new AIRecommendationEngine();

// Export mock data for use in components
export { mockItems, mockCharities };
