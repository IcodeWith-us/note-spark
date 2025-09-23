import React from "react";
import Modal from "../common/Modal";
import useEditmodal from "@/hooks/useEditmodal";

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
          <img
            src={selectedNote.image_url}
            alt="note"
            className="rounded-md mb-2 max-h-64 object-cover border"
          />
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
