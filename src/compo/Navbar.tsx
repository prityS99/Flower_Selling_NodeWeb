"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Flower2 } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/Hooks/Redux/store";
import { logoutThunk } from "@/Hooks/Redux/Slices/authSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logoutThunk());
  };
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <nav className="fixed w-full z-50 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl px-6 py-3 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-emerald-500 p-2 rounded-lg group-hover:rotate-12 transition-transform">
              <Flower2 className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-800">Florist<span className="text-emerald-600 text-3xl">.</span></span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">

            {isAuthenticated ? (
              <>
                {/* <span className="text-sm font-semibold text-gray-700">
                  Hi, {user?.name}
                </span> */}

                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white text-sm font-semibold px-5 py-2 rounded-xl hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-semibold text-gray-700 hover:text-emerald-600 px-4 py-2"
                >
                  Login
                </Link>
                <Link
                  href="/admin/dashboard"
                  className="text-sm font-semibold text-gray-700 hover:text-emerald-600 px-4 py-2"
                >
                  Admin
                </Link>
                <Link
                  href="/signup"
                  className="bg-emerald-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl shadow-md hover:bg-emerald-700 hover:shadow-emerald-200 transition-all active:scale-95"
                >
                  Sign Up
                </Link>
              </>
            )}

          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2 text-gray-600" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-0 w-full px-4 md:hidden"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-4 border border-gray-100">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} className="text-lg font-medium text-gray-700" onClick={() => setIsOpen(false)}>
                  {link.name}
                </Link>
              ))}
              <hr className="border-gray-100" />
              <div className="flex flex-col gap-3">
                <Link href="/login" className="text-center py-3 text-gray-700 font-semibold">Login</Link>
                <Link href="/signup" className="bg-emerald-600 text-white text-center py-3 rounded-xl font-semibold">Sign Up</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;