import { describe, expect, test, beforeAll, afterAll, vi} from 'vitest';
import { fetchUserAndVisionBoard, addNote, deleteNote } from '../../src/services/visionBoardService';
import { account, databases } from '../../src/appwrite';
import { Query } from 'appwrite';

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


describe('visionBoardService Integration Tests', () => {
  let userId = "67d7a3d30007a40db90b";
  let notes = [];

  beforeAll(async () => {
    // Fetch user and vision board items before running tests
    await fetchUserAndVisionBoard(
      (id) => { userId = id; },
      (fetchedNotes) => { notes = fetchedNotes; }
    );
  });

  test('fetchUserAndVisionBoard fetches user and vision board items', async () => {
    const setUserId = vi.fn();
    const setNotes = vi.fn();

    await fetchUserAndVisionBoard(setUserId, setNotes);

    expect(setUserId).toHaveBeenCalledWith(userId);
    expect(setNotes).toHaveBeenCalledWith(notes);
  });

  test('addNote adds a new note', async () => {
    const setNotes = vi.fn();
    const setNewNote = vi.fn();
    const newNote = 'New Vision Board Note';

    await addNote(userId, newNote, notes, setNotes, setNewNote);

    expect(setNotes).toHaveBeenCalledWith([...notes, newNote]);
    expect(setNewNote).toHaveBeenCalledWith('');

  });

  test('deleteNote deletes a note', async () => {
    const setNotes = vi.fn();

    // Add a note to ensure there is something to delete
    const newNote = 'Note to be deleted';
    await addNote(userId, newNote, notes, setNotes, vi.fn());
    notes.push(newNote);

    await deleteNote(notes.length - 1, notes, setNotes, userId);

    // Wait for the deletion to complete
    await new Promise(resolve => setTimeout(resolve, 1000));

    expect(setNotes).toHaveBeenCalledWith(notes.filter((_, i) => i !== notes.length - 1));
  });

  afterAll(async () => {
    // Clean up notes after running tests
    for (const note of notes) {
      const response = await databases.listDocuments("UserData" , 'visionboards', [
        Query.equal('userID', userId)
      ]);
      if (response.documents.length > 0) {
        await databases.deleteDocument( "UserData" ,'visionboards', response.documents[0].$id);
      }
    }
  });
});