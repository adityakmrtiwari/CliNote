'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shield, Lock, Server, FileKey, Eye, CheckCircle2 } from 'lucide-react';

export default function SecurityPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 overflow-hidden bg-slate-900 text-white">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-900/80 via-slate-900/90 to-slate-900" />
                </div>

                <div className="container px-4 md:px-6 mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium border-blue-500/30 bg-blue-500/10 text-blue-400 mb-8">
                        <Shield className="mr-2 h-3.5 w-3.5" />
                        Bank-Grade Security
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl max-w-4xl mx-auto leading-tight mb-6">
                        Your Data Security is Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Top Priority</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-slate-400 md:text-xl leading-relaxed mb-10">
                        We employ state-of-the-art encryption and security protocols to ensure your patient data is always protected and HIPAA compliant.
                    </p>
                </div>
            </section>

            {/* Security Features */}
            <section className="py-20 bg-white">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">End-to-End Encryption</h2>
                            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                                All data transmitted between your device and our servers is encrypted using industry-standard TLS 1.2+ protocols. Your data at rest is encrypted using AES-256 encryption, the same standard used by banks and governments.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "TLS 1.2+ for data in transit",
                                    "AES-256 for data at rest",
                                    "Key management via AWS KMS",
                                    "Regular penetration testing"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700">
                                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 flex justify-center items-center">
                            <Lock className="w-48 h-48 text-blue-100" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Server,
                                title: "Secure Infrastructure",
                                desc: "Hosted on AWS HIPAA-eligible services with strict network isolation and firewalls."
                            },
                            {
                                icon: FileKey,
                                title: "Access Control",
                                desc: "Role-based access control (RBAC) ensures only authorized personnel can access specific data."
                            },
                            {
                                icon: Eye,
                                title: "Continuous Monitoring",
                                desc: "24/7 security monitoring and automated threat detection systems."
                            }
                        ].map((item, i) => (
                            <div key={i} className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
                                <div className="p-4 rounded-xl bg-blue-100 text-blue-600 w-fit mb-6">
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

            {/* Compliance Section */}
            <section className="py-20 bg-slate-50">
                <div className="container px-4 md:px-6 mx-auto text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-12">Compliance & Certifications</h2>
                    <div className="flex flex-wrap justify-center gap-8 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Placeholders for compliance logos - using text for now */}
                        <div className="px-8 py-4 bg-white rounded-lg shadow-sm font-bold text-slate-600 text-xl border border-slate-200">HIPAA</div>
                        <div className="px-8 py-4 bg-white rounded-lg shadow-sm font-bold text-slate-600 text-xl border border-slate-200">SOC 2 Type II</div>
                        <div className="px-8 py-4 bg-white rounded-lg shadow-sm font-bold text-slate-600 text-xl border border-slate-200">GDPR</div>
                        <div className="px-8 py-4 bg-white rounded-lg shadow-sm font-bold text-slate-600 text-xl border border-slate-200">HITECH</div>
                    </div>
                </div>
            </section>
        </div>
    );
}
