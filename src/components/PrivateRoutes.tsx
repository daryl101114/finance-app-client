import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface PrivateRoutesProps {
  children: JSX.Element;
}

const PrivateRoutes = ({ children }: PrivateRoutesProps): JSX.Element => {
  const { token, authenticate } = useAuth();
  const location = useLocation();
  // console.log(token)
  authenticate();
  if (!token) {
    // Redirect to login page, preserving the location state
    localStorage.clear();
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoutes;
