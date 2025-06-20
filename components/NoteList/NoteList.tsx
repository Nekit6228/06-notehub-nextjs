import css from './Note.module.css'
import {deleteNote} from '@/lib/api'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Note } from '@/types/note';
import Link from 'next/link';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({notes}: NoteListProps){

    const queryClient = useQueryClient();
    const {mutate} = useMutation({
        mutationFn:(id:number) => deleteNote(id),
        onSuccess: () =>{
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        }
    })

    return (
    <ul className={css.list}>
      {notes.map((note: Note) => {
        const { id, title, content, tag } = note;
        return (
          <li key={id} className={css.listItem}>
            <h2 className={css.title}>{title}</h2>
            <p className={css.content}>{content}</p>
            <div className={css.footer}>
                    <span className={css.tag}>{tag}</span>
                    <Link href={`/notes/${note.id}`} className={css.viewLink}>
                        View details
                    </Link>
              <button onClick={() => mutate(id)} className={css.button}>
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}