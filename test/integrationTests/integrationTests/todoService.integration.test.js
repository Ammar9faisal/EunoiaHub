import { describe, expect, test, beforeAll, afterAll, vi } from 'vitest';
import { fetchUserAndTasks, addTask, removeTask, saveEdit } from '../../../src/services/todoService';
import { account, databases } from '../../../src/appwrite';
import { Query } from 'appwrite';

// Mock the account.get method to return a chosen user ID
vi.mock('../../src/appwrite', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    account: { 
      ...actual.account,
      get: vi.fn().mockResolvedValue({ $id: '67d7a3d30007a40db90b' }),
    },
  };
});

describe('todoService Integration Tests', () => {
  let userId = '67d7a3d30007a40db90b';
  let tasks = [];

  beforeAll(async () => {
    // Fetch user and tasks before running tests
    await fetchUserAndTasks(
      (id) => { userId = id; },
      (fetchedTasks) => { tasks = fetchedTasks; }
    );
  });

  test('fetchUserAndTasks fetches user and tasks', async () => {
    const setUserId = vi.fn();
    const setTasks = vi.fn();

    await fetchUserAndTasks(setUserId, setTasks);

    expect(setUserId).toHaveBeenCalledWith(userId);
    expect(setTasks).toHaveBeenCalledWith(tasks);
  });

  test('addTask adds a new task', async () => {
    const setTasks = vi.fn();
    const setNewTask = vi.fn();
    const newTask = 'New Task';

    await addTask(userId, newTask, tasks, setTasks, setNewTask);

    expect(setTasks).toHaveBeenCalledWith([...tasks, { userID: userId, description: newTask }]);
    expect(setNewTask).toHaveBeenCalledWith('');
  });

  test('removeTask removes a task', async () => {
    const setTasks = vi.fn();

    // Add a task to ensure there is something to remove
    const newTask = 'Task to be removed';
    await addTask(userId, newTask, tasks, setTasks, vi.fn());
    tasks.push({ userID: userId, description: newTask });

    const taskId = tasks[tasks.length - 1].$id;
    await removeTask(taskId, tasks, setTasks);

    // Wait for the removal to complete
    await new Promise(resolve => setTimeout(resolve, 1000));

    expect(setTasks).toHaveBeenCalledWith(tasks.filter((task) => task.$id !== taskId));
  });

  test('saveEdit updates a task', async () => {
    const setTasks = vi.fn();
    const setEditingIndex = vi.fn();
    const setEditingText = vi.fn();
    const editingText = 'Updated Task';

    // Add a task to ensure there is something to edit
    const newTask = 'Task to be edited';
    await addTask(userId, newTask, tasks, setTasks, vi.fn());
    tasks.push({ userID: userId, description: newTask });

    const taskIndex = tasks.length - 1;
    await saveEdit(taskIndex, tasks, setTasks, editingText, setEditingIndex, setEditingText);

    expect(setTasks).toHaveBeenCalledWith(tasks.map((t, i) => (i === taskIndex ? { ...t, description: editingText } : t)));
    expect(setEditingIndex).toHaveBeenCalledWith(null);
    expect(setEditingText).toHaveBeenCalledWith('');
  });

  afterAll(async () => {
    // Clean up tasks after running tests
    for (const task of tasks) {
      const response = await databases.listDocuments('todoLists', [
        Query.equal('userID', userId),
        Query.equal('description', task.description)
      ]);
      if (response.documents.length > 0) {
        await databases.deleteDocument('todoLists', response.documents[0].$id);
      }
    }
  });
});