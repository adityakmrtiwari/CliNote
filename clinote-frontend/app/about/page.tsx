"use client";

import Head from "next/head";
import Link from "next/link";

// For icons, you can use a library like 'lucide-react' or 'heroicons'
// Install it first: npm install lucide-react
// Then import the icons you need, for example:
import {
  Mic,
  FileText,
  Bot,
  ShieldCheck,
  HeartHandshake,
  Lightbulb,
} from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About CliNote | Reclaiming Time for Patient Care</title>
        <meta
          name="description"
          content="Learn about CliNote's mission to eliminate clinical documentation burnout for healthcare professionals with our advanced AI."
        />
      </Head>

      {/* Hero Section */}
      <section className="bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <p className="text-base font-semibold text-blue-600 uppercase tracking-wider">
            Our Mission
          </p>
          <h1 className="mt-2 text-4xl font-extrabold text-slate-900 sm:text-5xl">
            Reclaiming Time for Patient Care
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600">
            Physician burnout from administrative overload is a critical issue.
            CliNote was founded to solve one of the biggest contributors:
            **clinical documentation**. We believe doctors should be doctors,
            not scribes.
          </p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-16">
        {/* The Problem & Our Solution Section */}
        <div>
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-8">
            From Burnout to Breakthrough
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-lg text-slate-600">
            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <h3 className="font-bold text-red-800 mb-2">
                The Documentation Burden
              </h3>
              <p>
                Hours spent after patient visits typing up notes, battling
                clunky EMRs, and sacrificing personal time. This administrative
                drag leads to exhaustion and takes focus away from what truly
                matters: the patient.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="font-bold text-green-800 mb-2">
                The CliNote Solution
              </h3>
              <p>
                Our intelligent AI platform listens to patient encounters,
                automatically transcribes the conversation, and generates
                perfectly structured, accurate clinical notes in seconds. Turn
                hours of work into minutes.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-10">
            Simple, Secure, and Seamless
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Mic className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                1. Record
              </h3>
              <p className="text-slate-600">
                Securely record the patient conversation using any device.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Bot className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                2. Process with AI
              </h3>
              <p className="text-slate-600">
                Our AI transcribes, analyzes, and extracts key medical
                information.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                3. Review & Export
              </h3>
              <p className="text-slate-600">
                Review the structured note, make any edits, and export to your
                EMR.
              </p>
            </div>
          </div>
        </div>

        {/* Our Values Section */}
        <div>
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-10">
            Our Guiding Principles
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <ShieldCheck className="w-10 h-10 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-slate-800">
                  Security & Compliance
                </h3>
                <p className="text-slate-600">
                  Patient data security is paramount. We are built on a
                  HIPAA-compliant foundation to ensure total privacy.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <HeartHandshake className="w-10 h-10 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-slate-800">
                  Doctor-Centric Design
                </h3>
                <p className="text-slate-600">
                  Our platform is designed with direct input from healthcare
                  professionals to be intuitive and effective.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Lightbulb className="w-10 h-10 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-slate-800">
                  Continuous Innovation
                </h3>
                <p className="text-slate-600">
                  We are committed to pushing the boundaries of AI to create
                  tools that truly serve the medical community.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-slate-800 text-white rounded-lg p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Revolutionize Your Workflow?
          </h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Join the growing community of healthcare providers who are saving
            time and rediscovering their passion for medicine with CliNote.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="https://calendly.com/adityatiwari211104/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-md transition-colors"
            >
              Request a Demo
            </Link>
            <a
              href="mailto:adityatiwari211104@gmail.com"
              className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-md transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>

        <div className="text-center pt-4">
          <Link href="/" className="text-blue-600 hover:underline font-medium">
            ← Back to Home
          </Link>
        </div>
      </main>
    </>
  );
}
