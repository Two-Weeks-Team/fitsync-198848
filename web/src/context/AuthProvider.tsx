"use client";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps>({ user: null, loading: true });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock authentication fetch – replace with real endpoint in production
  useEffect(() => {
    fetch('/api/v1/users/me')
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data) {
          setUser({
            id: data.id,
            name: data.name,
            email: data.email,
            avatarUrl: data.avatar_url
          });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
