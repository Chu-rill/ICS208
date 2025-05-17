import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { UserRole, User } from '../types/user';
import { demoUsers } from '../data/users';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  userRole: UserRole | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        isAuthenticated: false,
        user: null,
        userRole: null,
        login: async (email: string, password: string) => {
          // This is a mock authentication for demo purposes
          const user = demoUsers.find(
            (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
          );

          if (user) {
            const { password, ...userWithoutPassword } = user;
            set({
              isAuthenticated: true,
              user: userWithoutPassword,
              userRole: user.role,
            });
            return true;
          }

          return false;
        },
        logout: () => {
          set({
            isAuthenticated: false,
            user: null,
            userRole: null,
          });
        },
      }),
      {
        name: 'auth-storage',
      }
    )
  )
);