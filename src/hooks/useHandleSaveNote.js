import { supabase } from "@/lib/supabaseClient";
import useFetchNotes from "@/store/useFetchNotes";
import useUploadImage from "./useUploadImage";
import { useState } from "react";

export default function useHandleSaveNote() {
  const [image, setImage] = useState(null);
  const { uploadImage } = useUploadImage();
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [checkOpen, setCheckOpen] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title && !note) return;

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.log("error getting userr...", userError.message);
      return;
    }
    let imageUrl = null;
    if (image) {
      imageUrl = await uploadImage(image);
    }

    const payload = {
      notes_title: title,
      notes_description: note,
      user_id: user.id,
      ...(imageUrl && { image_url: imageUrl }),
    };

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("Notes")
        .insert(payload)
        .select("id, notes_title, notes_description, image_url,user_id");
      console.log(payload);
      console.log(user.id);
      if (error) throw error;
      if (data && data.length > 0) {
        useFetchNotes.setState((state) => ({
          notes: [...state.notes, data[0]],
        }));
      }
      setTitle("");
      setNote("");
      setIsExpanded(false);
      setCheckOpen(false);
      setImage(null);
      setShowImagePicker(false);
    } catch (err) {
      console.error("Error saving note:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSave,
    note,
    setNote,
    title,
    setTitle,
    setImage,
    isExpanded,
    setIsExpanded,
    checkOpen,
    setCheckOpen,
    showImagePicker,
    setShowImagePicker,
    image,
    loading,
  };
}
