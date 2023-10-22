import { useEffect, useState } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const [taskText, setInputTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const handleAddBtn = () => {
    if (taskText.trim() !== '') {
      const updatedTasks = [...tasks, { name: taskText, completed: false }];
      setTasks(updatedTasks);
      saveTasksToLocalStorage(updatedTasks);
      setInputTask('');
    }
  };

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      handleAddBtn();
    }
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const handleCheck = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  return (
    <div className="container">
      <div className="content">
        <div className="center">
          <h1>Taskist</h1>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Task
          </span>
          <input
            value={taskText}
            onChange={(e) => setInputTask(e.target.value)}
            type="text"
            className="form-control"
            placeholder="new task..."
            onKeyDown={handleEnterKey}
          />
          <button onClick={handleAddBtn} className="btn btn-outline-primary">
            Add
          </button>
        </div>
        <div>
          <ul className="list-group">
            {tasks.map((task, index) => (
              <li key={index} className="list-group-item">
                <div className="flex-container">
                  <div>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleCheck(index)}
                    />
                  </div>
                  <div style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                    {task.name}
                  </div>
                  <div>
                    <button onClick={() => handleDelete(index)} className="btn btn-outline-danger">
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
