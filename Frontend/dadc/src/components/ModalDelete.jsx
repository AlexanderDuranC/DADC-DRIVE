import React from "react";
import { useFileSystemContext } from "./FileSystemProvider";
import { deleteFile, deleteFolder } from "../api/content.api";

const ModalDelete = () => {
  const { isModalDeleteOpen, setIsModalDeleteOpen, loadFileAndFolders } =
    useFileSystemContext();

  if (!isModalDeleteOpen.isOpen) {
    return null;
  }

  const handleDelete = async () => {
    var res;
    if (isModalDeleteOpen.file.isFile) {
      res = await deleteFile(isModalDeleteOpen.file.id);
    } else {
      res = await deleteFolder(isModalDeleteOpen.file.id);
    }
    loadFileAndFolders();
    setIsModalDeleteOpen({ isOpen: false });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <div className="items-center justify-between p-4 md:p-5 border-b rounded-t">
          <svg
            className="mx-auto mb-4 text-red-700 w-12 h-12"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 className="mb-5 text-lg font-normal">
            ¿Estas seguro que quieres eliminar{" "}
            <span className="font-bold">"{isModalDeleteOpen.file.name}"</span>{" "}
            definitivamente?
          </h3>
        </div>
        <div className="p-4 md:p-5">
          <button
            className="text-white inline-flex items-center bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={() => handleDelete()}
          >
            Eliminar
          </button>
          <span
            className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
            onClick={() => setIsModalDeleteOpen({ isOpen: false })}
          >
            Cancelar
          </span>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
