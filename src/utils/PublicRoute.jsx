// import { Navigate, useLocation } from 'react-router-dom';

// const PublicRoute = ({ children }) => {
//   const token = localStorage.getItem('adminToken');
//   const location = useLocation();

//   // If admin is logged in and tries to access login page,
//   // redirect to dashboard or the page they came from
//   if (token) {
//     return <Navigate to="/admin/dashboard" replace state={{ from: location }} />;
//   }

//   // If no admin token, allow access to public routes
//   return children;
// };

// export default PublicRoute;


import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  
  // If admin is already logged in, redirect to dashboard
  // Otherwise, show the login page
  return token ? <Navigate to="/admin/dashboard" replace /> : children;
};

export default PublicRoute;