// store/tournamentStore.ts
import { create } from "zustand";
import { fetchAllTournaments } from "../services/tournamentService";

export const useAllTournamentsStore = create((set) => ({
  allTournaments: [],
  upcoming: [],
  completed: [],

  loadAllTournaments: async () => {
    try {
      const response = await fetchAllTournaments();
      const all = response?.tournaments || [];
      const now = new Date();

      const upcoming = all.filter((t) => new Date(t.matchDateTime) > now);

      const completed = all.filter((t) => new Date(t.matchDateTime) <= now);

      set({ allTournaments: all, upcoming, completed });
    } catch (error) {
      console.error("Error loading all tournaments:", error.message);
      set({ allTournaments: [], upcoming: [], completed: [] });
    }
  },
}));
