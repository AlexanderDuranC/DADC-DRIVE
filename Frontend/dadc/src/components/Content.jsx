import React, { useState } from "react";
import ListFiles from "./files/ListFiles";
import SideBar from "./Sidebar";
import { FileSystemProvider } from "./FileSystemProvider";
import ModalUploadFile from "./files/ModalUploadFile";
import ModalDelete from "./ModalDelete";
import ModelCreateFolder from "./folders/ModelCreateFolder";
import ListFolder from "./folders/ListFolder";
import PathContent from "./PathContent";
import DragNDropFile from "./files/DragNDropFile";

const Content = () => {
  const [isModalUploadOpen] = useState(false);

  return (
    <FileSystemProvider>
      <SideBar />
      <DragNDropFile>
        <PathContent />
        <div className="overflow-auto h-5/6">
          <ListFolder />

          <ListFiles />
        </div>
      </DragNDropFile>
      <ModalDelete />
      <ModelCreateFolder />
      <ModalUploadFile isOpen={isModalUploadOpen} />
    </FileSystemProvider>
  );
};

export default Content;
