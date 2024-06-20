import React from 'react'
import { useFileSystemContext } from '../FileSystemProvider';

const ModalUploadFile = ({ isOpen, onClose }) => {
    const { uploadProgress, isUploading } = useFileSystemContext();

  if (!isUploading) {
    return null;
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <button 
          className="text-gray-500 hover:text-gray-700 float-right" 
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4">Uploading File</h2>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div 
            className="bg-blue-500 h-4 rounded-full" 
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
        <p className="text-center">{uploadProgress.toFixed(2)}%</p>
      </div>
    </div>
  )
}

export default ModalUploadFile