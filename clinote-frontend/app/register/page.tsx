'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, User, Mail, Lock, AlertCircle } from 'lucide-react';
import { apiService } from '@/lib/api';
import { useAuth } from '@/components/auth-provider';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const { login } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await apiService.register(name, email, password);

      if (result.success && result.data) {
        login(result.data);
        router.push('/dashboard');
      } else {
        setError(result.message || 'Registration failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex overflow-hidden">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative flex-col justify-between p-12 text-white">
        {/* Abstract Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-900/0 via-slate-900/60 to-slate-900" />
        </div>

        <div className="relative z-10 flex items-center space-x-3">
          <div className="bg-blue-600/90 backdrop-blur-sm p-2.5 rounded-xl shadow-lg shadow-blue-900/20 border border-blue-500/20">
            <Stethoscope className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight">CliNote</span>
        </div>

        <div className="relative z-10 max-w-lg">
          <h2 className="text-3xl font-bold mb-8 tracking-tight">Join the future of medicine</h2>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 mt-1 backdrop-blur-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-slate-100">Save 2+ Hours Daily</h3>
                <p className="text-slate-400 leading-relaxed text-sm">Automate your documentation and leave the office on time.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 mt-1 backdrop-blur-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-slate-100">99% Clinical Accuracy</h3>
                <p className="text-slate-400 leading-relaxed text-sm">Trusted by thousands of providers for precise medical notes.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 mt-1 backdrop-blur-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-slate-100">Bank-Grade Security</h3>
                <p className="text-slate-400 leading-relaxed text-sm">Fully HIPAA compliant with end-to-end encryption.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="relative z-10 text-sm text-slate-500 font-medium">
          &copy; {new Date().getFullYear()} CliNote Inc. HIPAA Compliant.
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white relative">
        {/* Back to Home Link */}
        <div className="absolute top-8 left-8">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors group">
            <div className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-blue-50 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            </div>
            Back to Home
          </Link>
        </div>

        <div className="w-full max-w-[400px] space-y-8">
          <div className="text-center lg:text-left space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Create an account</h1>
            <p className="text-slate-500">
              Start your 14-day free trial. No credit card required.
            </p>
          </div>

          <div className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                <div className="text-sm text-red-700 leading-relaxed">{error}</div>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-700 font-medium">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Dr. John Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-11 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-medium">Work Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="doctor@hospital.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700 font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 transition-all duration-200"
                />
                <p className="text-xs text-slate-500">Must be at least 8 characters long.</p>
              </div>
              <Button
                type="submit"
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-base font-medium shadow-lg shadow-blue-900/20 transition-transform active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Creating Account...</span>
                  </div>
                ) : 'Get Started'}
              </Button>
            </form>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-100" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-wider">
                <span className="bg-white px-4 text-slate-400 font-medium">Or continue with</span>
              </div>
            </div>

            <Button variant="outline" className="w-full h-11 bg-white hover:bg-slate-50 border-slate-200 text-slate-700 font-medium transition-colors" disabled>
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google Workspace
            </Button>

            <p className="text-center text-sm text-slate-500">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline underline-offset-4 transition-all">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}