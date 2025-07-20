"use client"

import { useEffect, useState } from "react"
import { useAuthStore } from "@/store/auth.store"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { BASE_API_URL } from "@/lib/api"
import { AlertCircle } from "lucide-react"

export function AuthButton() {
  const [mounted, setMounted] = useState(false)
  const { user, isLoading, error, checkAuthStatus } = useAuthStore()

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // Check auth status only after component is mounted (client-side only)
  useEffect(() => {
    if (mounted) {
      checkAuthStatus()
    }
  }, [mounted, checkAuthStatus])

  // Show loading state during hydration
  if (!mounted) {
    return (
      <Button variant="outline" size="icon" disabled>
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      </Button>
    )
  }

  if (isLoading) {
    return (
      <Button variant="outline" size="icon" disabled>
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      </Button>
    )
  }

  // Show error state if there's a network error
  if (error && !user) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => checkAuthStatus()}
        className="border-red-200 text-red-700 hover:bg-red-50"
        title={`Error: ${error}. Click to retry.`}
      >
        <AlertCircle className="h-4 w-4 mr-1" />
        <span className="hidden sm:inline">Retry</span>
      </Button>
    )
  }

  if (user) {
    return (
      <Link
        href="/dashboard"
        className="flex items-center gap-3 rounded-full p-1 pr-4 transition-colors hover:bg-gray-100"
        title={`Go to dashboard - ${user.name}`}
      >
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.profile_image || undefined} alt={user.name} />
          <AvatarFallback className="bg-green-100 text-green-700 font-semibold">
            {user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="hidden sm:inline text-sm font-medium text-gray-700">{user.name}</span>
      </Link>
    )
  }

  return (
    <Button
      variant="outline"
      className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 bg-transparent"
      asChild
    >
      <a href={`${BASE_API_URL}/api/v1/auth/google`}>Sign in</a>
    </Button>
  )
}
