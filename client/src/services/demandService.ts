import type {
  CreateDemandRequest,
  Demand,
  DemandFilters,
  UpdateDemandStatusRequest,
} from "../types/demand";

const API_BASE_URL =  "http://localhost:3001/api";

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
    formData.append("articles", JSON.stringify(demandData.articles));

    if (demandData.file) {
      formData.append("file", demandData.file);
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
    const response = await fetch(url);
    return this.handleResponse<Demand[]>(response);
  }

  async getDemandById(id: string): Promise<Demand> {
    const response = await fetch(`${API_BASE_URL}/demands/${id}`);
    return this.handleResponse<Demand>(response);
  }

  async createDemand(demandData: CreateDemandRequest): Promise<Demand> {
    const formData = this.createFormData(demandData);

    const response = await fetch(`${API_BASE_URL}/demands`, {
      method: "POST",
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
    if (demandData.articles)
      formData.append("articles", JSON.stringify(demandData.articles));
    if (demandData.file) formData.append("file", demandData.file);

    const response = await fetch(`${API_BASE_URL}/demands/${id}`, {
      method: "PUT",
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
      },
      body: JSON.stringify(statusData),
    });

    return this.handleResponse<Demand>(response);
  }

  async deleteDemand(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/demands/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || `HTTP error! status: ${response.status}`);
    }
  }
}

export const demandService = new DemandService();
