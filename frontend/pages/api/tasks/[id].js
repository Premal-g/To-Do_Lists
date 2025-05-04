// pages/api/tasks/[id].js
const tasks = [
    { id: 1, name: 'Task 1', description: 'Description for Task 1' },
    { id: 2, name: 'Task 2', description: 'Description for Task 2' },
    // Add more tasks as needed
  ];
  
  export default function handler(req, res) {
    const { id } = req.query;
  
    // Find task by ID
    const task = tasks.find(t => t.id === parseInt(id));
  
    if (req.method === 'GET') {
      if (task) {
        return res.status(200).json(task); // Return task if found
      } else {
        return res.status(404).json({ error: 'Task not found' }); // Task not found
      }
    }
  
    if (req.method === 'PUT') {
      if (task) {
        // Update the task (you can update properties here)
        task.name = req.body.name || task.name;
        task.description = req.body.description || task.description;
        return res.status(200).json(task); // Return updated task
      } else {
        return res.status(404).json({ error: 'Task not found' }); // Task not found
      }
    }
  
    if (req.method === 'DELETE') {
      const index = tasks.findIndex(t => t.id === parseInt(id));
      if (index !== -1) {
        tasks.splice(index, 1); // Remove task from array
        return res.status(204).end(); // Successfully deleted, no content to return
      } else {
        return res.status(404).json({ error: 'Task not found' }); // Task not found
      }
    }
  
    return res.status(405).end(); // Method Not Allowed
  }
  