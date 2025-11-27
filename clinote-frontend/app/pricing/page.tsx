'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Sparkles } from 'lucide-react';

export default function PricingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 overflow-hidden bg-slate-50">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-50/80 via-slate-50/50 to-slate-50" />
                </div>

                <div className="container px-4 md:px-6 mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium border-blue-200 bg-blue-50 text-blue-700 mb-8">
                        <Sparkles className="mr-2 h-3.5 w-3.5 fill-blue-700" />
                        Simple, Transparent Pricing
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl max-w-4xl mx-auto text-slate-900 leading-tight mb-6">
                        Choose the Plan That Fits Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Practice</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-slate-600 md:text-xl leading-relaxed mb-10">
                        No hidden fees. No long-term contracts. Just powerful AI documentation.
                    </p>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-20 bg-white">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Free Tier */}
                        <div className="flex flex-col p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Starter</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-extrabold text-slate-900">$0</span>
                                    <span className="text-slate-500">/month</span>
                                </div>
                                <p className="text-slate-500 mt-4">Perfect for trying out CliNote.</p>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                {[
                                    "10 encounters per month",
                                    "Basic SOAP notes",
                                    "Standard processing speed",
                                    "Email support"
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-600">
                                        <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/register" className="w-full">
                                <Button variant="outline" className="w-full py-6 text-lg border-blue-200 text-blue-700 hover:bg-blue-50">
                                    Get Started
                                </Button>
                            </Link>
                        </div>

                        {/* Pro Tier */}
                        <div className="flex flex-col p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden transform md:-translate-y-4">
                            <div className="absolute top-0 right-0 bg-gradient-to-bl from-blue-600 to-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-bl-xl">
                                MOST POPULAR
                            </div>
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-white mb-2">Professional</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-extrabold text-white">$99</span>
                                    <span className="text-slate-400">/month</span>
                                </div>
                                <p className="text-slate-400 mt-4">For busy clinicians and private practices.</p>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                {[
                                    "Unlimited encounters",
                                    "Advanced SOAP & custom templates",
                                    "Priority real-time processing",
                                    "EHR integration support",
                                    "Priority support"
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-300">
                                        <CheckCircle2 className="h-5 w-5 text-blue-400 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/register" className="w-full">
                                <Button className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20">
                                    Start Free Trial
                                </Button>
                            </Link>
                        </div>

                        {/* Enterprise Tier */}
                        <div className="flex flex-col p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Enterprise</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-extrabold text-slate-900">Custom</span>
                                </div>
                                <p className="text-slate-500 mt-4">For hospitals and large health systems.</p>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                {[
                                    "Custom AI model training",
                                    "Full EHR integration suite",
                                    "Dedicated success manager",
                                    "SLA guarantees",
                                    "On-premise deployment options",
                                    "SSO & advanced security"
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-600">
                                        <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/contact" className="w-full">
                                <Button variant="outline" className="w-full py-6 text-lg border-slate-200 text-slate-700 hover:bg-slate-50">
                                    Contact Sales
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
