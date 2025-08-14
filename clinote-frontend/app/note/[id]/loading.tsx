export default function LoadingNoteDetails() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-9 w-40 bg-gray-200 rounded mb-4"></div>
        <div className="p-6 border bg-white rounded-lg">
          <div className="h-8 w-48 bg-gray-300 rounded mb-3"></div>
          <div className="flex gap-x-6 mb-4">
            <div className="h-5 w-32 bg-gray-200 rounded"></div>
            <div className="h-5 w-24 bg-gray-200 rounded"></div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <div className="h-10 w-36 bg-gray-200 rounded-lg"></div>
              <div className="h-10 w-40 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="h-10 w-28 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Section Skeletons */}
      <div className="space-y-6">
        <div className="p-6 border bg-white rounded-lg">
          <div className="h-6 w-24 bg-gray-300 rounded mb-4"></div>
          <div className="h-24 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="p-6 border bg-white rounded-lg">
          <div className="h-6 w-24 bg-gray-300 rounded mb-4"></div>
          <div className="h-24 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </main>
  );
}