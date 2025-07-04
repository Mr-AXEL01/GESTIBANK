import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';

import { useUpdateDemandStatus } from '../../hooks/useDemands';
import type { Demand } from '../../types/demand';

const statusUpdateSchema = z.object({
  status: z.enum(['pending', 'approved', 'rejected']),
  comment: z.string().optional(),
}).refine((data) => {
  if (data.status === 'rejected' && !data.comment?.trim()) {
    return false;
  }
  return true;
}, {
  message: 'Comment is required when rejecting a demand',
  path: ['comment'],
});

type StatusUpdateFormData = z.infer<typeof statusUpdateSchema>;

interface DemandStatusUpdateProps {
  demand: Demand;
  onSuccess?: () => void;
}

export const DemandStatusUpdate: React.FC<DemandStatusUpdateProps> = ({ 
  demand, 
  onSuccess 
}) => {
  const updateStatusMutation = useUpdateDemandStatus();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<StatusUpdateFormData>({
    resolver: zodResolver(statusUpdateSchema),
    defaultValues: {
      status: demand.status,
      comment: demand.rejectionComment || '',
    },
  });

  const selectedStatus = watch('status');

  const onSubmit = async (data: StatusUpdateFormData) => {
    try {
      await updateStatusMutation.mutateAsync({
        id: demand.id.toString(),
        statusData: {
          status: data.status,
          comment: data.comment,
        },
      });

      toast.success('Demand status updated successfully!');
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update demand status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-100';
      case 'rejected':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-yellow-600 bg-yellow-100';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Update Demand Status</h3>
      
      <div className="mb-4">
        <span className="text-sm text-gray-500">Current Status: </span>
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(demand.status)}`}>
          {demand.status.toUpperCase()}
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Status *
          </label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            )}
          />
        </div>

        {selectedStatus === 'rejected' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rejection Comment *
            </label>
            <Controller
              name="comment"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 ${
                    errors.comment ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Please provide a reason for rejection..."
                />
              )}
            />
            {errors.comment && (
              <p className="mt-1 text-sm text-red-600">{errors.comment.message}</p>
            )}
          </div>
        )}

        {selectedStatus === 'approved' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Approval Comment (Optional)
            </label>
            <Controller
              name="comment"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Optional approval notes..."
                />
              )}
            />
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => reset()}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={updateStatusMutation.isPending}
            className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {updateStatusMutation.isPending ? 'Updating...' : 'Update Status'}
          </button>
        </div>
      </form>
    </div>
  );
};
