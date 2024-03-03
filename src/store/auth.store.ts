import { create } from 'zustand'
import { User } from '../interfaces/user.interface';
import { postRequest } from '../api/requests.service';

export interface AuthStore {
  user: User,
  createUser: (user: User) => void,
  logoutUser: () => void,
  setCurrentUser: (user: User) => void
}

const useAuthStore = create((set) => ({
  user: {},
  createUser: async (user: User) => {
    const userResponse = await postRequest('user', user)

    set({ user: userResponse });
  },
  logoutUser: () => set({ user: {} }),
  setCurrentUser: (user: User) => set({ user })
}))

export default useAuthStore;

