
import { fetchNoteById } from '@/lib/api';
import NoteDetails from './NoteDetails.client';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';


interface NotePageProps {
  params: { id: string };
}


export default async function NotePage({ params }: NotePageProps) {
  const id = parseInt(params.id, 10);

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
}
