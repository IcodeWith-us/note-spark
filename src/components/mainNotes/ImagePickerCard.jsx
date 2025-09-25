import { Trash } from "lucide-react";
import React, { useState } from "react";
import ImagePicker from "../common/ImagePicker";

function ImagePickerCard({ setImage }) {
  const [filePreview, setFilePreview] = useState(null);

  const handleImageSelect = (file) => {
    setImage(file);
    setFilePreview(URL.createObjectURL(file));
  };

  const clearPreview = () => {
    setImage(null);
    setFilePreview(null);
  };

  return (
    <div className="px-3 pt-3 relative group">
      <ImagePicker
        onImageSelect={handleImageSelect}
        filePreview={filePreview}
        setFilePreview={setFilePreview}
      />
      {filePreview && (
        <button
          onClick={clearPreview}
          className="absolute bottom-3 right-6 cursor-pointer ease-out duration-300 transition-all opacity-0 group-hover:opacity-100"
        >
          <Trash />
        </button>
      )}
    </div>
  );
}

export default ImagePickerCard;
