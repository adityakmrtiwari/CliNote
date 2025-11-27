'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Search, Plus, AlertCircle, Calendar, User, Filter } from 'lucide-react';
import { apiService, type Note, type Patient } from '@/lib/api';
import { useAuth } from '@/components/auth-provider';

interface NoteWithPatient extends Note {
  patientName?: string;
  patientAge?: number;
  patientGender?: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<NoteWithPatient[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<NoteWithPatient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [templateFilter, setTemplateFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }

    if (isAuthenticated) {
      loadNotes();
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    // Filter notes based on search term, status, and template
    let filtered = notes;

    // Search filter
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(note =>
        note.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.templateType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.aiGeneratedNote.subjective.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.aiGeneratedNote.assessment.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(note => note.status === statusFilter);
    }

    // Template filter
    if (templateFilter !== 'all') {
      filtered = filtered.filter(note => note.templateType === templateFilter);
    }

    setFilteredNotes(filtered);
  }, [searchTerm, statusFilter, templateFilter, notes]);

  const loadNotes = async () => {
    try {
      setIsLoading(true);
      setError('');

      const result = await apiService.getAllNotes();

      if (result.success && result.data) {
        // Load patient information for each note. Backend may return a populated patient object
        const notesWithPatients = await Promise.all(
          result.data.map(async (note) => {
            try {
              // If backend already populated patientId with patient object, use it directly
              const pid = (note as any).patientId;
              if (typeof pid === 'object' && pid?.name) {
                return {
                  ...note,
                  patientName: pid.name,
                  patientAge: pid.age,
                  patientGender: pid.gender,
                };
              }

              // Otherwise, fetch patient by id
              const patientResult = await apiService.getPatientById(String(note.patientId));
              return {
                ...note,
                patientName: patientResult.success && patientResult.data ? patientResult.data.name : 'Unknown Patient',
                patientAge: patientResult.success && patientResult.data ? patientResult.data.age : undefined,
                patientGender: patientResult.success && patientResult.data ? patientResult.data.gender : undefined,
              };
            } catch {
              return { ...note, patientName: 'Unknown Patient' };
            }
          })
        );

        // Sort by most recent
        const sortedNotes = notesWithPatients.sort((a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );

        setNotes(sortedNotes);
        setFilteredNotes(sortedNotes);
      } else {
        setError(result.message || 'Failed to load notes');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load notes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNoteClick = (noteId: string) => {
    router.push(`/note/${noteId}`);
  };

  const handleCreateNote = () => {
    router.push('/create-note');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const uniqueTemplates = Array.from(new Set(notes.map(note => note.templateType)));

  if (authLoading || (isAuthenticated && isLoading)) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading notes...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">Medical Notes</h1>
              <p className="text-slate-600">View and manage all your SOAP notes and medical documentation</p>
            </div>
            <Button
              onClick={handleCreateNote}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Note
            </Button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>

            {/* Template Filter */}
            <Select value={templateFilter} onValueChange={setTemplateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Templates</SelectItem>
                {uniqueTemplates.map((template) => (
                  <SelectItem key={template} value={template}>
                    {template}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Clear Filters */}
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setTemplateFilter('all');
              }}
              className="flex items-center space-x-2"
            >
              <Filter className="h-4 w-4" />
              <span>Clear Filters</span>
            </Button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {/* Notes Grid */}
        {filteredNotes.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-800 mb-2">
                  {notes.length === 0 ? 'No Notes Yet' : 'No Notes Found'}
                </h3>
                <p className="text-slate-600 mb-6">
                  {notes.length === 0
                    ? 'Start by creating your first medical note.'
                    : 'No notes match your current filters. Try adjusting your search criteria.'
                  }
                </p>
                {notes.length === 0 && (
                  <Button
                    onClick={handleCreateNote}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Note
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <Card
                key={note._id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleNoteClick(note._id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <span className="truncate">{note.patientName}</span>
                    </CardTitle>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(note.status)}`}>
                      {note.status.charAt(0).toUpperCase() + note.status.slice(1)}
                    </span>
                  </div>
                  <CardDescription className="flex items-center space-x-2">
                    <span>{note.templateType}</span>
                    {note.patientAge && note.patientGender && (
                      <span className="text-slate-400">
                        • {note.patientAge}y, {note.patientGender}
                      </span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* Subjective Preview */}
                    <div>
                      <h4 className="text-xs font-medium text-slate-600 mb-1">SUBJECTIVE</h4>
                      <p className="text-sm text-slate-700 line-clamp-2">
                        {note.aiGeneratedNote.subjective || 'No subjective data'}
                      </p>
                    </div>

                    {/* Assessment Preview */}
                    <div>
                      <h4 className="text-xs font-medium text-slate-600 mb-1">ASSESSMENT</h4>
                      <p className="text-sm text-slate-700 line-clamp-2">
                        {note.aiGeneratedNote.assessment || 'No assessment data'}
                      </p>
                    </div>

                    {/* Metadata */}
                    <div className="flex justify-between items-center pt-3 border-t text-xs text-slate-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>Updated {new Date(note.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        {notes.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg">Notes Summary</CardTitle>
              <CardDescription>Overview of your medical documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">{notes.length}</p>
                  <p className="text-sm text-slate-600">Total Notes</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">
                    {notes.filter(n => n.status === 'completed').length}
                  </p>
                  <p className="text-sm text-slate-600">Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">
                    {notes.filter(n => n.status === 'processing').length}
                  </p>
                  <p className="text-sm text-slate-600">Processing</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-yellow-600">
                    {notes.filter(n => n.status === 'draft').length}
                  </p>
                  <p className="text-sm text-slate-600">Draft</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">
                    {uniqueTemplates.length}
                  </p>
                  <p className="text-sm text-slate-600">Templates Used</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}