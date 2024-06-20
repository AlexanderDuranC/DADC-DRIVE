import React from "react";
import { useFileSystemContext } from "./FileSystemProvider";

const PathContent = () => {
  const { path } = useFileSystemContext();

  return (
    <h1 className="text-2xl font-bold text-gray-800 flex bg-slate-200 p-4">
      {path.map((p, index) => (
        <div key={index}>
          {p.id && (<span className="mx-2">/</span>)}
          <a
            href={`/drive/${p.id ? p.id : ""}`}
            className="text-2xl font-bold text-gray-800 mb-4"
          >
            {p.name}
          </a>
        </div>
      ))}
    </h1>
  );
};

export default PathContent;
