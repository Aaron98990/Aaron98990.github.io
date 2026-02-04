const API_BASE_URL = 'https://buzzin.feleke.xyz';

export const apiService = {
  async getBuzzInCount() {
    try {
      const response = await fetch(`${API_BASE_URL}/buzzInCount`);
      const data = await response.json();
      return data.count || 0;
    } catch (error) {
      console.error('Failed to fetch buzz in count:', error);
      return 0;
    }
  },

  async getGeoCount() {
    try {
      const response = await fetch(`${API_BASE_URL}/geoCount`);
      const data = await response.json();
      return data.count || 0;
    } catch (error) {
      console.error('Failed to fetch geo count:', error);
      return 0;
    }
  },

  async getWiiInspectCount() {
    try {
      const response = await fetch(`${API_BASE_URL}/wiiInspectCount`);
      const data = await response.json();
      return data.count || 0;
    } catch (error) {
      console.error('Failed to fetch wii inspect count:', error);
      return 0;
    }
  },

  async getAllCounts() {
    const [buzzInCount, geoCount, wiiInspectCount] = await Promise.all([
      this.getBuzzInCount(),
      this.getGeoCount(),
      this.getWiiInspectCount()
    ]);
    
    return {
      buzzInCount,
      geoCount,
      wiiInspectCount
    };
  }
};