import { useCallback, useEffect, useRef } from "react";

export default function useAutoResizeTextarea({ value, setValue }) {
  const textAreaRef = useRef(null);

  const adjustHeight = useCallback((element) => {
    if (element) {
      element.style.height = "auto";
      element.style.height = element.scrollHeight + "px";
    }
  }, []);

  const handleChange = (e) => {
    setValue(e.target.value);
    adjustHeight(e.target);
  };

  useEffect(() => {
    if (textAreaRef.current) {
      adjustHeight(textAreaRef.current);
    }
  }, [value, adjustHeight]);

  return { handleChange, value, textAreaRef };
}
