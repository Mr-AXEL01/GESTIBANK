const API_BASE_URL = "http://localhost:8080/api/v1";

export interface UserResponseDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
  demands?: any[]; // Not used in display
  quotes?: any[]; // Not used in display
}

class UserService {
  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('authToken');
    return token ? { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    } : { 'Content-Type': 'application/json' };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async getAllUsers(): Promise<UserResponseDTO[]> {
    try {
      console.log('Making API call to get all users...');
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      console.log('API Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('API Response data:', data);
      return data;
    } catch (error) {
      console.error('Error in getAllUsers:', error);
      throw error;
    }
  }

  async deleteUser(userId: number): Promise<void> {
    try {
      console.log('Deleting user with ID:', userId);
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });
      
      console.log('Delete response status:', response.status);
      
      if (!response.ok) {
        const error = await response.text();
        console.error('Delete error:', error);
        throw new Error(error || `HTTP error! status: ${response.status}`);
      }
      
      console.log('User deleted successfully');
    } catch (error) {
      console.error('Error in deleteUser:', error);
      throw error;
    }
  }
}

export const userService = new UserService();
