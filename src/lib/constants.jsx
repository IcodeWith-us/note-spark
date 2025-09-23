import { Lightbulb, Archive, Trash2 } from "lucide-react";
export const menuItems = [
  { name: "Notes", path: "/", icon: <Lightbulb className="h-5 w-5" /> },
  { name: "Archive", path: "archive", icon: <Archive className="h-5 w-5" /> },
  { name: "Bin", path: "/bin", icon: <Trash2 className="h-5 w-5" /> },
];
export const mainDiv =
  "w-full sm:w-[200px] md:w-[500px] mt-6 flex flex-col bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-300";
