import React, { useState } from 'react';
import { X, Infinity, Calendar, CalendarClock } from 'lucide-react';
import { Goal } from '../../types/goal';

interface EditGoalModalProps {
  isOpen: boolean;
  goal: Goal;
  onClose: () => void;
  onSubmit: (name: string, dateType: 'none' | 'target' | 'exact', date: string) => void;
  onDelete: () => void;
}

export default function EditGoalModal({ isOpen, goal, onClose, onSubmit, onDelete }: EditGoalModalProps) {
  const [name, setName] = useState(goal.name);
  const [dateType, setDateType] = useState<'none' | 'target' | 'exact'>(goal.dateType);
  const [date, setDate] = useState(goal.date);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Goal name is required');
      return;
    }

    if (dateType !== 'none' && !date.trim()) {
      setError('Date is required');
      return;
    }

    onSubmit(name.trim(), dateType, dateType === 'none' ? '' : date);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Edit Goal</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="goalName" className="block text-sm font-medium text-gray-700 mb-1">
              Goal Name
            </label>
            <input
              type="text"
              id="goalName"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter goal name"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Choose a Timeline
            </label>
            <div className="grid grid-cols-1 gap-3">
              <button
                type="button"
                onClick={() => {
                  setDateType('none');
                  setDate('');
                }}
                className={`p-4 border rounded-lg text-left transition-colors ${
                  dateType === 'none'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    dateType === 'none' ? 'bg-orange-100' : 'bg-gray-100'
                  }`}>
                    <Infinity className={`h-5 w-5 ${
                      dateType === 'none' ? 'text-orange-500' : 'text-gray-500'
                    }`} />
                  </div>
                  <div>
                    <div className={`font-medium ${
                      dateType === 'none' ? 'text-orange-700' : 'text-gray-700'
                    }`}>No Date</div>
                    <div className="text-sm text-gray-500">For continuous improvement</div>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setDateType('target')}
                className={`p-4 border rounded-lg text-left transition-colors ${
                  dateType === 'target'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    dateType === 'target' ? 'bg-orange-100' : 'bg-gray-100'
                  }`}>
                    <CalendarClock className={`h-5 w-5 ${
                      dateType === 'target' ? 'text-orange-500' : 'text-gray-500'
                    }`} />
                  </div>
                  <div>
                    <div className={`font-medium ${
                      dateType === 'target' ? 'text-orange-700' : 'text-gray-700'
                    }`}>Target Date</div>
                    <div className="text-sm text-gray-500">A general timeframe to aim for like 'By Summer' or '2026'</div>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setDateType('exact')}
                className={`p-4 border rounded-lg text-left transition-colors ${
                  dateType === 'exact'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    dateType === 'exact' ? 'bg-orange-100' : 'bg-gray-100'
                  }`}>
                    <Calendar className={`h-5 w-5 ${
                      dateType === 'exact' ? 'text-orange-500' : 'text-gray-500'
                    }`} />
                  </div>
                  <div>
                    <div className={`font-medium ${
                      dateType === 'exact' ? 'text-orange-700' : 'text-gray-700'
                    }`}>Exact Deadline</div>
                    <div className="text-sm text-gray-500">To be scheduled for a specific day in your calendar</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {dateType !== 'none' && (
            <div className="mb-6">
              {dateType === 'target' ? (
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 border-gray-300"
                  placeholder="Enter target date (e.g., By Summer, 2026)"
                />
              ) : (
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 border-gray-300"
                />
              )}
            </div>
          )}

          {error && <p className="mb-6 text-sm text-red-500">{error}</p>}

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onDelete}
              className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-600 rounded-md hover:bg-red-50 focus:outline-none transition-colors"
            >
              Delete Goal
            </button>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}