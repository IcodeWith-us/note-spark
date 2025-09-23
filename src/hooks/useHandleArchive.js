import { supabase } from "@/lib/supabaseClient";
import useFetchNotes from "@/store/useFetchNotes";
import { toast } from "sonner";

export default function useHandleArchive() {
  const handleArchive = async (note) => {
    console.log("Checkingg... note Prop");

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
      const { error: insertError } = await supabase
        .from("Archive_notes")
        .insert([payload])
        .select("*");

      console.log(payload);
      if (insertError) throw insertError;

      const { error: deleteError } = await supabase
        .from("Notes")
        .delete()
        .eq("id", note.id);

      if (deleteError) throw deleteError;

      useFetchNotes.setState((state) => ({
        notes: state.notes.filter((n) => n.id !== note.id),
      }));

      console.log("Note archived!");
      toast.success("Note archived successfully");
    } catch (err) {
      console.error("Error archiving note:", err.message);
    }
  };
  return { handleArchive };
}
