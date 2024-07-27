import { createContext, useContext, useMemo, ReactNode, useState } from 'react';
import { getItem } from '../lib/utils';

interface AuthContextType {
  isAuthenticated: AuthorizedType | null;
  authenticate: () => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}
interface AuthorizedType {
  isAuthorized: boolean;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    getItem<AuthorizedType>('isAuthorized'),
  );

  const authenticate = () => {
    try {
      const authenticated = getItem<AuthorizedType>('isAuthorized');
      setIsAuthenticated(authenticated);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.clear();
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      authenticate,
      logout,
    }),
    [isAuthenticated],
  );
  console.log(isAuthenticated);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
