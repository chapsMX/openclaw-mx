"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-claw-white/95 backdrop-blur-sm shadow-lg border-b-3 border-claw-black" 
          : "bg-claw-white border-b-3 border-claw-black"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/openclaw_logo.png"
            alt="OpenClaw"
            width={180}
            height={50}
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8 font-semibold text-sm uppercase tracking-wider">
            <Link href="#features" className="text-claw-black/70 hover:text-claw-black transition-colors relative group">
              Características
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-claw-green group-hover:w-full transition-all duration-200" />
            </Link>
            <Link href="#usecases" className="text-claw-black/70 hover:text-claw-black transition-colors relative group">
              Casos de Uso
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-claw-green group-hover:w-full transition-all duration-200" />
            </Link>
            <Link href="/blog" className="text-claw-black/70 hover:text-claw-black transition-colors relative group">
              Blog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-claw-green group-hover:w-full transition-all duration-200" />
            </Link>
            <Link href="#faq" className="text-claw-black/70 hover:text-claw-black transition-colors relative group">
              FAQ
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-claw-green group-hover:w-full transition-all duration-200" />
            </Link>
          </div>

          {/* CTA Button */}
          <Link
            href="#plans"
            className="bg-claw-red text-white font-bold px-6 py-2.5 text-sm uppercase tracking-wider border-3 border-claw-black shadow-[4px_4px_0px_#0a0a0a] hover:shadow-[2px_2px_0px_#0a0a0a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100"
          >
            Contratar
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden bg-claw-white border-t-3 border-claw-black overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-6 space-y-4 font-semibold uppercase tracking-wide">
          <Link 
            href="#features" 
            className="block py-2 border-b border-claw-black/10" 
            onClick={() => setMobileMenuOpen(false)}
          >
            Características
          </Link>
          <Link 
            href="#usecases" 
            className="block py-2 border-b border-claw-black/10" 
            onClick={() => setMobileMenuOpen(false)}
          >
            Casos de Uso
          </Link>
          <Link 
            href="/blog" 
            className="block py-2 border-b border-claw-black/10" 
            onClick={() => setMobileMenuOpen(false)}
          >
            Blog
          </Link>
          <Link 
            href="#faq" 
            className="block py-2 border-b border-claw-black/10" 
            onClick={() => setMobileMenuOpen(false)}
          >
            FAQ
          </Link>
          <Link
            href="#plans"
            className="block bg-claw-red text-white text-center py-3 mt-4 border-3 border-claw-black shadow-[4px_4px_0px_#0a0a0a]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contratar
          </Link>
        </div>
      </div>
    </nav>
  );
}
