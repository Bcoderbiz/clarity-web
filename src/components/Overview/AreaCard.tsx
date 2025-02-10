import React from 'react';
import { Folder } from 'lucide-react';
import { Area } from '../../types/area';

interface AreaCardProps {
  area: Area;
  onClick: (area: Area) => void;
}

export default function AreaCard({ area, onClick }: AreaCardProps) {
  return (
    <button
      onClick={() => onClick(area)}
      className="w-full bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-left"
    >
      <div className="flex items-center gap-4">
        <Folder className="h-7 w-7 text-orange-500" />
        <span className="text-lg font-medium text-gray-900">{area.name}</span>
      </div>
    </button>
  );
}