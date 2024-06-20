import React from "react";
import { DownloadFile } from "./DownloadFile";
import Delete from "../Delete";
import { useFileSystemContext } from "../FileSystemProvider";

const ListFiles = () => {
  const { files } = useFileSystemContext();

  return (
    <div className="px-4">
      <h2 className="text-2xl text-gray-800 mb-4">Archivos:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-3 sm:mx-0">
        {files.map((file) => (
          <div
            key={file.id}
            className="file bg-gray-200 shadow-md p-4 rounded-lg flex justify-between cursor-pointer"
          >
            <div className="flex">
              {/* <img src="" alt="" /> */}
              <h2 className="file-name text-lg font-semibold text-gray-900 truncate w-32">
                {file.name}
              </h2>
            </div>
            <div className="flex">
              <DownloadFile fileID={file.id} fileName={file.name} />

              {/* isFile determina si es un archivo o una carpeta
              Esto se hace con motivos de reutilizar el componente Delete
              (es el boton para eliminar) con el cual se abre el modal para
              confirmar la eliminacion */}
              <Delete file={{ id: file.id, name: file.name, isFile: true }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListFiles;
