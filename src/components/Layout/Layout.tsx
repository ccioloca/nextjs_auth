import React, { useState, ReactNode, createContext, useEffect } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import useAuthStore, { AuthStore } from '../../store/auth.store';
import { auth } from '../../config/firebase';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const UsernameContext = createContext({});
  const currentUser = useAuthStore((state: unknown) => (state as AuthStore).user);
  const setCurrentUser = useAuthStore((state: unknown) => (state as AuthStore).setCurrentUser);
  const [cookies, setCookie] = useCookies(['accessToken']);
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log("ON STATE AUTH ====", user);
      if (user) {
        setCurrentUser(user);
        setCookie("accessToken", user?.accessToken, { path: '/' });
      } else {
        router.push('/login')
      }
    });
  }, []);

  return (
    <UsernameContext.Provider value={currentUser}>
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        <div className="flex h-screen overflow-hidden">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </UsernameContext.Provider>
  );
};

export default Layout;