// pages/api/tasks/index.js

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
      
      // Simple validation
      if (!name || !description) {
        return res.status(400).json({ error: 'Name and description are required' });
      }
  
      // Create a new task with a unique ID
      const newTask = {
        id: tasks.length + 1, // Auto-incrementing ID
        name,
        description,
      };
      
      tasks.push(newTask); // Add the new task to the tasks array
      return res.status(201).json(newTask); // Return the created task with a 201 status
    }
  
    // If the method is neither GET nor POST, return 405 (Method Not Allowed)
    return res.status(405).end();
  }
  