import { supabase } from "@/lib/supabaseClient";
import useFetchDelete from "@/store/useFetchDelete";
import useFetchNotes from "@/store/useFetchNotes";
import { toast } from "sonner";

export default function useBinNotes() {
  const { fetchDeleteNotes } = useFetchDelete();

  const handleRestore = async (note) => {
    const payload = {
      notes_title: note.notes_title,
      notes_description: note.notes_description,
      image_url: note.image_url,
    };
    try {
      const { data: inserted, error: insertError } = await supabase
        .from("Notes")
        .insert([payload])
        .select();
      console.log(payload);

      if (insertError) throw insertError;
      const { error: deleteError } = await supabase
        .from("Bin_notes")
        .delete()
        .eq("id", note.id);

      if (deleteError) throw deleteError;

      useFetchNotes.setState((state) => ({
        notes: [...state.notes, inserted[0]],
      }));

      useFetchDelete.setState((state) => ({
        deleteNotes: state.deleteNotes.filter((n) => n.id !== note.id),
      }));
      console.log("Note Restore successfully!");
      toast.success("Note restored successfully! 🎉");
    } catch (err) {
      console.error("Error Restoring note:", err.message);
      toast.error("Failed to restore note ❌");
    }
  };

  const handleDeleteForever = async (note) => {
    const { error } = await supabase
      .from("Bin_notes")
      .delete()
      .eq("id", note.id);
    if (error) throw error;
    fetchDeleteNotes();
    toast.success("Note deleted permanently");
  };
  return { handleRestore, handleDeleteForever };
}

// 1 => completed this condition : Insert back into Notes.
//2nd condition completes now testing remaining: Delete from Bin_notes.
//3rd completed here => Update Zustand stores
