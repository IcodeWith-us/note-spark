import React from "react";
import RenderNoteWithPin from "./RenderNoteWithPin";
import useHandleArchive from "@/hooks/useHandleArchive";
import useHandleDelete from "@/hooks/useHandleDelete";
import useHandleSaveNote from "@/hooks/useHandleSaveNote";
import useFetchNotes from "@/store/useFetchNotes";

function NoteSectionCard({
  toggle,
  displayFilteredData,
  setSelectedNote,
  setShowModal,
}) {
  const { handleArchive } = useHandleArchive();
  const { handleDelete } = useHandleDelete();
  const { setNote } = useHandleSaveNote();
  const { updatePinnedNote } = useFetchNotes();

  const toggleStyling = `${
    toggle
      ? "columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 w-full"
      : "flex flex-col gap-4 w-[500px]"
  }`;

  const pinnedNotes = displayFilteredData.filter((n) => n.pinned);
  const unpinnedNotes = displayFilteredData.filter((n) => !n.pinned);

  return (
    <div className="space-y-8">
      {pinnedNotes.length > 0 && (
        <div>
          <h2 className="text-md text-[#5f6368] mb-3">Pinned Notes</h2>
          <div className={toggleStyling}>
            {pinnedNotes.map((n) => (
              <RenderNoteWithPin
                key={n.id}
                note={n}
                updatePinnedNote={updatePinnedNote}
                handleArchive={handleArchive}
                handleDelete={handleDelete}
                setSelectedNote={setSelectedNote}
                setShowModal={setShowModal}
                setNote={setNote}
              />
            ))}
          </div>
        </div>
      )}
      {unpinnedNotes.length > 0 && (
        <div>
          <h2 className="text-md text-[#5f6368] mb-3">All Notes</h2>
          <div className={toggleStyling}>
            {unpinnedNotes.map((n) => (
              <RenderNoteWithPin
                key={n.id}
                note={n}
                updatePinnedNote={updatePinnedNote}
                handleArchive={handleArchive}
                handleDelete={handleDelete}
                setSelectedNote={setSelectedNote}
                setShowModal={setShowModal}
                setNote={setNote}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NoteSectionCard;
