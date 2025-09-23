import ChecklistGroup from "../ChecklistGroup";
import useNoteCardDetails from "@/hooks/useNoteCardDetails";

export default function NotesCardDetails({ notesCategory, setNote }) {
  const { handleToggleCheck, unchecked, checked, description } =
    useNoteCardDetails({ setNote, notesCategory });

  return (
    <div>
      {notesCategory.image_url && (
        <img
          src={notesCategory.image_url || "/placeholder.png"}
          alt={notesCategory.notes_title || "Note image"}
          className="mb-2 min-h-32 object-cover rounded-md border p-2"
        />
      )}

      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {notesCategory.notes_title}
      </h3>

      {Array.isArray(description) ? (
        <ChecklistGroup
          checked={checked}
          unchecked={unchecked}
          handleToggleCheck={handleToggleCheck}
        />
      ) : (
        <p className="text-gray-600 text-sm whitespace-pre-line">
          {description}
        </p>
      )}
    </div>
  );
}
