import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { checkLoginStatus } from './auth';

const ProtectedAdminRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const verifyAccess = async () => {
      try {
        const status = await checkLoginStatus();
        setIsAuthorized(status.isLoggedIn && status.user?.manager);
      } catch (error) {
        console.error('Authorization check failed:', error);
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAccess();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Or your loading component
  }

  return isAuthorized ? children : <Navigate to="/" replace />;
};

export default ProtectedAdminRoute; 