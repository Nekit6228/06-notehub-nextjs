'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import ErrorMessage from '../error'; // переконайся в шляху
import Loading from '@/app/loading';
import css from './NoteDetails.module.css';

interface NoteDetailsProps {
  id: number;
}

export default function NoteDetails({ id }: NoteDetailsProps) {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage error={error} reset={refetch} />;
  if (!data) return <div>No note found.</div>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{data.title}</h2>
          <button className={css.editBtn}>Edit note</button>
        </div>
        <p className={css.content}>{data.content}</p>
        <p className={css.date}>
          {data.createdAt
            ? new Date(data.createdAt).toLocaleDateString()
            : 'Unknown date'}
        </p>
      </div>
    </div>
  );
}
