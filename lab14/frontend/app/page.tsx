'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authAPI } from '@/lib/api';
import Cookies from 'js-cookie';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      router.push('/profile');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">
            Welcome
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Secure User Authentication Portal
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-4">
            <Link
              href="/register"
              className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg text-center"
            >
              Create New Account
            </Link>

            <Link
              href="/login"
              className="block w-full bg-white text-blue-600 font-semibold py-4 px-6 rounded-xl border-2 border-blue-600 hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 text-center"
            >
              Sign In
            </Link>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Your data is protected with industry-standard security
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

