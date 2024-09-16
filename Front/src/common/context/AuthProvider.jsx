/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import { loginGoogleUser } from '../service/auth/loginGoogleUser';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Lee el token desde localStorage
    if (token) {
      const decodedToken = jwtDecode(token);
      localStorage.setItem('user', JSON.stringify(decodedToken));
      setUser({ decodedToken });
    }
  }, []);
  console.log(user)

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');

    if (token) {
      localStorage.setItem('authToken', token);
      // Redirige al usuario a la raíz
      window.location.href = '/';
    }
  }, []);

  const loginWithGoogle = async () => {
    try {
      // Redirige al usuario para iniciar sesión con Google
      await loginGoogleUser();
    } catch (error) {
      console.error('Login with Google error in AuthProvider:', error);
      return { status: 'error', message: 'Login with Google failed' };
    }
  };

  const logout = async () => {
    try {
      // Elimina el token del localStorage primero
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      localStorage.removeItem('mentors');
      
      // Luego, actualiza el estado del usuario
      setUser(null);
      
      // Asegúrate de que `logOutUser()` no esté causando problemas
     
      
      // También puedes añadir una redirección a la página de inicio o de login aquí si lo deseas
      window.location.href = '/'; // O la ruta que prefieras
      
    } catch (error) {
      console.error('Logout error in AuthProvider:', error);
      return { status: 'error', message: 'Logout failed' };
    }
  };
  

  return (
    <AuthContext.Provider
      value={{
        loginWithGoogle,
        logout,
        user,
        decodedToken: user?.decodedToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
