import React from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';
import { useAuth } from '../../context/AuthContext';

const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <LoginForm />
      </div>
      
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center text-sm text-neutral-500">
          <p>SIWES Management System Demo</p>
          <p className="mt-1">All passwords for demo accounts are: <span className="font-mono bg-neutral-100 px-2 py-0.5 rounded">password123</span></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;