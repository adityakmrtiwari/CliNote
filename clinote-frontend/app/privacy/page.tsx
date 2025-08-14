'use client';

import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

interface PolicySectionProps {
  title: string;
  children: React.ReactNode;
}

// Helper component for structured sections to keep the main component clean
const PolicySection: React.FC<PolicySectionProps> = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="text-2xl font-bold text-slate-800 mb-4">{title}</h2>
    <div className="space-y-4 text-slate-600 text-base leading-relaxed">
      {children}
    </div>
  </section>
);

export default function PrivacyPolicyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy | CliNote</title>
        <meta name="description" content="Read CliNote's privacy policy to understand how we collect, use, and protect your data, ensuring full HIPAA compliance." />
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-slate-900">Privacy Policy</h1>
          <p className="text-sm text-slate-500 mt-2">Last Updated: August 2, 2025</p>
        </div>

        <div className="prose prose-slate max-w-none lg:prose-lg">
          <PolicySection title="1. Introduction">
            <p>
              Welcome to CliNote ("we," "our," or "us"). We are committed to protecting your privacy and handling your data in an open and transparent manner. This Privacy Policy explains how we collect, use, process, and safeguard your information when you use our AI-powered medical documentation platform (the "Service").
            </p>
            <p>
              This policy is especially critical as we handle sensitive data, including Protected Health Information (PHI). We are dedicated to ensuring our practices are fully compliant with the Health Insurance Portability and Accountability Act (HIPAA).
            </p>
          </PolicySection>

          <PolicySection title="2. Information We Collect">
            <p>We collect information that is necessary to provide and improve our Service.</p>
            <h3 className="text-xl font-semibold text-slate-700 mt-4 mb-2">A. Information You Provide to Us</h3>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Account Information:</strong> When you register for an account, we collect personal data such as your name, email address, phone number, and professional credentials.</li>
              <li><strong>Protected Health Information (PHI):</strong> The core of our service involves processing audio recordings of patient encounters and the resulting clinical notes. This data constitutes PHI and is handled with the highest level of security.</li>
            </ul>
            <h3 className="text-xl font-semibold text-slate-700 mt-4 mb-2">B. Information We Collect Automatically</h3>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Usage Data:</strong> We automatically collect information about your interactions with our Service, such as IP address, device type, browser information, and features used. This data helps us improve our platform and is not linked to PHI for marketing purposes.</li>
            </ul>
          </PolicySection>

          <PolicySection title="3. How We Use Your Information">
            <p>We use the information we collect for the following purposes:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>To provide, operate, and maintain our Service.</li>
              <li>To process audio recordings and generate clinical documentation as directed by you.</li>
              <li>To improve the accuracy and performance of our AI models (using de-identified data only, where permissible).</li>
              <li>To manage your account, provide customer support, and send you important service-related communications.</li>
              <li>To ensure the security of our platform and prevent fraudulent activity.</li>
            </ul>
          </PolicySection>
          
          <PolicySection title="4. Data Security">
            <p>
              We implement robust technical and administrative safeguards to protect your data. Our commitment to security includes:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Encryption:</strong> All data, including PHI, is encrypted in transit (using TLS) and at rest (using AES-256).</li>
              <li><strong>Access Controls:</strong> We enforce strict access controls to ensure that only authorized personnel have access to sensitive information, and only when necessary.</li>
              <li><strong>Regular Audits:</strong> We conduct regular security audits and vulnerability assessments to identify and patch potential weaknesses.</li>
            </ul>
          </PolicySection>
          
          <PolicySection title="5. HIPAA Compliance">
            <p>
              CliNote acts as a "Business Associate" to healthcare providers ("Covered Entities") under HIPAA. We are fully committed to complying with all applicable HIPAA rules. We will enter into a Business Associate Agreement (BAA) with any Covered Entity as required by HIPAA, which governs our use and protection of PHI.
            </p>
            <p>
              <strong>We will never use or disclose PHI in any way that is not permitted by our BAA or by law.</strong>
            </p>
          </PolicySection>
          
          <PolicySection title="6. Your Data Rights">
            <p>You have control over your personal data. Your rights include:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Right to Access:</strong> You can request access to the personal information we hold about you.</li>
              <li><strong>Right to Correction:</strong> You can correct any inaccurate or incomplete data we hold about you.</li>
              <li><strong>Right to Deletion:</strong> You can request the deletion of your account and associated data, subject to our legal and regulatory obligations for data retention.</li>
            </ul>
          </PolicySection>

          <PolicySection title="7. Changes to This Privacy Policy">
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page and, where appropriate, through other channels like email. We encourage you to review this policy periodically.
            </p>
          </PolicySection>

          <PolicySection title="8. Contact Us">
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or your data, please contact us at:
            </p>
            <p className="font-semibold">
              Email: <a href="mailto:privacy@clinote.com" className="text-blue-600 hover:underline">privacy@clinote.com</a>
            </p>
          </PolicySection>
        </div>

        <div className="text-center mt-12">
            <Link href="/" className="text-blue-600 hover:underline font-medium">
                ← Back to Home
            </Link>
        </div>
      </main>
    </>
  );
}