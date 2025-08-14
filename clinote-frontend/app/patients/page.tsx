'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Users, Search, Plus, AlertCircle, Loader2, User, Calendar } from 'lucide-react';
import { apiService, type Patient } from '@/lib/api';

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const userData = apiService.getCurrentUser();
    if (!userData) {
      router.push('/login');
      return;
    }

    loadPatients();
  }, [router]);

  useEffect(() => {
    // Filter patients based on search term
    if (searchTerm.trim() === '') {
      setFilteredPatients(patients);
    } else {
      const filtered = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.age.toString().includes(searchTerm) ||
        patient.gender.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPatients(filtered);
    }
  }, [searchTerm, patients]);

  const loadPatients = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const result = await apiService.getAllPatients();
      
      if (result.success && result.data) {
        // Sort patients by most recently updated
        const sortedPatients = result.data.sort((a, b) => 
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
        setPatients(sortedPatients);
        setFilteredPatients(sortedPatients);
      } else {
        setError(result.message || 'Failed to load patients');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load patients');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePatientClick = (patientId: string) => {
    router.push(`/patients/${patientId}`);
  };

  const handleCreateNote = () => {
    router.push('/create-note');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navigation />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading patients...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">Patients</h1>
              <p className="text-slate-600">Manage your patient records and medical notes</p>
            </div>
            <Button 
              onClick={handleCreateNote}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Patient & Note
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search patients by name, age, or gender..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {/* Patients Grid */}
        {filteredPatients.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <Users className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-800 mb-2">
                  {patients.length === 0 ? 'No Patients Yet' : 'No Patients Found'}
                </h3>
                <p className="text-slate-600 mb-6">
                  {patients.length === 0 
                    ? 'Start by creating your first patient record and medical note.'
                    : `No patients match "${searchTerm}". Try adjusting your search.`
                  }
                </p>
                {patients.length === 0 && (
                  <Button 
                    onClick={handleCreateNote}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Patient
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.map((patient) => (
              <Card 
                key={patient._id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handlePatientClick(patient._id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <User className="h-5 w-5 text-blue-600" />
                      <span>{patient.name}</span>
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Age:</span>
                      <span className="text-sm font-medium text-slate-800">{patient.age} years</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Gender:</span>
                      <span className="text-sm font-medium text-slate-800">{patient.gender}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Created:</span>
                      <span className="text-sm font-medium text-slate-800">
                        {new Date(patient.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Last Updated:</span>
                      <span className="text-sm font-medium text-slate-800 flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(patient.updatedAt).toLocaleDateString()}</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePatientClick(patient._id);
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        {patients.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg">Patient Summary</CardTitle>
              <CardDescription>Overview of your patient records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">{patients.length}</p>
                  <p className="text-sm text-slate-600">Total Patients</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">
                    {patients.filter(p => p.gender === 'Female').length}
                  </p>
                  <p className="text-sm text-slate-600">Female</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">
                    {patients.filter(p => p.gender === 'Male').length}
                  </p>
                  <p className="text-sm text-slate-600">Male</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-600">
                    {Math.round(patients.reduce((sum, p) => sum + p.age, 0) / patients.length)}
                  </p>
                  <p className="text-sm text-slate-600">Avg Age</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}