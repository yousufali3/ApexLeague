import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuthStore = create((set) => ({
  token: null,
  user: null,
  balance: 0,
  setBalance: async (balance) => {
    set({ balance });
    await AsyncStorage.setItem('balance', JSON.stringify(balance));
  },
  getBalance: async () => {
    const balance = await AsyncStorage.getItem('balance');
    if (balance) {
      set({ balance: JSON.parse(balance) });
    }
  },

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
  loadUser: async () => {
    const user = await AsyncStorage.getItem('user');
    if (user) {
      set({ user: JSON.parse(user) });
    }
  },
}));
