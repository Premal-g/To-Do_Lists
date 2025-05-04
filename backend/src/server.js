const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');  // Importing CORS for cross-origin requests
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Use CORS middleware to allow requests from frontend
app.use(cors());

// Set up Sequelize and connect to PostgreSQL database
const sequelize = new Sequelize('todo_apps', 'premal', '123', {
  host: 'localhost',
  dialect: 'postgres',
});

// Define the Task model
const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.DATE,
  },
  isRecurring: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  recurrenceRule: {
    type: DataTypes.STRING,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

// Sync Sequelize models
sequelize.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

// Route to get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Route to create a new task
app.post('/tasks', async (req, res) => {
  try {
    const { title, dueDate, isRecurring, recurrenceRule, completed } = req.body;
    // Ensure the input data is valid
    if (!title || !dueDate) {
      return res.status(400).json({ error: 'Title and Due Date are required' });
    }

    const newTask = await Task.create({
      title,
      dueDate,
      isRecurring,
      recurrenceRule,
      completed
    });

    res.status(201).json(newTask); // Return the created task as response
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Route to update a task
app.put('/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, dueDate, isRecurring, recurrenceRule, completed } = req.body;

    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    task.title = title || task.title;
    task.dueDate = dueDate || task.dueDate;
    task.isRecurring = isRecurring ?? task.isRecurring;
    task.recurrenceRule = recurrenceRule || task.recurrenceRule;
    task.completed = completed ?? task.completed;

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Route to delete a task
app.delete('/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await task.destroy();
    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
