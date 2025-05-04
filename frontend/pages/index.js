// pages/api/tasks/index.js

// Example in-memory tasks array
let tasks = [
    { id: 1, name: 'Task 1', description: 'Description for Task 1' },
    { id: 2, name: 'Task 2', description: 'Description for Task 2' },
    // More tasks can be added here
  ];
  
  export default function handler(req, res) {
    // Handle GET request to fetch all tasks
    if (req.method === 'GET') {
      return res.status(200).json(tasks); // Return all tasks
    }
  
    // Handle POST request to create a new task
    if (req.method === 'POST') {
      const { name, description } = req.body;
  
      // Simple validation to ensure name and description are provided
      if (!name || !description) {
        return res.status(400).json({ error: 'Name and description are required' });
      }
  
      // Create a new task with an auto-incremented ID
      const newTask = {
        id: tasks.length + 1, // Auto-incrementing ID
        name,
        description,
      };
  
      tasks.push(newTask); // Add the new task to the tasks array
      return res.status(201).json(newTask); // Respond with the created task and a 201 status
    }
  
    // If the method is not GET or POST, return Method Not Allowed (405)
    return res.status(405).end();
  }
  