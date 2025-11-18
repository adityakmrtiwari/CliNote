'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Stethoscope, LogOut, Home, Users, Menu, X } from 'lucide-react';
import { apiService } from '@/lib/api';

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [tokenExpiry, setTokenExpiry] = useState<string | null>(null);

  const handleLogout = () => {
    apiService.logout();
    setIsAuthenticated(false);
    setUserName(null);
    // navigate to login
    router.push('/login');
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

  // Initialize auth state on mount and listen for storage changes (cross-tab login/logout)
  useEffect(() => {
    // Decode JWT payload to extract expiry
    const decodeExpiry = (token: string | undefined | null): string | null => {
      if (!token) return null;
      try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;
        // base64url -> base64
        const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
        // add padding
        const pad = payload.length % 4;
        const padded = payload + (pad === 2 ? '==' : pad === 3 ? '=' : pad === 0 ? '' : '');
        const decoded = atob(padded);
        const obj = JSON.parse(decoded);
        if (!obj.exp) return null;
        const d = new Date(obj.exp * 1000);
        return d.toLocaleString();
      } catch (err) {
        return null;
      }
    };

    const updateAuth = async () => {
      const user = apiService.getCurrentUser();
      if (!user?.token) {
        setIsAuthenticated(false);
        setUserName(null);
        setTokenExpiry(null);
        return;
      }

      // Try to validate token with profile endpoint. If invalid, apiService will handle 401.
      try {
        const profile = await apiService.getProfile();
        if (profile?.data) {
          setIsAuthenticated(true);
          setUserName(profile.data.name ?? user.name ?? null);
          setTokenExpiry(decodeExpiry(user.token));
        } else {
          setIsAuthenticated(false);
          setUserName(null);
          setTokenExpiry(null);
        }
      } catch (err) {
        setIsAuthenticated(false);
        setUserName(null);
        setTokenExpiry(null);
      }
    };

    updateAuth();

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'clinote_user') updateAuth();
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

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

  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b border-slate-200 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Stethoscope className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">CliNote</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center space-x-1 transition-colors ${
                  isActive(href)
                    ? 'text-blue-600 font-semibold'
                    : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* Logout (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="text-sm text-slate-700">
                  <div className="font-medium">{userName}</div>
                  {tokenExpiry && (
                    <div className="text-xs text-slate-500">Expires: {tokenExpiry}</div>
                  )}
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button variant="outline" size="sm" className="flex items-center space-x-1">
                  <span>Login</span>
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 transition-opacity duration-300 ease-in-out ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>

      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()} // prevent backdrop click
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="text-lg font-bold">Menu</span>
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex flex-col space-y-4 p-4">
          {isAuthenticated && (
            <div className="px-2 py-1 border rounded-md">
              <div className="font-medium text-slate-800">{userName}</div>
              {tokenExpiry && <div className="text-xs text-slate-500">Expires: {tokenExpiry}</div>}
            </div>
          )}
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center space-x-2 text-lg rounded-lg p-2 ${
                isActive(href)
                  ? 'text-blue-600 font-semibold bg-slate-100'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          ))}
          {isAuthenticated ? (
            <Button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              variant="outline"
              size="sm"
              className="flex items-center space-x-1"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          ) : (
            <Link href="/login">
              <Button
                onClick={() => setMobileMenuOpen(false)}
                variant="outline"
                size="sm"
                className="flex items-center space-x-1"
              >
                <span>Login</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
