import { describe, expect, test, vi } from 'vitest';
import { fetchUserAndTasks, addTask, removeTask, startEditing, saveEdit } from '../../src/services/todoService'; 
import { account } from '../../src/appwrite'; 

// Mock the database and account modules
vi.mock('../../src/database', () => ({
    todoLists: {
        list: vi.fn(),
        create: vi.fn(),
        delete: vi.fn(),
        update: vi.fn(),
    },
}));

vi.mock('../../src/appwrite', () => ({
    account: {
        get: vi.fn(),
    },
}));

describe('todoService', () => {
    test('fetchUserAndTasks fetches user and tasks', async () => {
        const setUserId = vi.fn();
        const setTasks = vi.fn();
        const mockList = vi.fn().mockResolvedValue({ documents: [{ $id: 'task1', userID: 'user123', description: 'Test Task' }]});
        const db = { todoLists: { list: mockList } };

        account.get.mockResolvedValue({ $id: 'user123' });
        console.log('setTasks first call argument:', setTasks.mock.calls[0]?.[0]);

        await fetchUserAndTasks(setUserId, setTasks, db);

        expect(setUserId).toHaveBeenCalledWith('user123');
        expect(setTasks).toHaveBeenCalledWith([{ $id: 'task1', userID: 'user123', description: 'Test Task' }]);
    });

    test('startEditing sets editing index and text', () => {
        const setEditingIndex = vi.fn();
        const setEditingText = vi.fn();
        const task = { description: 'Test Task' };

        startEditing(0, task, setEditingIndex, setEditingText);

        expect(setEditingIndex).toHaveBeenCalledWith(0);
        expect(setEditingText).toHaveBeenCalledWith('Test Task');
    });

    test('addTask adds a new task', async () => {
        const setTasks = vi.fn();
        const setNewTask = vi.fn();
        const tasks = [{ $id: 'task1', userID: 'user123', description: 'Test Task' }];
        const mockCreate = vi.fn().mockResolvedValue({ $id: 'task2', userID: 'user123', description: 'New Task' });
        const db = { todoLists: { create: mockCreate } };

        await addTask('user123', 'New Task', tasks, setTasks, setNewTask, db);

        expect(setTasks).toHaveBeenCalledWith([...tasks, { $id: 'task2', userID: 'user123', description: 'New Task' }]);
        expect(setNewTask).toHaveBeenCalledWith('');
    });

    test('removeTask removes a task', async () => {
        const setTasks = vi.fn();
        const tasks = [{ $id: 'task1', userID: 'user123', description: 'Test Task' }];

        // Mock the delete method of the todoLists object
        const mockDelete = vi.fn().mockResolvedValue({});
        const db = { todoLists: { delete: mockDelete } };

        // Call the function with the mocked db object
        await removeTask('task1', tasks, setTasks, db);

        // Verify that the setTasks function was called with the expected value
        expect(setTasks).toHaveBeenCalledWith([]);
    });

    test('saveEdit updates a task', async () => {
        const setTasks = vi.fn();
        const setEditingIndex = vi.fn();
        const setEditingText = vi.fn();
        const tasks = [{ $id: 'task1', userID: 'user123', description: 'Test Task' }];
        const updatedTask = { $id: 'task1', userID: 'user123', description: 'Updated Task' };

        // Mock the update method of the todoLists object
        const mockUpdate = vi.fn().mockResolvedValue(updatedTask);
        const db = { todoLists: { update: mockUpdate } };

        // Call the function with the mocked db object
        await saveEdit(0, tasks, setTasks, 'Updated Task', setEditingIndex, setEditingText, db);

        // Verify that the setTasks, setEditingIndex, and setEditingText functions were called with the expected values
        expect(setTasks).toHaveBeenCalledWith([updatedTask]);
        expect(setEditingIndex).toHaveBeenCalledWith(null);
        expect(setEditingText).toHaveBeenCalledWith('');
    });
});