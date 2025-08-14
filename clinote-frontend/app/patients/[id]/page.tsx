import Navigation from '@/components/navigation';
import PatientDetailsClient from './PatientDetailsClient';

export default function PatientDetailsPage({ params }: { params: { id: string } }) {
  // This page only renders the client component and passes the ID to it.
  // It does not fetch any data itself.
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <PatientDetailsClient patientId={params.id} />
    </div>
  );
}