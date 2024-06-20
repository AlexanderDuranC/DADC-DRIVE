import React from "react";
import Delete from "../Delete";
import { useFileSystemContext } from "../FileSystemProvider";
import { useNavigate } from "react-router-dom";

const ListFolder = () => {
  const navigate = useNavigate()
  const { folders, loadFileAndFolders } = useFileSystemContext();
  

  const handleOpenFolder = (id) => {
    loadFileAndFolders(id)
    navigate(`/drive/${id}`)
  }

  return (
    <div className="px-4">
      <h2 className="text-2xl text-gray-800 mb-4">Carpetas:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-3 sm:mx-0">
        {folders.map((folder) => (
          <div
            key={folder.id}
            className="bg-gray-200 shadow-md p-4 rounded-lg flex justify-between cursor-pointer"
            onDoubleClick={() =>  handleOpenFolder(folder.id)}
          >
            <div className="flex">
              <svg
                focusable="false"
                viewBox="0 0 24 24"
                height="24px"
                width="24px"
                fill="#5f6368"
                className="a-s-fa-Ha-pa"
              >
                <g>
                  <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path>
                  <path d="M0 0h24v24H0z" fill="none"></path>
                </g>
              </svg>
              <h2 className="text-lg font-semibold text-gray-900">
                {folder.name}
              </h2>
            </div>

            {/* isFile determina si es un archivo o una carpeta
              Esto se hace con motivos de reutilizar el componente Delete
              (es el boton para eliminar) con el cual se abre el modal para
              confirmar la eliminacion */}
            <Delete
              file={{ id: folder.id, name: folder.name, isFile: false }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListFolder;
