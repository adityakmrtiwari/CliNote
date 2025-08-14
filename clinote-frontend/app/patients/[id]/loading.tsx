import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function LoadingPatientDetails() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Skeleton */}
      <div className="mb-6">
        <div className="h-9 w-24 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="flex items-center justify-between">
          <div>
            <div className="h-9 w-48 bg-gray-300 rounded animate-pulse mb-2"></div>
            <div className="h-5 w-64 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-10 w-36 bg-gray-300 rounded-lg animate-pulse"></div>
        </div>
      </div>
      
      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="h-6 w-40 bg-gray-300 rounded animate-pulse"></div>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="h-6 w-32 bg-gray-300 rounded animate-pulse mb-2"></div>
            <div className="h-5 w-48 bg-gray-200 rounded animate-pulse"></div>
          </CardHeader>
          <CardContent>
            <div className="h-40 bg-gray-200 rounded-lg animate-pulse"></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}