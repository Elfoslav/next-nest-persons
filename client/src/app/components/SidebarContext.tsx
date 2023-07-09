import React, { createContext, useState } from 'react';

interface SidebarProviderProps {
  children: React.ReactNode;
}

interface SidebarContextProps {
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

export const SidebarContext = createContext<SidebarContextProps>({
  isSidebarOpen: false,
  setSidebarOpen: () => {},
});

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, setSidebarOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};
