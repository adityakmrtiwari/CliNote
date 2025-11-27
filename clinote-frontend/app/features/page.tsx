'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Stethoscope, Mic, FileText, Sparkles, Brain, Clock, Lock } from 'lucide-react';

export default function FeaturesPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 overflow-hidden bg-slate-50">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1576091160550-2187d80a18f7?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5 mix-blend-multiply" />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-50/80 via-slate-50/50 to-slate-50" />
                </div>

                <div className="container px-4 md:px-6 mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium border-blue-200 bg-blue-50 text-blue-700 mb-8">
                        <Sparkles className="mr-2 h-3.5 w-3.5 fill-blue-700" />
                        Powered by Advanced AI
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl max-w-4xl mx-auto text-slate-900 leading-tight mb-6">
                        Features that <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Empower</span> Your Practice
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-slate-600 md:text-xl leading-relaxed mb-10">
                        Discover how CliNote's suite of intelligent tools can transform your clinical documentation workflow and give you back your time.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/register">
                            <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-900/20 transition-all hover:scale-105">
                                Get Started Free
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Core Features Grid */}
            <section className="py-20 bg-white">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                        {[
                            {
                                icon: Mic,
                                title: "Ambient Recording",
                                desc: "Capture patient encounters naturally without changing your workflow. Our AI listens in the background."
                            },
                            {
                                icon: Brain,
                                title: "Intelligent Synthesis",
                                desc: "Advanced language models extract relevant medical information and structure it into professional notes."
                            },
                            {
                                icon: FileText,
                                title: "SOAP Note Generation",
                                desc: "Automatically generate comprehensive SOAP notes ready for your review and EHR integration."
                            },
                            {
                                icon: Clock,
                                title: "Real-time Processing",
                                desc: "Notes are generated in seconds, not hours. Review and sign off immediately after the visit."
                            },
                            {
                                icon: Shield,
                                title: "HIPAA Compliant",
                                desc: "Enterprise-grade security and encryption ensure your patient data remains private and protected."
                            },
                            {
                                icon: Stethoscope,
                                title: "Multi-Specialty Support",
                                desc: "Trained on diverse medical datasets to understand terminology across various specialties."
                            }
                        ].map((feature, i) => (
                            <div key={i} className="flex flex-col p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all duration-300 group">
                                <div className="p-4 rounded-xl bg-blue-100 text-blue-600 w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-[50%] -right-[20%] w-[80%] h-[80%] rounded-full bg-blue-600/20 blur-3xl" />
                </div>
                <div className="container px-4 md:px-6 mx-auto text-center relative z-10">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-6">
                        Experience the Future of Documentation
                    </h2>
                    <p className="text-slate-300 max-w-2xl mx-auto text-lg mb-10">
                        Join thousands of clinicians who are saving hours every day with CliNote.
                    </p>
                    <Link href="/register">
                        <Button size="lg" className="text-lg px-10 py-6 bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 transition-transform hover:scale-105">
                            Start Your Free Trial
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
