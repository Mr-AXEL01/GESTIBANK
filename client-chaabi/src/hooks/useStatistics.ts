import { useQuery } from '@tanstack/react-query';
import { statisticsService } from '../services/statisticsService';
import type { UserStatisticsDTO, ProviderStatisticsDTO, TechnicianStatisticsDTO } from '../types/statistics';

export const useUserStatistics = () => {
  return useQuery<UserStatisticsDTO>({
    queryKey: ['userStatistics'],
    queryFn: statisticsService.getUserStatistics,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    retry: 2,
  });
};

export const useProviderStatistics = () => {
  return useQuery<ProviderStatisticsDTO>({
    queryKey: ['providerStatistics'],
    queryFn: statisticsService.getProviderStatistics,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    retry: 2,
  });
};

export const useTechnicianStatistics = () => {
  return useQuery<TechnicianStatisticsDTO>({
    queryKey: ['technicianStatistics'],
    queryFn: statisticsService.getTechnicianStatistics,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    retry: 2,
  });
};
