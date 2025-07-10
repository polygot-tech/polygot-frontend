// src/app/dashboard/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Use Next.js router
import Link from "next/link"; // Use Next.js Link
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ApiKeyGenerator } from "./_components/api-key-generator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LogOut, ArrowLeft, Globe, Sparkles, Menu } from "lucide-react";

export default function DashboardPage() {
  // Use the hydration-safe hook instead of the raw store
  const { user, isLoading, logout, checkAuthStatus } = useAuthStore();
  const router = useRouter(); // Next.js router hook
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  useEffect(() => {
    // Redirect if not loading and no user is found
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  const handleLogout = async () => {
    await logout();
    router.push("/"); // Navigate after logout
  };

  // Loading state remains the same, protecting against flicker
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="text-center">
          <div className="relative">
            <div className="h-12 w-12 rounded-full border-4 border-green-200 mx-auto mb-4"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-12 w-12 rounded-full border-4 border-green-600 border-t-transparent animate-spin"></div>
          </div>
          <p className="text-green-700 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // This prevents the page from rendering anything before the redirect logic fires
  if (!user) {
    return null;
  }

  // The rest of the JSX is largely the same, just with updated <Link> components
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      <header className="bg-white/90 backdrop-blur-md border-b border-green-100 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-6">
              {/* Use Next.js Link with href prop */}
              <Link
                href="/"
                className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-all duration-200 hover:scale-105 group"
                title="Back to home"
              >
                <div className="p-1 rounded-full group-hover:bg-green-50 transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium hidden sm:inline">Home</span>
              </Link>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative">
                  <div className="rounded-xl bg-gradient-to-br from-green-600 to-emerald-500 p-2 sm:p-2.5 shadow-lg">
                    <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                    API Dashboard
                  </h1>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    Manage your polygot integration
                  </p>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border border-green-100 hover:shadow-md transition-all duration-200">
                <Avatar className="h-8 w-8 ring-2 ring-green-100">
                  <AvatarImage src={user.profile_image || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="bg-gradient-to-br from-green-100 to-emerald-100 text-green-700 font-semibold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 transition-all duration-200 shadow-sm hover:shadow-md bg-transparent"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-green-700 hover:bg-green-50">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 sm:w-96">
                  <div className="flex flex-col gap-6 pt-6">
                    <div className="sm:hidden">
                      <h1 className="text-xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                        API Dashboard
                      </h1>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <Sparkles className="h-3 w-3" />
                        Manage your polygot integration
                      </p>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-green-50/50 rounded-xl border border-green-100">
                      <Avatar className="h-12 w-12 ring-2 ring-green-200">
                        <AvatarImage src={user.profile_image || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback className="bg-gradient-to-br from-green-100 to-emerald-100 text-green-700 font-semibold">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <Button
                        variant="outline"
                        onClick={handleLogout}
                        className="w-full justify-start border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 transition-all duration-200 bg-transparent"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-6 py-8">
        <ApiKeyGenerator />
      </main>
      <footer className="border-t border-green-100 bg-white/50 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-center text-xs text-gray-500">
            <span>Powered by polygot AI Translation Engine</span>
          </div>
        </div>
      </footer>
    </div>
  );
}