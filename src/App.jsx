import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [inputText, setInputText] = useState('');
  const [inputDeadline, setInputDeadline] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      text: inputText.trim(),
      deadline: inputDeadline || null,
      isCompleted: false,
      createdAt: new Date().toISOString()
    };

    setTasks([...tasks, newTask]);
    setInputText('');
    setInputDeadline('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const isOverdue = (deadline) => {
    if (!deadline) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Parse the date (YYYY-MM-DD input format forms midnight UTC normally, this safely compares them)
    const dlParsed = new Date(deadline + "T00:00:00");
    return dlParsed < today;
  };

  const pendingTasks = [...tasks].filter(t => !t.isCompleted).sort((a, b) => {
    if (a.deadline && b.deadline) return new Date(a.deadline) - new Date(b.deadline);
    if (a.deadline) return -1;
    if (b.deadline) return 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const completedTasks = [...tasks].filter(t => t.isCompleted).sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>NOTE APP</h1>
        <p>SYS_TERMINAL // SECURE_LOG</p>
      </header>

      <main className="main-content">
        <form className="task-form card" onSubmit={addTask}>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="ENTER DIRECTIVE..." 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            {/* Changed from datetime-local to date */}
            <input 
              type="date" 
              value={inputDeadline}
              onChange={(e) => setInputDeadline(e.target.value)}
            />
          </div>
          <button type="submit" className="add-btn">EXECUTE_ADD // </button>
        </form>

        <section className="task-list">
          <h2 className="section-title">PENDING</h2>
          {pendingTasks.length === 0 ? (
            <div className="empty-state">NO PENDING TASKS</div>
          ) : (
            pendingTasks.map(task => (
              <div 
                key={task.id} 
                className={`task-item card ${isOverdue(task.deadline) ? 'overdue' : ''}`}
              >
                <div className="task-content" onClick={() => toggleComplete(task.id)}>
                  <div className="checkbox"></div>
                  <div className="text-content">
                    <p className="task-text">{task.text}</p>
                    {task.deadline && (
                      <span className="task-deadline">
                        DUE: {task.deadline}
                        {isOverdue(task.deadline) && ' [! OVERDUE]'}
                      </span>
                    )}
                  </div>
                </div>
                {/* Delete is allowed in pending */}
                <button className="del-btn" onClick={() => deleteTask(task.id)}>
                  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            ))
          )}

          <h2 className="section-title mt-2">COMPLETED</h2>
          {completedTasks.length === 0 ? (
            <div className="empty-state">NO COMPLETED TASKS</div>
          ) : (
            completedTasks.map(task => (
              <div 
                key={task.id} 
                className="task-item card completed"
              >
                <div className="task-content" onClick={() => toggleComplete(task.id)}>
                  <div className="checkbox checked">✓</div>
                  <div className="text-content">
                    <p className="task-text">{task.text}</p>
                  </div>
                </div>
                {/* Delete button removed for completed items */}
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
