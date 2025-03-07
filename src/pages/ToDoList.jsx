import React, { useState, useEffect } from 'react';
import './ToDoList.css';
import { fetchUserAndTasks, addTask, removeTask, startEditing, saveEdit } from '../services/todoService';

const ToDoList = () => {
    const [tasks, setTasks] = useState([]);   //sets up the state for the tasks
    const [newTask, setNewTask] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingText, setEditingText] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {   //loads the users tasks from the database when the page loads
        fetchUserAndTasks(setUserId, setTasks);    //calls the function to fetch the user and tasks
    }, []);

    return (
        <div className='todo-list'>
            <div className='to-do-container'>
                <h1 className='todo-list-title'>To-Do List</h1>
                <div className='todo-list-input-container'>
                    <input 
                        className="todo-list-input"
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}  //updates the new task
                        placeholder="Add a new task"
                    />
                    <button className="todo-list-add" onClick={() => addTask(userId, newTask, tasks, setTasks, setNewTask)}>+</button>
                </div>
                <ul className="todo-list-items">
                    {tasks.map((task, index) => (
                        <li className="todo-list-item" key={task.$id}>
                            {editingIndex === index ? (
                                <input   //allows the user to edit the task
                                    type="text"
                                    value={editingText}
                                    onChange={(e) => setEditingText(e.target.value)}
                                    className="todo-list-edit-input"
                                />
                            ) : (
                                <span onClick={() => startEditing(index, task, setEditingIndex, setEditingText)}>{task.description}</span>
                            )}
                            {editingIndex === index ? (
                                <button className="todo-list-save-edit" onClick={() => saveEdit(index, tasks, setTasks, editingText, setEditingIndex, setEditingText)}>✔</button>
                            ) : (
                                <button className="todo-list-remove" onClick={() => removeTask(task.$id, tasks, setTasks)}>-</button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ToDoList;