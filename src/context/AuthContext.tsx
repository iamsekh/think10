import { createContext, useContext, useState, ReactNode } from 'react';

export type Role = 'user' | 'admin' | 'consultant' | null;

export interface UserDetails {
  name: string;
  email: string;
}

interface AuthContextType {
  role: Role;
  user: UserDetails | null;
  login: (role: Role, user?: UserDetails, rememberMe?: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>(() => {
    const persistedRole = localStorage.getItem('auth_role') || sessionStorage.getItem('auth_role');
    return (persistedRole as Role) || null;
  });
  const [user, setUser] = useState<UserDetails | null>(() => {
    const persistedUser = localStorage.getItem('auth_user') || sessionStorage.getItem('auth_user');
    return persistedUser ? JSON.parse(persistedUser) : null;
  });

  const login = (newRole: Role, userDetails?: UserDetails, rememberMe: boolean = false) => {
    setRole(newRole);
    let resolvedUser: UserDetails | null = null;
    if (userDetails) {
      resolvedUser = userDetails;
    } else {
      resolvedUser = 
        newRole === 'admin' 
          ? { name: 'System Administrator', email: 'admin@think10.ae' }
          : newRole === 'consultant'
          ? { name: 'Fatima Al-Kamali', email: 'fatima@think10.ae' }
          : null;
    }
    setUser(resolvedUser);

    const storage = rememberMe ? localStorage : sessionStorage;
    if (newRole) {
      storage.setItem('auth_role', newRole);
    }
    if (resolvedUser) {
      storage.setItem('auth_user', JSON.stringify(resolvedUser));
    }
  };

  const logout = () => {
    setRole(null);
    setUser(null);
    localStorage.removeItem('auth_role');
    localStorage.removeItem('auth_user');
    sessionStorage.removeItem('auth_role');
    sessionStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider value={{ role, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
