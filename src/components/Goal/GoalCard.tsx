import React from 'react';
import { Trophy, Scissors } from 'lucide-react';
import { Goal } from '../../types/goal';

interface GoalCardProps {
  goal: Goal;
  onClick: (goal: Goal) => void;
}

export default function GoalCard({ goal, onClick }: GoalCardProps) {
  const formatDate = (date: string, type: 'none' | 'target' | 'exact') => {
    if (type === 'none') {
      return '';
    }
    if (type === 'target') {
      return date;
    }
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const Icon = goal.type === 'do' ? Trophy : Scissors;

  return (
    <button
      onClick={() => onClick(goal)}
      className="w-full bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-left"
    >
      <div className="flex items-center gap-4">
        <Icon className="h-7 w-7 text-orange-500" />
        <div>
          <h3 className="text-lg font-medium text-gray-900">{goal.name}</h3>
          {goal.type === 'do' && goal.dateType !== 'none' && (
            <p className="text-sm text-gray-500">{formatDate(goal.date, goal.dateType)}</p>
          )}
        </div>
      </div>
    </button>
  );
}