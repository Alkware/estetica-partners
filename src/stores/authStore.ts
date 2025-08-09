import { create } from 'zustand';
import { Partner } from '../types/partner.types';
import { authenticatePartner } from '@/api/partner.api';

interface AuthState {
  partner: Partner | null;
  isAuthenticated: boolean;
  authenticate: () => Promise<Partner | null>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  partner: null,
  isAuthenticated: false,
  
  authenticate: async () => {
    // Mock authentication

    const response = await authenticatePartner();

    if (response.success) {

      set({ partner: response.data, isAuthenticated: true });
      return response.data;
    }
    return null;
  },
  
  logout: () => {
    localStorage.removeItem("token")
    set({ partner: null, isAuthenticated: false });
  }

}));