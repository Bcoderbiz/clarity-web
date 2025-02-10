import React, { useState } from 'react';
import { X, Infinity, Calendar, CalendarClock, Trophy, Scissors } from 'lucide-react';

interface CreateGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, type: 'do' | 'dont', dateType: 'none' | 'target' | 'exact', date: string) => void;
}

export default function CreateGoalModal({ isOpen, onClose, onSubmit }: CreateGoalModalProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState<'do' | 'dont'>('do');
  const [dateType, setDateType] = useState<'none' | 'target' | 'exact'>('none');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Goal name is required');
      return;
    }

    if (type === 'do' && dateType !== 'none' && !date.trim()) {
      setError('Date is required');
      return;
    }

    onSubmit(name.trim(), type, type === 'dont' ? 'none' : dateType, type === 'dont' ? '' : date);
    setName('');
    setDate('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Create New Goal</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What type of goal is this?
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setType('do')}
                className={`p-4 border rounded-lg text-left transition-colors ${
                  type === 'do'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    type === 'do' ? 'bg-orange-100' : 'bg-gray-100'
                  }`}>
                    <Trophy className={`h-5 w-5 ${
                      type === 'do' ? 'text-orange-500' : 'text-gray-500'
                    }`} />
                  </div>
                  <div>
                    <div className={`font-medium ${
                      type === 'do' ? 'text-orange-700' : 'text-gray-700'
                    }`}>Do Goal</div>
                    <div className="text-sm text-gray-500">Adding something positive to your life</div>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setType('dont');
                  setDateType('none');
                  setDate('');
                }}
                className={`p-4 border rounded-lg text-left transition-colors ${
                  type === 'dont'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    type === 'dont' ? 'bg-orange-100' : 'bg-gray-100'
                  }`}>
                    <Scissors className={`h-5 w-5 ${
                      type === 'dont' ? 'text-orange-500' : 'text-gray-500'
                    }`} />
                  </div>
                  <div>
                    <div className={`font-medium ${
                      type === 'dont' ? 'text-orange-700' : 'text-gray-700'
                    }`}>Don't Goal</div>
                    <div className="text-sm text-gray-500">Removing something negative from your life</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

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

          {type === 'do' && (
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
          )}

          {type === 'do' && dateType !== 'none' && (
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

          <div className="flex justify-end gap-3">
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
              Create Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}