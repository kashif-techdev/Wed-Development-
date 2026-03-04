import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface User {
  id: number;
  username: string;
  email: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (!token || !userStr) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(userStr));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) {
    return (
      <div className="auth-container">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Dashboard</h1>
          <p>Welcome to your dashboard</p>
        </div>

        <div className="card">
          <div className="card-body">
            <h5 className="card-title">User Information</h5>
            <p className="card-text">
              <strong>ID:</strong> {user.id}
            </p>
            <p className="card-text">
              <strong>Username:</strong> {user.username}
            </p>
            <p className="card-text">
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="btn btn-danger w-100 mt-3"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

