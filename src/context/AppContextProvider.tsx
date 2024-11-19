import { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextProviderProps {
  children: ReactNode;
}

interface AppContextProviderContextType {
  screenSize: number | undefined;
  setScreenSize: React.Dispatch<number | undefined>;
  activeSideBarItem: string;
  setActiveSidebarItem: React.Dispatch<string>;
}
const AppStateContext = createContext<AppContextProviderContextType | null>(
  null,
);

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [screenSize, setScreenSize] = useState<number | undefined>(undefined);
  const [activeSideBarItem, setActiveSidebarItem] = useState<string>('');
  return (
    <AppStateContext.Provider
      value={{
        screenSize: screenSize,
        setScreenSize: setScreenSize,
        activeSideBarItem: activeSideBarItem,
        setActiveSidebarItem: setActiveSidebarItem,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppStateContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
