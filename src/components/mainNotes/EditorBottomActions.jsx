import React from "react";
import { ImageUp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function EditorBottomActions({
  handleSave,
  setIsExpanded,
  setCheckOpen,
  setShowImagePicker,
  loading,
}) {
  return (
    <div className="flex justify-between items-center px-3 mb-3">
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => {
              setShowImagePicker((prev) => !prev);
            }}
            className="rounded-full hover:bg-gray-100 cursor-pointer"
          >
            <ImageUp
              className="cursor-pointer text-gray-500 hover:text-gray-700"
              size={22}
            />
          </button>
        </TooltipTrigger>
        <TooltipContent>Add image</TooltipContent>
      </Tooltip>
      <div className="flex justify-end items-center gap-3">
        <button
          onClick={() => {
            setIsExpanded(false);
            setCheckOpen(false);
          }}
          className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg cursor-pointer"
        >
          Close
        </button>
        <button
          onClick={handleSave}
          className="px-5 py-2 text-sm font-semibold text-black bg-[#fdeec1] rounded-lg cursor-pointer"
        >
          {loading ? "saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}

export default EditorBottomActions;
