// app/auth/callback/page.js
"use client";

import { useEffect, Suspense } from 'react'; // Import Suspense
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import SkeletonLoadingScreen from '@/components/ui/loading';

// This is a separate component specifically to handle the logic
// that uses useSearchParams. We'll render this inside Suspense.
function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams(); // This hook is called here
  const { setToken, checkAuthStatus } = useAuthStore();

  useEffect(() => {
    const tokenFromParams = searchParams.get('token');

    if (tokenFromParams) {
      setToken(tokenFromParams);
      checkAuthStatus().then(() => {
        router.push('/application');
      });
    } else {
      console.error("No token found in URL, redirecting home.");
      router.push('/');
    }
  }, [searchParams, setToken, checkAuthStatus, router]);

  return <SkeletonLoadingScreen />;
}

// This is your main page component
export default function AuthCallbackPage() {
  // The Suspense boundary wraps the AuthCallbackContent
  // which is where useSearchParams is actually used.
  return (
    <Suspense fallback={<SkeletonLoadingScreen />}>
      <AuthCallbackContent />
    </Suspense>
  );
}