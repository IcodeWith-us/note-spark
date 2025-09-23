import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function useNoteCardDetails({ notesCategory, setNote }) {
  const [description, setDescription] = useState(
    notesCategory?.notes_description ?? []
  );

  useEffect(() => {
    setDescription(notesCategory.notes_description);
  }, [notesCategory]);

  const handleToggleCheck = async (itemId) => {
    if (!Array.isArray(description)) return;

    const cleaned = description.filter((f) => f.value?.trim() !== "");

    const updated = cleaned.map((f) =>
      f.id === itemId ? { ...f, checked: !f.checked } : f
    );

    setDescription(updated);
    setNote?.(updated);

    if (updated.length === 0) {
      console.warn("No valid items to save (all empty).");
      return;
    }

    const { error } = await supabase
      .from("Notes")
      .update({ notes_description: updated })
      .eq("id", notesCategory.id);

    if (error) {
      console.error("Error updating note:", error.message);
    }
  };

  const unchecked = Array.isArray(description)
    ? description.filter((item) => item.value?.trim() !== "" && !item.checked)
    : [];
  const checked = Array.isArray(description)
    ? description.filter((item) => item.value?.trim() !== "" && item.checked)
    : [];
  return { handleToggleCheck, unchecked, checked, description, setDescription };
}
