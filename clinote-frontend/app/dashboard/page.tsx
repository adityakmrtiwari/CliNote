'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, FileText, User as UserIcon, Clock, AlertCircle } from 'lucide-react';
import { apiService, type User, type Patient, type Note } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import { useAuth } from '@/components/auth-provider';

// Define a more specific type for notes on the dashboard
interface DashboardNote extends Note {
  patientName: string;
}
interface DashboardInfoCardProps<T> {
  title: string;
  description: string;
  icon: React.ElementType;
  items: T[];
  viewAllLink: string;
  renderItem: (item: T) => React.ReactNode;
  emptyState: {
    icon: React.ElementType;
    message: string;
    cta: {
      text: string;
      link: string;
    };
  };
}

function DashboardInfoCard<T extends { _id: string }>({
  title,
  description,
  icon: Icon,
  items,
  viewAllLink,
  renderItem,
  emptyState,
}: DashboardInfoCardProps<T>) {
  const router = useRouter();
  const EmptyStateIcon = emptyState.icon;

  return (
    <Card className="overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center space-x-2 text-lg font-semibold text-slate-800">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Icon className="h-5 w-5 text-blue-600" />
              </div>
              <span>{title}</span>
            </CardTitle>
            <CardDescription className="text-slate-500 ml-11">{description}</CardDescription>
          </div>
          {items.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              onClick={() => router.push(viewAllLink)}
            >
              View All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
              <div className="bg-slate-100 p-3 rounded-full inline-flex mb-4">
                <EmptyStateIcon className="h-6 w-6 text-slate-400" />
              </div>
              <p className="text-slate-900 font-medium mb-1">{emptyState.message}</p>
              <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto">Get started by creating your first record in the system.</p>
              <Button
                onClick={() => router.push(emptyState.cta.link)}
                className="bg-blue-600 hover:bg-blue-700 shadow-sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                {emptyState.cta.text}
              </Button>
            </div>
          ) : (
            <>
              {items.map(renderItem)}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// =================================================================
// 2. REFACTORED DASHBOARD COMPONENT
// =================================================================
export default function Dashboard() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [recentPatients, setRecentPatients] = useState<Patient[]>([]);
  const [recentNotes, setRecentNotes] = useState<DashboardNote[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  const loadDashboardData = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      setDataLoading(true);
      setError('');

      // Fetch all necessary data in parallel
      const [patientsResult, notesResult] = await Promise.all([
        apiService.getAllPatients(),
        apiService.getAllNotes(),
      ]);

      // Create a patient lookup map for performance
      const patientMap = new Map<string, string>();
      if (patientsResult.success && patientsResult.data) {
        patientsResult.data.forEach(p => patientMap.set(p._id, p.name));

        // Process recent patients
        const sortedPatients = [...patientsResult.data].sort(
          (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
        setRecentPatients(sortedPatients.slice(0, 3));
      }

      // Process recent notes using the lookup map (NO extra API calls!)
      if (notesResult.success && notesResult.data) {
        const sortedNotes = [...notesResult.data]
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
          .slice(0, 3)
          .map(note => {
            // note.patientId may be populated (object) by the backend or just an ID string.
            const pid = (note as any).patientId;
            const patientIdKey = typeof pid === 'string' ? pid : pid?._id;
            const patientNameFromPopulate = typeof pid === 'object' && pid?.name ? pid.name : undefined;
            const patientName = patientNameFromPopulate || patientMap.get(patientIdKey) || 'Unknown Patient';

            return {
              ...note,
              patientName,
            } as DashboardNote;
          });
        setRecentNotes(sortedNotes);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
    } finally {
      setDataLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    } else if (isAuthenticated) {
      loadDashboardData();
    }
  }, [authLoading, isAuthenticated, router, loadDashboardData]);

  if (authLoading || (isAuthenticated && dataLoading)) {
    return (
      <div className="min-h-screen bg-slate-50">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 space-y-4">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-6 w-96" />
          </div>
          <div className="mb-8">
            <Skeleton className="h-14 w-48" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Hello, {user?.name}
            </h1>
            <p className="text-slate-500 mt-1">Ready to document your patient encounters today?</p>
          </div>

          <Button
            onClick={() => router.push('/create-note')}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-6 text-lg shadow-lg shadow-blue-900/20 transition-all hover:scale-105"
          >
            <Plus className="h-5 w-5 mr-2" />
            Start New Note
          </Button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3 animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <span className="text-red-700 font-medium">{error}</span>
          </div>
        )}

        {/* Cleaner grid using the reusable component */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DashboardInfoCard<Patient>
            title="Recent Patients"
            description="Patients you've seen recently"
            icon={UserIcon}
            items={recentPatients}
            viewAllLink="/patients"
            emptyState={{
              icon: UserIcon,
              message: 'No patients yet',
              cta: { text: 'Add First Patient', link: '/create-note' },
            }}
            renderItem={(patient) => (
              <div
                key={patient._id}
                onClick={() => router.push(`/patients/${patient._id}`)}
                className="flex justify-between items-center p-3 border rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                <div>
                  <p className="font-medium text-slate-800">{patient.name}</p>
                  <p className="text-sm text-slate-600">Age: {patient.age}</p>
                </div>
                <p className="text-sm text-slate-600">
                  {new Date(patient.updatedAt).toLocaleDateString()}
                </p>
              </div>
            )}
          />

          <DashboardInfoCard<DashboardNote>
            title="Recent Notes"
            description="Your latest documentation"
            icon={FileText}
            items={recentNotes}
            viewAllLink="/notes"
            emptyState={{
              icon: FileText,
              message: 'No notes yet',
              cta: { text: 'Create First Note', link: '/create-note' },
            }}
            renderItem={(note) => (
              <div
                key={note._id}
                onClick={() => router.push(`/note/${note._id}`)}
                className="flex justify-between items-center p-3 border rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                <div>
                  <p className="font-medium text-slate-800">{note.patientName}</p>
                  <p className="text-sm text-slate-600">{note.templateType}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full ${note.status === 'completed' ? 'bg-green-100 text-green-800' :
                    note.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                    {note.status.charAt(0).toUpperCase() + note.status.slice(1)}
                  </span>
                </div>
              </div>
            )}
          />
        </div>
      </main>
    </div>
  );
}