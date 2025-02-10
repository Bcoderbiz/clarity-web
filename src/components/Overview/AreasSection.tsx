import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Area } from '../../types/area';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import AreaCard from './AreaCard';
import CreateAreaModal from './CreateAreaModal';

interface AreasSectionProps {
  onAreaClick: (area: Area) => void;
}

export default function AreasSection({ onAreaClick }: AreasSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [areas, setAreas] = useLocalStorage<Area[]>('areas', []);

  const handleCreateArea = (name: string) => {
    const newArea: Area = {
      id: crypto.randomUUID(),
      name,
      createdAt: new Date(),
    };
    setAreas([...areas, newArea]);
  };

  return (
    <div>
      <div className="flex justify-between items-center h-14 mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">The Areas of My Life</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 h-10 px-4 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none transition-colors"
        >
          <Plus className="h-4 w-4" />
          Create Area
        </button>
      </div>

      <div className="space-y-3">
        {areas.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No areas created yet. Click the button above to create your first area.
          </p>
        ) : (
          areas.map((area) => (
            <AreaCard 
              key={area.id} 
              area={area} 
              onClick={onAreaClick}
            />
          ))
        )}
      </div>

      <CreateAreaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateArea}
      />
    </div>
  );
}