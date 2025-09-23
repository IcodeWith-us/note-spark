import React from "react";
import { ArchiveRestore, Trash2 } from "lucide-react";
import useArchiveNotes from "@/hooks/useArchiveNotes";
import CardTooltipIcon from "../common/CardTooltipIcon";
import NotesCardDetails from "../common/NotesCardDetails";

function ArchiveNotesCard({ toggle, displayFilteredData }) {
  const { handleUnarchive, handleDeleteForever } = useArchiveNotes();

  const toggleStyling = `${
    toggle
      ? "columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 w-full"
      : "flex flex-col gap-4 w-[500px]"
  }`;
  const btnStyling = "p-1 rounded-full hover:bg-gray-100 cursor-pointer";
  const mainDivStyling =
    "relative group bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all min-h-[180px]  overflow-hidden break-words mb-4 break-inside-avoid";

  return (
    <div className={toggleStyling}>
      {displayFilteredData.map((archive) => (
        <div key={archive.id} className={mainDivStyling}>
          <NotesCardDetails notesCategory={archive} />

          <div className="absolute bottom-2 right-2 flex gap-2 h-7 opacity-0 group-hover:opacity-100 transition-opacity">
            <CardTooltipIcon
              iconSize={18}
              className="flex justify-between gap-2"
              actions={[
                {
                  icon: ArchiveRestore,
                  tooltipContent: "Unarchive",
                  onClick: () => handleUnarchive(archive),
                  btnClass: btnStyling,
                  color: "text-gray-600",
                },
                {
                  icon: Trash2,
                  tooltipContent: "Delete Forever",
                  onClick: () => handleDeleteForever(archive),
                  btnClass: btnStyling,
                  color: "text-red-500",
                },
              ]}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ArchiveNotesCard;
