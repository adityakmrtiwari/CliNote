"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiService, type Note, type Patient } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Download, Eye, User, Calendar, AlertCircle, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function NoteDetailsClient({ noteId }: { noteId: string }) {
  const router = useRouter();

  const [note, setNote] = useState<Note | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState<Partial<Note['aiGeneratedNote']>>({});
  const [showTranscript, setShowTranscript] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!apiService.isAuthenticated()) {
      router.push('/login');
      return;
    }

    const loadData = async () => {
      setIsLoading(true);
      try {
        const noteResult = await apiService.getNoteById(noteId);
        if (noteResult.success && noteResult.data) {
          const fetchedNote = noteResult.data;
          setNote(fetchedNote);
          setEditedNote(fetchedNote.aiGeneratedNote);

          // patientId may be a string id or a populated Patient object — normalize to string id
          const patientIdStr = typeof fetchedNote.patientId === 'string' ? fetchedNote.patientId : fetchedNote.patientId._id;

          const patientResult = await apiService.getPatientById(patientIdStr);
          if (patientResult.success && patientResult.data) {
            setPatient(patientResult.data);
          } else {
            setError("Could not load associated patient data.");
          }
        } else {
          setError(noteResult.message || "Note not found.");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load note details.");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [noteId, router]);

  const handleSave = async () => {
    if (!note) return;
    setIsSaving(true);
    setError('');
    try {
      const completeAiNote = {
        subjective: editedNote.subjective || '',
        objective: editedNote.objective || '',
        assessment: editedNote.assessment || '',
        plan: editedNote.plan || '',
      };
      
  const patientIdStr = typeof note.patientId === 'string' ? note.patientId : note.patientId._id;
  const result = await apiService.updateNoteByPatient(patientIdStr, { aiGeneratedNote: completeAiNote });

      if (result.success && result.data) {
        setNote(result.data);
        setIsEditing(false);
      } else {
        setError(result.message || 'Failed to save');
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    if (note) {
      setEditedNote(note.aiGeneratedNote);
    }
    setError('');
  };

  /** ✅ Generate PDF of the note details */
  const handleDownloadPDF = async () => {
    const element = document.getElementById('note-content');
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${patient?.name || 'note'}-medical-note.pdf`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error && !isEditing) {
    return (
      <div className="max-w-4xl mx-auto text-center py-10">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-600">{error}</p>
        <Button onClick={() => router.back()} variant="outline" className="mt-4">Go Back</Button>
      </div>
    );
  }

  if (!note || !patient) return null;

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Button onClick={() => router.back()} variant="outline" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Patient
        </Button>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-slate-800">{note.templateType} Note</CardTitle>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600 pt-2">
              <div className="flex items-center"><User className="h-4 w-4 mr-2" /><span>{patient.name}</span></div>
              <div className="flex items-center"><Calendar className="h-4 w-4 mr-2" /><span>{new Date(note.createdAt).toLocaleDateString()}</span></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button onClick={() => setShowTranscript(!showTranscript)} variant="secondary">
                  <Eye className="h-4 w-4 mr-2" />
                  {showTranscript ? 'Hide' : 'Show'} Transcript
                </Button>
                <Button onClick={handleDownloadPDF} variant="secondary">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
              {isEditing ? (
                <div className="flex space-x-2">
                  <Button onClick={handleCancelEdit} variant="outline">Cancel</Button>
                  <Button onClick={handleSave} disabled={isSaving} className="bg-green-600 hover:bg-green-700">
                    {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                    Save Changes
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">Edit Note</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {isEditing && error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      {showTranscript && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Original Audio Transcript</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-50 p-4 rounded-lg">
              <pre className="whitespace-pre-wrap text-sm text-slate-700 font-mono">
                {note.transcript || 'No transcript available'}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}

      <div id="note-content" className="space-y-6">
        {(['subjective', 'objective', 'assessment', 'plan'] as const).map((section) => (
          <Card key={section}>
            <CardHeader>
              <CardTitle className="text-blue-600 capitalize">{section}</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  value={editedNote[section] || ''}
                  onChange={(e) => setEditedNote({ ...editedNote, [section]: e.target.value })}
                  className="min-h-[120px] font-mono text-sm"
                  placeholder={`Enter ${section} findings...`}
                />
              ) : (
                <div className="bg-slate-50 p-4 rounded-lg min-h-[60px]">
                  <pre className="whitespace-pre-wrap text-sm text-slate-800">
                    {note.aiGeneratedNote[section] || `No ${section} data available`}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
