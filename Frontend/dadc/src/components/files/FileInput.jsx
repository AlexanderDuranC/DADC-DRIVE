import { FileInputIcon } from "lucide-react";
import React from "react";
import { uploadFile } from "../../api/content.api";
import { useFileSystemContext } from "../FileSystemProvider";
import { useParams } from "react-router-dom";

const FileInput = ({ expanded }) => {
  const { loadFileAndFolders, setUploadProgress, setIsUploading } =
    useFileSystemContext();
    const { folderId } = useParams()

  const handleFileChange = async (event) => {
    setIsUploading(true);
    const files = event.target.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

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
  };

  return (
    <label
      className={`overflow-hidden transition-all cursor-pointer flex ${
        expanded ? "w-full ml-3" : "w-0"
      }`}
      htmlFor="fileInput"
    >
      <FileInputIcon />
      <span className="px-3">Subir Archivo</span>
      <input
        id="fileInput"
        type="file"
        className="hidden"
        multiple
        onChange={handleFileChange}
      />
    </label>
  );
};

export default FileInput;
