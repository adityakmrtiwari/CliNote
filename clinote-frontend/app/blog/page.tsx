'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';

export default function BlogPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-24 overflow-hidden bg-slate-50">
                <div className="container px-4 md:px-6 mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium border-blue-200 bg-blue-50 text-blue-700 mb-8">
                        <BookOpen className="mr-2 h-3.5 w-3.5 fill-blue-700" />
                        CliNote Blog
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl max-w-4xl mx-auto text-slate-900 leading-tight mb-6">
                        Insights on AI, Medicine, and <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Productivity</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed">
                        Stay up to date with the latest trends in healthcare technology and best practices for clinical documentation.
                    </p>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="py-20 bg-white">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "The Future of AI in Primary Care",
                                excerpt: "How ambient intelligence is reshaping the doctor-patient relationship and reducing administrative burden.",
                                date: "Oct 12, 2023",
                                author: "Dr. Sarah Chen",
                                category: "AI in Healthcare",
                                image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80"
                            },
                            {
                                title: "5 Ways to Reduce Documentation Time",
                                excerpt: "Practical tips for clinicians to streamline their charting workflow and get home on time.",
                                date: "Sep 28, 2023",
                                author: "James Wilson",
                                category: "Productivity",
                                image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80"
                            },
                            {
                                title: "Understanding HIPAA in the Age of AI",
                                excerpt: "A deep dive into data privacy, security, and compliance when using AI tools in your practice.",
                                date: "Sep 15, 2023",
                                author: "Emily Rodriguez",
                                category: "Compliance",
                                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80"
                            }
                        ].map((post, i) => (
                            <div key={i} className="flex flex-col rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                                <div className="h-48 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-slate-200 animate-pulse" /> {/* Placeholder loading state */}
                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-600 uppercase tracking-wide">
                                        {post.category}
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {post.date}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <User className="h-3 w-3" />
                                            {post.author}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center text-blue-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
                                        Read Article <ArrowRight className="ml-1 h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
