import React, { useEffect, useState } from "react";
import { ChevronFirst, ChevronLast, FolderPlus, Menu, X } from "lucide-react";
import FileInput from "./files/FileInput";
import { useFileSystemContext } from "./FileSystemProvider";

const SideBar = () => {
  const { setIsModalCreateFolderOpen } = useFileSystemContext();

  const [expanded, setExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 600);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.addEventListener("resize", handleResize);
    };
  }, []);

  return (
    <aside
      className={`sm:h-screen overflow-hidden transition-all ${
        expanded ? "h-auto" : "h-16"
      }`}
    >
      <nav className="h-full felx bg-slate-200 border-r border-gray-400 shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <h1
            className={`text-xl font-bold overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "sm:w-0"
            }`}
          >
            DADC-DRIVE
          </h1>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-full hover:bg-slate-400"
          >
            {expanded ? (
              isMobile ? (
                <X />
              ) : (
                <ChevronFirst />
              )
            ) : isMobile ? (
              <Menu />
            ) : (
              <ChevronLast />
            )}
          </button>
        </div>
        <ul className="flex-1 px-3">
          <li
            className={`
          relative flex items-center py-2 px-3 my-1
          font-medium rounded-md cursor-pointer transition-colors
          hover:bg-indigo-50 text-gray-800
        `}
            onClick={() => setIsModalCreateFolderOpen(true)}
          >
            <FolderPlus />
            <span
              className={`overflow-hidden transition-all ${
                expanded ? "w-40 ml-3" : "w-0"
              }`}
            >
              Nueva Carpeta
            </span>
          </li>
          <li
            className={`
          relative items-center py-2 my-1
          font-medium rounded-md cursor-pointer transition-colors
          hover:bg-indigo-50 text-gray-800
        `}
          >
            <FileInput expanded={expanded} />
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
