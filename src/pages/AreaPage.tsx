import React, { useState } from 'react';
import BackButton from '../components/Navigation/BackButton';
import EditAreaModal from '../components/Area/EditAreaModal';
import CreateGoalModal from '../components/Goal/CreateGoalModal';
import EditGoalModal from '../components/Goal/EditGoalModal';
import GoalCard from '../components/Goal/GoalCard';
import Note from '../components/Area/Note';
import { Area } from '../types/area';
import { Goal } from '../types/goal';
import { Note as NoteType } from '../types/note';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Plus, Pencil, Eye } from 'lucide-react';

interface AreaPageProps {
  area: Area;
  onBack: () => void;
}

export default function AreaPage({ area, onBack }: AreaPageProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateGoalModalOpen, setIsCreateGoalModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [areas, setAreas] = useLocalStorage<Area[]>('areas', []);
  const [notes, setNotes] = useLocalStorage<NoteType[]>(`area-notes-${area.id}`, []);
  const [goals, setGoals] = useLocalStorage<Goal[]>(`area-goals-${area.id}`, []);

  const handleEditArea = (name: string) => {
    const updatedAreas = areas.map((a) =>
      a.id === area.id ? { ...a, name } : a
    );
    setAreas(updatedAreas);
    setIsEditModalOpen(false);
  };

  const handleDeleteArea = () => {
    const updatedAreas = areas.filter((a) => a.id !== area.id);
    setAreas(updatedAreas);
    onBack();
  };

  const handleCreateGoal = (name: string, type: 'do' | 'dont', dateType: 'none' | 'target' | 'exact', date: string) => {
    const newGoal: Goal = {
      id: crypto.randomUUID(),
      name,
      type,
      areaId: area.id,
      dateType,
      date,
      createdAt: new Date(),
    };
    setGoals([...goals, newGoal]);
  };

  const handleEditGoal = (name: string, dateType: 'none' | 'target' | 'exact', date: string) => {
    if (!selectedGoal) return;
    
    const updatedGoals = goals.map((goal) =>
      goal.id === selectedGoal.id ? { ...goal, name, dateType, date } : goal
    );
    setGoals(updatedGoals);
    setSelectedGoal(null);
  };

  const handleDeleteGoal = () => {
    if (!selectedGoal) return;
    
    const updatedGoals = goals.filter((goal) => goal.id !== selectedGoal.id);
    setGoals(updatedGoals);
    setSelectedGoal(null);
  };

  const handleCreateNote = () => {
    const newNote: NoteType = {
      id: crypto.randomUUID(),
      content: '',
      height: 24,
      createdAt: new Date(),
    };
    setNotes(Array.isArray(notes) ? [...notes, newNote] : [newNote]);
  };

  const handleNoteChange = (id: string, content: string) => {
    if (!Array.isArray(notes)) return;
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, content } : note
    );
    setNotes(updatedNotes);
  };

  const handleNoteHeightChange = (id: string, height: number) => {
    if (!Array.isArray(notes)) return;
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, height } : note
    );
    setNotes(updatedNotes);
  };

  const handleDeleteNote = (id: string) => {
    if (!Array.isArray(notes)) return;
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const dontGoals = goals.filter(goal => goal.type === 'dont');
  const doGoals = goals.filter(goal => goal.type === 'do');

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-14 mb-6">
        <div className="flex items-center gap-6">
          <BackButton onClick={onBack} />
          <h1 className="text-2xl font-semibold text-gray-900">{area.name}</h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center gap-2 h-10 px-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none transition-colors"
          >
            <Pencil className="h-4 w-4" />
            Edit Area
          </button>
          <button
            onClick={() => setIsCreateGoalModalOpen(true)}
            className="flex items-center gap-2 h-10 px-4 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none transition-colors"
          >
            <Plus className="h-4 w-4" />
            Create Goal
          </button>
          <button
            className="flex items-center gap-2 h-10 px-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none transition-colors"
          >
            <Plus className="h-4 w-4" />
            Create Task/Habit
          </button>
          <button
            className="flex items-center gap-2 h-10 px-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none transition-colors"
          >
            <Eye className="h-4 w-4" />
            Completed Tasks
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Total Tasks/Habits Completed</span>
              <span className="text-2xl font-semibold text-gray-900">0</span>
            </div>
          </div>

          {Array.isArray(notes) && notes.map((note) => (
            <Note
              key={note.id}
              note={note}
              onChange={handleNoteChange}
              onHeightChange={handleNoteHeightChange}
              onDelete={handleDeleteNote}
            />
          ))}

          <button
            onClick={handleCreateNote}
            className="w-full py-3 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Note
          </button>
        </div>
        
        <div className="space-y-3">
          {doGoals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onClick={setSelectedGoal}
            />
          ))}
          {dontGoals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onClick={setSelectedGoal}
            />
          ))}
          {goals.length === 0 && (
            <p className="text-gray-500 text-center py-8">
              No goals created yet. Click the button above to create your first goal.
            </p>
          )}
        </div>
      </div>

      <EditAreaModal
        isOpen={isEditModalOpen}
        area={area}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditArea}
        onDelete={handleDeleteArea}
      />

      <CreateGoalModal
        isOpen={isCreateGoalModalOpen}
        onClose={() => setIsCreateGoalModalOpen(false)}
        onSubmit={handleCreateGoal}
      />

      {selectedGoal && (
        <EditGoalModal
          isOpen={!!selectedGoal}
          goal={selectedGoal}
          onClose={() => setSelectedGoal(null)}
          onSubmit={handleEditGoal}
          onDelete={handleDeleteGoal}
        />
      )}
    </div>
  );
}