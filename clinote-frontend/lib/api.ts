const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
}

interface Patient {
  _id: string;
  userId: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  createdAt: string;
  updatedAt: string;
}

interface Note {
  _id: string;
  userId: string;
  // patientId can be a string id or a populated Patient object returned by the backend
  patientId: string | Patient;
  templateType: 'SOAP' | 'PROGRESS' | 'CONSULTATION' | 'DISCHARGE' | 'General Medicine';
  transcript: string;
  aiGeneratedNote: {
    summary: string;
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
  };
  audioUrl?: string;
  status: 'draft' | 'processing' | 'completed';
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
}

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const user = this.getStoredUser();
    return {
      'Content-Type': 'application/json',
      ...(user?.token && { Authorization: `Bearer ${user.token}` }),
    };
  }

  private getStoredUser(): User | null {
    if (typeof window === 'undefined') return null;
    const userData = localStorage.getItem('clinote_user');
    return userData ? JSON.parse(userData) : null;
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    let data: any = {};
    try {
      data = await response.json();
    } catch (e) {
      // non-json response
    }

    if (!response.ok) {
      // If unauthorized, clear stored user and redirect to login (if running in browser)
      if (response.status === 401) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('clinote_user');
          // navigate to login page so UI doesn't stay in a logged-in state
          window.location.href = '/login';
        }
        throw new Error(data?.message || 'Not authorized, please login again');
      }

      throw new Error(data?.message || 'API request failed');
    }

    return data;
  }

  // Auth endpoints
  async register(name: string, email: string, password: string): Promise<ApiResponse<User>> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const result = await this.handleResponse<User>(response);

    if (result.success && result.data) {
      localStorage.setItem('clinote_user', JSON.stringify(result.data));
    }

    return result;
  }

  async login(email: string, password: string): Promise<ApiResponse<User>> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const result = await this.handleResponse<User>(response);

    if (result.success && result.data) {
      localStorage.setItem('clinote_user', JSON.stringify(result.data));
    }

    return result;
  }

  async getProfile(): Promise<ApiResponse<User>> {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse<User>(response);
  }

  // Patient endpoints
  async createPatient(name: string, age: number, gender: 'Male' | 'Female' | 'Other'): Promise<ApiResponse<Patient>> {
    const response = await fetch(`${API_BASE_URL}/patients`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ name, age, gender }),
    });

    return this.handleResponse<Patient>(response);
  }

  async getAllPatients(): Promise<ApiResponse<Patient[]>> {
    const response = await fetch(`${API_BASE_URL}/patients`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse<Patient[]>(response);
  }

  async getPatientById(id: string): Promise<ApiResponse<Patient>> {
    const response = await fetch(`${API_BASE_URL}/patients/${id}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse<Patient>(response);
  }

  async deletePatient(id: string): Promise<ApiResponse<void>> {
    const response = await fetch(`${API_BASE_URL}/patients/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse<void>(response);
  }

  // Note endpoints
  async createNote(patientId: string, templateType: string, transcript: string): Promise<ApiResponse<Note>> {
    const response = await fetch(`${API_BASE_URL}/notes`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ patientId, templateType, transcript }),
    });

    return this.handleResponse<Note>(response);
  }

  async getAllNotes(): Promise<ApiResponse<Note[]>> {
    const response = await fetch(`${API_BASE_URL}/notes/all`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse<Note[]>(response);
  }

  async getNotesByPatient(patientId: string): Promise<ApiResponse<Note[]>> {
    const response = await fetch(`${API_BASE_URL}/notes/patient/${patientId}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse<Note[]>(response);
  }

  async updateNoteById(noteId: string, updates: Partial<Note>): Promise<ApiResponse<Note>> {
    const response = await fetch(`${API_BASE_URL}/notes/note/${noteId}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(updates),
    });

    return this.handleResponse<Note>(response);
  }

  async deleteNoteById(noteId: string): Promise<ApiResponse<void>> {
    const response = await fetch(`${API_BASE_URL}/notes/note/${noteId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse<void>(response);
  }

  async getNoteById(id: string): Promise<ApiResponse<Note>> {
    const response = await fetch(`${API_BASE_URL}/notes/note/${id}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse<Note>(response);
  }

  // Audio endpoints
  async uploadAudio(audioFile: File): Promise<ApiResponse<{ audioUrl: string; transcript?: string }>> {
    const formData = new FormData();
    formData.append('audio', audioFile);

    const user = this.getStoredUser();
    const response = await fetch(`${API_BASE_URL}/audio/upload`, {
      method: 'POST',
      headers: {
        ...(user?.token && { Authorization: `Bearer ${user.token}` }),
      },
      body: formData,
    });

    return this.handleResponse<{ audioUrl: string; transcript?: string }>(response);
  }

  // AI endpoints
  async generateSOAPNote(patientId: string, transcript: string, templateType: string, audioUrl?: string): Promise<ApiResponse<Note>> {
    const response = await fetch(`${API_BASE_URL}/ai/generate-soap-and-save`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ patientId, transcript, templateType, audioUrl }),
    });

    return this.handleResponse<Note>(response);
  }

  // Utility methods
  logout(): void {
    localStorage.removeItem('clinote_user');
    // Dispatch a custom event so same-tab listeners can react to logout immediately
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('clinote_user_change'));
    }
  }

  isAuthenticated(): boolean {
    return !!this.getStoredUser()?.token;
  }

  getCurrentUser(): User | null {
    return this.getStoredUser();
  }
}

export const apiService = new ApiService();
export type { User, Patient, Note, ApiResponse };