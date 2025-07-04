import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { demandService } from '../services/demandService';
import type { CreateDemandRequest, Demand, UpdateDemandStatusRequest } from '../types/demand';

// Hook to fetch all demands
export const useDemands = () => {
  return useQuery({
    queryKey: ['demands'],
    queryFn: async () => {
      try {
        return await demandService.getDemands();
      } catch (error) {
        console.error('Error in useDemands:', error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1, // this will retry the query once on failure
  });
};

// Hook to fetch single demand by ID
export const useDemand = (id: string) => {
  return useQuery({
    queryKey: ['demand', id],
    queryFn: async () => {
      try {
        return await demandService.getDemandById(id);
      } catch (error) {
        console.error('Error in useDemand:', error);
        throw error;
      }
    },
    enabled: !!id, // Only run if ID exists
    retry: 1,
  });
};

// Hook to create new demand
export const useCreateDemand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (demandData: CreateDemandRequest) => {
      try {
        return await demandService.createDemand(demandData);
      } catch (error) {
        console.error('Error in useCreateDemand:', error);
        throw error;
      }
    },
    onSuccess: (newDemand) => {
      // Add new demand to cache
      queryClient.setQueryData(['demands'], (old: Demand[] | undefined) => {
        return old ? [newDemand, ...old] : [newDemand];
      });
      
      // Refresh demands list
      queryClient.invalidateQueries({ queryKey: ['demands'] });
    },
    onError: (error) => {
      console.error('Create demand mutation error:', error);
    },
  });
};

// Hook to update existing demand
export const useUpdateDemand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CreateDemandRequest> }) => {
      try {
        return await demandService.updateDemand(id, data);
      } catch (error) {
        console.error('Error in useUpdateDemand:', error);
        throw error;
      }
    },
    onSuccess: (updatedDemand) => {
      // Update single demand cache
      queryClient.setQueryData(['demand', updatedDemand.id.toString()], updatedDemand);
      
      // Update demand in list
      queryClient.setQueryData(['demands'], (old: Demand[] | undefined) => {
        return old?.map(demand => 
          demand.id === updatedDemand.id ? updatedDemand : demand
        ) || [];
      });
    },
    onError: (error) => {
      console.error('Update demand mutation error:', error);
    },
  });
};

// Hook to update demand status
export const useUpdateDemandStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, statusData }: { id: string; statusData: UpdateDemandStatusRequest }) => {
      try {
        // Validate that comment is provided when status is 'rejected'
        if (statusData.status === 'rejected' && !statusData.comment?.trim()) {
          throw new Error('Comment is required when rejecting a demand');
        }
        
        return await demandService.updateDemandStatus(id, statusData);
      } catch (error) {
        console.error('Error in useUpdateDemandStatus:', error);
        throw error;
      }
    },
    onSuccess: (updatedDemand) => {
      // Update single demand cache
      queryClient.setQueryData(['demand', updatedDemand.id.toString()], updatedDemand);
      
      // Update demand in list
      queryClient.setQueryData(['demands'], (old: Demand[] | undefined) => {
        return old?.map(demand => 
          demand.id === updatedDemand.id ? updatedDemand : demand
        ) || [];
      });
      
      // Invalidate queries to ensure fresh data
      queryClient.invalidateQueries({ queryKey: ['demands'] });
    },
    onError: (error) => {
      console.error('Update demand status mutation error:', error);
    },
  });
};

// Hook to delete demand
export const useDeleteDemand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      try {
        return await demandService.deleteDemand(id);
      } catch (error) {
        console.error('Error in useDeleteDemand:', error);
        throw error;
      }
    },
    onSuccess: (_, deletedId) => {
      // Remove from demands list
      queryClient.setQueryData(['demands'], (old: Demand[] | undefined) => {
        return old?.filter(demand => demand.id.toString() !== deletedId) || [];
      });
      
      // Remove single demand cache
      queryClient.removeQueries({ queryKey: ['demand', deletedId] });
    },
    onError: (error) => {
      console.error('Delete demand mutation error:', error);
    },
  });
};

