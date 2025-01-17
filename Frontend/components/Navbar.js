"use client";
import Link from 'next/link';
import { useState } from "react";
import { useRouter } from 'next/router';
import Image from 'next/image'; // Importing the Image component

const Navbar = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("");

  const isActive = (path) => router.pathname === path;

  return (
    <>
    <div className="bg-[#f7f7f7ff] w-full h-2"></div>
    <nav className="bg-[#f74b25ff] text-black p-2 rounded-xl shadow-sm mx-4 mb-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Image src="/metatrace.png" alt="MetaTrace Logo" width={40} height={40} />
          <div className="font-black text-xl questrial text-[#1a1a1aff]">MetaTrace</div>
        </div>
        <div className="flex space-x-4 poppins font-semibold">
          
          <a
            href="/"
            className="bg-[#1a1a1aff] text-[#f7f7ff] px-4 py-2 rounded-lg hover:bg-[#1b1b1cff]"
          >
            Logout
          </a>
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
