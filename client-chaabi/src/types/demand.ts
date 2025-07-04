export interface Article {
  id: number; // Changed from string to number
  name: string;
  quantity: number;
  description: string;
  price: number;
}

export interface CreateDemandRequest {
  title: string; 
  description: string;
  articles: Omit<Article, 'id'>[];
  file?: File;
}

export interface Demand {
  id: number; // Changed from string to number
  title: string;
  description: string;
  articles: Article[];
  fileName?: string;
  fileUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  createdBy: string;
  rejectionComment?: string; // Add rejection comment field
}

export interface DemandFilters {
  status?: 'pending' | 'approved' | 'rejected';
  search?: string;
  page?: number;
  limit?: number;
}

// New types for status update
export interface UpdateDemandStatusRequest {
  status: 'pending' | 'approved' | 'rejected';
  comment?: string; // Required when status is 'rejected'
}
