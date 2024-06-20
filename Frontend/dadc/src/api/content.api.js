import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL + "/drive/",
});

export const getContentFolder = (folderID = null) => {
  return api.get(`${folderID ? folderID + "/" : "/"}`);
};

export const downladFile = (id) => {
  return api.get(`/downloadFile/${id}/`, {
    responseType: "blob",
  });
};

export const deleteFile = (id) => {
  return api.delete(`/deleteFile/${id}/`);
};

export const uploadFile = (folderID = null, formData, onUploadProgress) => {
  return api.post(`/upload/${folderID ? folderID + "/" : ""}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

export const createFolder = (folderID = null, formData) => {
  return api.post(`/mkdir/${folderID ? folderID + "/" : ""}`, formData);
};

export const deleteFolder = (id) => {
  return api.delete(`/deleteFolder/${id}`);
};
