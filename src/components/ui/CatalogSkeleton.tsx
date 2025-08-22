'use client';

import { Skeleton } from '@/components/ui/Skeleton';

export function CatalogPageSkeleton() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-purple-50/30 to-pink-50/20 dark:from-blue-600/30 dark:via-purple-600/20 dark:to-pink-600/10"></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-12">
          {/* Header Skeleton */}
          <div className="text-center mb-16">
            <Skeleton className="h-16 w-80 mx-auto mb-6" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>

          {/* Filters Panel Skeleton */}
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-white/20 p-8 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-2">
                <Skeleton className="h-4 w-24 mb-3" />
                <Skeleton className="h-14 w-full" />
              </div>
              <div>
                <Skeleton className="h-4 w-20 mb-3" />
                <Skeleton className="h-14 w-full" />
              </div>
              <div>
                <Skeleton className="h-4 w-16 mb-3" />
                <Skeleton className="h-14 w-full" />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between mt-8 pt-8 border-t-2 border-gray-200/50 dark:border-gray-600/50">
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-12 w-32" />
              </div>
              <div className="flex items-center gap-3 mt-4 lg:mt-0">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-12 w-20" />
              </div>
            </div>
          </div>

          {/* Results Counter Skeleton */}
          <div className="mb-8">
            <Skeleton className="h-6 w-64" />
          </div>

          {/* Course Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                {/* Image skeleton */}
                <Skeleton className="h-48 w-full" />
                
                <div className="p-6">
                  {/* Title skeleton */}
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  
                  {/* Description skeleton */}
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-4" />
                  
                  {/* Meta info skeleton */}
                  <div className="flex items-center justify-between mb-4">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                  
                  {/* Students count skeleton */}
                  <Skeleton className="h-8 w-full mb-4 rounded-xl" />
                  
                  {/* Buttons skeleton */}
                  <div className="space-y-2">
                    <Skeleton className="h-10 w-full rounded-xl" />
                    <div className="grid grid-cols-2 gap-2">
                      <Skeleton className="h-10 w-full rounded-xl" />
                      <Skeleton className="h-10 w-full rounded-xl" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Skeleton */}
          <div className="mt-20 flex justify-center">
            <nav className="flex items-center space-x-4">
              <Skeleton className="h-12 w-24 rounded-2xl" />
              <Skeleton className="h-12 w-12 rounded-2xl" />
              <Skeleton className="h-12 w-24 rounded-2xl" />
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CatalogFiltersSkeleton() {
  return (
    <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-white/20 p-8 mb-12 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-2">
          <Skeleton className="h-4 w-24 mb-3" />
          <Skeleton className="h-14 w-full" />
        </div>
        <div>
          <Skeleton className="h-4 w-20 mb-3" />
          <Skeleton className="h-14 w-full" />
        </div>
        <div>
          <Skeleton className="h-4 w-16 mb-3" />
          <Skeleton className="h-14 w-full" />
        </div>
      </div>
    </div>
  );
}