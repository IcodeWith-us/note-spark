import { RotateCcw, Trash2 } from "lucide-react";
import React from "react";
import CardTooltipIcon from "../common/CardTooltipIcon";
import NotesCardDetails from "../common/NotesCardDetails";
import useBinNotes from "@/hooks/useBinNotes";
function BinNotesCard({ toggle, displayFilteredData }) {
  const { handleRestore, handleDeleteForever } = useBinNotes();

  const toggleStyling = `${
    toggle
      ? "columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 w-full"
      : "flex flex-col gap-4 w-[500px] mx-auto"
  }`;

  const mainDivStyling =
    "relative group bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all min-h-[140px] overflow-hidden w-full break-words mb-4 break-inside-avoid";

  return (
    <div className={toggleStyling}>
      {displayFilteredData.map((del) => (
        <div key={del.id} className={mainDivStyling}>
          <NotesCardDetails notesCategory={del} />
          <div className="absolute bottom-2 right-2 flex gap-2 h-7 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
            <CardTooltipIcon
              iconSize={18}
              className={"flex justify-between gap-2"}
              actions={[
                {
                  icon: RotateCcw,
                  tooltipContent: "Restore",
                  color: "text-gray-600",
                  btnClass: "p-1 rounded-full hover:bg-gray-100 cursor-pointer",
                  onClick: () => {
                    handleRestore(del);
                  },
                },
                {
                  icon: Trash2,
                  tooltipContent: "Delete forever",
                  color: "text-red-500",
                  btnClass: "p-1 rounded-full hover:bg-gray-100 cursor-pointer",
                  onClick: () => {
                    handleDeleteForever(del);
                  },
                },
              ]}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default BinNotesCard;
