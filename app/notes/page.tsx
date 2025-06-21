import { NextPage } from 'next';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import type { FetchNotesResponse } from '@/lib/api';

interface NotesPageProps {
  searchParams: Promise<{ search?: string; page?: string }>;
}

const NotesPage: NextPage<NotesPageProps> = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams; 
  const search = resolvedSearchParams.search || '';
  const page = parseInt(resolvedSearchParams.page || '1', 10);
  const data: FetchNotesResponse = await fetchNotes(search, page);

  return <NotesClient initialData={data} />;
};

export default NotesPage;