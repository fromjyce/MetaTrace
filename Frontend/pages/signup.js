"use client";
import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { ArrowRight } from "lucide-react";
import Link from 'next/link';
import Footer from '@/components/Footer';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = {};

    if (!name) formErrors.name = "Name is required.";
    if (!email) {
      formErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Please enter a valid email.";
    }
    if (email === 'existing@example.com') {
      formErrors.email = "Email already exists.";
    }
    if (!password) {
      formErrors.password = "Password is required.";
    } else if (password.length < 8) {
      formErrors.password = "Password must be at least 8 characters.";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      formErrors.password = "Password must contain at least one special character.";
    }
    if (confirmPassword !== password) {
      formErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(formErrors).length === 0) {
      const registrationData = { name, email, password };
      console.log("Registration Data: ", registrationData);
    }

    setErrors(formErrors);
  };

  return (
    <>
      <Head>
        <title>MetaTrace | Sign Up</title>
      </Head>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg flex h-[650px]">
          <div className="w-1/2 h-full relative flex justify-center items-center">
          <Link href="/">
            <button
              className="absolute top-4 right-4 bg-[rgba(192,192,192,0.8)] text-black py-2 px-4 rounded-lg hover:bg-[rgba(192,192,192,1)] flex items-center space-x-2"
            >
              <span>MetaTrace</span>
              <ArrowRight size={18} />
            </button>
            </Link>
            <Image
              src="/input_form/signup.png"
              alt="Signup"
              width={600}
              height={300}
              objectFit="contain"
              className="rounded-l-lg max-w-full max-h-full"
            />
          </div>
          <div className="w-1/2 h-full flex flex-col justify-center pl-8 pt-12 pb-12 pr-8">
            <h2 className="text-2xl font-bold mb-2">Join MetaTrace Today</h2>
            <p className="text-gray-600 mb-6">Unlock the power of metadata visualization and insights.</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
              </div>
              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">
                    I agree to the terms and conditions
                  </span>
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Sign Up
              </button>
            </form>
            <p className="text-center text-gray-600 mt-4">
              Already have an account?{' '}
              <a href="/login" className="text-blue-500 hover:underline">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Signup;
