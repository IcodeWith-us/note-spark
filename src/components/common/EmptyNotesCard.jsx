import React from "react";

function EmptyNotesCard({ heading, description, icon: Icon }) {
  return (
    <div className="flex items-center justify-center w-full mt-20 px-4">
      <div className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-lg p-8 sm:p-10 w-full max-w-md sm:max-w-lg lg:max-w-xl bg-gray-50">
        {Icon && <Icon className="text-gray-400 mb-3" size={32} />}
        <p className="text-gray-500 text-base font-medium text-center">
          {heading}
        </p>
        <p className="text-gray-400 text-sm mt-1 text-center">{description}</p>
      </div>
    </div>
  );
}

export default EmptyNotesCard;
