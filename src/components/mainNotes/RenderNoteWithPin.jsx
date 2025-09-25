import React from "react";
import { Pin, PinOff } from "lucide-react";
import NotesCardDetails from "../common/NotesCardDetails";
import CardTooltipIcon from "../common/CardTooltipIcon";
import { Archive, Trash2 } from "lucide-react";

export default function RenderNoteWithPin({
  note,
  updatePinnedNote,
  handleArchive,
  handleDelete,
  setSelectedNote,
  setShowModal,
  setNote,
}) {
  return (
    <div
      onClick={() => {
        setSelectedNote?.(note);
        setShowModal?.(true);
      }}
      className="relative group bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all overflow-hidden break-words cursor-pointer min-h-[140px] mb-4 break-inside-avoid"
    >
      <button
        className="absolute top-4 right-2 p-2 rounded-full hover:bg-gray-100 cursor-pointer opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
        onClick={(e) => {
          updatePinnedNote(note.id, !note.pinned);
          e.stopPropagation();
        }}
      >
        {note.pinned ? (
          <Pin className="text-gray-500 fill-gray-500 stroke-gray-500" />
        ) : (
          <Pin className="text-gray-500" />
        )}
      </button>
      <NotesCardDetails notesCategory={note} setNote={setNote} />
      <div className="absolute bottom-2 right-2 flex gap-2 h-7 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
        <CardTooltipIcon
          iconSize={18}
          className={"flex justify-between gap-2"}
          actions={[
            {
              icon: Archive,
              tooltipContent: "Archive",
              onClick: (e) => {
                e.stopPropagation();
                handleArchive(note);
              },
              btnClass: "p-1 rounded-full hover:bg-gray-100 cursor-pointer",
              color: "text-gray-600",
            },
            {
              icon: Trash2,
              tooltipContent: "Delete",
              onClick: (e) => {
                e.stopPropagation();
                handleDelete(note);
              },
              btnClass: "p-1 rounded-full hover:bg-gray-100 cursor-pointer",
              color: "text-red-500",
            },
          ]}
        />
      </div>
    </div>
  );
}
