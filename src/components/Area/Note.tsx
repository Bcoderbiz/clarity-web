import React, { useRef, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { Note as NoteType } from '../../types/note';

interface NoteProps {
  note: NoteType;
  onChange: (id: string, content: string) => void;
  onHeightChange: (id: string, height: number) => void;
  onDelete: (id: string) => void;
}

export default function Note({ note, onChange, onHeightChange, onDelete }: NoteProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const resizeObserver = useRef<ResizeObserver>();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${note.height}px`;

      resizeObserver.current = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const height = entry.contentRect.height;
          onHeightChange(note.id, height);
        }
      });

      resizeObserver.current.observe(textareaRef.current);
    }

    return () => {
      if (resizeObserver.current) {
        resizeObserver.current.disconnect();
      }
    };
  }, [note.id]);

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm group relative">
      <button
        onClick={() => onDelete(note.id)}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50"
      >
        <Trash2 className="h-4 w-4 text-gray-400 group-hover:text-red-500" />
      </button>
      <textarea
        ref={textareaRef}
        value={note.content}
        onChange={(e) => onChange(note.id, e.target.value)}
        className="w-full p-0 text-gray-700 border-0 focus:outline-none resize-y"
        style={{ minHeight: '24px' }}
        placeholder="Write your thoughts here..."
      />
    </div>
  );
}