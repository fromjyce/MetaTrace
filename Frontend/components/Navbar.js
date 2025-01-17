"use client";
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Navbar = () => {
  const router = useRouter();
  const isActive = (path) => router.pathname === path;

  return (
    <>
      <div className="bg-[#f7f7f7ff] w-full h-2"></div>
      <nav className="bg-[#f74b25ff] text-black p-2 rounded-xl shadow-sm mx-4 mb-2">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image src="/metatrace.png" alt="MetaTrace Logo" width={40} height={40} />
            <Link href="/" className="font-black text-xl questrial text-[#1a1a1aff]">
              MetaTrace
            </Link>
          </div>
          <div className="flex space-x-6 poppins font-semibold">
            <Link
              href="/upload"
              className={`pl-4 py-2 rounded-lg hover:text-[#f7f7ff] ${
                isActive('/upload') ? 'text-[#f7f7ff]' : 'text-[#1a1a1aff]'
              }`}
            >
              Upload
            </Link>
            <Link
              href="/profile"
              className={`py-2 rounded-lg hover:text-[#f7f7ff] ${
                isActive('/profile') ? 'text-[#f7f7ff]' : 'text-[#1a1a1aff]'
              }`}
            >
              Profile
            </Link>
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
