import { supabase } from "@/lib/supabaseClient";
import useFetchNotes from "@/store/useFetchNotes";
import { toast } from "sonner";
export default function useHandleDelete() {
  const handleDelete = async (note) => {
    console.log("deleting function....", note);
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
      const { error: deleteError } = await supabase
        .from("Bin_notes")
        .insert([payload])
        .select("*");
      console.log(payload);

      if (deleteError) throw deleteError;

      const { error } = await supabase.from("Notes").delete().eq("id", note.id);
      if (error) throw error;
      useFetchNotes.setState((state) => ({
        notes: state.notes.filter((n) => n.id !== note.id),
      }));
      console.log("Note Deleted Successfully ....");
      toast.success("Note Deleted Successfully");
    } catch (err) {
      console.error("Error During delete ..", err.message);
    }
  };
  return { handleDelete };
}
