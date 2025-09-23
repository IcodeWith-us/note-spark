import { supabase } from "@/lib/supabaseClient";
import { create } from "zustand";

const useFetchArchive = create((set) => ({
  archiveNotes: [],
  loading: false,
  error: null,
  fetchArchive: async () => {
    set({ loading: false, error: null });
    const { data, error } = await supabase.from("Archive_notes").select("*");
    if (error) {
      set({ error: error.message, loading: null });
    } else {
      set({ archiveNotes: data, loading: false });
    }
  },
}));
export default useFetchArchive;
