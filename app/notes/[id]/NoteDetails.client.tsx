'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import ErrorMessage from './error';
import Loading from '@/app/loading';
import css from './NoteDetails.module.css'; 

interface NoteDetailsProps {
  id: number;
}

const NoteDetails: React.FC<NoteDetailsProps> = ({ id }) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div > 
        <ErrorMessage error={error} reset={() => refetch()} />
      </div>
    );
  }

  if (!data) {
    return <div className={css.noData}>No data found</div>;
  }

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
};

export default NoteDetails;