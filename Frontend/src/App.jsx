import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./constants.js";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoName, setNewTodoName] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [filter, setFilter] = useState("all"); // "all", "completed", "incomplete"
   const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/task/readalltodo`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(response.data || []);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleCreate = async () => {
    if (!newTodoName.trim()) return;
    try {
      await axios.post(
        `${BASE_URL}/task/createtodo`,
        { name: newTodoName, completed: false },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewTodoName("");
      fetchTodos();
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const handleUpdate = async (id, name, completed) => {
    try {
      await axios.put(
        `${BASE_URL}/task/updatetodo`,
        { id, name, completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingTodo(null);
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/task/deleteTodo/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "incomplete") return !todo.completed;
    return true;
  });

  const handleLogout = async()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("email")
    navigate("/login")
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return (<>
  <span className="logout" onClick={handleLogout}>logout</span>
   <div className="todo-container">
      <h2>{localStorage.getItem("email")?.split("@")[0]}'s Todos</h2>
     


      <div className="todo-create">
        <input
          type="text"
          placeholder="Enter todo name"
          value={newTodoName}
          onChange={(e) => setNewTodoName(e.target.value)}
        />
        <button onClick={handleCreate}>Add</button>
      </div>

      <div className="todo-filter">
        <button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>
          All
        </button>
        <button onClick={() => setFilter("completed")} className={filter === "completed" ? "active" : ""}>
          Completed
        </button>
        <button onClick={() => setFilter("incomplete")} className={filter === "incomplete" ? "active" : ""}>
          Incomplete
        </button>
      </div>

      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <li key={todo._id} className="todo-item">
            {editingTodo === todo._id ? (
              <>
                <input
                  type="text"
                  defaultValue={todo.name}
                  onChange={(e) => (todo.name = e.target.value)}
                />
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => (todo.completed = e.target.checked)}
                />
                <button onClick={() => handleUpdate(todo._id, todo.name, todo.completed)}>
                  Save
                </button>
                <button onClick={() => setEditingTodo(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span className={todo.completed ? "completed" : ""}>{todo.name}</span>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() =>
                    handleUpdate(todo._id, todo.name, !todo.completed)
                  }
                />
                <button onClick={() => setEditingTodo(todo._id)}>Edit</button>
                <button onClick={() => handleDelete(todo._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  </>
   
  );
};

export default App;
