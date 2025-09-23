import { supabase } from "@/lib/supabaseClient";

export default function useUploadImage() {
  const uploadImage = async (file) => {
    const fileName = `note-${Date.now()}.${file.type.split("/")[1]}`;

    const { error } = await supabase.storage
      .from("notes-images")
      .upload(fileName, file);

    if (error) {
      console.error("Image upload error:", error.message);
      return null;
    }
    const { data: urlData } = supabase.storage
      .from("notes-images")
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  };
  return { uploadImage };
}
