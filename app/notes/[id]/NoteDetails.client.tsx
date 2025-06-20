'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import css from './NoteDetails.module.css';
import Loader from '../loader';
import Error from '../error';

interface Props {
  noteId: number;
}

export default function NoteDetailsClient({ noteId }: Props) {
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  if (isLoading) return <Loader />;
  if (isError || !note) return <Error />;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <button className={css.editBtn}>Edit note</button>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>Created: {new Date(note.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
}
