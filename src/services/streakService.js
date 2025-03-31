import { Query } from 'appwrite';

export const updateStreak = async (userId, db) => {
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  try {
    // Query the streak document by userId
    const response = await db.streaks.list([Query.equal('userID', userId)]);

    if (response.documents.length === 0) {
      // If no streak data exists, create a new streak document
      const newStreak = { userID: userId, streakCount: 1, lastCompletedDate: today }; // Ensure lastCompletedDate is included
      await db.streaks.create(newStreak); // Create the new streak document
      console.log('Streak started: 1 day');
      return newStreak;
    }

    const streak = response.documents[0]; // Get the first matching document
    const lastCompleted = new Date(streak.lastCompletedDate);
    const diffDays = Math.floor((new Date(today) - lastCompleted) / (1000 * 60 * 60 * 24)); // Calculate the difference in days

    if (diffDays === 1) {
      // Increment streak if the user completed the questionnaire yesterday
      const newStreakCount = streak.streakCount + 1;
      const updatedStreak = { userID: userId, streakCount: newStreakCount, lastCompletedDate: today }; // Ensure lastCompletedDate is included
      await db.streaks.update(streak.$id, updatedStreak); // Update the streak document
      console.log(`Streak incremented: ${newStreakCount} days`);
      return updatedStreak;
    } else if (diffDays > 1) {
      // Reset streak if the user missed a day
      const resetStreak = { userID: userId, streakCount: 0, lastCompletedDate: null }; // Ensure lastCompletedDate is included
      await db.streaks.update(streak.$id, resetStreak); // Reset the streak document
      console.log('Streak reset due to missed day');
      return resetStreak;
    }

    // If the streak is already updated for today, return the current streak
    console.log('Streak already updated for today');
    return streak;
  } catch (error) {
    console.error('Error updating streak:', error);
    throw error;
  }
};

export const handleQuestionnaireCompletion = async (userId, db) => {
  try {
    const updatedStreak = await updateStreak(userId, db); // Fetch and update streak by userId
    console.log('Questionnaire completed and streak updated:', updatedStreak);
    return updatedStreak;
  } catch (error) {
    console.error('Error completing questionnaire:', error);
    throw error;
  }
};