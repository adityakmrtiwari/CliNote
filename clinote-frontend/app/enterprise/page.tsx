'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Building2, Users, BarChart3, Settings, ArrowRight, Shield } from 'lucide-react';

export default function EnterprisePage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 overflow-hidden bg-slate-50">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-slate-100 to-slate-50" />
                </div>

                <div className="container px-4 md:px-6 mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium border-blue-200 bg-blue-50 text-blue-700 mb-8">
                                <Building2 className="mr-2 h-3.5 w-3.5 fill-blue-700" />
                                CliNote for Enterprise
                            </div>
                            <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl text-slate-900 leading-tight mb-6">
                                Scale AI Documentation Across Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Health System</span>
                            </h1>
                            <p className="text-lg text-slate-600 md:text-xl leading-relaxed mb-10">
                                Empower your entire clinical staff with the world's most advanced AI scribe. Improve provider satisfaction, reduce burnout, and increase revenue.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/contact">
                                    <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-900/20 transition-all hover:scale-105">
                                        Contact Sales
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="relative">
                            {/* Abstract visual representation of enterprise connectivity */}
                            <div className="aspect-square rounded-3xl bg-gradient-to-br from-blue-100 to-indigo-100 p-8 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 mix-blend-multiply"></div>
                                <div className="grid grid-cols-2 gap-4 relative z-10">
                                    <div className="bg-white p-6 rounded-2xl shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                                        <Users className="h-8 w-8 text-blue-600 mb-2" />
                                        <div className="text-2xl font-bold text-slate-900">500+</div>
                                        <div className="text-sm text-slate-500">Providers</div>
                                    </div>
                                    <div className="bg-white p-6 rounded-2xl shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 mt-8">
                                        <BarChart3 className="h-8 w-8 text-indigo-600 mb-2" />
                                        <div className="text-2xl font-bold text-slate-900">20k+</div>
                                        <div className="text-sm text-slate-500">Hours Saved</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enterprise Features */}
            <section className="py-20 bg-white">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900">Enterprise-Grade Capabilities</h2>
                        <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-lg">
                            Built to meet the complex needs of large healthcare organizations.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Settings,
                                title: "Custom Integration",
                                desc: "Deep integration with Epic, Cerner, Allscripts, and other major EHR systems."
                            },
                            {
                                icon: Shield,
                                title: "Advanced Security",
                                desc: "SSO (SAML/OIDC), audit logs, and dedicated private cloud deployment options."
                            },
                            {
                                icon: Users,
                                title: "Admin Dashboard",
                                desc: "Centralized management of users, usage analytics, and organizational settings."
                            }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-all">
                                <div className="p-4 rounded-full bg-blue-100 text-blue-600 mb-6">
                                    <item.icon className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-slate-900">{item.title}</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
