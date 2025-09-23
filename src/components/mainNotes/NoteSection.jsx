import React, { useState, useRef, useEffect, Suspense } from "react";
import useFetchNotes from "../../store/useFetchNotes";
import EditorActions from "./EditorActions";
const EditModal = React.lazy(() => import("./EditModal"));
import useHandleSaveNote from "@/hooks/useHandleSaveNote";
import ImagePickerCard from "./ImagePickerCard";
import DisplayNotes from "./DisplayNotes";
import useAutoResizeTextarea from "@/hooks/useAutoResizeTextarea";
import ListItem from "./ListItem";
import Input from "../common/Input";
import EditorBottomActions from "./EditorBottomActions";
import { mainDiv } from "@/lib/constants";
import useCollapseClickOutside from "@/hooks/useCollapseClickOutside";

function NoteSection({ toggle, displayFilteredData }) {
  const [showModal, setShowModal] = useState(false);
  const wrapperRef = useRef(null);
  const { fetchNotes } = useFetchNotes();
  const [selectedNote, setSelectedNote] = useState(null);

  const {
    note,
    title,
    setNote,
    setTitle,
    setImage,
    isExpanded,
    setIsExpanded,
    checkOpen,
    setCheckOpen,
    showImagePicker,
    setShowImagePicker,
    handleSave,
    loading,
  } = useHandleSaveNote();

  useCollapseClickOutside({
    title,
    note,
    wrapperRef,
    setCheckOpen,
    setIsExpanded,
    setShowImagePicker,
    onOutsideClick: handleSave,
  });

  const { handleChange, textAreaRef } = useAutoResizeTextarea({
    value: note,
    setValue: setNote,
  });

  useEffect(() => {
    console.log("fetching notess.....");
    fetchNotes();
  }, [fetchNotes]);

  return (
    <div className="flex flex-col items-center  w-full">
      <div ref={wrapperRef} className={mainDiv}>
        {showImagePicker && <ImagePickerCard setImage={setImage} />}

        {(isExpanded || checkOpen) && (
          <Input
            placeholder={"Title"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={
              "w-full text-lg font-semibold border-none outline-none p-3"
            }
          />
        )}

        {checkOpen ? (
          <ListItem note={note} setNote={setNote} />
        ) : (
          <div className="flex items-center justify-between ml-0.5 p-3">
            <Input
              type={"textarea"}
              ref={textAreaRef}
              placeholder={"Take a note..."}
              value={note}
              onClick={() => setIsExpanded(true)}
              onChange={handleChange}
              rows={1}
              className={
                "flex-1 resize-none sm:w-28 max-w-[500px] text-base border-none outline-none overflow-hidden"
              }
            />
            {!isExpanded && (
              <EditorActions
                setCheckOpen={setCheckOpen}
                setIsExpanded={setIsExpanded}
                setShowImagePicker={setShowImagePicker}
              />
            )}
          </div>
        )}
        {(isExpanded || checkOpen) && (
          <EditorBottomActions
            setCheckOpen={setCheckOpen}
            setIsExpanded={setIsExpanded}
            handleSave={handleSave}
            setShowImagePicker={setShowImagePicker}
            loading={loading}
          />
        )}
      </div>

      <DisplayNotes
        displayFilteredData={displayFilteredData}
        toggle={toggle}
        setSelectedNote={setSelectedNote}
        setShowModal={setShowModal}
      />

      {showModal && (
        <Suspense fallback={null}>
          <EditModal
            selectedNote={selectedNote}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </Suspense>
      )}
    </div>
  );
}

export default NoteSection;
