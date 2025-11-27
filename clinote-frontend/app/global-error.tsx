'use client';

import { useEffect } from 'react';

export default function GlobalError({
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
        <html>
            <body>
                <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
                    <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">Something went wrong!</h2>
                        <p className="text-slate-600 mb-6">
                            {isChunkLoadError
                                ? "A new version of the application is available. Please reload to update."
                                : "We apologize for the inconvenience. Please try again."}
                        </p>
                        <button
                            onClick={() => {
                                if (isChunkLoadError) {
                                    window.location.reload();
                                } else {
                                    reset();
                                }
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                        >
                            {isChunkLoadError ? "Reload Application" : "Try again"}
                        </button>
                    </div>
                </div>
            </body>
        </html>
    );
}
