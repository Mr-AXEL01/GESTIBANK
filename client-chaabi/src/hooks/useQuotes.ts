import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { quoteService } from '../services/quoteService';
import type { QuoteRequestDTO } from '../services/quoteService';

export const useQuotes = () => {
  return useQuery({
    queryKey: ['quotes'],
    queryFn: () => quoteService.getAllQuotes(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateQuote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (quoteData: QuoteRequestDTO) => quoteService.createQuote(quoteData),
    onSuccess: () => {
      // Invalidate and refetch both demands and quotes to update the UI
      queryClient.invalidateQueries({ queryKey: ['demands'] });
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
    },
  });
};

export const useManageQuote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ quoteId, attachedFile }: { quoteId: number; attachedFile: File }) => 
      quoteService.manageQuote(quoteId, attachedFile),
    onSuccess: () => {
      // Invalidate and refetch quotes to update the UI
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
      queryClient.invalidateQueries({ queryKey: ['demands'] });
    },
  });
};
