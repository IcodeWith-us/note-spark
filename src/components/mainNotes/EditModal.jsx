import React from "react";
import Modal from "../common/Modal";
import useEditmodal from "@/hooks/useEditmodal";
import { Trash } from "lucide-react";

function EditModal({ showModal, setShowModal, selectedNote }) {
  const {
    formatDescriptionForTextarea,
    editTitle,
    editDescription,
    setEditDescription,
    setEditTitle,
    handleEdit,
  } = useEditmodal({ showModal, selectedNote, setShowModal });

  return (
    <Modal
      disabled={!editDescription?.trim() || !editTitle?.trim()}
      open={showModal}
      onClose={() => {
        setShowModal(false);
        setEditTitle(selectedNote?.notes_title || "");
        setEditDescription(
          formatDescriptionForTextarea(selectedNote?.notes_description)
        );
      }}
      title="Notes"
      cancelLabel="Cancel"
      submitLabel="Edit"
      onSubmit={handleEdit}
    >
      <div className="w-full flex flex-col gap-4">
        {selectedNote?.image_url && (
          <div className="relative">
            <img
              src={selectedNote.image_url}
              alt="note"
              className="rounded-md mb-2 max-h-64 object-cover border w-full"
            />
            <button
              type="button"
              className="absolute bottom-4 right-2 p-2 rounded-full text-white shadow-md cursor-pointer hover:bg-amber-700 transition"
            >
              <Trash className="w-5 h-5" />
            </button>
          </div>
        )}
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="w-full rounded-sm border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
        />
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          rows={4}
          className="w-full rounded-sm border border-gray-300 px-4 py-2 text-sm resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
        />
      </div>
    </Modal>
  );
}

export default EditModal;
