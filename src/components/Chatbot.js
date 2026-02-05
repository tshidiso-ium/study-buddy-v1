import React, { useState, useEffect } from 'react';
import icon from "../media/Study-Budy-Logo.png"
import '../Style/Chatbot.css';

const messages = []
var currentUser;
function Chatbot(userDetails) {
    currentUser = userDetails.userDetails.uid
    const [userMassage, setUserMessage] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);


    useEffect( () => {
      setIsOpen(true)
    }, []);

    const handleInputChange = (e) => {
      setUserInput(e.target.value);
    };
  
    const handleSubmit = async () => {
      if (userInput.trim() === '') return;
      try{
      // Add the user's message to the chat
      setUserMessage({...userMassage,  text: userInput, isUser: true });
      messages.push({text: userInput, isUser: true })
      setUserInput('...');
      const botResponse = await sendGptMessage(userInput);
      console.log("results from gprt");
      console.log(botResponse);
      // Simulate a response from the chatbot
      setTimeout(() => {
        messages.push({ text: botResponse.res, isUser: false });
        console.log(messages);
        setUserInput('');
       // console.log(messages)
        //setBotMessage({...botMessage, text: botResponse, isUser: false });
      }, 1000);
      }
      catch(err){
        console.log("handleSubmit: error");
        console.log(err, {depth: null});
        throw new Error(err);
      }

    };
  
    const renderMessages = () => {
      return messages.map((message, index) => (
        <div key={index} className={message.isUser ? 'user-message' : 'bot-message'}>
          {message.text}
        </div>
      ));
    };


    const sendGptMessage = async (message) => {
      try{
        const gptUrl = "https://gpt-backend-4dh4scdo7q-uc.a.run.app/gpt/test"
        const res = await fetch (gptUrl, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
             },
             body: JSON.stringify({
               "message" : `${message}`,
                "uid" : `${currentUser}`
             })
            })
        console.log(res.body);
        const data = await res.json();
        return data;
      }
      catch(err){
        console.log("sendGptMessage: error");
        console.dir(err, {depth: null});
        throw new Error(err);
      }
    }

  
    return (
      <div className={`chatbot ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-info">
            <h2><img src={icon} alt="Icon" style={{ width: '30px', height: '30px', verticalAlign: 'middle' }} /> Study Buddy</h2>
             <p>
                Your very own AI personal assistant, here to help you answear defficult questions!
            </p>
        </div>
        <div className="message-container">
          {
            renderMessages()
          }
        </div>
        <div className="input-container">
          <input 
            className='chatbot-input'
            type="text"
            placeholder="Type your message..."
            value={userInput}
            onChange={handleInputChange}
          />
          <button className = "chatbot-button" onClick={handleSubmit}>Send</button>
        </div>
      </div>
    );
  }
  
  export default Chatbot;