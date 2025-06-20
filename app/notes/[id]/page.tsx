import NoteDetailsClient from './NoteDetails.client';

export default function NoteDetailsPage({ params }: { params: { id: string } }) {
  const noteId = Number(params.id);
  return <NoteDetailsClient noteId={noteId} />;
}
