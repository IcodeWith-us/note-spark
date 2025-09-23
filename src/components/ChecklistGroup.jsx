import React from "react";
import ChecklistItem from "./common/ChecklistItem";

function ChecklistGroup({ unchecked, checked, handleToggleCheck }) {
  return (
    <>
      {unchecked.length > 0 && (
        <ul className="space-y-2">
          {unchecked.map((item) => (
            <ChecklistItem
              key={item.id}
              onClick={(e) => e.stopPropagation()}
              value={item.value}
              checked={item.checked}
              onChange={() => handleToggleCheck(item.id)}
            />
          ))}
        </ul>
      )}
      {checked.length > 0 && (
        <>
          <hr className="mt-4 mb-2" />
          <h4 className="text-sm font-medium text-gray-500 mb-2">
            {checked.length} Completed Notes
          </h4>
          <ul className="space-y-2">
            {checked.map((item) => (
              <ChecklistItem
                key={item.id}
                onClick={(e) => e.stopPropagation()}
                value={item.value}
                checked={item.checked}
                onChange={() => handleToggleCheck(item.id)}
              />
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export default ChecklistGroup;
