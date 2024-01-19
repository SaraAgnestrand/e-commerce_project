import { createContext, useState, PropsWithChildren, Dispatch, SetStateAction } from "react";

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
}

export const UserContext = createContext<UserContextType>(null as any);

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

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

  // include user login, logout, fetch user data

  // Initializing or fetching user data can be done here with useEffect if needed

  const contextValue: UserContextType = { user, setUser, register };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};