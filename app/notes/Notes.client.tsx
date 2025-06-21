'use client';

import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery, UseQueryOptions,keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import NoteModal from '@/components/NoteModal/NoteModal';
import NoteForm from '@/components/NoteForm/NoteForm';
import Loader from '../loading';
import Error from './error';
import css from './Notes.module.css';
import type { Note } from '@/types/note';

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export default function NotesClient() {
  const [inputValue, setInputValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debounced] = useDebounce(inputValue, 500);

  const handleSearch = (value: string) => {
    setInputValue(value);
    setCurrentPage(1);
  };

  const queryOptions: UseQueryOptions<FetchNotesResponse, Error, FetchNotesResponse, (string | number)[]> = {
    queryKey: ['notes', debounced, currentPage],
    queryFn: () => fetchNotes(debounced, currentPage),
    placeholderData: keepPreviousData,
  };

  const notesQuery = useQuery(queryOptions);

  if (notesQuery.isLoading) {
    return (
      <div className={css.loaderOverlay}>
        <Loader />
      </div>
    );
  }

  if (notesQuery.isError) {
    return (
      <div className={css.errorOverlay}>
        <Error error={notesQuery.error} reset={() => notesQuery.refetch()} />
      </div>
    );
  }

  const notes = notesQuery.data?.notes ?? [];
  const totalPages = notesQuery.data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={inputValue} onSearch={handleSearch} />
        {totalPages > 0 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button onClick={() => setIsModalOpen(true)} className={css.button}>
          Create note +
        </button>
      </header>
      <NoteList notes={notes} />
      {isModalOpen && (
        <NoteModal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </NoteModal>
      )}
    </div>
  );
}
