import {
  createContext,
  useContext,
  useMemo,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { getItem } from '../lib/utils';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
  token:  AuthorizedType | null;
  authenticate: () => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}
interface AuthorizedType {
  token: string;
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState(getItem<AuthorizedType>('token'));

  useEffect(() => {
    //Authentication logic here
    //TODO: Maybe ADD Retrieve new token
    const tokenDateString = localStorage.getItem('accessTokenExpiryTime');
    //Validate if date exist
    if (token && tokenDateString) {
      const currDate = new Date();
      const expiryDate = new Date(tokenDateString);
      console.log('isValid');
      if (currDate >= expiryDate) {
        console.log('GET NEW TOKEN');
        logout();
      }
    } else {
      logout();
    }
    authenticate();
  }, [token]);
  const authenticate = () => {
    console.log('Authenticating');
      try {
        const authenticated = getItem<AuthorizedType>('token');
        setToken(authenticated);
      } catch (err) {
        console.log(err);
      }
  };

  const logout = () => {
    localStorage.clear();
  };
  const value = useMemo(
    () => ({
      token,
      authenticate,
      logout,
    }),
    [token],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
