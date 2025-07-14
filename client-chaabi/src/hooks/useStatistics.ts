import { useQuery } from '@tanstack/react-query';
import { statisticsService } from '../services/statisticsService';
import type { UserStatisticsDTO } from '../types/statistics';

export const useUserStatistics = () => {
  return useQuery<UserStatisticsDTO>({
    queryKey: ['userStatistics'],
    queryFn: statisticsService.getUserStatistics,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    retry: 2,
  });
};
