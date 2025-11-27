'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Zap, Stethoscope, CheckCircle2, Mic, FileText, Sparkles, ChevronDown } from 'lucide-react';
import { useAuth } from '@/components/auth-provider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-slate-50">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5 mix-blend-multiply" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-50/80 via-slate-50/50 to-slate-50" />
        </div>

        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="flex flex-col items-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100">
              <Sparkles className="mr-2 h-3.5 w-3.5 fill-blue-700" />
              New: AI-Powered Voice Scribing
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl max-w-4xl text-slate-900 leading-tight">
              Medical Documentation, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Reimagined</span>
            </h1>
            <p className="max-w-[700px] text-lg text-slate-600 md:text-xl leading-relaxed">
              CliNote uses advanced AI to listen to your patient encounters and automatically generate accurate, professional SOAP notes in seconds. Focus on your patients, not your paperwork.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-4">
              <Link href={isAuthenticated ? "/dashboard" : "/register"}>
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-900/20 transition-all hover:scale-105">
                  {isAuthenticated ? "Go to Dashboard" : "Start Scribing Free"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-6 bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-sm transition-all hover:scale-105">
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="pt-8 flex flex-wrap justify-center gap-6 text-sm text-slate-500 font-medium">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-slate-200/50 backdrop-blur-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-slate-200/50 backdrop-blur-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>99% Accuracy</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-slate-200/50 backdrop-blur-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Save 2+ Hours/Day</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900">
              Why Choose CliNote?
            </h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-lg">
              Built by physicians for physicians, our platform solves the biggest pain point in modern medicine: documentation burden.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-300">
              <div className="p-4 rounded-full bg-blue-100 text-blue-600 mb-6">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Lightning Fast</h3>
              <p className="text-slate-600 leading-relaxed">
                Generate comprehensive notes in seconds. Our AI processes conversations in real-time, so your note is ready when you are.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-300">
              <div className="p-4 rounded-full bg-blue-100 text-blue-600 mb-6">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Secure & HIPAA Compliant</h3>
              <p className="text-slate-600 leading-relaxed">
                Your patient data is encrypted at rest and in transit. We adhere to the strictest security standards to keep your practice safe.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded
            -2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-300">
              <div className="p-4 rounded-full bg-blue-100 text-blue-600 mb-6">
                <Stethoscope className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Clinically Accurate</h3>
              <p className="text-slate-600 leading-relaxed">
                Trained on millions of medical records, our AI understands complex medical terminology and clinical context perfectly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-slate-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900">
              How It Works
            </h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-lg">
              Three simple steps to automate your documentation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-200 -z-0" />

            <div className="relative flex flex-col items-center text-center z-10">
              <div className="w-24 h-24 rounded-full bg-white border-4 border-blue-100 flex items-center justify-center mb-6 shadow-sm">
                <Mic className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">1. Record</h3>
              <p className="text-slate-600">Simply press record at the start of your patient visit.</p>
            </div>
            <div className="relative flex flex-col items-center text-center z-10">
              <div className="w-24 h-24 rounded-full bg-white border-4 border-blue-100 flex items-center justify-center mb-6 shadow-sm">
                <Sparkles className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">2. Process</h3>
              <p className="text-slate-600">Our AI transcribes and structures the conversation instantly.</p>
            </div>
            <div className="relative flex flex-col items-center text-center z-10">
              <div className="w-24 h-24 rounded-full bg-white border-4 border-blue-100 flex items-center justify-center mb-6 shadow-sm">
                <FileText className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">3. Review</h3>
              <p className="text-slate-600">Review the generated SOAP note and export to your EHR.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-slate-900">
              Trusted by Clinicians
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "CliNote has completely transformed my practice. I leave the office on time every day now.",
                author: "Dr. Sarah Chen",
                role: "Family Medicine"
              },
              {
                quote: "The accuracy is incredible. It captures details I might have missed while typing.",
                author: "Dr. James Wilson",
                role: "Cardiologist"
              },
              {
                quote: "Finally, an AI tool that actually understands medical context. Highly recommended.",
                author: "Dr. Emily Rodriguez",
                role: "Pediatrician"
              }
            ].map((testimonial, i) => (
              <div key={i} className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-700 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold text-slate-900">{testimonial.author}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50">
        <div className="container px-4 md:px-6 mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is CliNote HIPAA compliant?</AccordionTrigger>
              <AccordionContent>
                Yes, CliNote is fully HIPAA compliant. We use enterprise-grade encryption for all data at rest and in transit, and we sign BAAs with our enterprise customers.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Does it work with my EHR?</AccordionTrigger>
              <AccordionContent>
                CliNote generates structured notes that can be easily copied and pasted into any EHR. We are also working on direct integrations with major EHR providers.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How accurate is the medical transcription?</AccordionTrigger>
              <AccordionContent>
                Our models are specifically trained on medical datasets, achieving over 99% accuracy in clinical terminology and context recognition.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Can I try it for free?</AccordionTrigger>
              <AccordionContent>
                Yes! We offer a free trial that includes 10 patient encounters so you can experience the magic of automated documentation yourself.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[50%] -right-[20%] w-[80%] h-[80%] rounded-full bg-blue-600/20 blur-3xl" />
        </div>
        <div className="container px-4 md:px-6 mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-6">
            Ready to Transform Your Practice?
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg mb-10">
            Join thousands of clinicians who are saving hours every day with CliNote. No credit card required for trial.
          </p>
          <Link href={isAuthenticated ? "/dashboard" : "/register"}>
            <Button size="lg" className="text-lg px-10 py-6 bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 transition-transform hover:scale-105">
              {isAuthenticated ? "Go to Dashboard" : "Get Started Now"}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}