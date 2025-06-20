import NoteDetailsClient from './NoteDetails.client';

interface Props {
  params: { id: string };
}

export default async function NoteDetailsPage({ params }: Props) {
  const noteId = Number(params.id);
  return <NoteDetailsClient noteId={noteId} />;
}
