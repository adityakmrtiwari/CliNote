'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, MessageSquare, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-24 bg-slate-50">
                <div className="container px-4 md:px-6 mx-auto text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-slate-900 mb-6">
                        Get in Touch
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-slate-600">
                        Have questions about CliNote? We're here to help. Reach out to our team.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container px-4 md:px-6 mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                        {/* Contact Info */}
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h2>
                            <p className="text-slate-600 mb-8 leading-relaxed">
                                Whether you're interested in a demo, have a support question, or just want to say hello, we'd love to hear from you.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">Email</h3>
                                        <p className="text-slate-600">support@clinote.com</p>
                                        <p className="text-slate-600">sales@clinote.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                                        <Phone className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">Phone</h3>
                                        <p className="text-slate-600">+1 (555) 123-4567</p>
                                        <p className="text-sm text-slate-500">Mon-Fri, 9am-5pm EST</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                                        <MapPin className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">Office</h3>
                                        <p className="text-slate-600">
                                            123 Innovation Drive<br />
                                            Suite 400<br />
                                            San Francisco, CA 94107
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>
                            <form className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="first-name" className="text-sm font-medium text-slate-700">First name</label>
                                        <Input id="first-name" placeholder="Jane" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="last-name" className="text-sm font-medium text-slate-700">Last name</label>
                                        <Input id="last-name" placeholder="Doe" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-slate-700">Email</label>
                                    <Input id="email" type="email" placeholder="jane@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-slate-700">Message</label>
                                    <textarea
                                        id="message"
                                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                    Send Message
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
