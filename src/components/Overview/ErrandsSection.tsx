import React, { useState } from 'react';
import { Plus, Eye } from 'lucide-react';
import { Errand } from '../../types/errand';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import ErrandCard from './ErrandCard';
import CreateErrandModal from './CreateErrandModal';
import EditErrandModal from './EditErrandModal';

export default function ErrandsSection() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedErrand, setSelectedErrand] = useState<Errand | null>(null);
  const [errands, setErrands] = useLocalStorage<Errand[]>('errands', []);

  const handleCreateErrand = (name: string, notes?: string) => {
    const newErrand: Errand = {
      id: crypto.randomUUID(),
      name,
      notes,
      createdAt: new Date(),
    };
    setErrands([...errands, newErrand]);
  };

  const handleEditErrand = (name: string, notes?: string) => {
    if (!selectedErrand) return;
    
    const updatedErrands = errands.map((errand) =>
      errand.id === selectedErrand.id ? { ...errand, name, notes } : errand
    );
    setErrands(updatedErrands);
    setSelectedErrand(null);
  };

  const handleDeleteErrand = () => {
    if (!selectedErrand) return;
    
    const updatedErrands = errands.filter((errand) => errand.id !== selectedErrand.id);
    setErrands(updatedErrands);
    setSelectedErrand(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center h-14 mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Errands</h2>
        <div className="flex gap-3">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 h-10 px-4 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none transition-colors"
          >
            <Plus className="h-4 w-4" />
            Create Errand
          </button>
          <button
            className="flex items-center gap-2 h-10 px-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none transition-colors"
          >
            <Eye className="h-4 w-4" />
            View Completed
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {errands.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No errands created yet. Click the button above to create your first errand.
          </p>
        ) : (
          errands.map((errand) => (
            <ErrandCard
              key={errand.id}
              errand={errand}
              onClick={() => setSelectedErrand(errand)}
            />
          ))
        )}
      </div>

      <CreateErrandModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateErrand}
      />

      {selectedErrand && (
        <EditErrandModal
          isOpen={!!selectedErrand}
          errand={selectedErrand}
          onClose={() => setSelectedErrand(null)}
          onSubmit={handleEditErrand}
          onDelete={handleDeleteErrand}
        />
      )}
    </div>
  );
}