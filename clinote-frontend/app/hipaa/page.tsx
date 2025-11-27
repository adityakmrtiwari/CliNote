'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';

export default function HIPAAPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-24 bg-slate-900 text-white">
                <div className="container px-4 md:px-6 mx-auto text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-green-500/20 rounded-full text-green-400 mb-6 border border-green-500/30">
                        <ShieldCheck className="h-8 w-8" />
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        HIPAA Compliance
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-slate-300 leading-relaxed">
                        We are committed to the highest standards of data privacy and security in healthcare.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container px-4 md:px-6 mx-auto max-w-4xl">
                    <div className="grid gap-12">
                        <div className="flex gap-6">
                            <div className="flex-shrink-0">
                                <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                                    <Lock className="h-6 w-6" />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-3">Our Commitment</h2>
                                <p className="text-slate-600 leading-relaxed">
                                    CliNote is fully compliant with the Health Insurance Portability and Accountability Act (HIPAA). We have implemented comprehensive administrative, physical, and technical safeguards to ensure the confidentiality, integrity, and availability of Protected Health Information (PHI).
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="flex-shrink-0">
                                <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                                    <FileText className="h-6 w-6" />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-3">Business Associate Agreement (BAA)</h2>
                                <p className="text-slate-600 leading-relaxed mb-4">
                                    We sign a Business Associate Agreement (BAA) with all our enterprise customers and covered entities. This agreement outlines our responsibilities and obligations regarding the handling of PHI.
                                </p>
                                <Button variant="outline">Request Sample BAA</Button>
                            </div>
                        </div>

                        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                            <h3 className="text-xl font-bold text-slate-900 mb-6">Security Measures</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    "Data Encryption in Transit (TLS 1.2+)",
                                    "Data Encryption at Rest (AES-256)",
                                    "Strict Access Controls & Authentication",
                                    "Regular Security Audits & Risk Assessments",
                                    "Employee HIPAA Training",
                                    "Incident Response Plan"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        <span className="text-slate-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
