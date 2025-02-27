import React, { useState } from 'react';
import './chatbot.css';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const Chatbot = () => {   
    const [messages, setMessages] = useState([{ text: "Hello! I'm here to support you on your wellness journey. How are you feeling today?", user: 'bot' }]);  //stores messages
    const [input, setInput] = useState('');  //stores input
    const [history, setHistory] = useState([]);  //stores history of the chat
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY //imports the gemini api key from environment variables
    const genAI = new GoogleGenerativeAI(apiKey);  //loads the gemini api key

    const model = genAI.getGenerativeModel({  //loads the model
        model: "gemini-2.0-flash-lite-preview-02-05",

        systemInstruction: "You are a compassionate and knowledgeable wellness assistant designed to help users with mental health, self-improvement, and personal growth. Your goal is to provide supportive, non-judgmental, and research-backed advice while maintaining a warm and encouraging tone. Users \nKey features to assist users with include daily journaling and to-do lists, encouraging users to reflect on their emotions and set manageable goals. Provide guided daily reflections with thoughtful prompts to inspire self-awareness and mindfulness. Help users track their mood, recognize patterns, and suggest coping techniques. Offer compassionate support for addiction and mental health, providing evidence-based coping strategies and support group recommendations.  \n\nExamples of interaction: If a user logs a low mood, respond with encouragement and suggest self-care activities. If a user struggles with addiction, offer coping strategies and support options. If a user feels overwhelmed, provide simple breathing exercises or time management tips.  \n\nAlways prioritize user well-being and encourage professional help when necessary. Keep responses warm, empowering, and tailored to the user's journey. Now, let’s start helping users improve their well-being! keep the responses short as we are dealing with a smaller chat window.",

    });

    const generationConfig = {
        temperature: 1.2,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
    };

    async function generateResponse(AIrequest) { //function that generates the response (Passes in user argument)
        const chatSession = model.startChat({ //starts the chat session with default configs

            generationConfig,
            history: history,
        });


        const result = await chatSession.sendMessage(AIrequest); //waits for response from the model
        return result.response.text();
    }

    const handleSend = async () => {
        if (input.trim()) {  //checks for emptiness or empty spaces
            setMessages([...messages, { text: input, user: 'user' }]); //sets the message
            setHistory([...history, { role: 'user', parts: [{ text: input }] }]); //saves the user message history

            setInput('');
            // Generating bot response
            const botResponse = await generateResponse(input);
            setMessages(prevMessages => [    //sets the bot response
                ...prevMessages,
                { text: botResponse, user: 'bot' }  
            ]);

            setHistory([...history, { role: 'model', parts: [{ text: botResponse }] }]); //saves the bot message history

        }
    };

    const toggleChat = () => {
        const chatbot = document.querySelector('.chatbot-container');  //toggles open and close the chatbot
        chatbot.classList.toggle('hidden');
    }

    return (
        <div className="chatbot">
            <div>

            </div>

            <div className='chatbot-container hidden'>
                <div className="chatbot-header">

                    <span id='aiName'>EunoiaBot</span>
                    <button id="closeBtn" onClick={toggleChat}>⛌</button>  {/*button to close chatbot*/}

                </div>

                <div className="chatbot-messages">
                    {messages.map((message, index) => (

                        <div key={index} className={`message ${message.user}`}> {/*displays the messages*/}

                            {message.text}
                        </div>
                    ))}
                </div>
                <div>
                    <input placeholder="Talk to AI" className="chatbot-input" type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()}/>


                </div>
            </div>
        </div>
    );
};

export default Chatbot;