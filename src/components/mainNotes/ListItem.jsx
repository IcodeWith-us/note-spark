import { Plus, X } from "lucide-react";
import React from "react";
import useCheckListItems from "@/hooks/useCheckListItems";
import Input from "../common/Input";

function ListItem({ setNote }) {
  const {
    fields,
    handleAddField,
    handleFieldChange,
    handleCheckChange,
    handleRemoveField,
  } = useCheckListItems({ setNote });

  return (
    <>
      {fields.map((field) => (
        <div
          key={field.id}
          className="flex items-start gap-3 border-t border-gray-300 border-b px-3 py-2"
        >
          <input
            type="checkbox"
            checked={field.checked}
            onChange={(e) => handleCheckChange(field.id, e.target.checked)}
            className="mt-0.5 h-4 w-4 cursor-pointer accent-[#64748b]"
          />
          <Input
            placeholder={"List item"}
            type={"textarea"}
            value={field.value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            rows={1}
            className={
              "flex-1 resize-none bg-transparent text-sm font-light placeholder:text-[#94a3b8] border-none focus:outline-none overflow-hidden"
            }
          />
          <X
            color="gray"
            width={20}
            cursor="pointer"
            onClick={() => handleRemoveField(field.id)}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddField}
        className="p-3 flex gap-2 items-center w-full text-left hover:bg-gray-50 rounded-md cursor-pointer"
      >
        <Plus color="gray" width={18} />
        <span className="text-sm text-gray-400 hover:text-black">
          List item
        </span>
      </button>
    </>
  );
}

export default ListItem;
