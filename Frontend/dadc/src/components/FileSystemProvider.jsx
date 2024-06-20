import React, { useContext, useEffect, useState } from "react";
import { getContentFolder } from "../api/content.api";
import { useParams } from "react-router-dom";

const FileSystemContext = React.createContext();

export function useFileSystemContext() {
  return useContext(FileSystemContext);
}

export function FileSystemProvider({ children }) {
  // para guardar los archivos y carpetas obtenidas del servidor
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [path, setPath] = useState([])

  // para la barra de progreso de ModalUpladfile.jsx
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // para controlar las acciones de ModalDelete
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState({
    isOpen: false,
  });

  // para controlar la visualizacion de ModalCreateFolder.jsx
  // ya que el boton para mostralo y el modal esta en componentes separados
  const [isModalCreateFolderOpen, setIsModalCreateFolderOpen] = useState(false);
  
  const { folderId } = useParams()

  const loadFileAndFolders = async (id = null) => {
    let idPet = id ? id : folderId;
    const res = await getContentFolder(idPet ? idPet : null);
    setFiles(res.data.files);
    setFolders(res.data.folders);
    setPath(res.data.path)
  };

  useEffect(() => {
    loadFileAndFolders();
  }, []);

  return (
    <FileSystemContext.Provider
      value={{
        path,
        files,
        folders,
        loadFileAndFolders,
        uploadProgress,
        setUploadProgress,
        isUploading,
        setIsUploading,
        isModalDeleteOpen,
        setIsModalDeleteOpen,
        isModalCreateFolderOpen,
        setIsModalCreateFolderOpen,
      }}
    >
      {children}
    </FileSystemContext.Provider>
  );
}
