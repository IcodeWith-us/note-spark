import React, { forwardRef } from "react";

const Input = forwardRef(
  (
    { type = "text", placeholder, value, onChange, onClick, rows, className },
    ref
  ) => {
    if (type === "textarea") {
      return (
        <textarea
          ref={ref}
          placeholder={placeholder}
          value={value}
          onClick={onClick}
          onChange={onChange}
          rows={rows}
          className={`flex-1 resize-none text-base border-none outline-none overflow-hidden ${className}`}
        />
      );
    }

    return (
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
      />
    );
  }
);

export default Input;
