import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function useImagePicker({ onImageSelect } = {}) {
  const [filePreview, setFilePreview] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFilePreview(URL.createObjectURL(file));
        if (onImageSelect) onImageSelect(file);
      }
    },
    [onImageSelect]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  return { filePreview, setFilePreview, getRootProps, getInputProps };
}
