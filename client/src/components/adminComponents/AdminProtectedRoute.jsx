import { Outlet, Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
  return <>{children}</>
};
export default AdminProtectedRoute;