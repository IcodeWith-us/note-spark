import React, { useEffect } from "react";

export default function useCollapseClickOutside({
  wrapperRef,
  setIsExpanded,
  setCheckOpen,
  setShowImagePicker,
  onOutsideClick,
  title,
  note,
}) {
  useEffect(() => {
    const handleCollapse = () => {
      setIsExpanded(false);
      setCheckOpen(false);
      setShowImagePicker(false);
    };

    const hasText = (v) => String(v ?? "").trim() !== "";

    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        if (onOutsideClick && hasText(note) && hasText(title)) onOutsideClick();
        handleCollapse();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [
    title,
    note,
    wrapperRef,
    setCheckOpen,
    setIsExpanded,
    onOutsideClick,
    setShowImagePicker,
  ]);
}
