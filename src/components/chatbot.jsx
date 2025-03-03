import React, { useState } from 'react';
import './chatbot.css';
import { generateResponse } from '../services/chatbotService';

const Chatbot = () => {   
    const [messages, setMessages] = useState([{ text: "Hello! I'm here to support you on your wellness journey. How are you feeling today?", user: 'bot' }]);  //stores messages
    const [input, setInput] = useState('');  //stores input
    const [history, setHistory] = useState([]);  //stores history of the chat

    const handleSend = async () => {
        if (input.trim()) {  //checks for emptiness or empty spaces
            setMessages([...messages, { text: input, user: 'user' }]); //sets the message
            setHistory([...history, { role: 'user', parts: [{ text: input }] }]); //saves the user message history
            setInput('');
            // Generating bot response
            const botResponse = await generateResponse(input, history);
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
                <button id="openBtn" onClick={toggleChat}>Open EunoiaBot</button> {/*button to open chatbot*/}
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
                    <button className="sendButton" onClick={handleSend}>Send</button> {/*button to send message*/}
                </div>
            </div>
        </div>
    );
};

export default Chatbot;