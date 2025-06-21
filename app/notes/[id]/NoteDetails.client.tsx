'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { Note } from '@/types/note';
import css from './NoteDetails.module.css';
import Loader from '../../loading';
import ErrorMessage from './error';

export default function NoteDetails({ id }: { id: number }) {
  const params = useParams();
  const noteId = id || parseInt(params.id as string, 10);

  const { data, isLoading, isError, error } = useQuery<Note, Error>({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  if (isLoading)
    return (
      <div className={css.loaderOverlay}>
        <Loader />
      </div>
    );

  if (isError)
    return (
      <div className={css.errorOverlay}>
        <ErrorMessage error={error} />
      </div>
    );

  if (!data) return null;

  return (
    <div className={css.container}>
      <h1 className={css.title}>{data.title}</h1>
      <p className={css.content}>{data.content}</p>
      <div className={css.footer}>
        <span className={css.tag}>{data.tag}</span>
        <p>Created: {new Date(data.createdAt).toLocaleDateString()}</p>
        <p>Updated: {new Date(data.updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}