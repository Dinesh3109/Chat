import React from 'react';
import './Sidebar.css';

const Sidebar = ({ chats, onChatSelect, startNewChat }) => {
  return (
    <div className="sidebar">
      <button className="new-chat-btn" onClick={startNewChat}>+ New Chat</button>
      <h3>Chats </h3>
      <br></br>
      <div className="chats-list">
        {chats.length === 0 ? (
          <p>No chats yet</p>
        ) : (
          chats.map((chat) => (
            <div key={chat.id} className="chat-item" onClick={() => onChatSelect(chat.title)}>
              {chat.title}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
