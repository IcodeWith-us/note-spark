import { Outlet } from "react-router-dom";

function Herosection() {
  return (
    <div className="pt-[64px] flex-1 transition-all duration-300">
      <div className="h-[calc(100vh-64px)] overflow-y-auto px-2 sm:px-6 py-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Herosection;
