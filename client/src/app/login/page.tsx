"use client"
import Login from '@/components/login/Login'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import Cookies from 'js-cookie'

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('auth_token');

    if (token) router.push('/dashboard');
  }, []);

  return (
    <div className='w-full h-full'>
        <Login/>
    </div>
  )
}

export default LoginPage