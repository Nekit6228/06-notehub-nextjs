import { NextPage } from 'next';
import { fetchNoteById } from '@/lib/api';
import NoteDetails from './NoteDetails.client';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';

interface NotePageProps {
  params: Promise<{ id: string }>;
}

const NotePage: NextPage<NotePageProps> = async ({ params }) => {
  const resolvedParams = await params; 
  const id = parseInt(resolvedParams.id, 10);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetails id={id} />
    </HydrationBoundary>
  );
};

export default NotePage;