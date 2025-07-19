// Quote/Devis service for API interactions
const API_BASE_URL = "http://localhost:8080/api/v1";

export interface QuoteRequestDTO {
  totalAmount: number;
  demandId: number;
}

export interface CommentRequestDTO {
  content: string;
  type: string;
  demandId: number;
  quoteId: number;
}

export interface QuoteValidationRequest {
  quoteStatus: string;
  comment: CommentRequestDTO;
}

export interface Quote {
  createdBy: any;
  id: number;
  totalAmount: number;
  demandId: number;
  status: string;
  createdAt: string;
  updatedAt?: string;
  rejectionReason?: string; // Add rejection reason field
  bonCommand?: string; // URL of the attached file
  comments?: Array<{
    id: number;
    content: string;
    type: string;
    createdAt: string;
    createdBy?: {
      id: number;
      firstName: string;
      lastName: string;
    };
  }>; // Add comments array
  demand?: {
    id: number;
    title: string;
    description: string;
    status: string;
    createdBy: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
    };
  };
  provider?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  attachedFiles?: Array<{
    id: number;
    fileName: string;
    fileUrl: string;
    uploadedAt: string;
    uploadedBy?: {
      id: number;
      firstName: string;
      lastName: string;
    };
  }>;
}

export interface QuoteUpdateDTO {
  id: number;
  totalAmount: number;
}

export interface QuoteManageDTO {
  attachedFile: File;
  quoteId: number;
}

class QuoteService {
  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
  }

  async getAllQuotes(): Promise<Quote[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/quotes`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching quotes:', error);
      throw error;
    }
  }

  async createQuote(quoteData: QuoteRequestDTO): Promise<Quote> {
    try {
      const response = await fetch(`${API_BASE_URL}/quotes`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(quoteData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating quote:', error);
      throw error;
    }
  }

  async validateQuote(validationData: QuoteValidationRequest): Promise<Quote> {
    try {
      const response = await fetch(`${API_BASE_URL}/quotes/validate`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(validationData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error validating quote:', error);
      throw error;
    }
  }

  async updateQuote(updateData: QuoteUpdateDTO): Promise<Quote> {
    try {
      const response = await fetch(`${API_BASE_URL}/quotes`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating quote:', error);
      throw error;
    }
  }

  async getQuoteById(quoteId: number): Promise<Quote> {
    try {
      const response = await fetch(`${API_BASE_URL}/quotes/${quoteId}`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching quote details:', error);
      throw error;
    }
  }

  async manageQuote(quoteId: number, attachedFile: File): Promise<Quote> {
    try {
      const formData = new FormData();
      formData.append('attachedFile', attachedFile);
      formData.append('quoteId', quoteId.toString());

      const token = localStorage.getItem('authToken');
      const headers: Record<string, string> = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/quotes/manage`, {
        method: 'PUT',
        headers: headers,
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error managing quote:', error);
      throw error;
    }
  }
}

export const quoteService = new QuoteService();
