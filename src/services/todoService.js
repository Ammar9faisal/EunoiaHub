import db from '../database';
import { account } from '../appwrite';
import { Query } from 'appwrite';

export const fetchUserAndTasks = async (setUserId, setTasks, dbInstance = db) => {
    try {
        const user = await account.get();
        setUserId(user.$id);
        const response = await dbInstance.todoLists.list([
            Query.equal('userID', user.$id) // Query to get tasks belonging to the user
        ]);
        setTasks(response.documents); //sets the tasks to the response from the database
    } catch (error) {
        console.error('Error fetching user or tasks:', error);
    }
};

export const addTask = async (userId, newTask, tasks, setTasks, setNewTask, dbInstance = db) => {
    if (newTask.trim()) {
        try {
            const response = await dbInstance.todoLists.create({
                userID: userId,
                description: newTask,
            });
            setTasks([...tasks, response]);
            setNewTask('');
        } catch (error) {
            console.error('Error adding task:', error); //logs an error if the task cannot be added
        }
    }
};

export const removeTask = async (taskId, tasks, setTasks, dbInstance = db) => {
    try {
        await dbInstance.todoLists.delete(taskId); //deletes the task from the database
        setTasks(tasks.filter((task) => task.$id !== taskId)); //filters out the task that was deleted
    } catch (error) {
        console.error('Error removing task:', error);
    }
};

export const startEditing = (index, task, setEditingIndex, setEditingText) => {
    setEditingIndex(index);
    setEditingText(task.description);
};

export const saveEdit = async (index, tasks, setTasks, editingText, setEditingIndex, setEditingText, dbInstance = db) => {
    const task = tasks[index]; //gets the task to be edited
    try {
        const response = await dbInstance.todoLists.update(task.$id, {
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