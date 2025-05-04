import { useState, useEffect } from 'react';
import axios from 'axios';

const Tasks = () => {
  // State to hold the list of tasks
  const [tasks, setTasks] = useState([]);
  // State to hold the new task form data
  const [newTask, setNewTask] = useState({ name: '', description: '' });
  // State for error handling
  const [error, setError] = useState(null);

  // Fetch tasks from the API on component mount
  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await axios.get('/api/tasks');
        setTasks(response.data);
      } catch (err) {
        setError('Failed to load tasks');
      }
    }

    fetchTasks();
  }, []);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission to create a new task
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!newTask.name || !newTask.description) {
      setError('Both name and description are required');
      return;
    }

    try {
      const response = await axios.post('/api/tasks', newTask);
      setTasks((prev) => [...prev, response.data]); // Add the new task to the list
      setNewTask({ name: '', description: '' }); // Reset the form
      setError(null); // Clear any previous errors
    } catch (err) {
      setError('Failed to create task');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>

      {/* Display error if any */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Task Creation Form */}
      <form onSubmit={handleFormSubmit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="name" className="block font-semibold">Task Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newTask.name}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-semibold">Task Description</label>
          <textarea
            id="description"
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Task
        </button>
      </form>

      {/* Task List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Task List</h2>
        {tasks.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li key={task.id} className="p-4 border border-gray-200 rounded">
                <h3 className="text-lg font-semibold">{task.name}</h3>
                <p>{task.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Tasks;
