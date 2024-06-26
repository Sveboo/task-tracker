import React, { useState, useEffect } from "react";
import "./styles.css";

const App = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  const [newTaskNames, setNewTaskNames] = useState({
    todo: "",
    inProgress: "",
    done: "",
  });

  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (column) => {
    const taskName = newTaskNames[column].trim();
    if (taskName !== "") {
      const newTask = { id: Date.now(), name: taskName };
      setTasks((prevTasks) => ({
        ...prevTasks,
        [column]: [...prevTasks[column], newTask],
      }));
      setNewTaskNames((prevNewTaskNames) => ({
        ...prevNewTaskNames,
        [column]: "",
      }));
    }
  };

  const moveTask = (taskId, sourceColumn, destinationColumn) => {
    const updatedTasks = { ...tasks };
    const taskToMove = updatedTasks[sourceColumn].find(
      (task) => task.id === taskId
    );
    updatedTasks[sourceColumn] = updatedTasks[sourceColumn].filter(
      (task) => task.id !== taskId
    );
    updatedTasks[destinationColumn] = [
      ...updatedTasks[destinationColumn],
      taskToMove,
    ];
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId, column) => {
    const updatedTasks = { ...tasks };
    updatedTasks[column] = updatedTasks[column].filter(
      (task) => task.id !== taskId
    );
    setTasks(updatedTasks);
  };

  const editTask = (taskId, columnName) => {
    setEditTaskId(taskId);
    const taskToEdit = tasks[columnName].find((task) => task.id === taskId);
    setEditTaskText(taskToEdit.name);
  };

  const saveEditedTask = (taskId, columnName) => {
    const updatedTasks = { ...tasks };
    updatedTasks[columnName] = updatedTasks[columnName].map((task) => {
      if (task.id === taskId) {
        return { ...task, name: editTaskText };
      }
      return task;
    });
    setTasks(updatedTasks);
    setEditTaskId(null);
    setEditTaskText("");
  };

  return (
    <div className="task-tracker">
      <div className="row">
        <div className="column todo">
          <h2>Todo</h2>
          <div className="add-task">
            <input
              className="text-input"
              type="text"
              placeholder="Enter task"
              value={newTaskNames.todo}
              onChange={(e) =>
                setNewTaskNames({ ...newTaskNames, todo: e.target.value })
              }
            />
            <button className="add-button" onClick={() => addTask("todo")}>
              Add task
            </button>
          </div>
          {tasks.todo.map((task) => (
            <div key={task.id} className="task-item">
              {editTaskId === task.id ? (
                <>
                  <input
                    className="text-input"
                    type="text"
                    value={editTaskText}
                    onChange={(e) => setEditTaskText(e.target.value)}
                  />
                  <button onClick={() => saveEditedTask(task.id, "todo")}>
                    &#10003;
                  </button>
                </>
              ) : (
                <>
                  <span>{task.name}</span>
                  <button onClick={() => editTask(task.id, "todo")}>
                    &#9998;
                  </button>
                  <button
                    onClick={() => moveTask(task.id, "todo", "inProgress")}
                  >
                    &rarr;
                  </button>
                  <button onClick={() => deleteTask(task.id, "todo")}>
                    &times;
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="column inProgress">
          <h2>In Progress</h2>
          <div className="add-task">
            <input
              className="text-input"
              type="text"
              placeholder="Enter task"
              value={newTaskNames.inProgress}
              onChange={(e) =>
                setNewTaskNames({ ...newTaskNames, inProgress: e.target.value })
              }
            />
            <button
              className="add-button"
              onClick={() => addTask("inProgress")}
            >
              Add task
            </button>
          </div>
          {tasks.inProgress.map((task) => (
            <div key={task.id} className="task-item">
              {editTaskId === task.id ? (
                <>
                  <input
                    className="text-input"
                    type="text"
                    value={editTaskText}
                    onChange={(e) => setEditTaskText(e.target.value)}
                  />
                  <button onClick={() => saveEditedTask(task.id, "inProgress")}>
                    &#10003;
                  </button>
                </>
              ) : (
                <>
                  <span>{task.name}</span>
                  <button onClick={() => editTask(task.id, "inProgress")}>
                    &#9998;
                  </button>
                  <button
                    onClick={() => moveTask(task.id, "inProgress", "todo")}
                  >
                    &larr;
                  </button>
                  <button
                    onClick={() => moveTask(task.id, "inProgress", "done")}
                  >
                    &rarr;
                  </button>
                  <button onClick={() => deleteTask(task.id, "inProgress")}>
                    &times;
                  </button>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="column done">
          <h2>Done</h2>
          <div className="add-task">
            <input
              className="text-input"
              type="text"
              placeholder="Enter task"
              value={newTaskNames.done}
              onChange={(e) =>
                setNewTaskNames({ ...newTaskNames, done: e.target.value })
              }
            />
            <button className="add-button" onClick={() => addTask("done")}>
              Add task
            </button>
          </div>
          {tasks.done.map((task) => (
            <div key={task.id} className="task-item">
              {editTaskId === task.id ? (
                <>
                  <input
                    className="text-input"
                    type="text"
                    value={editTaskText}
                    onChange={(e) => setEditTaskText(e.target.value)}
                  />
                  <button onClick={() => saveEditedTask(task.id, "done")}>
                    &#10003;
                  </button>
                </>
              ) : (
                <>
                  <span>{task.name}</span>
                  <button onClick={() => editTask(task.id, "done")}>
                    &#9998;
                  </button>
                  <button
                    onClick={() => moveTask(task.id, "done", "inProgress")}
                  >
                    &larr;
                  </button>
                  <button onClick={() => deleteTask(task.id, "done")}>
                    &times;
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
