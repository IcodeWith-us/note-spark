import { supabase } from "@/lib/supabaseClient";
import useFetchNotes from "@/store/useFetchNotes";
import React, { useEffect, useState } from "react";

export default function useEditmodal({
  showModal,
  selectedNote,
  setShowModal,
}) {
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const formatDescriptionForTextarea = (desc) => {
    if (Array.isArray(desc)) {
      return desc
        .map((item) =>
          typeof item === "object" ? item.value ?? "" : String(item)
        )
        .join("\n");
    }
    if (desc == null) return "";
    if (typeof desc === "string") return desc;
    try {
      return JSON.stringify(desc);
    } catch {
      return String(desc);
    }
  };

  useEffect(() => {
    if (selectedNote) {
      setEditTitle(selectedNote.notes_title || "");
      setEditDescription(
        formatDescriptionForTextarea(selectedNote.notes_description)
      );
    } else {
      setEditTitle("");
      setEditDescription("");
    }
  }, [selectedNote, showModal]);

  const handleEdit = async () => {
    if (!selectedNote) return;
    const payload = {
      notes_title: editTitle,
    };

    if (Array.isArray(selectedNote.notes_description)) {
      const lines = editDescription
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);

      const rebuilt = lines.map((line, idx) => {
        const original = selectedNote.notes_description[idx];
        return {
          id: original?.id ?? Date.now() + idx,
          value: line,
          checked: original?.checked ?? false,
        };
      });

      payload.notes_description = rebuilt;
    } else {
      payload.notes_description = editDescription;
    }

    if (selectedNote.image_url) {
      payload.image_url = selectedNote.image_url;
    }

    try {
      const { error } = await supabase
        .from("Notes")
        .update(payload)
        .eq("id", selectedNote.id)
        .select("*");

      if (error) throw error;

      useFetchNotes.setState((state) => ({
        notes: state.notes.map((n) =>
          n.id === selectedNote.id ? { ...n, ...payload } : n
        ),
      }));

      setShowModal(false);
    } catch (err) {
      console.error("Error During edit Notes ..", err?.message ?? err);
    }
  };
  return {
    formatDescriptionForTextarea,
    editTitle,
    editDescription,
    setEditTitle,
    setEditDescription,
    handleEdit,
  };
}
