import React from "react";

function UnCheckedNotes({ onChange, checked, value, onClick }) {
  return (
    <li className="flex items-center gap-2">
      <input
        type="checkbox"
        onClick={onClick}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-[#64748b] cursor-pointer"
      />
      <span className="text-gray-600 text-sm">{value}</span>
    </li>
  );
}

export default UnCheckedNotes;
