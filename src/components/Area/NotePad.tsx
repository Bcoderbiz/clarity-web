import React from 'react';

interface NotePadProps {
  value: string;
  onChange: (value: string) => void;
}

export default function NotePad({ value, onChange }: NotePadProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your notes here..."
        className="w-full h-64 p-4 text-gray-700 border-0 focus:ring-0 resize-none"
        style={{ outline: 'none' }}
      />
    </div>
  );
}