import React from 'react'
import './App.scss';
import { useAuth } from './contexts/AuthContext'
import AuthenticatedRoutes from './routes/Authenticated.routes';
import UnauthenticatedRoutes from './routes/Unauthenticated.routes';

function App() {
  const { currentUser } = useAuth()  
  return currentUser ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />
}

export default App;
