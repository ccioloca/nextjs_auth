// const formData = new FormData();
//     formData.append("file", data.file[0]);

import { create } from 'zustand'
import { postRequest } from '../api/requests.service';

export interface UploadFileStore {
  myFiles: any[],
  uploadFile: (formData: any, options: any) => any[],
  resetUploadFlag: () => void,
  isFileUploaded: boolean
}


const UPLOAD_PATH = 'file/upload';
const useUploadFileStore = create((set) => ({
  myFiles: [],
  isFileUploaded: false,
  uploadFile: async (formData: any, options: any) => {
    try {
      set({ isFileUploaded: false });
      const files = await postRequest(UPLOAD_PATH, formData, options);
      set({ files });
      set({ isFileUploaded: true });
    } catch (error) {
      set({ isFileUploaded: false });
    }
   const files = await postRequest(UPLOAD_PATH, formData, options);
    set({ files });
  },
  resetUploadFlag: () => set({ isFileUploaded: false }),
}))

export default useUploadFileStore;

