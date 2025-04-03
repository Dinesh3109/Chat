import React, { useState } from 'react';
import Sidebar from './Components/Sidebar';
import ChatArea from './Components/ChatArea';
import './App.css';
import Header from './Components/Header';

function App() {
  const [chats, setChats] = useState([]);
  const [currentChatKey, setCurrentChatKey] = useState(Date.now()); 

  const addChatToSidebar = (title) => {
    setChats([...chats, { id: chats.length + 1, title }]);
  };

  const startNewChat = () => {
    setCurrentChatKey(Date.now());
  };

  return (
    <div className="app-container">
      <Header/>
      <Sidebar chats={chats} onChatSelect={() => {}} startNewChat={startNewChat} />
      <ChatArea key={currentChatKey} addChatToSidebar={addChatToSidebar} />
    </div>
  );
}

export default App;
