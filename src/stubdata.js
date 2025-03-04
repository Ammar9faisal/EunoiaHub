// Combined stub data
export const stubData = {
    userProfile: {  //stores sample user data to be displayed
        username: 'John Doe',  
        email: 'johndoe@gmail.com',
        password: 'password',
        age: 30,
        address: 'Keele St, York University, CA',
        accountAge: '30 days',
        dob: 'January 1, 2000'
    },
    wellnessIndexDaily: {
        data: [
            { day: 'Jan 1', wellnessIndex: 8, isCompleted: true },   //stores sample midful check-in data for the week
            { day: 'Jan 2', wellnessIndex: 7, isCompleted: true },
            { day: 'Jan 3', wellnessIndex: 9, isCompleted: true },
            { day: 'Jan 4', wellnessIndex: 6, isCompleted: true },
            { day: 'Jan 5', wellnessIndex: 8, isCompleted: true },
            { day: 'Jan 6', wellnessIndex: 9, isCompleted: true },
            { day: 'Jan 7', wellnessIndex: 9, isCompleted: true }
        ],
        isCompleted: false,  //stores the completion status of the daily check-in
    }
};

