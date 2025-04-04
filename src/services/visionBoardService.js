import db from '../database';
import { account } from '../appwrite';
import { Query } from 'appwrite';

export const fetchUserAndVisionBoard = async (setUserId, setNotes) => {
    try {
        const user = await account.get();
        setUserId(user.$id);
        const response = await db.visionboard.list([
            Query.equal('userID', user.$id)
        ]);
        const notes = response.documents.map(doc => doc.description);
        setNotes(notes);
    } catch (error) {
        console.error('Error fetching user or vision board items:', error);
    }
};

export const addNote = async (userId, newNote, notes, setNotes, setNewNote) => {
    if (newNote.trim()) {
        try {
            const response = await db.visionboard.create({
                userID: userId,
                description: newNote
            });
            setNotes([...notes, response.description]);
            setNewNote('');

            if (notes.length === 0) {
                await db.users.update(userId, { visionBadgeUnlocked: true });
            }
        } catch (error) {
            console.error('Error adding note:', error);
        }
    }
};

export const deleteNote = async (index, notes, setNotes, userId) => {
    try {
        const noteToDelete = notes[index];
        const response = await db.visionboard.list([
            Query.equal('userID', userId),
            Query.equal('description', noteToDelete)
        ]);
        if (response.documents.length > 0) {
            await db.visionboard.delete(response.documents[0].$id);
            setNotes(notes.filter((_, i) => i !== index));
        }
    } catch (error) {
        console.error('Error deleting note:', error);
    }
};