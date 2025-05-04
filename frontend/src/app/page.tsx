// src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';

type Task = {
  id: number;
  title: string;
  dueDate: string;
  isRecurring: boolean;
  recurrenceRule: string | null;
  completed: boolean;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/tasks') // backend endpoint
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error('Failed to fetch tasks:', err));
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4 text-black">My Tasks</h1>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-lg shadow p-4 flex items-center justify-between"
          >
            <div>
              <p className="text-lg font-semibold text-black">{task.title}</p>
              <p className="text-sm text-gray-500">
                Due: {new Date(task.dueDate).toLocaleString()}
              </p>
              {task.isRecurring && (
                <p className="text-sm text-blue-600">Recurring: {task.recurrenceRule}</p>
              )}
            </div>
            <span
              className={`text-sm font-medium px-2 py-1 rounded ${
                task.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {task.completed ? 'Completed' : 'Pending'}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
