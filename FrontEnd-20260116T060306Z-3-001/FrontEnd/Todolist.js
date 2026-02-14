import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Todolist.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignJustify, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FaUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

const ToDoList = () => {
  const navigate = useNavigate();

  // เช็ค user ก่อน parse JSON
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const userId = user?.id || null;

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    start_date: "",
    end_date: "",
    note: "",
  });
  const [message, setMessage] = useState("");
  const taskListRef = useRef(null);

  useEffect(() => {
    if (taskListRef.current) {
      taskListRef.current.scrollTop = 0;
    }
  }, [tasks]);

  useEffect(() => {
    const preventBack = () => {
      window.history.pushState(null, null, window.location.href); 
    };

    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", preventBack);

    return () => {
      window.removeEventListener("popstate", preventBack);
    };
  }, []);

  const fetchTasks = async () => {
    if (!userId) {
      setMessage("Error: User not found. Please log in again.");
      return;
    }
    try {
      const res = await axios.get(`http://localhost:5000/tasks/${userId}`);
      if (res.data.success) {
        console.log(res.data.tasks); // ตรวจสอบข้อมูลที่ได้รับจาก API
        setTasks(res.data.tasks);
      } else {
        console.error("Failed to fetch tasks");
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!userId) {
      setMessage("Error: User not found. Please log in again.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/tasks", {
        user_id: userId,
        ...newTask,
      });
      if (res.data.success) {
        setMessage("Task added successfully!");
        setNewTask({ title: "", start_date: "", end_date: "", note: "" });
        fetchTasks(); 
      }
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/tasks/${id}`);
      if (res.data.success) {
        setMessage("Task deleted successfully!");
        fetchTasks(); 
      }
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleViewAllTasks = () => {
    navigate("/tasklist");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const logout = () => {
    navigate("/");
  };

  useEffect(() => {
    fetchTasks(); 
  }, [userId]);

  
  return (
    <div className="superbox">
      <div className="containertodo">
        <div className="profile">
          <h2 className="pf-icon">
            <FaUserCircle /> {user?.username}
          </h2>
        </div>
        <div className="form-section">
          <form onSubmit={handleAddTask}>
            <div className="form-row">
              <div className="form-field">
                <label>Title:</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-field">
                <label>Start Date:</label>
                <input
                  type="date"
                  value={newTask.start_date}
                  onChange={(e) =>
                    setNewTask({ ...newTask, start_date: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-field">
                <label>End Date:</label>
                <input
                  type="date"
                  value={newTask.end_date}
                  onChange={(e) =>
                    setNewTask({ ...newTask, end_date: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-field">
                <label>Note:</label>
                <input
                  type="text"
                  value={newTask.note}
                  onChange={(e) =>
                    setNewTask({ ...newTask, note: e.target.value })
                  }
                />
              </div>
            </div>
            <button className="add" type="submit">
              Add Task
            </button>
          </form>

          <nav className="nav-bar">
            <button className="view" type="button" onClick={handleViewAllTasks}>
              ดูงานทั้งหมด
            </button>
          </nav>
        </div>

        {/* Task List Section */}
        <div className="list">
          <div className="text">
            <h3>Your Tasks</h3>
          </div>
          {tasks.length === 0 ? (
            <p className="not_found">No tasks found</p>
          ) : (
            <ul className="todo-list" ref={taskListRef}>
              {tasks.map((task) => (
                <li key={task.id} className="to-item">
                  <div>
                    <span>Title :</span> {task.title}
                  </div>

                  <div>
                    <span>Start Date :</span> {formatDate(task.start_date)}
                  </div>

                  <div>
                    <span>End Date :</span> {formatDate(task.end_date)}
                  </div>

                  <div>
                    <span>Note :</span> {task.note}
                  </div>

                  <button
                    className="delete-btntodo"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="out" type="button" onClick={logout}>
          {" "}
          <BiLogOut />{" "}
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
