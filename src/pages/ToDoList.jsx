import React, { useState } from 'react';
import './ToDoList.css';

const ToDoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingText, setEditingText] = useState('');

    const addTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, newTask]);
            setNewTask('');
        }
    };

    const removeTask = (index) => {
        const updatedTasks = tasks.filter((task, i) => i !== index);
        setTasks(updatedTasks);
    };

    const startEditing = (index, task) => {
        setEditingIndex(index);
        setEditingText(task);
    };

    const saveEdit = (index) => {
        const updatedTasks = tasks.map((task, i) => (i === index ? editingText : task));
        setTasks(updatedTasks);
        setEditingIndex(null);
        setEditingText('');
    };

    return (
        <div className='todo-list'>
            <div className='to-do-container'>
                <h1 className='todo-list-title'>To-Do List</h1>
                <div className='todo-list-input-container'>
                    <input 
                        className="todo-list-input"
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Add a new task"
                    />
                    <button className="todo-list-add" onClick={addTask}>+</button>
                </div>
                <ul className="todo-list-items">
                    {tasks.map((task, index) => (
                        <li className="todo-list-item" key={index}>
                            {editingIndex === index ? (
                                <input
                                    type="text"
                                    value={editingText}
                                    onChange={(e) => setEditingText(e.target.value)}
                                />
                            ) : (
                                <span onClick={() => startEditing(index, task)}>{task}</span>
                            )}
                            {editingIndex === index ? (
                                <button onClick={() => saveEdit(index)}>✔️</button>
                            ) : (
                                <button className="todo-list-remove" onClick={() => removeTask(index)}>-</button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ToDoList;
