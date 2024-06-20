import React, { useState } from "react";
import { useFileSystemContext } from "../FileSystemProvider";
import { createFolder } from "../../api/content.api";
import { useParams } from "react-router-dom";

const ModelCreateFolder = () => {
  const {
    isModalCreateFolderOpen,
    setIsModalCreateFolderOpen,
    loadFileAndFolders,
  } = useFileSystemContext();

  const [newFolder, setNewFolder] = useState("Nueva Carpeta");
  
  const { folderId } = useParams()

  if (!isModalCreateFolderOpen) {
    return null;
  }

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("nameDir", newFolder);
    const res = await createFolder(folderId ? folderId : null, formData);
    setIsModalCreateFolderOpen(false);
    loadFileAndFolders(folderId ? folderId : null)
    console.log(res);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
          <h2 className="text-xl font-semibold">Carpeta Nueva</h2>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => setIsModalCreateFolderOpen(false)}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="p-4 md:p-5">
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
              <label
                htmlFor="nameDir"
                className="block mb-2 text-sm font-medium "
              >
                Nombre
              </label>
              <input
                type="text"
                name="nameDir"
                id="nameDir"
                className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="Carpeta nueva"
                required=""
                autoFocus
                defaultValue={newFolder}
                onChange={(e) => setNewFolder(e.target.value)}
              />
            </div>
          </div>
          <span
            onClick={() => setIsModalCreateFolderOpen(false)}
            className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
          >
            Cancelar
          </span>
          <button
            className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={handleSubmit}
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModelCreateFolder;
