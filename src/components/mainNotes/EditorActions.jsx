import React from "react";
import CardTooltipIcon from "../common/CardTooltipIcon";
import { ImageUp, SquareCheck } from "lucide-react";

function EditorActions({ setCheckOpen, setShowImagePicker, setIsExpanded }) {
  return (
    <div className="">
      <CardTooltipIcon
        className={"flex justify-between gap-4"}
        iconSize={22}
        actions={[
          {
            icon: SquareCheck,
            tooltipContent: "New note",
            onClick: () => {
              setCheckOpen((prev) => !prev);
            },
            btnClass: "rounded-full hover:bg-gray-100 cursor-pointer",
            color: "cursor-pointer text-gray-500 hover:text-gray-700",
          },
          {
            icon: ImageUp,
            tooltipContent: "New note with image",
            onClick: () => {
              setShowImagePicker((prev) => !prev), setIsExpanded(true);
            },
            btnClass: "rounded-full hover:bg-gray-100 cursor-pointer",
            color: "cursor-pointer text-gray-500 hover:text-gray-700",
          },
        ]}
      />
    </div>
  );
}

export default EditorActions;
