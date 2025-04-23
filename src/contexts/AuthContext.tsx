
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { UserRole } from '@/types/roles';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setRole: (role: UserRole) => void;
}

const sampleUsers: Record<string, User> = {
  [UserRole.student]: {
    id: 's1',
    name: 'Alex Johnson',
    email: 'alex@school.edu',
    role: UserRole.student,
    avatarUrl: '/student-avatar.png',
    schoolId: 'school1',
  },
  [UserRole.teacher]: {
    id: 't1',
    name: 'Ms. Rodriguez',
    email: 'rodriguez@school.edu',
    role: UserRole.teacher,
    avatarUrl: '/teacher-avatar.png',
    schoolId: 'school1',
  },
  [UserRole.admin]: {
    id: 'a1',
    name: 'Principal Wilson',
    email: 'wilson@district.edu',
    role: UserRole.admin,
    avatarUrl: '/admin-avatar.png',
  },
  [UserRole.parent]: {
    id: 'p1',
    name: 'Sarah Johnson',
    email: 'sarah@family.com',
    role: UserRole.parent,
    avatarUrl: '/parent-avatar.png',
    schoolId: 'school1',
  },
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('sparkUser');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // In a real app, this would be an API call
    // For demo, we'll simulate with sample users
    // First determine which role from the email
    let role: UserRole = UserRole.student;
    
    if (email.includes('teacher') || email.includes('rodriguez')) {
      role = UserRole.teacher;
    } else if (email.includes('admin') || email.includes('principal') || email.includes('wilson')) {
      role = UserRole.admin;
    } else if (email.includes('parent') || email.includes('family')) {
      role = UserRole.parent;
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const loggedInUser = sampleUsers[role];
    setUser(loggedInUser);
    localStorage.setItem('sparkUser', JSON.stringify(loggedInUser));
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sparkUser');
  };
  
  const setRole = (role: UserRole) => {
    const newUser = sampleUsers[role];
    setUser(newUser);
    localStorage.setItem('sparkUser', JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
