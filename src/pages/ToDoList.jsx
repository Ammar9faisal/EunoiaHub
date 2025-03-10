import React, { useState, useEffect } from 'react';
import './ToDoList.css';
import db from '../database';
import { account } from '../appwrite';
import { Query } from 'appwrite';

const ToDoList = () => {
    const [tasks, setTasks] = useState([]);   //sets up the state for the tasks
    const [newTask, setNewTask] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingText, setEditingText] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {   //loads the users tasks from the database when the page loads
        const fetchUserAndTasks = async () => {
            try {
                const user = await account.get();
                setUserId(user.$id);
                const response = await db.todoLists.list([
                    Query.equal('userID', user.$id) // Query to get tasks belonging to the user
                ]);
                setTasks(response.documents);      //sets the tasks to the response from the database
            } catch (error) {
                console.error('Error fetching user or tasks:', error);
            }
        };

        fetchUserAndTasks();    //calls the function to fetch the user and tasks
    }, []);

    const addTask = async () => {   //adds a new task to the database
        if (newTask.trim()) {
            try {
                const response = await db.todoLists.create({  //creates a new task in the database
                    userID: userId,
                    description: newTask,
                });
                setTasks([...tasks, response]);
                setNewTask('');
            } catch (error) {  //logs an error if the task cannot be added
                console.error('Error adding task:', error);
            }
        }
    };

    const removeTask = async (taskId) => {  //removes a task from the database
        try {
            await db.todoLists.delete(taskId);  //deletes the task from the database
            setTasks(tasks.filter((task) => task.$id !== taskId)); //filters out the task that was deleted
        } catch (error) {
            console.error('Error removing task:', error);
        }
    };

    const startEditing = (index, task) => {  //starts editing a task
        setEditingIndex(index);
        setEditingText(task.description);
    };

    const saveEdit = async (index) => {   //saves the edited task
        const task = tasks[index];      //gets the task to be edited
        try {
            const response = await db.todoLists.update(task.$id, {  //updates the task in the database
                userID: task.userID,
                description: editingText,
            });
            const updatedTasks = tasks.map((t, i) => (i === index ? response : t)); //updates the task in the state
            setTasks(updatedTasks);
            setEditingIndex(null);
            setEditingText('');
        } catch (error) {
            console.error('Error updating task:', error);
        }
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
                        onChange={(e) => setNewTask(e.target.value)}  //updates the new task
                        placeholder="Add a new task"
                    />
                    <button className="todo-list-add" onClick={addTask}>+</button>
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
                                <span onClick={() => startEditing(index, task)}>{task.description}</span>
                            )}
                            {editingIndex === index ? (
                                <button className="todo-list-save-edit" onClick={() => saveEdit(index)}>✔</button>
                            ) : (
                                <button className="todo-list-remove" onClick={() => removeTask(task.$id)}>-</button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ToDoList;