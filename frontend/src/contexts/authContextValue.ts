import { createContext } from "react";

export type User = {
  id: string;
  name: string;
  surname: string;
  email: string;
};

export type SignupData = {
  name: string;
  surname: string;
  email: string;
  username: string;
  password: string;
};

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (data: User) => void;
  logout: () => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
