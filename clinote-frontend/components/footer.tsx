'use client';

import Link from 'next/link';

export default function Footer() {
  const footerLinks = [
    { href: '/about', label: 'About' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ];

  return (
    <footer className="bg-white border-t border-slate-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        {/* Branding */}
        <div className="text-center md:text-left">
          <span className="text-lg font-semibold text-slate-800">CliNote</span>
          <p className="text-sm text-slate-500">AI-powered medical documentation</p>
        </div>

        {/* Links */}
        <div className="flex space-x-6">
          {footerLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-slate-600 hover:text-blue-600 text-sm transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} CliNote. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
