'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mic, FileText, Bot, ShieldCheck, HeartHandshake, Lightbulb, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5 mix-blend-multiply" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-50/80 via-slate-50/50 to-slate-50" />
        </div>

        <div className="container px-4 md:px-6 mx-auto relative z-10 text-center">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium border-blue-200 bg-blue-50 text-blue-700 mb-8">
            Our Mission
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl max-w-4xl mx-auto text-slate-900 leading-tight mb-6">
            Reclaiming Time for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Patient Care</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 md:text-xl leading-relaxed mb-10">
            We believe doctors should be doctors, not scribes. CliNote is on a mission to eliminate clinical documentation burnout with advanced AI.
          </p>
        </div>
      </section>

      <main className="flex-1">
        {/* The Problem & Our Solution Section */}
        <section className="py-20 bg-white">
          <div className="container px-4 md:px-6 mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">From Burnout to Breakthrough</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                We understand the challenges healthcare providers face every day.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <div className="bg-red-50 p-8 rounded-2xl border border-red-100">
                <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
                  The Problem
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  Hours spent after patient visits typing up notes, battling clunky EMRs, and sacrificing personal time. This administrative drag leads to exhaustion and takes focus away from what truly matters: the patient.
                </p>
              </div>
              <div className="bg-green-50 p-8 rounded-2xl border border-green-100">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                  The Solution
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  Our intelligent AI platform listens to patient encounters, automatically transcribes the conversation, and generates perfectly structured, accurate clinical notes in seconds. Turn hours of work into minutes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-slate-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Simple, Secure, and Seamless</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Designed to fit into your existing workflow without disruption.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Mic,
                  title: "1. Record",
                  desc: "Securely record the patient conversation using any device."
                },
                {
                  icon: Bot,
                  title: "2. Process with AI",
                  desc: "Our AI transcribes, analyzes, and extracts key medical information."
                },
                {
                  icon: FileText,
                  title: "3. Review & Export",
                  desc: "Review the structured note, make any edits, and export to your EMR."
                }
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-slate-100">
                  <div className="bg-blue-100 p-4 rounded-full mb-6 text-blue-600">
                    <step.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-20 bg-white">
          <div className="container px-4 md:px-6 mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Guiding Principles</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: ShieldCheck,
                  title: "Security & Compliance",
                  desc: "Patient data security is paramount. We are built on a HIPAA-compliant foundation to ensure total privacy."
                },
                {
                  icon: HeartHandshake,
                  title: "Doctor-Centric Design",
                  desc: "Our platform is designed with direct input from healthcare professionals to be intuitive and effective."
                },
                {
                  icon: Lightbulb,
                  title: "Continuous Innovation",
                  desc: "We are committed to pushing the boundaries of AI to create tools that truly serve the medical community."
                }
              ].map((value, i) => (
                <div key={i} className="flex flex-col items-start p-6 rounded-xl hover:bg-slate-50 transition-colors">
                  <value.icon className="w-10 h-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="container px-4 md:px-6 mx-auto text-center max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">Ready to Revolutionize Your Workflow?</h2>
            <p className="text-slate-300 mb-10 text-lg">
              Join the growing community of healthcare providers who are saving time and rediscovering their passion for medicine with CliNote.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-6 text-lg">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-6 text-lg">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
