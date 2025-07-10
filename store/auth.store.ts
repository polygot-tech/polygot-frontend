/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface User {
  id: number
  name: string
  email: string
  profile_image: string
}

interface AuthState {
  user: User | null
  token: string | null // Add token to the state
  isLoading: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setToken: (token: string | null) => void // Add a setter for the token
  checkAuthStatus: () => Promise<void>
  login: (email: string, password: string) => Promise<boolean> // Add a login action (if needed for traditional login)
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  // Wrap your store with the persist middleware
  persist(
    (set, get) => ({ // 'get' is useful for accessing other parts of the state/actions
      user: null,
      token: null, // Initial state, will be hydrated from localStorage by persist middleware
      isLoading: true, // Set to true initially to indicate we're checking auth status

      setUser: (user: User | null) => set({ user }),

      setLoading: (isLoading: boolean) => set({ isLoading }),

      setToken: (token: string | null) => {
        set({ token });
        // The `persist` middleware automatically handles saving to localStorage.
        // No need for manual localStorage.setItem/removeItem here.
      },

      checkAuthStatus: async () => {
        const currentToken = get().token; // Get token from the store (which is hydrated from localStorage)

        if (!currentToken) {
          // If no token exists, we are not authenticated
          set({ user: null, isLoading: false });
          return;
        }

        try {
          set({ isLoading: true });
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/me`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentToken}`, 
            },
          });

          if (response.ok) {
            const data = await response.json();
            set({ user: data.user });
          } else {
            // Token might be invalid, expired, or server denied access
            console.error("Failed to fetch user data, token might be invalid:", response.status, response.statusText);
            get().setToken(null); // Clear the invalid token
            set({ user: null });
          }
        } catch (error) {
          console.error("Network error during auth check:", error);
          get().setToken(null); // Clear token on network error too
          set({ user: null });
        } finally {
          set({ isLoading: false });
        }
      },

      // Example for a traditional email/password login (optional, if you have one)
      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true });
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          if (response.ok) {
            const data = await response.json();
            if (data.token && data.user) {
              get().setToken(data.token); // Store the token
              set({ user: data.user, isLoading: false });
              return true; // Login successful
            }
          }
          set({ user: null, isLoading: false });
          return false; // Login failed
        } catch (error) {
          console.error("Login failed:", error);
          set({ user: null, isLoading: false });
          return false;
        }
      },


      logout: async () => {
        get().setToken(null);
        set({ user: null });
        console.log("Logged out. Token cleared.");
      },
    }),
    {
      name: "auth-storage", // unique name for your localStorage key
      storage: createJSONStorage(() => localStorage), // Use localStorage
      // Optionally, only persist specific parts of the state if you don't want everything
      // partialize: (state) => ({ token: state.token }),
    }
  )
);

