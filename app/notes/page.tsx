import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import type { FetchNotesResponse } from '@/lib/api';

export default async function NotesPage({
  searchParams,
}: {
  searchParams: { search?: string; page?: string };
}) {
  const search = searchParams.search || '';
  const page = parseInt(searchParams.page || '1', 10);
  const data: FetchNotesResponse = await fetchNotes(search, page);

  return <NotesClient initialData={data} />;
}