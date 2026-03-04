import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Welcome</h1>
          <p>Authentication System</p>
        </div>

        <div className="d-grid gap-2">
          <Link href="/login" className="btn btn-primary btn-lg">
            Sign In
          </Link>
          <Link href="/register" className="btn btn-outline-primary btn-lg">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

