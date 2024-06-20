import React from "react";
import { useFileSystemContext } from "./FileSystemProvider";


const Delete = ({ file }) => {
  const { setIsModalDeleteOpen } = useFileSystemContext()

  return (
    <button
      className="text-lg font-semibold text-red-700"
      onClick={() => setIsModalDeleteOpen({
        isOpen: true,
        file
      })}
    >
      <svg
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        fill="currentColor"
        focusable="false"
        className="c-qd a-s-fa-Ha-pa"
      >
        <path d="M0 0h24v24H0V0z" fill="none"></path>
        <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13zM9 8h2v9H9zm4 0h2v9h-2z"></path>
      </svg>
    </button>
  );
};

export default Delete;
