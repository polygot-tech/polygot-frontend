"use client";

import { useAuthStore } from "@/store/auth.store"; // Use the hydration-safe hook
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { BASE_API_URL } from "@/lib/api";

export function AuthButton() {
  // Use the hydration-safe hook to prevent SSR issues
  const { user, isLoading } = useAuthStore();

  

  if (isLoading) {
    return (
      <Button variant="outline" size="icon" disabled>
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      </Button>
    );
  }

  if (user) {
    return (
      <Link href="/application"
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
    );
  }

  return (
    // Use a standard <a> tag for external navigation.
    // The Button's `asChild` prop makes the link look like a button.
     <Button
      variant="outline"
      className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 bg-transparent"
    >
      <a href={`${BASE_API_URL}/api/v1/auth/google`}>
        Sign in
      </a>
    </Button>
  );
}