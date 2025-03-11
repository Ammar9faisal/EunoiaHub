import React, { createContext, useContext, useState, useEffect } from 'react';
import { account } from '../appwrite';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await account.get();
        console.log('User fetched:', user); // Debugging log
        setUser(user);
      } catch (error) {
        console.log('No user found:', error); // Debugging log
        setUser(null);
      } finally {
        setLoading(false); // Set loading to false after fetching user
      }
    };

    getUser();
  }, []);

  return ( // Add loading state to the context value
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};