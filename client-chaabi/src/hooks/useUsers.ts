import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService, type UserResponseDTO, type UserRegisterDTO } from '../services/userService';

export const useUsers = () => {
  return useQuery<UserResponseDTO[], Error>({
    queryKey: ['users'],
    queryFn: () => userService.getAllUsers(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) => userService.deleteUser(userId),
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useRegisterUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: UserRegisterDTO) => userService.registerUser(userData),
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
