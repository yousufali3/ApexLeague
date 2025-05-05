import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuthStore = create((set) => ({
  token: null,
  user: null,

  setToken: async (token) => {
    set({ token });
    await AsyncStorage.setItem('token', token);
  },

  setUser: async (user) => {
    set({ user });
    await AsyncStorage.setItem('user', JSON.stringify(user));
  },

  logout: async () => {
    set({ token: null });
    await AsyncStorage.removeItem('token');
  },

  loadToken: async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      set({ token });
    }
  },
}));
