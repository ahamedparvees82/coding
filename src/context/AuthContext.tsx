import React, { useEffect, useState, createContext, useContext } from 'react';
interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
}
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (username: string, email: string, password: string) => Promise<boolean>;
  socialLogin: (provider: string) => Promise<boolean>;
  logout: () => void;
  verifyDeveloperPassword: (password: string) => boolean;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  // Check for saved auth on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('leetcode_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);
  const login = async (email: string, password: string) => {
    // Mock login - in a real app, this would call an API
    if (email && password) {
      const mockUser = {
        id: '1',
        username: email.split('@')[0],
        email,
        avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`
      };
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('leetcode_user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };
  const signup = async (username: string, email: string, password: string) => {
    // Mock signup
    if (username && email && password) {
      const mockUser = {
        id: '1',
        username,
        email,
        avatar: `https://ui-avatars.com/api/?name=${username}&background=random`
      };
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('leetcode_user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };
  const socialLogin = async (provider: string) => {
    // Mock social login
    const mockUser = {
      id: '1',
      username: `user_${provider}`,
      email: `user@${provider.toLowerCase()}.com`,
      avatar: `https://ui-avatars.com/api/?name=User&background=random`
    };
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('leetcode_user', JSON.stringify(mockUser));
    return true;
  };
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('leetcode_user');
  };
  const verifyDeveloperPassword = (password: string) => {
    // Check against the specific password
    return password === 'Devsarah@_77880117';
  };
  return <AuthContext.Provider value={{
    user,
    isAuthenticated,
    login,
    signup,
    socialLogin,
    logout,
    verifyDeveloperPassword
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};