'use client';

import Link from 'next/link';
import { Cookie } from 'lucide-react';

export default function CookiesPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <section className="relative py-16 bg-slate-50 border-b border-slate-200">
                <div className="container px-4 md:px-6 mx-auto text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full text-blue-600 mb-6">
                        <Cookie className="h-8 w-8" />
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl text-slate-900 mb-4">
                        Cookie Policy
                    </h1>
                    <p className="max-w-2xl mx-auto text-slate-600">
                        Last updated: August 2, 2025
                    </p>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="container px-4 md:px-6 mx-auto max-w-3xl">
                    <div className="prose prose-slate max-w-none">
                        <p className="lead text-lg text-slate-600 mb-8">
                            This Cookie Policy explains how CliNote ("we", "us", and "our") uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
                        </p>

                        <h3>What are cookies?</h3>
                        <p>
                            Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
                        </p>

                        <h3>Why do we use cookies?</h3>
                        <p>
                            We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties. Third parties serve cookies through our Website for advertising, analytics and other purposes.
                        </p>

                        <h3>Types of cookies we use</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Essential website cookies:</strong> These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, such as access to secure areas.</li>
                            <li><strong>Performance and functionality cookies:</strong> These cookies are used to enhance the performance and functionality of our Website but are non-essential to their use. However, without these cookies, certain functionality (like videos) may become unavailable.</li>
                            <li><strong>Analytics and customization cookies:</strong> These cookies collect information that is used either in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are, or to help us customize our Website for you.</li>
                        </ul>

                        <h3>How can I control cookies?</h3>
                        <p>
                            You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. In addition, most advertising networks offer you a way to opt out of targeted advertising.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
