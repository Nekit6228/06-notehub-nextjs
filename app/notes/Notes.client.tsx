'use client';
import { useState } from 'react';
import css from './Notes.module.css'; 
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import NoteModal from '@/components/NoteModal/NoteModal';
import NoteForm from '@/components/NoteForm/NoteForm';
import Loader from './loader';
import ErrorMessage from './error';
import { useDebounce } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';

export default function NotesClient() {
  const [inputValue, setInputValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debounced] = useDebounce(inputValue, 500);

  const notes = useQuery({
    queryKey: ['notes', debounced, currentPage],
    queryFn: () => fetchNotes(debounced, currentPage),
  });

  if (notes.isLoading)
    return <div className={css.loaderOverlay}><Loader /></div>;
  if (notes.isError)
    return <div className={css.errorOverlay}><ErrorMessage message={notes.error.message} /></div>;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={inputValue} onSearch={setInputValue} />
        {notes.data?.totalPages > 0 && (
          <Pagination
            totalPages={notes.data.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button onClick={() => setIsModalOpen(true)} className={css.button}>
          Create note +
        </button>
      </header>
      <NoteList notes={notes.data.notes} />
      {isModalOpen && (
        <NoteModal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </NoteModal>
      )}
    </div>
  );
}
