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
  token: string;
  authenticate: () => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string>(getItem<string>('token')||'');

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
          /** Valid Token
       * 1. token must exist
       * 2. Token must not be expired
       */
      const token = getItem<string>('token');
      let decodedToken = jwtDecode(token || '')
      if(!decodedToken){
        console.log("invalid token");
        logout();
      }
      
      if(decodedToken?.exp){
        if (Date.now() >= decodedToken.exp * 1000) {
          console.log("Need new tokens!!!!!")
          logout();
        }
      }
      setToken(token||'');
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
