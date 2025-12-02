// pages/auth/callback.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const query = router.query;
      const token = query.token as string;
      const refreshToken = query.refreshToken as string;

      if (token) {
        // Save JWT in cookies or localStorage
        localStorage.setItem('accessToken', token);
        localStorage.setItem('refreshToken', refreshToken);

        // Redirect to home page or dashboard
        router.replace('/');
      }
    }
  }, [router.isReady]);

  return <p>Logging you in...</p>;
}
