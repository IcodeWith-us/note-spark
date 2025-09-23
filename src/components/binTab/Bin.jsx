import React, { useEffect } from "react";
import useFetchDelete from "@/store/useFetchDelete";
import { Trash2 } from "lucide-react";
import EmptyNotesCard from "../common/EmptyNotesCard";
import BinNotesCard from "./BinNotesCard";

function Bin({ toggle, displayFilteredData }) {
  const { fetchDeleteNotes } = useFetchDelete();
  useEffect(() => {
    fetchDeleteNotes();
  }, []);

  return (
    <div className="w-full my-6">
      <h1 className="text-3xl font-bold flex justify-center items-center py-4">
        Bin Notes
      </h1>
      {displayFilteredData.length === 0 ? (
        <EmptyNotesCard
          heading={" No notes yet..."}
          description={" No notes in Recycle Bin"}
          icon={Trash2}
        />
      ) : (
        <BinNotesCard
          displayFilteredData={displayFilteredData}
          toggle={toggle}
        />
      )}
    </div>
  );
}

export default Bin;
