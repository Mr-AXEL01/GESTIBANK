import type { UserStatisticsDTO } from '../types/statistics';

const API_BASE_URL = 'http://localhost:8080/api/v1';

export const statisticsService = {
  async getUserStatistics(): Promise<UserStatisticsDTO> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/statistics/demands`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch statistics');
    }
    return response.json();
  },
};
