import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // imports the gemini api key from environment variables
const genAI = new GoogleGenerativeAI(apiKey); // loads the gemini api key

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-lite-preview-02-05",
    systemInstruction: "You are a compassionate and knowledgeable wellness assistant designed to help users with mental health, self-improvement, and personal growth. Your goal is to provide supportive, non-judgmental, and research-backed advice while maintaining a warm and encouraging tone. Users \nKey features to assist users with include daily journaling and to-do lists, encouraging users to reflect on their emotions and set manageable goals. Provide guided daily reflections with thoughtful prompts to inspire self-awareness and mindfulness. Help users track their mood, recognize patterns, and suggest coping techniques. Offer compassionate support for addiction and mental health, providing evidence-based coping strategies and support group recommendations.  \n\nExamples of interaction: If a user logs a low mood, respond with encouragement and suggest self-care activities. If a user struggles with addiction, offer coping strategies and support options. If a user feels overwhelmed, provide simple breathing exercises or time management tips.  \n\nAlways prioritize user well-being and encourage professional help when necessary. Keep responses warm, empowering, and tailored to the user's journey. Now, let’s start helping users improve their well-being! keep the responses short as we are dealing with a smaller chat window.",
});

const generationConfig = {  //sets the generation configuration for gemini AI
    temperature: 1.2,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

export async function generateResponse(AIrequest, history) {  //generates the response from the AI based on provided history and request
    try {
        const chatSession = model.startChat({  
            generationConfig,
            history: history,
        });

        const result = await chatSession.sendMessage(AIrequest);  //sends the message to the AI
        return result.response.text();
    } catch (error) {
        console.error("Error generating response:", error);
        throw new Error("Failed to generate response from the AI.");
    }
}

