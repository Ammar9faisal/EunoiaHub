import { describe, expect, test, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import React from 'react';
import HabitTracker from '../../src/pages/HabitTracker';
import * as stubDatabaseModule from '../../src/stubDatabase';

// Mock Sidebar so it doesn’t interfere with layout
vi.mock('../../src/components/Sidebar.jsx', () => ({
  Sidebar: () => React.createElement('div', {}, 'Sidebar'),
}));

describe('HabitTracker', () => {
  beforeEach(() => {
    // Reset the habit logs
    stubDatabaseModule.default.getCollection = vi.fn(() => []);
    stubDatabaseModule.default.createDocument = vi.fn();
    stubDatabaseModule.default.updateDocument = vi.fn();
    stubDatabaseModule.default.deleteDocument = vi.fn();
  });

  test('renders input and add button', async () => {
    await act(async () => {
      render(React.createElement(HabitTracker));
    });

    expect(screen.getByPlaceholderText('New Habit')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  test('adds a new habit', async () => {
    const createMock = vi.fn();
    stubDatabaseModule.default.createDocument = createMock;

    await act(async () => {
      render(React.createElement(HabitTracker));
    });

    const input = screen.getByPlaceholderText('New Habit');
    const addButton = screen.getByText('Add');

    fireEvent.change(input, { target: { value: 'Drink Water' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(createMock).toHaveBeenCalled();
    });
  });

  test('prevents adding a duplicate habit', async () => {
    stubDatabaseModule.default.getCollection = vi.fn(() => [
      { $id: '1', name: 'Drink Water', logs: {} },
    ]);

    const createMock = vi.fn();
    stubDatabaseModule.default.createDocument = createMock;

    await act(async () => {
      render(React.createElement(HabitTracker));
    });

    const input = screen.getByPlaceholderText('New Habit');
    const addButton = screen.getByText('Add');

    fireEvent.change(input, { target: { value: 'Drink Water' } });
    fireEvent.click(addButton);

    expect(createMock).not.toHaveBeenCalled(); // Duplicate shouldn't trigger DB call
  });
});
