import { create } from "zustand";

const useFetchUnarchive = create(() => ({
  unarchiveNotes: [],
  loading: false,
  error: null,
  restoreUnarchive: async () => {},
}));
export default useFetchUnarchive;
