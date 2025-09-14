/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { BASE_API_URL } from "@/lib/api"

interface User {
  id: number
  name: string
  email: string
  profile_image: string
  subscription:Subscription
}

export interface Subscription {
  id: string
  plan_id: string
  status: string
  current_period_end: string
  translation_usage: string
  remaining_usage: string
  created_at: string
}

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
  hasChecked: boolean // Add this to prevent repeated calls
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setToken: (token: string | null) => void
  setError: (error: string | null) => void
  checkAuthStatus: () => Promise<void>
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,
      hasChecked: false, // Track if we've already checked

      setUser: (user: User | null) => set({ user }),
      setLoading: (isLoading: boolean) => set({ isLoading }),
      setToken: (token: string | null) => set({ token }),
      setError: (error: string | null) => set({ error }),

      checkAuthStatus: async () => {
        // Prevent multiple simultaneous calls
        if (get().isLoading) {
          console.log("🔄 Auth check already in progress, skipping...")
          return
        }

        // Only run on client side
        if (typeof window === "undefined") {
          return
        }

        // Clear any previous errors
        set({ error: null })

        // Wait for rehydration to complete
        await useAuthStore.persist.rehydrate()

        const currentToken = get().token

        // Debug logging
        console.log("🔍 Checking auth status...")
        console.log("📍 BASE_API_URL:", BASE_API_URL)
        console.log("🔑 Token exists:", !!currentToken)

        if (!currentToken) {
          console.log("❌ No token found, user not authenticated")
          set({ user: null, isLoading: false, hasChecked: true })
          return
        }

        try {
          set({ isLoading: true })

          const apiUrl = `${BASE_API_URL}/api/v1/user/me`
          console.log("🌐 Making request to:", apiUrl)

          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

          const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentToken}`,
            },
            signal: controller.signal,
          })

          clearTimeout(timeoutId)

          console.log("📡 Response status:", response.status)
          console.log("📡 Response ok:", response.ok)

          if (response.ok) {
            const data = await response.json()
            console.log("✅ Auth check successful, user:", data.user?.name)
            set({ user: data.user, isLoading: false, error: null, hasChecked: true })
          } else {
            const errorText = await response.text().catch(() => "Unknown error")
            console.error("❌ Auth check failed:", response.status, errorText)

            // If unauthorized, clear the token
            if (response.status === 401) {
              get().setToken(null)
              set({ user: null, isLoading: false, error: "Session expired", hasChecked: true })
            } else {
              set({ user: null, isLoading: false, error: `Server error: ${response.status}`, hasChecked: true })
            }
          }
        } catch (error: any) {
          console.error("💥 Network error during auth check:", error)

          let errorMessage = "Network error"

          if (error.name === "AbortError") {
            errorMessage = "Request timeout"
          } else if (error.message?.includes("Failed to fetch")) {
            errorMessage = "Cannot connect to server"
          } else if (error.message) {
            errorMessage = error.message
          }

          // Don't clear token on network errors - might be temporary
          set({
            user: null,
            isLoading: false,
            error: errorMessage,
            hasChecked: true,
          })
        }
      },

      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null })

          const response = await fetch(`${BASE_API_URL}/api/v1/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          })

          if (response.ok) {
            const data = await response.json()
            if (data.token && data.user) {
              get().setToken(data.token)
              set({ user: data.user, isLoading: false, error: null, hasChecked: true })
              return true
            }
          }

          const errorData = await response.json().catch(() => ({ message: "Login failed" }))
          set({ user: null, isLoading: false, error: errorData.message, hasChecked: true })
          return false
        } catch (error: any) {
          console.error("Login failed:", error)
          set({ user: null, isLoading: false, error: "Network error during login", hasChecked: true })
          return false
        }
      },

      logout: async () => {
        try {
          // Optionally call logout endpoint
          const token = get().token
          if (token) {
            fetch(`${BASE_API_URL}/api/v1/auth/logout`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }).catch(() => {
              // Ignore logout endpoint errors
            })
          }
        } catch {
          // Ignore logout errors
        } finally {
          get().setToken(null)
          set({ user: null, error: null, hasChecked: true })
          console.log("Logged out. Token cleared.")
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
