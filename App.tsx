import React from 'react'
import AppNavigation from './src/routes/AppNavigation';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {

  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
}