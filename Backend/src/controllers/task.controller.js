import { Task } from "../models/Task.model.js";

// Create a new todo
const createTodo = async (req, res) => {
  try {
    const { name, completed } = req.body;
    const newTask = await Task.create({
      name,
      completed,
      user_Id: req.user._id,
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task", details: error.message });
  }
};

// Update an existing todo by ID
const updateTodo = async (req, res) => {
  try {
   
    const {id, name, completed } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, user_Id: req.user._id },
      { name, completed },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found or not authorized" });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task", details: error.message });
  }
};

// Get all todos for the user
const readAllTodo = async (req, res) => {
  try {
    const tasks = await Task.find({ user_Id: req.user._id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks", details: error.message });
  }
};

// Delete a todo by ID
const deleteTodo = async (req, res) => {
  try {
    // console.log("In deleteTodo")
    const { id } = req.params;
    // console.log(id)
    const deletedTask = await Task.findOneAndDelete({
      _id: id,
      user_Id: req.user._id,
    });

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found or not authorized" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task", details: error.message });
  }
};

export {
  createTodo,
  updateTodo,
  readAllTodo,
  deleteTodo,
};
