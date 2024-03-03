import { create } from 'zustand'
import { deleteRequest, getRequest, postRequest } from '../api/requests.service';

export interface FilesStore {
  files: any[],
  publicFiles: any[],
  sharedFiles: any[],
  fileAccess: {
    [key: string]: any[]
  },
  fetchPrivateFiles: () => any[],
  fetchPublicFiles: () => any[],
  fetchSharedFiles: () => any[],
  removeUserFromFile: (userId: string, fileId: string) => any[],
  addUserToFile: (userId: string, fileId: string) => any[],
}

const useFilesStore = create((set) => ({
  privateFiles: [],
  publicFiles: [],
  sharedFiles: [],
  fileAccess: {},
  fetchPrivateFiles: async () => {
    const files = await getRequest('file/private');
    set({ privateFiles: files });
  },
  fetchPublicFiles: async () => {
    const files = await getRequest('file/public');
    set({ publicFiles: files });
  },
  fetchSharedFiles: async () => {
    const files = await getRequest('file/shared');
    set({ sharedFiles: files });
  },
  fetchUsersForFile: async (fileId: string) => {
    const files = await getRequest(`file-access/allUsers/${fileId}`);
 
    set({
      fileAccess: {
        [fileId]: !files ? [] : files.map((file: any) => file.userId),
      }
    });
  },
  addUserToFile: async (userId: string, fileId: string) => {
    const files = await postRequest(`file-access/addUserToFile/${userId}/${fileId}`, {});
    debugger;
  
    set({
      fileAccess: {
        [fileId]: !files ? [] : files.map((file: any) => file.userId),
      }
    });
  },
  removeUserFromFile: async (userId: string, fileId: string) => {
    const files = await deleteRequest(`file-access/removeUserFromFile/${userId}/${fileId}`);

 
    set({
      fileAccess: {
        [fileId]: !files ? [] : files.map((file: any) => file.userId),
      }
    });
  },
}))

export default useFilesStore;

