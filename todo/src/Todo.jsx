import React, { useEffect, useState } from 'react';

const Todo = () => {
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState('');
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newFirst");

  useEffect(() => {
    const getTask = localStorage.getItem("task");
    try {
      const parsed = JSON.parse(getTask);
      if (Array.isArray(parsed)) {
        setTask(parsed);
      } else {
        setTask([]);
      }
    } catch {
      setTask([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(task));
  }, [task]);

  const addTask = () => {
    try {
      if (!newTask.trim()) {
        throw new Error("Must have some input");
      }

      const AddTask = {
        id: Date.now() + Math.random(),
        Todo: newTask.trim(),
        completed: false,
      };

      setTask([AddTask, ...task]);
      setNewTask('');
      setError('');
    } catch (err) {
      console.error("Error adding Todo:", err);
      setError(err instanceof Error ? err.message : "Error occurred");
    }
  };

  const removeTask = (id) => {
    try {
      const updatedTask = task.filter((t) => t.id !== id);
      setTask(updatedTask);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error occurred");
    }
  };

  const toggleComplete = (id) => {
    const updated = task.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTask(updated);
  };

  const filteredTask = task.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  const sortedTask = [...filteredTask].sort((a, b) =>
    sortBy === "oldFirst" ? a.id - b.id : b.id - a.id
  );

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center" style={{ color: '#74000b' }}>Todo App</h1>

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a task"
          className="flex-1 px-4 py-2 border border-gray-300 rounded"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 text-white rounded"
          style={{ backgroundColor: '#74000b' }}
        >
          Add
        </button>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div className="flex justify-between items-center mt-4">
        <div className="space-x-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-2 py-1 rounded text-white ${filter === "all" ? 'bg-[#74000b]' : 'bg-gray-200 text-black'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-2 py-1 rounded text-white ${filter === "completed" ? 'bg-[#74000b]' : 'bg-gray-200 text-black'}`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-2 py-1 rounded text-white ${filter === "pending" ? 'bg-[#74000b]' : 'bg-gray-200 text-black'}`}
          >
            Pending
          </button>
        </div>
        <select
          onChange={(e) => setSortBy(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="newFirst">Newest First</option>
          <option value="oldFirst">Oldest First</option>
        </select>
      </div>

      <ul className="mt-6 space-y-2 text-2xl">
        {sortedTask.length === 0 && (
          <li className="text-gray-500 text-center">No tasks available</li>
        )}
        {sortedTask.map((t) => (
          <li
            key={t.id}
            className={`flex justify-between items-center p-3 rounded shadow ${
              t.completed ? "bg-red-500 line-through text-yellow-500" : "bg-white"
            }`}
          >
            <span
              onClick={() => toggleComplete(t.id)}
              className="cursor-pointer flex-1"
            >
              {t.Todo}
            </span>
            <button
              onClick={() => removeTask(t.id)}
              className="ml-3 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
