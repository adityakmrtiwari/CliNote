'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Mic, Square, Pause, Play, FileText, Loader2, Plus, AlertCircle, User, MicOff, ArrowLeft } from 'lucide-react';
import { apiService, type Patient, type Note } from '@/lib/api';
import { useAuth } from '@/components/auth-provider';

// Web Speech API types
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

export default function CreateNote() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [generatedNote, setGeneratedNote] = useState<Note | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // New patient form
  const [showNewPatientDialog, setShowNewPatientDialog] = useState(false);
  const [newPatientName, setNewPatientName] = useState('');
  const [newPatientAge, setNewPatientAge] = useState('');
  const [newPatientGender, setNewPatientGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [isCreatingPatient, setIsCreatingPatient] = useState(false);

  // Speech Recognition
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  // Audio Recording (for backend upload to Cloudinary)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const templates = [
    'SOAP',
    'PROGRESS',
    'CONSULTATION',
    'DISCHARGE',
    'General Medicine'
  ];

  const { isAuthenticated, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }
    if (isAuthenticated) {
      loadPatients();
    }

    // Check for Web Speech API support
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      setIsSupported(true);
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();

      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onstart = () => {
        console.log('Speech recognition started');
        setError('');
      };

      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript + ' ';
          } else {
            interimTranscript += result[0].transcript;
          }
        }

        if (finalTranscript) {
          setTranscript(prev => prev + finalTranscript);
        }
        setInterimTranscript(interimTranscript);
      };

      recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
        setError(`Speech recognition error: ${event.error}`);
        setIsRecording(false);
        setIsPaused(false);
      };

      recognitionInstance.onend = () => {
        console.log('Speech recognition ended');
        if (isRecording && !isPaused) {
          // Restart if we're still supposed to be recording
          recognitionInstance.start();
        }
      };

      setRecognition(recognitionInstance);
    } else {
      setError('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
    }
  }, [router]);

  useEffect(() => {
    // Check if a patient ID was passed in the URL
    const patientId = searchParams.get('patientId');
    if (patientId && patients.length > 0) {
      const patient = patients.find(p => p._id === patientId);
      if (patient) {
        setSelectedPatient(patientId);
      }
    }
  }, [searchParams, patients]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  const loadPatients = async () => {
    try {
      setIsLoading(true);
      setError('');
      const result = await apiService.getAllPatients();

      if (result.success && result.data) {
        setPatients(result.data);
      } else {
        setError(result.message || 'Failed to load patients');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load patients');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePatient = async () => {
    if (!newPatientName.trim() || !newPatientAge.trim()) {
      setError('Please fill in all patient details');
      return;
    }

    const age = parseInt(newPatientAge);
    if (isNaN(age) || age < 0 || age > 150) {
      setError('Please enter a valid age');
      return;
    }

    try {
      setIsCreatingPatient(true);
      setError('');

      const result = await apiService.createPatient(newPatientName.trim(), age, newPatientGender);

      if (result.success && result.data) {
        setPatients(prev => [...prev, result.data!]);
        setSelectedPatient(result.data._id);
        setShowNewPatientDialog(false);
        setNewPatientName('');
        setNewPatientAge('');
        setNewPatientGender('Male');
      } else {
        setError(result.message || 'Failed to create patient');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create patient');
    } finally {
      setIsCreatingPatient(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = async () => {
    if (!selectedPatient || !selectedTemplate) {
      setError('Please select a patient and template first.');
      return;
    }

    if (!isSupported || !recognition) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    try {
      // Get microphone access for both speech recognition and audio recording
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudioStream(stream);

      // Set up audio recording for backend upload
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        setAudioChunks(chunks);
      };

      setMediaRecorder(recorder);
      setAudioChunks([]);

      // Start both audio recording and speech recognition
      recorder.start();
      recognition.start();

      setTranscript('');
      setInterimTranscript('');
      setIsRecording(true);
      setIsPaused(false);
      setRecordingTime(0);
      setError('');
    } catch (err) {
      setError('Failed to access microphone. Please check permissions and try again.');
      setIsRecording(false);
    }
  };

  const handleStopRecording = async () => {
    if (!recognition || !mediaRecorder) return;

    // Stop both speech recognition and audio recording
    recognition.stop();
    mediaRecorder.stop();

    // Stop audio stream
    if (audioStream) {
      audioStream.getTracks().forEach(track => track.stop());
      setAudioStream(null);
    }

    setIsRecording(false);
    setIsPaused(false);

    if (!transcript.trim()) {
      setError('No speech was detected. Please try recording again.');
      return;
    }

    setIsProcessing(true);

    try {
      let audioUrl = '';

      // Wait for audio chunks to be available and upload audio file
      setTimeout(async () => {
        try {
          if (audioChunks.length > 0) {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioFile = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });

            // Upload audio to backend (Cloudinary)
            const uploadResult = await apiService.uploadAudio(audioFile);
            if (uploadResult.success && uploadResult.data) {
              audioUrl = uploadResult.data.audioUrl;
            }
          }

          // Generate SOAP note with transcript and audio URL
          const result = await apiService.generateSOAPNote(
            selectedPatient,
            transcript.trim(),
            selectedTemplate,
            audioUrl
          );

          if (result.success && result.data) {
            setGeneratedNote(result.data);

            // Redirect to note view after a short delay
            setTimeout(() => {
              router.push(`/note/${result.data!._id}`);
            }, 2000);
          } else {
            setError(result.message || 'Failed to generate SOAP note');
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to process recording');
        } finally {
          setIsProcessing(false);
        }
      }, 1000); // Wait for audio chunks to be processed
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process transcript');
      setIsProcessing(false);
    }
  };

  const handlePauseResume = () => {
    if (!recognition || !mediaRecorder) return;

    if (isPaused) {
      // Resume both speech recognition and audio recording
      recognition.start();
      if (mediaRecorder.state === 'paused') {
        mediaRecorder.resume();
      }
      setIsPaused(false);
    } else {
      // Pause both speech recognition and audio recording
      recognition.stop();
      if (mediaRecorder.state === 'recording') {
        mediaRecorder.pause();
      }
      setIsPaused(true);
    }
  };

  const selectedPatientData = patients.find(p => p._id === selectedPatient);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Button
            onClick={() => router.push('/dashboard')}
            variant="outline"
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Create New Note</h1>
          <p className="text-slate-600">Record your patient encounter and generate SOAP notes using speech recognition</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {!isSupported && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center space-x-2">
            <MicOff className="h-5 w-5 text-yellow-600" />
            <span className="text-yellow-700">
              Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari for the best experience.
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Patient and Template Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Patient & Template Selection</CardTitle>
              <CardDescription>Choose the patient and note template</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Select Patient
                </label>
                <div className="flex space-x-2">
                  <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Choose a patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map((patient) => (
                        <SelectItem key={patient._id} value={patient._id}>
                          {patient.name} ({patient.age}y, {patient.gender})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Dialog open={showNewPatientDialog} onOpenChange={setShowNewPatientDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Patient</DialogTitle>
                        <DialogDescription>
                          Enter the patient's information to add them to your records.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={newPatientName}
                            onChange={(e) => setNewPatientName(e.target.value)}
                            placeholder="Enter patient's full name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="age">Age</Label>
                          <Input
                            id="age"
                            type="number"
                            value={newPatientAge}
                            onChange={(e) => setNewPatientAge(e.target.value)}
                            placeholder="Enter patient's age"
                            min="0"
                            max="150"
                          />
                        </div>
                        <div>
                          <Label htmlFor="gender">Gender</Label>
                          <Select value={newPatientGender} onValueChange={(value: 'Male' | 'Female' | 'Other') => setNewPatientGender(value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            onClick={() => setShowNewPatientDialog(false)}
                            disabled={isCreatingPatient}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleCreatePatient}
                            disabled={isCreatingPatient}
                          >
                            {isCreatingPatient ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Creating...
                              </>
                            ) : (
                              'Create Patient'
                            )}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Select Template
                </label>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template} value={template}>
                        {template}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedPatientData && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-slate-800 mb-2 flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Patient Information
                  </h3>
                  <p className="text-sm text-slate-600">
                    <strong>Name:</strong> {selectedPatientData.name}<br />
                    <strong>Age:</strong> {selectedPatientData.age}<br />
                    <strong>Gender:</strong> {selectedPatientData.gender}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Speech Recognition Interface */}
          <Card>
            <CardHeader>
              <CardTitle>Speech Recognition</CardTitle>
              <CardDescription>Record your patient encounter using voice recognition</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-6">
                {/* Waveform Visualization */}
                <div className="flex justify-center items-end space-x-1 h-24">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className={`bg-blue-600 w-2 rounded-full transition-all duration-300 ${isRecording && !isPaused ? 'animate-pulse' : ''
                        }`}
                      style={{
                        height: isRecording && !isPaused ? `${Math.random() * 40 + 20}px` : '16px',
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>

                {/* Recording Time */}
                <div className="text-2xl font-mono font-bold text-slate-800">
                  {formatTime(recordingTime)}
                </div>

                {/* Recording Controls */}
                <div className="flex justify-center space-x-4">
                  {!isRecording ? (
                    <Button
                      onClick={handleStartRecording}
                      size="lg"
                      className="bg-red-600 hover:bg-red-700 text-white px-8"
                      disabled={!selectedPatient || !selectedTemplate || !isSupported}
                    >
                      <Mic className="h-5 w-5 mr-2" />
                      Start Recording
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={handlePauseResume}
                        size="lg"
                        variant="outline"
                        className="px-6"
                      >
                        {isPaused ? <Play className="h-5 w-5 mr-2" /> : <Pause className="h-5 w-5 mr-2" />}
                        {isPaused ? 'Resume' : 'Pause'}
                      </Button>
                      <Button
                        onClick={handleStopRecording}
                        size="lg"
                        className="bg-slate-600 hover:bg-slate-700 text-white px-6"
                      >
                        <Square className="h-5 w-5 mr-2" />
                        Stop & Process
                      </Button>
                    </>
                  )}
                </div>

                {/* Recording Status */}
                {isRecording && (
                  <div className="flex items-center justify-center space-x-2 text-red-600">
                    <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                    <span className="font-medium">
                      {isPaused ? 'Recording Paused' : 'Listening...'}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Transcript */}
        {(transcript || interimTranscript) && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Live Transcript</CardTitle>
              <CardDescription>Real-time speech-to-text conversion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-50 p-4 rounded-lg min-h-[120px]">
                <div className="text-sm text-slate-800 whitespace-pre-wrap">
                  {transcript}
                  <span className="text-slate-500 italic">{interimTranscript}</span>
                  {isRecording && <span className="animate-pulse">|</span>}
                </div>
              </div>
              {transcript && (
                <div className="mt-4">
                  <Label htmlFor="transcript-edit">Edit Transcript (Optional)</Label>
                  <Textarea
                    id="transcript-edit"
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    className="mt-2"
                    placeholder="You can edit the transcript here if needed..."
                    rows={4}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Processing Status */}
        {isProcessing && (
          <Card className="mt-8">
            <CardContent className="py-8">
              <div className="text-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
                <h3 className="text-lg font-medium text-slate-800">Processing Transcript...</h3>
                <p className="text-slate-600">
                  Generating SOAP note with AI assistance
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Generated Note Preview */}
        {generatedNote && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <span>Generated SOAP Note</span>
              </CardTitle>
              <CardDescription>AI-generated note from your speech transcript</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">SUBJECTIVE:</h4>
                    <p className="text-sm text-slate-700 whitespace-pre-wrap">
                      {generatedNote.aiGeneratedNote.subjective}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">OBJECTIVE:</h4>
                    <p className="text-sm text-slate-700 whitespace-pre-wrap">
                      {generatedNote.aiGeneratedNote.objective}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">ASSESSMENT:</h4>
                    <p className="text-sm text-slate-700 whitespace-pre-wrap">
                      {generatedNote.aiGeneratedNote.assessment}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">PLAN:</h4>
                    <p className="text-sm text-slate-700 whitespace-pre-wrap">
                      {generatedNote.aiGeneratedNote.plan}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-green-600 font-medium">Note generated successfully!</p>
                <p className="text-sm text-slate-600 mt-1">Redirecting to note editor...</p>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}