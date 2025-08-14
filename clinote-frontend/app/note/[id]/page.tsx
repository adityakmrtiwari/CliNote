import Navigation from '@/components/navigation';
import NoteDetailsClient from './NoteDetailsClient';

export default function NoteDetailsPage({ params }: { params: { id: string } }) {
  // This page only renders the client component and passes the ID to it.
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <NoteDetailsClient noteId={params.id} />
    </div>
  );
}