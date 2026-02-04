"use client";

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-claw-white border-b-3 border-claw-black z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-claw-green border-3 border-claw-black flex items-center justify-center">
            <span className="text-xl">🤖</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium">Instalación</span>
            <span className="font-bold text-lg tracking-tight">
              <span className="text-claw-red">Open</span>Claw
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-semibold text-sm uppercase tracking-wide">
          <Link href="#features" className="hover:text-claw-green transition">
            Características
          </Link>
          <Link href="#usecases" className="hover:text-claw-green transition">
            Casos de Uso
          </Link>
          <Link href="/blog" className="hover:text-claw-green transition">
            Blog
          </Link>
          <Link href="#faq" className="hover:text-claw-green transition">
            FAQ
          </Link>
        </div>

        {/* CTA Button */}
        <Link
          href="#plans"
          className="hidden md:block bg-claw-red text-white font-bold px-6 py-2 uppercase tracking-wide brutal-btn"
        >
          Contratar
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-claw-white border-t-3 border-claw-black">
          <div className="px-4 py-4 space-y-4 font-semibold uppercase">
            <Link href="#features" className="block" onClick={() => setMobileMenuOpen(false)}>
              Características
            </Link>
            <Link href="#usecases" className="block" onClick={() => setMobileMenuOpen(false)}>
              Casos de Uso
            </Link>
            <Link href="/blog" className="block" onClick={() => setMobileMenuOpen(false)}>
              Blog
            </Link>
            <Link href="#faq" className="block" onClick={() => setMobileMenuOpen(false)}>
              FAQ
            </Link>
            <Link
              href="#plans"
              className="block bg-claw-red text-white text-center py-2 brutal-btn"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contratar
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
