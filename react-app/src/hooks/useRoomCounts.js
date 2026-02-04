import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export const useRoomCounts = () => {
  const [counts, setCounts] = useState({
    buzzInCount: 0,
    geoCount: 0,
    wiiInspectCount: 0
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCounts = async () => {
    try {
      setError(null);
      const newCounts = await apiService.getAllCounts();
      setCounts(newCounts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
    
    // Refresh every 5 minutes
    const interval = setInterval(fetchCounts, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return { counts, loading, error, refetch: fetchCounts };
};