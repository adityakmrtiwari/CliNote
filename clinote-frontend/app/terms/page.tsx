'use client';

import Head from 'next/head';
import Link from 'next/link';
import React from 'react'; // Import React for FC and ReactNode types

interface PolicySectionProps {
  title: string;
  children: React.ReactNode;
}

const PolicySection: React.FC<PolicySectionProps> = ({ title, children }) => (
  <section className="mb-10">
    <h2 className="text-2xl font-bold text-slate-800 mb-4">{title}</h2>
    <div className="prose prose-slate max-w-none lg:prose-lg prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-slate-700">
      {children}
    </div>
  </section>
);
// --- End Helper Component ---


export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Terms of Service | CliNote</title>
        <meta name="description" content="Review the Terms of Service for using the CliNote AI medical documentation platform." />
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900">Terms of Service</h1>
          <p className="text-sm text-slate-500 mt-2">Last Updated: August 2, 2025</p>
        </div>

        <PolicySection title="1. Agreement to Terms">
          <p>
            By accessing or using the CliNote platform and its services (the "Service"), you agree to be bound by these Terms of Service ("Terms") and our Privacy Policy. If you do not agree to these Terms, you may not use the Service. These Terms apply to all visitors, users, and others who access the Service ("Users").
          </p>
        </PolicySection>

        <PolicySection title="2. User Accounts and Responsibilities">
          <p>
            You must be a qualified healthcare professional to create an account. You are responsible for safeguarding your account password and for all activities that occur under your account. You agree to:
          </p>
          <ul>
            <li>Provide accurate, current, and complete information during the registration process.</li>
            <li>Maintain the security of your password and identification.</li>
            <li>Notify us immediately of any unauthorized use of your account.</li>
          </ul>
        </PolicySection>
        
        <PolicySection title="3. Use of the Service & Clinical Responsibility">
          <p>
            The Service uses artificial intelligence to generate clinical documentation based on audio recordings. While we strive for high accuracy, the Service is a tool to assist, not replace, your professional medical judgment.
          </p>
          <p>
            <strong>You, the User, are solely responsible for reviewing, editing, and verifying the accuracy and completeness of all AI-generated content before it is used for any clinical purpose or entered into a patient's medical record. CliNote is not liable for any errors or omissions in the final documentation.</strong>
          </p>
        </PolicySection>

        <PolicySection title="4. Data Privacy and HIPAA">
          <p>
            Your use of the Service is subject to our Privacy Policy, which details how we handle your data, including Protected Health Information (PHI). We are committed to maintaining HIPAA compliance. By using the Service, you agree to the terms of our Business Associate Agreement (BAA), which will be provided to you upon registration.
          </p>
        </PolicySection>

        <PolicySection title="5. Intellectual Property">
          <p>
            We own all right, title, and interest in and to the Service, including all associated intellectual property rights. You retain full ownership of the patient data and clinical notes you generate (your "User Content"). You grant us a limited license to use your User Content solely for the purpose of providing and improving the Service as outlined in our Privacy Policy and BAA.
          </p>
        </PolicySection>

        <PolicySection title="6. Termination">
          <p>
            We may terminate or suspend your account at any time, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Service will immediately cease.
          </p>
        </PolicySection>

        <PolicySection title="7. Disclaimer of Warranties">
          <p>
            The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, express or implied, that the Service will be uninterrupted, error-free, or completely secure.
          </p>
        </PolicySection>

        <PolicySection title="8. Limitation of Liability">
          <p>
            To the maximum extent permitted by law, in no event shall CliNote, its affiliates, or its directors be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, or other intangible losses, resulting from your use of the Service or your reliance on any AI-generated content.
          </p>
        </PolicySection>

        <PolicySection title="9. Governing Law">
          <p>
            These Terms shall be governed by and construed in accordance with the laws of [Your State/Country], without regard to its conflict of law provisions.
          </p>
        </PolicySection>

        <PolicySection title="10. Changes to Terms">
          <p>
            We reserve the right to modify these Terms at any time. We will provide at least 30 days' notice before any new terms take effect. By continuing to use the Service after those revisions become effective, you agree to be bound by the revised terms.
          </p>
        </PolicySection>

        <div className="text-center mt-12">
            <Link href="/" className="text-blue-600 hover:underline font-medium">
                ← Back to Home
            </Link>
        </div>
      </main>
    </>
  );
}