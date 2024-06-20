import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { uploadFile } from "../../api/content.api";
import { useFileSystemContext } from "../FileSystemProvider";

const DragNDropFile = ({children}) => {
  const [dragActive, setDragActive] = useState(false);
  
  const { folderId } = useParams()
  
  const { loadFileAndFolders, setUploadProgress, setIsUploading } =
    useFileSystemContext();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  const handleDrop = async (e) => {
    setIsUploading(true);
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0){
        let files = Array.from((e.dataTransfer.files));
        const formData = new FormData()

        files.forEach(file => {
            formData.append("files", file)
        })

        try {
            const res = await uploadFile(folderId ? folderId : null, formData, (progressEvent) => {
              const progress = (progressEvent.loaded / progressEvent.total) * 100;
              setUploadProgress(progress);
            });
            loadFileAndFolders(folderId);
          } catch (err) {
            console.error("Error uploading file: " + err);
          } finally {
            setIsUploading(false);
          }

    }
    setDragActive(false);
  };
  return (
      <div
        onDrop={handleDrop}
        onDragOver={handleDrag}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        className={`w-screen h-screen ${
          dragActive ? "bg-gray-300" : "bg-white"
        }`}
      >
        {children}
      </div>
  );
};

export default DragNDropFile;
