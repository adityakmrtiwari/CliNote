"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiService, type Patient, type Note } from '@/lib/api';
import { useAuth } from '@/components/auth-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, FileText, User, AlertCircle, Loader2 } from 'lucide-react';

export default function PatientDetailsClient({ patientId }: { patientId: string }) {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  // State for data
  const [patient, setPatient] = useState<Patient | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);

  // State for UI
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Auth check on the client
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }

    if (isAuthenticated) {
      loadData();
    }
  }, [patientId, router, isAuthenticated, authLoading]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const patientResult = await apiService.getPatientById(patientId);
      if (patientResult.success && patientResult.data) {
        setPatient(patientResult.data);
        // After getting the patient, try to get their notes
        try {
          const notesResult = await apiService.getNotesByPatient(patientId);
          if (notesResult.success && notesResult.data) {
            setNotes(notesResult.data);
          }
        } catch (noteError) {
          console.log("No notes found for this patient, which is okay.");
        }
      } else {
        setError(patientResult.message || 'Patient not found.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNote = () => {
    router.push(`/create-note?patientId=${patientId}`);
  };

  if (authLoading || (isAuthenticated && isLoading)) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto text-center py-10">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-600">{error}</p>
        <Button onClick={() => router.push('/dashboard')} variant="outline" className="mt-4">
          Back to Dashboard
        </Button>
      </div>
    );
  }

  if (!patient) return null; // Should be covered by error state

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Button
          onClick={() => router.push('/dashboard')}
          variant="outline"
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              {patient.name}
            </h1>
            <p className="text-slate-600">Patient Details & Medical History</p>
          </div>
          <Button
            onClick={handleCreateNote}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <FileText className="h-4 w-4 mr-2" />
            Create New Note
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Patient Information */}
        <Card className="lg:col-span-1 h-fit">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5 text-blue-600" />
              <span>Patient Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-600">Full Name</label>
              <p className="text-slate-800 font-medium">{patient.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Age</label>
              <p className="text-slate-800">{patient.age} years</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Gender</label>
              <p className="text-slate-800">{patient.gender}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Patient ID</label>
              <p className="text-slate-800 font-mono text-sm">{patient._id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Created</label>
              <p className="text-slate-800">{new Date(patient.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Last Updated</label>
              <p className="text-slate-800">{new Date(patient.updatedAt).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>

        {/* Medical Notes History */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold text-slate-800 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-blue-600" />
            Medical History ({notes.length})
          </h2>

          {notes.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-800 mb-2">No Medical Notes Yet</h3>
                <p className="text-slate-600 mb-6">
                  Create a medical note for {patient.name} to start documenting their care.
                </p>
                <Button
                  onClick={handleCreateNote}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Create First Note
                </Button>
              </CardContent>
            </Card>
          ) : (
            notes.map((note) => (
              <Card key={note._id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium text-slate-800 text-lg">{note.templateType} Note</h3>
                      <p className="text-sm text-slate-500">
                        {new Date(note.createdAt).toLocaleDateString()} at {new Date(note.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${note.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : note.status === 'processing'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                      }`}>
                      {note.status.charAt(0).toUpperCase() + note.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-slate-50 p-3 rounded">
                      <h4 className="text-xs font-semibold text-slate-500 uppercase mb-1">Subjective</h4>
                      <p className="text-sm text-slate-700 line-clamp-2">
                        {note.aiGeneratedNote.subjective || 'No data'}
                      </p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded">
                      <h4 className="text-xs font-semibold text-slate-500 uppercase mb-1">Assessment</h4>
                      <p className="text-sm text-slate-700 line-clamp-2">
                        {note.aiGeneratedNote.assessment || 'No data'}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <Button
                      onClick={() => router.push(`/note/${note._id}`)}
                      variant="outline"
                      size="sm"
                    >
                      View Full Note
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </main>
  );
}