import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CreateErrandModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, notes?: string) => void;
}

export default function CreateErrandModal({ isOpen, onClose, onSubmit }: CreateErrandModalProps) {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Errand name is required');
      return;
    }

    onSubmit(name.trim(), notes.trim() || undefined);
    setName('');
    setNotes('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Create New Errand</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="errandName" className="block text-sm font-medium text-gray-700 mb-1">
              Errand Name
            </label>
            <input
              type="text"
              id="errandName"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter errand name"
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="errandNotes" className="block text-sm font-medium text-gray-700 mb-1">
              Notes (Optional)
            </label>
            <textarea
              id="errandNotes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 h-32 resize-none"
              placeholder="Add any additional notes..."
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Create Errand
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}