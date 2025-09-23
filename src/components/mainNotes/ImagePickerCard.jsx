import { Trash } from "lucide-react";
import React from "react";
import ImagePicker from "../common/ImagePicker";

function ImagePickerCard({ setImage }) {
  return (
    <div className="px-3 pt-3 relative group">
      <ImagePicker onImageSelect={(img) => setImage(img)} />
      <Trash className="absolute bottom-3 right-6 cursor-pointer ease-out duration-300 transition-all opacity-0 group-hover:opacity-100" />
    </div>
  );
}

export default ImagePickerCard;
