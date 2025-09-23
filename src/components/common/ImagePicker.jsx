import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

function ImagePicker({ onImageSelect }) {
  const [filePreview, setFilePreview] = useState(null);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];

      setFilePreview(URL.createObjectURL(file));

      onImageSelect(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed rounded-md p-4 cursor-pointer text-center bg-gray-50 hover:bg-gray-100"
    >
      <input {...getInputProps()} />
      {!filePreview ? (
        <p className="text-gray-500">Click or drag & drop an image</p>
      ) : (
        <img
          src={filePreview}
          alt="Preview"
          className="w-full h-auto object-cover rounded-md"
        />
      )}
    </div>
  );
}

export default ImagePicker;
