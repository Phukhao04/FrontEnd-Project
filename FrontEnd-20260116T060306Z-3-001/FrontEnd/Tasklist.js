import React, { useEffect, useState } from "react";
import "./Tasklist.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();
  const [newTaskDetails, setNewTaskDetails] = useState({
    title: "",
    start_date: "",
    end_date: "",
    note: "",
  });

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user ? user.id : null;

    if (!userId) {
      alert("Please log in.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/tasks/${userId}`);
      const data = await response.json();
      if (data.success) {
        setTasks(data.tasks);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  const deleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const response = await fetch(`http://localhost:5000/tasks/${id}`, {
          method: "DELETE",
        });
        const result = await response.json();
        alert(result.message);
        loadTasks();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const startEditing = (task) => {
    console.log("Editing Task:", task);
    setEditingTask(task);
    setNewTaskDetails({
      title: task.title,
      start_date: task.start_date,
      end_date: task.end_date,
      note: task.note || "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTaskDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const saveTask = async () => {
    if (!newTaskDetails.title || !newTaskDetails.start_date || !newTaskDetails.end_date) {
      alert("Please provide complete task details.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/tasks/${editingTask.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTaskDetails),
      });
      const result = await response.json();
      alert(result.message);
      loadTasks();
      setEditingTask(null);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const back = () => {
    navigate("/Todolist");
  };

  return (
    <div className="supertask">
    <div className="containertask">

      <div className="back" type= "button" onClick={back}> <IoArrowBackCircle /> </div>
      
      <h1 className="Hola">TASK LIST</h1>

      {editingTask && (
        <nav className="edit-nav">
          <h2>Edit Task</h2>
          <div>
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={newTaskDetails.title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Start Date</label>
            <input
              type="date"
              name="start_date"
              value={newTaskDetails.start_date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>End Date</label>
            <input
              type="date"
              name="end_date"
              value={newTaskDetails.end_date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Note</label>
            <textarea
              name="note"
              value={newTaskDetails.note}
              onChange={handleInputChange}
            />
          </div>
          <div className="task-actions">
            <button type="button" onClick={saveTask}>
              Save Changes
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setEditingTask(null)}
            >
              Cancel
            </button>
          </div>
        </nav>
      )}

      {tasks.length === 0 ? (
        <p>No tasks added.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <div><strong>Title:</strong> {task.title}</div>
              <div><strong>Start Date:</strong> {formatDate(task.start_date)}</div>
              <div><strong>End Date:</strong> {formatDate(task.end_date)}</div>
              <div><strong>Note:</strong> {task.note}</div>
              <div className="task-actions">
                <button className="edit-btn" onClick={() => startEditing(task)}>
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
                <button className="delete-btntask" onClick={() => deleteTask(task.id)}>
                  <FontAwesomeIcon icon={faTrashAlt} /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
};

export default TaskList;
