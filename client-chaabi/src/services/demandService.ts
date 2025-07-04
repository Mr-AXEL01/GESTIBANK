import type {
  CreateDemandRequest,
  Demand,
  DemandFilters,
  UpdateDemandStatusRequest,
} from "../types/demand";

const API_BASE_URL = "http://localhost:8080/api/v1";

class DemandService {
  constructor() {
    // Bind methods to ensure correct `this` context

    this.createDemand = this.createDemand.bind(this);
    this.getDemands = this.getDemands.bind(this);
    this.getDemandById = this.getDemandById.bind(this);
    this.updateDemand = this.updateDemand.bind(this);
    this.updateDemandStatus = this.updateDemandStatus.bind(this);
    this.deleteDemand = this.deleteDemand.bind(this);
  }

  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('authToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  private createFormData(demandData: CreateDemandRequest): FormData {
    const formData = new FormData();

    formData.append("title", demandData.title);
    formData.append("description", demandData.description);
    
    // Send articles as individual form fields
    demandData.articles.forEach((article, index) => {
      formData.append(`articles[${index}].name`, article.name);
      formData.append(`articles[${index}].quantity`, article.quantity.toString());
      formData.append(`articles[${index}].description`, article.description);
      formData.append(`articles[${index}].price`, article.price.toString());
    });

    if (demandData.file) {
      formData.append("attachedFile", demandData.file);
    }

    return formData;
  }

  async getDemands(filters?: DemandFilters): Promise<Demand[]> {
    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString());
        }
      });
    }

    const url = `${API_BASE_URL}/demands${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    const response = await fetch(url, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<Demand[]>(response);
  }

  async getDemandById(id: string): Promise<Demand> {
    const response = await fetch(`${API_BASE_URL}/demands/${id}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<Demand>(response);
  }

  async createDemand(demandData: CreateDemandRequest): Promise<Demand> {
    const formData = this.createFormData(demandData);

    const response = await fetch(`${API_BASE_URL}/demands`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: formData,
    });

    return this.handleResponse<Demand>(response);
  }

  async updateDemand(
    id: string,
    demandData: Partial<CreateDemandRequest>
  ): Promise<Demand> {
    const formData = new FormData();

    if (demandData.title) formData.append("title", demandData.title);
    if (demandData.description)
      formData.append("description", demandData.description);
    if (demandData.articles) {
      demandData.articles.forEach((article, index) => {
        formData.append(`articles[${index}].name`, article.name);
        formData.append(`articles[${index}].quantity`, article.quantity.toString());
        formData.append(`articles[${index}].description`, article.description);
        formData.append(`articles[${index}].price`, article.price.toString());
      });
    }
    if (demandData.file) formData.append("attachedFile", demandData.file);

    const response = await fetch(`${API_BASE_URL}/demands/${id}`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: formData,
    });

    return this.handleResponse<Demand>(response);
  }

  async updateDemandStatus(
    id: string,
    statusData: UpdateDemandStatusRequest
  ): Promise<Demand> {
    const response = await fetch(`${API_BASE_URL}/demands/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify(statusData),
    });

    return this.handleResponse<Demand>(response);
  }

  async deleteDemand(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/demands/${id}`, {
      method: "DELETE",
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || `HTTP error! status: ${response.status}`);
    }
  }
}

export const demandService = new DemandService();
