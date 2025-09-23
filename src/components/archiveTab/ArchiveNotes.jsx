import { ArchiveRestore, Trash2 } from "lucide-react";
import EmptyNotesCard from "../common/EmptyNotesCard";
import useFetchArchive from "@/store/useFetchArchive";
import ArchiveNotesCard from "./ArchiveNotesCard";
import { useEffect } from "react";

function ArchiveNotes({ toggle, displayFilteredData }) {
  const { fetchArchive } = useFetchArchive();
  useEffect(() => {
    fetchArchive();
  }, [fetchArchive]);

  return (
    <div className="w-full my-6">
      <h1 className="text-3xl font-bold flex justify-center items-center py-4">
        Archive Notes
      </h1>
      {displayFilteredData.length === 0 ? (
        <EmptyNotesCard
          icon={ArchiveRestore}
          heading={"No notes yet..."}
          description={"Your archived notes appear here ✍️"}
        />
      ) : (
        <ArchiveNotesCard
          toggle={toggle}
          displayFilteredData={displayFilteredData}
        />
      )}
    </div>
  );
}

export default ArchiveNotes;
