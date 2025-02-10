import React from 'react';
import { Errand } from '../../types/errand';

interface ErrandCardProps {
  errand: Errand;
  onClick: () => void;
}

export default function ErrandCard({ errand, onClick }: ErrandCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-orange-100 rounded-lg p-6 hover:bg-orange-200 transition-colors text-left"
    >
      <span className="text-sm font-medium text-gray-900">{errand.name}</span>
    </button>
  );
}