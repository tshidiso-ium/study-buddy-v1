import React, { useRef, useState, useEffect } from 'react';
import icon from "../media/Study-Budy-Logo.png"
import '../Style/Chatbot.css';

var currentUser;
function Chatbot(userDetails) {
    currentUser = userDetails.userDetails.uid
    const [userMassage, setUserMessage] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState(() => {
      const saved = localStorage.getItem(`studyBuddyChat_${currentUser}`);
      return saved ? JSON.parse(saved) : [];
    });
    const bottomRef = useRef(null);
    const messageContainerRef = useRef(null);


    useEffect( () => {
      setIsOpen(true)
    }, []);
    // useEffect(() => {
    //   bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    // }, [messages]);
    useEffect(() => {
      if (messageContainerRef.current) {
        messageContainerRef.current.scrollTop =
          messageContainerRef.current.scrollHeight;
      }
    }, [messages]);
    useEffect(() => {
      localStorage.setItem(`studyBuddyChat_${currentUser}`, JSON.stringify(messages));
    }, [messages]);

    const handleInputChange = (e) => {
      setUserInput(e.target.value);
    };
    //stable version
    // const handleSubmit = async () => {
    //   if (userInput.trim() === '') return;
    //   try{
    //   // Add the user's message to the chat
    //   setUserMessage({...userMassage,  text: userInput, isUser: true });
    //   messages.push({text: userInput, isUser: true })
    //   setUserInput('...');
    //   const botResponse = await sendGptMessage(userInput);
    //   console.log("results from gprt");
    //   console.log(botResponse);
    //   // Simulate a response from the chatbot
    //   setTimeout(() => {
    //     messages.push({ text: botResponse.res[0].text, isUser: false });
    //     console.log(messages);
    //     setUserInput('');
    //    // console.log(messages)
    //     //setBotMessage({...botMessage, text: botResponse, isUser: false });
    //   }, 1000);
    //   }
    //   catch(err){
    //     console.log("handleSubmit: error");
    //     console.log(err, {depth: null});
    //     throw new Error(err);
    //   }

    // };
  
    //beta version
    const handleSubmit = async () => {
      if (userInput.trim() === "") return;

      try {

        const userMessage = { text: userInput, isUser: true };

        setMessages(prev => [...prev, userMessage]);

        setUserInput("...");

        const botResponse = await sendGptMessage(userInput);

        const botMessage = {
          text: botResponse.res[0].text,
          isUser: false
        };

        setTimeout(() => {
          setMessages(prev => [...prev, botMessage]);
          setUserInput("");
        }, 500);

      } catch (err) {
        console.log("handleSubmit: error");
        console.log(err);
      }
    };
    //stable version 
    // const renderMessages = () => {
    //   return messages.map((message, index) => (
    //     <div key={index} className={message.isUser ? 'user-message' : 'bot-message'}>
    //       {message.text}
    //     </div>
    //   ));
    // };

    //beta
    const renderMessages = () => {
      return (
        <>
          {messages.map((message, index) => (
            <div
              key={index}
              className={message.isUser ? "user-message" : "bot-message"}
            >
              {message.text}
            </div>
          ))}

          <div ref={bottomRef}></div>
        </>
      );
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
        <div className="message-container" ref={messageContainerRef}>
          {
            renderMessages()
          }
        </div>
        <div className="input-container">
          <textarea 
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