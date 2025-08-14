"use client";

import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function PatientError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center p-8 border border-red-200 bg-red-50 rounded-lg">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-slate-800 mb-2">
          Something Went Wrong
        </h2>
        <p className="text-slate-600 mb-6">
          There was a problem loading the patient data. You can try to load it again.
        </p>
        <Button onClick={() => reset()}>
          Try Again
        </Button>
      </div>
    </div>
  );
}