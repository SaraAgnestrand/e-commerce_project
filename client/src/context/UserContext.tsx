import { createContext, useState, useEffect, PropsWithChildren, Dispatch, SetStateAction } from "react";
import Cookies from 'js-cookie';

export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin?: boolean;
}

interface UserContextType {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    register: (userData: User) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
  }

export const UserContext = createContext<UserContextType>(null as any);

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Vid komponentens montering, försök hämta användaren från sessionscookien
    const userFromCookie = Cookies.get('user');
    if (userFromCookie) {
      setUser(JSON.parse(userFromCookie));
    }
  }, []);

  const register = async (userData: User) => {
    try {                           
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.status === 201) {
        console.log('Registered user:', data);
        setUser(data);
      } else {
       
        console.error(data);
      }
    } catch (error) {
      console.error('Failed to register user', error);
    }
  };

  const login = async (email: string, password: string) => {
    try {           
      const response = await fetch('http://localhost:3000/api/users/loginUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (response.status === 200) {
        console.log('Logged in user:', data);
        Cookies.set('user', JSON.stringify(data), { expires: 7 });
        setUser(data);
      } else {
        console.error('Failed to login:', data.message);
      }
    } catch (error) {
      console.error('Failed to login user', error);
    }
  };

  const logout = () => {
    // Logga ut användaren genom att nollställa user i UserContext och ta bort sessionscookien
    setUser(null);
    Cookies.remove('user');
  };

  // include user login, logout, fetch user data

  // Initializing or fetching user data can be done here with useEffect if needed

  const contextValue: UserContextType = { user, setUser, register, login, logout };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};