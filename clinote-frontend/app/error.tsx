'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    const isChunkLoadError = error.message?.includes('Loading chunk') || error.name === 'ChunkLoadError';

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white shadow-sm border border-slate-200 rounded-lg p-8 text-center">
                <div className="flex justify-center mb-4">
                    <div className="bg-red-100 p-3 rounded-full">
                        <AlertCircle className="h-8 w-8 text-red-600" />
                    </div>
                </div>
                <h2 className="text-xl font-bold text-slate-800 mb-2">Something went wrong!</h2>
                <p className="text-slate-600 mb-6">
                    {isChunkLoadError
                        ? "We encountered a network issue loading this part of the application."
                        : "An unexpected error occurred while loading this page."}
                </p>
                <Button
                    onClick={() => {
                        if (isChunkLoadError) {
                            window.location.reload();
                        } else {
                            reset();
                        }
                    }}
                    className="w-full"
                >
                    {isChunkLoadError ? "Reload Page" : "Try again"}
                </Button>
            </div>
        </div>
    );
}
