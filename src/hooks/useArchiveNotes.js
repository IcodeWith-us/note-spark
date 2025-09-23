import { supabase } from "@/lib/supabaseClient";
import useFetchArchive from "@/store/useFetchArchive";
import useFetchNotes from "@/store/useFetchNotes";
import { useEffect } from "react";
import { toast } from "sonner";

export default function useArchiveNotes() {
  const { fetchArchive } = useFetchArchive();

  useEffect(() => {
    fetchArchive();
  }, [fetchArchive]);

  const handleUnarchive = async (note) => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) {
      console.log("error getting userr...", userError.message);
      return;
    }
    const payload = {
      notes_title: note.notes_title,
      notes_description: note.notes_description,
      user_id: user.id,
    };
    if (note.image_url) {
      payload.image_url = note.image_url;
    }

    try {
      const { data: inserted, error: insertError } = await supabase
        .from("Notes")
        .insert([payload])
        .select();
      console.log(payload);

      if (insertError) throw insertError;
      const { error: deleteError } = await supabase
        .from("Archive_notes")
        .delete()
        .eq("id", note.id);

      if (deleteError) throw deleteError;

      useFetchNotes.setState((state) => ({
        notes: [...state.notes, inserted[0]],
      }));
      useFetchArchive.setState((state) => ({
        archiveNotes: state.archiveNotes.filter((n) => n.id !== note.id),
      }));
      console.log("Note Unarchived successfully!");
      toast.success("Note unarchived!");
    } catch (err) {
      console.error("Error Unarchiving note:", err.message);
      toast.error("error to unarchive Note");
    }
  };

  const handleDeleteForever = async (note) => {
    const { error } = await supabase
      .from("Archive_notes")
      .delete()
      .eq("id", note.id);
    if (error) throw error;
    fetchArchive();
  };
  return { handleUnarchive, handleDeleteForever };
}

//opacity-0 group-hover:opacity-100 transition
// 1. Insert back into Notes
// 2. Delete from Archive_notes
// 3. Update Zustand stores //// add to Notes store
// remove from Archive
