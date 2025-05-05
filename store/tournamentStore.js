import { create } from 'zustand';
import { fetchRegisteredTournaments } from '../services/tournamentService';

export const useTournamentStore = create((set) => ({
  allTournaments: [],
  live: [],
  upcoming: [],
  completed: [],

  loadTournaments: async () => {
    try {
      const response = await fetchRegisteredTournaments();
      const all = response?.tournaments || [];
      const now = new Date();

      const live = all.filter((t) => {
        const start = new Date(t.matchDateTime);
        const end = new Date(start.getTime() + 30 * 60 * 1000);
        return now >= start && now <= end;
      });

      const upcoming = all.filter((t) => new Date(t.matchDateTime) > now);

      const completed = all.filter((t) => {
        const end = new Date(
          new Date(t.matchDateTime).getTime() + 30 * 60 * 1000
        );
        return now > end;
      });

      set({ allTournaments: all, live, upcoming, completed });
    } catch (error) {
      console.error('Error loading tournaments:', error.message);
      set({ allTournaments: [], live: [], upcoming: [], completed: [] });
    }
  },
}));
