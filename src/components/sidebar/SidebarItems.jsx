import React from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

function SidebarItems({ item, onClick, active, isOpen }) {
  const isActive = active === item.name;

  return (
    <Link
      to={item.path}
      onClick={onClick}
      className={cn(
        "flex items-center sm:px-6 sm:ml-0 py-2 text-sm font-medium transition-colors cursor-pointer rounded-r-3xl",
        isOpen && isActive
          ? "bg-[#feefc3] text-black"
          : "hover:bg-[#e6e6e6] hover:text-black"
      )}
    >
      <span
        className={cn(
          "flex items-center justify-center h-10 w-10 rounded-full shrink-0",
          isActive && !isOpen
            ? "bg-[#feefc3] text-black"
            : "text-gray-600 hover:text-black"
        )}
      >
        {item.icon}
      </span>

      <span
        className={cn(
          "ml-3 whitespace-nowrap transition-all duration-300 overflow-hidden",
          isOpen
            ? "max-w-xs opacity-100"
            : "group-hover:max-w-xs group-hover:opacity-100 max-w-0 opacity-0"
        )}
      >
        {item.name}
      </span>
    </Link>
  );
}

export default SidebarItems;
