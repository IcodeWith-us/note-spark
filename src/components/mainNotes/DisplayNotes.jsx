import { SquareCheck } from "lucide-react";
import React from "react";
import EmptyNotesCard from "../common/EmptyNotesCard";
import NoteSectionCard from "./NoteSectionCard";

function DisplayNotes({
  displayFilteredData,
  toggle,
  setSelectedNote,
  setShowModal,
}) {
  return (
    <div className="w-full mt-12">
      {displayFilteredData.length === 0 ? (
        <EmptyNotesCard
          heading={"No Notes yet"}
          description={"Start by adding your first note ✍️"}
          icon={SquareCheck}
        />
      ) : (
        <NoteSectionCard
          toggle={toggle}
          displayFilteredData={displayFilteredData}
          setSelectedNote={setSelectedNote}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}

export default DisplayNotes;
