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
            // 1. Add the note
            const response = await db.visionboard.create({
                userID: userId,
                description: newNote
            });

            setNotes([...notes, response.description]);
            setNewNote('');

            // 2. Unlock visionBadge in achievements collection
            const achievementDocs = await db.achievements.list([
                Query.equal('userID', userId)
            ]);

            if (achievementDocs.documents.length > 0) {
                
                await db.achievements.update(achievementDocs.documents[0].$id, {
                    visionBadgeUnlocked: true
                });
            } else {
                // Create new document if it doesn't exist
                await db.achievements.create({
                    userID: userId,
                    visionBadgeUnlocked: true
                });
            }

        } catch (error) {
            console.error('Error adding note or updating vision badge:', error);
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