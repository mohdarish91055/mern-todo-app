import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";
import "../App.css";

const Login = () => {
  const [todo, setTodo] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchTodo();
  }, []);

  //get all todo
  const fetchTodo = async () => {
    try {
      const response = await api.get("api/todos");
      setTodo(response.data);
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };

  //add todo or update
  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`api/todos/${editId}`, { title });
        setTitle("");
        fetchTodo();
      } else {
        await api.post("api/todos", { title });
        setTitle("");
        fetchTodo();
      }
    } catch (err) {
      console.log(err);
    }
  };

  //mark complete or incomplete
  const handleToggleCompleted = async (id, completed) => {
    try {
      await api.put(`api/todos/${id}`, { completed: !completed });
      fetchTodo();
    } catch (err) {
      console.error(err);
    }
  };

  //delete
  const handleDelete = async (id) => {
    try {
      await api.delete(`api/todos/${id}`);
      fetchTodo();
    } catch (err) {
      console.log(err);
    }
  };

  //update
  const handleUpdate = async (todo) => {
    try {
      setTitle(todo.title);
      setEditId(todo._id);
    } catch (err) {
      console.log(err);
    }
  };

  //logout
  const handleLogout = async () => {
    const response = await api.post("api/auth/logout");
    localStorage.removeItem("user");
    navigate("/login");
    toast.success(response.data.message, {
      position: "top-center",
      autoClose: 1000,
    });
  };

  return (
    <div>
      <h1>TodoList</h1>
      <h3>Welcome, {user ? user.name : "Guest"}!</h3>
      <button onClick={handleLogout}>Logout</button>
      <br />
      <br />
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          placeholder="New Todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todo.map((todo) => (
          <li
            style={{ listStyleType: "decimal" }}
            className="listTodo"
            key={todo._id}
          >
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {todo.title}
            </span>
            <button
              className="mark"
              onClick={() => handleToggleCompleted(todo._id, todo.completed)}
            >
              {todo.completed ? "Incomplete" : "Complete"}
            </button>
            <button className="delete" onClick={() => handleDelete(todo._id)}>
              Delete
            </button>
            <button className="edit" onClick={() => handleUpdate(todo)}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Login;
