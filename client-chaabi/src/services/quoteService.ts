// Quote/Devis service for API interactions
const API_BASE_URL = "http://localhost:8080/api/v1";

export interface QuoteRequestDTO {
  totalAmount: number;
  demandId: number;
}

export interface Quote {
  id: number;
  totalAmount: number;
  demandId: number;
  status: string;
  createdAt: string;
  updatedAt?: string;
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
}

export const quoteService = new QuoteService();
