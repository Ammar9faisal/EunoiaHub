# EunoiaHub 💜

Welcome to the EunoiaHub! This application is designed to help users with mental health, self-improvement, and personal growth. It provides features like daily journaling, to-do lists, guided reflections, mood tracking, and more.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Daily journaling and to-do lists
- Guided daily reflections with thoughtful prompts
- Mood tracking and pattern recognition
- Evidence-based coping strategies and support group recommendations
- Compassionate support for addiction and mental health

## Installation

To get started with the EunoiaHub, follow these steps:

1. **Clone the repository:**

    ```sh
    git clone https://github.com/Ammar9faisal/EunoiaHub.git
    cd <your root directory>
    ```


2. **Install dependencies:**

    Make sure you have [Node.js](https://nodejs.org/) installed. Then, run the following command to install the necessary dependencies:

    ```sh
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory of the project and add the following environment variables:

    ```env
    VITE_APPWRITE_ENDPOINT=https://your-appwrite-endpoint
    VITE_APPWRITE_PROJECT_ID=your-appwrite-project-id
    VITE_APPWRITE_DATABASE_ID=your-appwrite-database-id
    VITE_APPWRITE_COLLECTION_ID_USERS=your-users-collection-id
    VITE_APPWRITE_COLLECTION_ID_SURVEYRESPONSES=your-survey-responses-collection-id
    VITE_APPWRITE_COLLECTION_ID_TODOLISTS=your-todo-lists-collection-id
    VITE_APPWRITE_COLLECTION_ID_VISIONBOARDS=your-vision-boards-collection-id
    VITE_GEMINI_API_KEY=your-gemini-api-key
    VITE_USE_STUB_DATABASE=false
    ```
    For the sake of the our course demo for ease of access, all the non-billed API keys have been made available in the `.env` folder already. The only
    excluded API key is Google Maps API which is billed. However, you can learn how to generate your own by reading our wiki.
   
5. **Run the development server:**

    Start the development server with the following command:

    ```sh
    npm run dev
    ```

    This will start the application on `http://localhost:PORT`. You can access this link through the terminal after server starts

6. **Closing the development server:**

    To close the development server, simply do the following key combination in the terminal:
  
    `CTRL` + `C`

## Testing
To run testing, simply type the following in the terminal: (Note: Install any dependencies before doing this)

    npm run test
    
Follow the instructions in the terminal for further actions

## Usage

Once the development server is running, you can access the application at `http://localhost:<PORT>`. You can create an account, log in, and start using the features of the EunoiaHub. 
Alternatively, you can visit the live demo at `https://eunoia-hub.vercel.app`.

## Contributing

We welcome contributions to the EunoiaHub! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
