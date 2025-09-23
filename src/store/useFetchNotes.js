import { create } from "zustand";
import { supabase } from "../lib/supabaseClient";

const useFetchNotes = create((set) => ({
  notes: [],
  loading: false,
  error: null,
  fetchNotes: async () => {
    set({ loading: true, error: null });
    const { data, error } = await supabase.from("Notes").select("*");
    if (error) {
      set({ error: error.message, loading: false });
    } else {
      set({ notes: data, loading: false });
    }
  },
}));
export default useFetchNotes;
