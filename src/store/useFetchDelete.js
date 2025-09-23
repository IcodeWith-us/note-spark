import { supabase } from "@/lib/supabaseClient";
import { create } from "zustand";

const useFetchDelete = create((set) => ({
  deleteNotes: [],
  error: null,
  loading: false,
  fetchDeleteNotes: async () => {
    set({ loading: false, error: null });
    const { data, error } = await supabase.from("Bin_notes").select("*");
    if (error) {
      set({ error: error.message, loading: false });
    } else {
      set({ deleteNotes: data, loading: false });
    }
  },
}));
export default useFetchDelete;
