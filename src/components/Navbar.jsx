import {
  Search,
  AlignJustify,
  StretchHorizontal,
  LayoutGrid,
  X,
} from "lucide-react";
import IconButton from "./common/IconButton";
import SignOut from "./SignOut";
import { useState } from "react";
import logo from "@/assets/images.jpeg";

export default function Navbar({
  buttonClick,
  activeTab,
  toggle,
  handleToggle,
  onChangeFilter,
  valueSearchFilter,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 bg-white/80 backdrop-blur-md px-4 sm:px-6 py-3 flex items-center justify-between border-b border-gray-200 z-50">
      <div className="flex items-center gap-2 sm:gap-3 min-w-[120px] sm:min-w-[180px]">
        <button
          onClick={buttonClick}
          className="hover:bg-gray-100 p-2 rounded-full transition-colors"
        >
          <AlignJustify className="cursor-pointer text-gray-600 w-6 h-6" />
        </button>
        <img
          src={logo}
          alt="Note Spark Logo"
          className="w-8 h-8 sm:w-9 sm:h-9 border border-gray-300 rounded-md shadow-sm"
        />
        <span className="hidden sm:inline text-base sm:text-lg font-semibold text-gray-700 tracking-wide truncate">
          {activeTab}
        </span>
      </div>

      <div className="hidden sm:block relative flex-1 max-w-lg mx-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={valueSearchFilter}
          placeholder="Search notes..."
          onChange={onChangeFilter}
          className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm sm:text-base"
        />
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => setIsOpen(true)}
          className="sm:hidden p-2 rounded-full hover:bg-gray-100"
        >
          <Search className="w-5 h-5 text-gray-600" />
        </button>
        <IconButton onClick={handleToggle}>
          {toggle ? (
            <StretchHorizontal className="text-gray-600 hidden sm:block hover:text-blue-600 transition-colors w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <LayoutGrid className="text-gray-600 hidden sm:block hover:text-blue-600 transition-colors w-5 h-5 sm:w-6 sm:h-6" />
          )}
        </IconButton>

        <SignOut className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600 hover:text-red-500 transition-colors cursor-pointer" />
      </div>
      {isOpen && (
        <div className="sm:hidden absolute inset-0 bg-white flex items-center px-4">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <input
            autoFocus
            type="text"
            value={valueSearchFilter}
            placeholder="Search notes..."
            onChange={onChangeFilter}
            className="flex-1 pl-2 pr-10 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
          />
          <button onClick={() => setIsOpen(false)} className="ml-2">
            <X />
          </button>
        </div>
      )}
    </nav>
  );
}
