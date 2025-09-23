import React from "react";
import NotesCardDetails from "../common/NotesCardDetails";
import CardTooltipIcon from "../common/CardTooltipIcon";
import { Archive, Trash2 } from "lucide-react";
import useHandleArchive from "@/hooks/useHandleArchive";
import useHandleDelete from "@/hooks/useHandleDelete";
import useHandleSaveNote from "@/hooks/useHandleSaveNote";

function NoteSectionCard({
  toggle,
  displayFilteredData,
  setSelectedNote,
  setShowModal,
}) {
  const { handleArchive } = useHandleArchive();
  const { handleDelete } = useHandleDelete();
  const { setNote } = useHandleSaveNote();

  const toggleStyling = `${
    toggle
      ? "columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 w-full"
      : "flex flex-col gap-4 w-[500px]"
  }`;

  return (
    <div className={toggleStyling}>
      {displayFilteredData.map((n) => (
        <div
          onClick={() => {
            setSelectedNote(n);
            setShowModal(true);
          }}
          key={n.id}
          className="relative group bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all overflow-hidden break-words cursor-pointer min-h-[180px] mb-4 break-inside-avoid"
        >
          <NotesCardDetails notesCategory={n} setNote={setNote} />

          <div className="absolute bottom-2 right-2 flex gap-2 h-7 opacity-0 group-hover:opacity-100 transition-opacity">
            <CardTooltipIcon
              iconSize={18}
              className={"flex justify-between gap-2"}
              actions={[
                {
                  icon: Archive,
                  tooltipContent: "Archive",
                  onClick: (e) => {
                    e.stopPropagation();
                    handleArchive(n);
                  },
                  btnClass: "p-1 rounded-full hover:bg-gray-100 cursor-pointer",
                  color: "text-gray-600",
                },
                {
                  icon: Trash2,
                  tooltipContent: "Delete",
                  onClick: (e) => {
                    e.stopPropagation();
                    handleDelete(n);
                  },
                  btnClass: "p-1 rounded-full hover:bg-gray-100 cursor-pointer",
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

export default NoteSectionCard;
