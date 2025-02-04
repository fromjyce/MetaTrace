"use client";
import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { ArrowRight } from "lucide-react";
import Link from 'next/link';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = {};
  
    // Client-side validation
    if (!email) {
      formErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Please enter a valid email.";
    }
  
    if (!password) {
      formErrors.password = "Password is required.";
    }
  
    // If there are no client-side validation errors
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          console.log('Login successful:', data);
          // Redirect to the /upload page after successful login
          router.push('/upload');
        } else {
          // If response is not OK, show the error message
          setErrors({ email: data.message || 'Invalid email or password' });
        }
      } catch (error) {
        console.error('Login Error:', error);
        setErrors({ email: 'Something went wrong. Please try again.' });
      }
    } else {
      setErrors(formErrors); // Show client-side validation errors
    }
  };  
  

  return (
    <>
      <Head>
        <title>MetaTrace | Login</title>
      </Head>
      <div className="flex justify-center items-center min-h-screen bg-[#dfdfdf]">
        <div className="w-full max-w-4xl bg-[#f7f7f7ff] rounded-lg shadow-lg flex h-[650px]">
          <div className="w-1/2 h-full relative flex justify-center items-center">
            <Link href="/" className='poppins font-semibold text-[#1c1c1cff]'>
              <button
                className="absolute top-4 right-4 bg-[rgba(192,192,192,0.8)] py-2 px-4 rounded-lg hover:bg-[rgba(192,192,192,1)] flex items-center space-x-2"
              >
                <span>MetaTrace</span>
                <ArrowRight size={18} />
              </button>
            </Link>
            <Image
              src="/input_form/login.png"
              alt="Login"
              width={600}
              height={300}
              objectFit="contain"
              className="rounded-l-lg max-w-full max-h-full"
            />
          </div>
          <div className="w-1/2 h-full flex flex-col justify-center pl-8 pt-12 pb-12 pr-8">
            <h2 className="text-2xl font-black mb-2 epilogue">Welcome Back to <strong className='text-[#ef4d31ff]'>MetaTrace</strong></h2>
            <p className="text-[#5e5e5eff] mb-5 poppins">Unlock the power of metadata visualization and insights.</p>
            <form onSubmit={handleSubmit} className='poppins'>
              <div className="mb-4">
                <label htmlFor="email" className="block text-[#5e5e5eff] font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ef4d31ff]"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-[#5e5e5eff] font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ef4d31ff]"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-[#f74b25ff] text-white py-2 px-4 rounded-lg hover:bg-[#bf3e27] font-semibold"
              >
                Log In
              </button>
            </form>
            <p className="text-center text-[#5e5e5eff] mt-4 epilogue font-medium">
              Don't have an account?{' '}
              <a href="/signup" className="text-[#f74b25ff] hover:underline hover:text-[#bf3e27] font-bold">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Login;
