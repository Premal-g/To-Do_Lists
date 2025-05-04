// components/TaskItem.js

import React from 'react';

const TaskItem = ({ task, onDelete, onEdit }) => {
  return (
    <div className="border p-4 rounded mb-2 shadow">
      <h3 className="text-xl font-semibold">{task.title}</h3>
      <p>{task.description}</p>
      <div className="mt-2 flex gap-2">
        <button onClick={() => onEdit(task)} className="bg-blue-500 text-white px-3 py-1 rounded">
          Edit
        </button>
        <button onClick={() => onDelete(task.id)} className="bg-red-500 text-white px-3 py-1 rounded">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
