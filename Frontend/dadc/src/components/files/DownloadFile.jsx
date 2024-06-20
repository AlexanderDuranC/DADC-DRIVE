import React from "react";
import { downladFile } from "../../api/content.api";
import { saveAs } from "file-saver";

export const DownloadFile = ({ fileID, fileName }) => {
  const handleDownladFile = async () => {
    const res = await downladFile(fileID);
    saveAs(res.data, fileName);
  };

  return (
    <button
      className="text-lg font-semibold text-gray-900"
      onClick={handleDownladFile}
    >
      <svg
        className="a-s-fa-Ha-pa c-qd"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        focusable="false"
        fill="currentColor"
      >
        <path d="M4 15h2v3h12v-3h2v3c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2m11.59-8.41L13 12.17V4h-2v8.17L8.41 9.59 7 11l5 5 5-5-1.41-1.41z"></path>
      </svg>
    </button>
  );
};
