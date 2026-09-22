import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (!input.trim()) return;

    const newTask = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setInput("");
  };

  const completeTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  };

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingCount = tasks.length - completedCount;

  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="app">

      {/* Background decoration */}
      <div className="glow glow-one"></div>
      <div className="glow glow-two"></div>

      <main className="todo-container">

        {/* Header */}
        <header className="header">
          <div className="logo">
            <span className="logo-icon">✓</span>
            <span>FocusFlow</span>
          </div>

          <h1>To-Do List</h1>

          <p className="subtitle">
            Organize your day. Accomplish your goals.
          </p>
        </header>

        {/* Add Task */}
        <section className="input-section">

          <div className="input-wrapper">
            <span className="input-icon">＋</span>

            <input
              type="text"
              placeholder="What needs to be done?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTask();
                }
              }}
            />
          </div>

          <button
            className="add-btn"
            onClick={addTask}
          >
            <span>＋</span>
            Add Task
          </button>

        </section>

        {/* Progress */}
        {tasks.length > 0 && (
          <section className="progress-section">

            <div className="progress-info">
              <span>Today's Progress</span>
              <strong>{progress}%</strong>
            </div>

            <div className="progress-track">
              <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

          </section>
        )}

        {/* Tasks */}
        <section className="task-list">

          {tasks.length === 0 ? (
            <div className="empty">

              <div className="empty-icon">
                ✓
              </div>

              <h3>No tasks yet</h3>

              <p>
                Add your first task and start getting things done.
              </p>

            </div>
          ) : (
            tasks.map((task) => (
              <article
                className={`task ${
                  task.completed ? "completed" : ""
                }`}
                key={task.id}
              >

                <div className="task-left">

                  <button
                    className="check-circle"
                    onClick={() =>
                      completeTask(task.id)
                    }
                    aria-label="Toggle task"
                  >
                    {task.completed && "✓"}
                  </button>

                  <span className="task-text">
                    {task.text}
                  </span>

                </div>

                <div className="task-actions">

                  <button
                    className="complete-btn"
                    onClick={() =>
                      completeTask(task.id)
                    }
                  >
                    <span>✓</span>

                    {task.completed
                      ? "Completed"
                      : "Complete"}
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteTask(task.id)
                    }
                  >
                    <span>×</span>
                    Delete
                  </button>

                </div>

              </article>
            ))
          )}

        </section>

        {/* Footer */}
        <footer className="footer">

          <div className="total">
            <span>Total Tasks</span>
            <strong>{tasks.length}</strong>
          </div>

          <div className="stats">

            <div className="stat pending">
              <span className="stat-dot"></span>
              <span>{pendingCount} Pending</span>
            </div>

            <div className="stat completed-stat">
              <span className="stat-check">✓</span>
              <span>{completedCount} Completed</span>
            </div>

          </div>

        </footer>

      </main>
    </div>
  );
}

export default App;