import React, { useState, useRef } from 'react';
import { Folder, Pencil } from 'lucide-react';
import { Area } from '../../types/area';

interface AreaCardInteractiveProps {
  area: Area;
  onEdit: () => void;
  onAddNotes: () => void;
}

export default function AreaCardInteractive({ area, onEdit, onAddNotes }: AreaCardInteractiveProps) {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
      setShowOptions(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative bg-white rounded-lg p-6 shadow-sm group">
      <div className="flex items-center gap-4">
        <Folder className="h-7 w-7 text-orange-500" />
        <span className="text-lg font-medium text-gray-900">{area.name}</span>
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
        >
          <Pencil className="h-5 w-5 text-gray-400" />
        </button>
      </div>

      {showOptions && (
        <div
          ref={optionsRef}
          className="absolute right-0 top-16 w-48 bg-white rounded-md shadow-lg py-1 z-10"
        >
          <button
            onClick={() => {
              onEdit();
              setShowOptions(false);
            }}
            className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
          >
            Edit
          </button>
          <button
            onClick={() => {
              onAddNotes();
              setShowOptions(false);
            }}
            className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
          >
            Add Notes
          </button>
        </div>
      )}
    </div>
  );
}