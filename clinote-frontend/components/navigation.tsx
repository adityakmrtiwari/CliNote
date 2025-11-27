'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Stethoscope, LogOut, Home, Users, Menu, X } from 'lucide-react';
import { useAuth } from '@/components/auth-provider';

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/patients', label: 'Patients', icon: Users },
  ];

  const isActive = (href: string) => pathname === href;

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [mobileMenuOpen]);

  // Close menu on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Hide navigation on auth pages
  if (pathname === '/login' || pathname === '/register') {
    return null;
  }

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="bg-blue-600 p-2 rounded-xl group-hover:bg-blue-700 transition-colors">
                <Stethoscope className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">CliNote</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {isAuthenticated && navLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center space-x-2 text-sm font-medium transition-colors ${isActive(href)
                    ? 'text-blue-600'
                    : 'text-slate-600 hover:text-blue-600'
                    }`}
                >
                  <Icon className={`h-4 w-4 ${isActive(href) ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-600'}`} />
                  <span>{label}</span>
                </Link>
              ))}
            </div>

            {/* Logout (Desktop) */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-slate-700 font-medium">
                    {user?.name}
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    size="sm"
                    className="text-slate-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link href="/login">
                    <Button variant="ghost" size="sm" className="text-slate-600 hover:text-blue-600">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(true)}
                className="text-slate-700 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out z-[9998] ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>

      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 w-full sm:w-80 h-full bg-white shadow-2xl transform transition-transform duration-300 ease-out z-[9999] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        onClick={(e) => e.stopPropagation()} // prevent backdrop click
      >
        <div className="relative z-10 bg-white min-h-full">
          <div className="flex justify-between items-center p-6 border-b border-slate-100">
            <span className="text-lg font-bold text-slate-900">Menu</span>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="text-slate-400 hover:text-slate-600">
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex flex-col p-6 space-y-6">
            {isAuthenticated && (
              <div className="flex items-center space-x-3 px-2 py-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{user?.name}</div>
                  <div className="text-xs text-slate-500">Signed in</div>
                </div>
              </div>
            )}

            <div className="space-y-1">
              {isAuthenticated ? navLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${isActive(href)
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className={`h-5 w-5 ${isActive(href) ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{label}</span>
                </Link>
              )) : (
                <>
                  <Link
                    href="/"
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Home className="h-5 w-5 text-slate-400" />
                    <span>Home</span>
                  </Link>
                </>
              )}
            </div>

            <div className="pt-6 border-t border-slate-100">
              {isAuthenticated ? (
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  variant="outline"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              ) : (
                <div className="space-y-3">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-center">
                      Log In
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full justify-center bg-blue-600 hover:bg-blue-700">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Spacer to prevent content from being hidden behind fixed header */}
      <div className="h-16" />
    </>
  );
}
