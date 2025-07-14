export interface Article {
  id: number; // Changed from string to number
  name: string;
  quantity: number;
  description: string;
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
  status:'CREATED' | 'RESPONSIBLE_APPROVED' | 'RESPONSIBLE_REJECTED' | 'TECHNICIAN_APPROVED' | 'TECHNICIAN_REJECTED' | 'IN_PROGRESS' | 'DONE';
  createdAt: string;
  createdBy: string;
  rejectionComment?: string; // Add rejection comment field
}

export interface DemandFilters {
  status?: 'CREATED' | 'RESPONSIBLE_APPROVED' | 'RESPONSIBLE_REJECTED' | 'TECHNICIAN_APPROVED' | 'TECHNICIAN_REJECTED' | 'IN_PROGRESS' | 'DONE';
  search?: string;
  page?: number;
  limit?: number;
}

// New types for status update
export interface UpdateDemandStatusRequest {
  status: 'CREATED' | 'RESPONSIBLE_APPROVED' | 'RESPONSIBLE_REJECTED' | 'TECHNICIAN_APPROVED' | 'TECHNICIAN_REJECTED' | 'IN_PROGRESS' | 'DONE';
  comment?: string; // Required when status is 'rejected'
}

// Update demand request matching backend DTO
export interface UpdateDemandRequest {
  id: number;
  title: string;
  description: string;
  articles: ArticleUpdateDTO[];
}

export interface ArticleUpdateDTO {
  id?: number; // Optional for new articles
  name: string;
  description: string;
  quantity: number;
}

// New types for demand validation/approval
export interface CommentRequestDTO {
  content: string;
  type: string; // Backend CommentType enum: "APPROVED" | "REJECTED"
  demandId: number;
  quoteId?: number; // Optional since it might not always be needed
}

export interface DemandValidateDTO {
  demandStatus: string;
  comment: CommentRequestDTO;
}
