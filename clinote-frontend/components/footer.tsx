'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Stethoscope, Facebook, Twitter, Linkedin, Instagram, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on auth pages
  if (pathname === '/login' || pathname === '/register') {
    return null;
  }

  const footerLinks = {
    product: [
      { href: '/features', label: 'Features' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/security', label: 'Security' },
      { href: '/enterprise', label: 'Enterprise' },
    ],
    company: [
      { href: '/about', label: 'About Us' },
      { href: '/careers', label: 'Careers' },
      { href: '/blog', label: 'Blog' },
      { href: '/contact', label: 'Contact' },
    ],
    legal: [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
      { href: '/cookies', label: 'Cookie Policy' },
      { href: '/hipaa', label: 'HIPAA Compliance' },
    ]
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="bg-blue-600 p-2 rounded-xl">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">CliNote</span>
            </Link>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed mb-8">
              Empowering clinicians with AI-driven documentation. Reclaim your time and focus on what matters most—your patients.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="font-semibold text-white mb-6">Product</h3>
            <ul className="space-y-4 text-sm">
              {footerLinks.product.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-blue-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-6">Company</h3>
            <ul className="space-y-4 text-sm">
              {footerLinks.company.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-blue-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-6">Legal</h3>
            <ul className="space-y-4 text-sm">
              {footerLinks.legal.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-blue-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-slate-800 pt-12 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Subscribe to our newsletter</h3>
              <p className="text-slate-400 text-sm">Get the latest updates on medical AI and practice management.</p>
            </div>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-blue-600"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} CliNote Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>Systems Operational</span>
            </div>
            <span className="text-slate-700">|</span>
            <span>Made with ❤️ for Medicine</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
