import { create } from "zustand";
import { supabase } from "../lib/supabaseClient";

const useFetchNotes = create((set, get) => ({
  notes: [],
  loading: false,
  error: null,
  fetchNotes: async () => {
    set({ loading: true, error: null });
    const { data, error } = await supabase
      .from("Notes")
      .select("*")
      .order("pinned", { ascending: false })
      .order("created_at", { ascending: false });
    if (error) {
      set({ error: error.message, loading: false });
    } else {
      set({ notes: data, loading: false });
    }
  },
  updatePinnedNote: async (id, pinned) => {
    set({ loading: true, error: null });
    const { error } = await supabase
      .from("Notes")
      .update({ pinned })
      .eq("id", id);

    if (error) {
      set({ error: error.message, loading: false });
    } else {
      const notes = get()
        .notes.map((note) => (note.id === id ? { ...note, pinned } : note))
        .sort((a, b) => {
          if (b.pinned !== a.pinned) return b.pinned - a.pinned;
          return new Date(b.created_at) - new Date(a.created_at);
        });

      set({ notes, loading: false });
    }
  },
}));
export default useFetchNotes;
