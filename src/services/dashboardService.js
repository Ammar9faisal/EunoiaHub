import db from '../database';
import { Query } from 'appwrite';

export const fetchWellnessIndexData = async (userId) => {
    const today = new Date();
    const dates = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        dates.push(date.toISOString().split('T')[0]);
    }

    try {
        const response = await db.surveyResponses.list([
            Query.equal('userID', userId),
            Query.orderDesc('date'),
            Query.limit(7)
        ]);
        console.log('Response from database:', response); // Debug

        const wellnessIndexData = dates.map(date => {
            const entry = response.documents.find(doc => {
                const docDate = new Date(doc.date).toISOString().split('T')[0];
                console.log(`Comparing ${date} with ${docDate}`); // Debug
                return docDate === date;
            });
            return {
                day: date,
                wellnessIndex: entry ? entry.wellnessIndex : 0
            };
        });
        console.log('Wellness index data:', wellnessIndexData); // Debug
        return wellnessIndexData;
    } catch (error) {
        console.error('Error fetching wellness index data:', error);
        return dates.map(date => ({ day: date, wellnessIndex: 0 })); // Return an array of zeros if there's an error
    }
};