'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Briefcase, Heart, Users, Zap, Globe, ArrowRight } from 'lucide-react';

export default function CareersPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 overflow-hidden bg-slate-50">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5 mix-blend-multiply" />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-50/80 via-slate-50/50 to-slate-50" />
                </div>

                <div className="container px-4 md:px-6 mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium border-blue-200 bg-blue-50 text-blue-700 mb-8">
                        <Briefcase className="mr-2 h-3.5 w-3.5 fill-blue-700" />
                        We're Hiring
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl max-w-4xl mx-auto text-slate-900 leading-tight mb-6">
                        Join Our Mission to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Transform Healthcare</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-slate-600 md:text-xl leading-relaxed mb-10">
                        Help us build the future of medical documentation and give clinicians their time back.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-900/20 transition-all hover:scale-105">
                            View Open Positions
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-white">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900">Why Work at CliNote?</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Heart,
                                title: "Impact First",
                                desc: "Every line of code you write helps a doctor spend more time with their patients."
                            },
                            {
                                icon: Users,
                                title: "Collaborative Culture",
                                desc: "We believe in low ego, high empathy, and solving hard problems together."
                            },
                            {
                                icon: Zap,
                                title: "Fast-Paced Innovation",
                                desc: "We move quickly to bring the latest advancements in AI to the medical field."
                            }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center p-8 rounded-2xl bg-slate-50 border border-slate-100">
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

            {/* Open Positions Placeholder */}
            <section className="py-20 bg-slate-50">
                <div className="container px-4 md:px-6 mx-auto max-w-4xl">
                    <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Open Positions</h2>
                    <div className="space-y-4">
                        {[
                            { role: "Senior Full Stack Engineer", dept: "Engineering", loc: "Remote" },
                            { role: "AI Research Scientist", dept: "R&D", loc: "San Francisco, CA" },
                            { role: "Product Designer", dept: "Product", loc: "Remote" },
                            { role: "Customer Success Manager", dept: "Sales", loc: "New York, NY" }
                        ].map((job, i) => (
                            <div key={i} className="flex items-center justify-between p-6 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{job.role}</h3>
                                    <div className="flex gap-4 text-sm text-slate-500 mt-1">
                                        <span>{job.dept}</span>
                                        <span>•</span>
                                        <span>{job.loc}</span>
                                    </div>
                                </div>
                                <Button variant="ghost" className="text-blue-600 group-hover:bg-blue-50">
                                    Apply <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
