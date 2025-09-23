import { cn } from "@/lib/utils.js";
import { menuItems } from "@/lib/constants.jsx";
import SidebarItems from "./SidebarItems";

export default function Sidebar({ isOpen, active, setActive, setIsOpen }) {
  return (
    <aside
      className={cn(
        "fixed top-[64px] left-0 h-[calc(100vh-64px)] bg-background hover:w-64 py-2 transition-all duration-300 z-50",
        "w-64 transform",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "md:translate-x-0 md:relative md:z-auto",
        isOpen ? "md:w-64" : "md:w-20"
      )}
    >
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <SidebarItems
            key={item.name}
            item={item}
            isOpen={isOpen}
            active={active}
            onClick={() => {
              setActive(item.name), setIsOpen(false);
            }}
          />
        ))}
      </nav>
    </aside>
  );
}
// commit for initial
