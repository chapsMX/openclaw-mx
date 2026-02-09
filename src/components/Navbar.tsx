"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";

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
          ? "bg-bg-surface/95 backdrop-blur-sm shadow-lg border-b border-border" 
          : "bg-bg-surface border-b border-border"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/openclaw_logo.png"
            alt="OpenClaw"
            width={50}
            height={50}
            className="h-12 w-auto"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-medium text-text-secondary tracking-wide">Instalación</span>
            <span className="font-bold text-xl tracking-tight text-text-primary">
              <span className="text-accent-primary">Open</span>Claw
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {/* Theme Toggle */}
          <ThemeToggle />

          <div className="flex items-center gap-8 font-semibold text-sm uppercase tracking-wider">
            <Link href="/#features" className="text-text-secondary hover:text-text-primary transition-colors relative group">
              Características
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-secondary group-hover:w-full transition-all duration-200" />
            </Link>
            <Link href="/#usecases" className="text-text-secondary hover:text-text-primary transition-colors relative group">
              Casos de Uso
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-secondary group-hover:w-full transition-all duration-200" />
            </Link>
            <Link href="/blog" className="text-text-secondary hover:text-text-primary transition-colors relative group">
              Blog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-secondary group-hover:w-full transition-all duration-200" />
            </Link>
            <Link href="/#faq" className="text-text-secondary hover:text-text-primary transition-colors relative group">
              FAQ
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-secondary group-hover:w-full transition-all duration-200" />
            </Link>
          </div>

          {/* CTA Button */}
          <Link
            href="/#plans"
            className="bg-cta-bg text-cta-text font-bold px-6 py-2.5 text-sm uppercase tracking-wider rounded-lg hover:bg-cta-bg-hover transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Contratar
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-text-primary"
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
        className={`md:hidden bg-bg-surface border-t border-border overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-6 space-y-4 font-semibold uppercase tracking-wide">
          {/* Mobile Theme Toggle */}
          <div className="py-2 flex justify-center">
            <ThemeToggle />
          </div>
          
          <Link 
            href="/#features" 
            className="block py-2 border-b border-border text-text-secondary hover:text-text-primary" 
            onClick={() => setMobileMenuOpen(false)}
          >
            Características
          </Link>
          <Link 
            href="/#usecases" 
            className="block py-2 border-b border-border text-text-secondary hover:text-text-primary" 
            onClick={() => setMobileMenuOpen(false)}
          >
            Casos de Uso
          </Link>
          <Link 
            href="/blog" 
            className="block py-2 border-b border-border text-text-secondary hover:text-text-primary" 
            onClick={() => setMobileMenuOpen(false)}
          >
            Blog
          </Link>
          <Link 
            href="/#faq" 
            className="block py-2 border-b border-border text-text-secondary hover:text-text-primary" 
            onClick={() => setMobileMenuOpen(false)}
          >
            FAQ
          </Link>
          <Link
            href="/#plans"
            className="block bg-cta-bg text-cta-text text-center py-3 mt-4 rounded-lg font-bold shadow-lg"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contratar
          </Link>
        </div>
      </div>
    </nav>
  );
}
