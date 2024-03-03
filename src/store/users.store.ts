import { create } from 'zustand'
import { User } from '../interfaces/user.interface';
import { getRequest } from '../api/requests.service';

export interface UsersStore {
  users: User[],
  fetchUsers: () => User[],
}

const useUsersStore = create((set) => ({
  users: [],
  fetchUsers: async () => {
   const users = await getRequest('user/all');
    set({ users });
  },
  logoutUser: () => set({ user: {} }),
}))

export default useUsersStore;

