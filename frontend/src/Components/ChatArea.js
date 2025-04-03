import React, { useState } from 'react';
import axios from 'axios';
import './ChatArea.css';

const ChatArea = ({ addChatToSidebar }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [chatTitle, setChatTitle] = useState('');
  const [file, setFile] = useState(null);
  const [Review, setReview] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (message.trim() || file) {
      const newMessages = [];

      if (message.trim()) {
        newMessages.push({ sender: 'user', text: message });
        newMessages.push({ sender: 'bot', text: 'This is a dummy response!' });

        if (!chatTitle) {
          setChatTitle(message);
          addChatToSidebar(message);
        }
      }

      if (file) {

        const formData = new FormData();
        formData.append('file', file);

        try {
          const response = await axios.post('http://localhost:5000/upload', formData);
          setReview(response.data.review);
      } catch (error) {
          console.error('Error uploading file:', error);
          setReview('Failed to review the file.');
      }

        newMessages.push({
          sender: 'user',
          text: file.name, 
          fileURL: URL.createObjectURL(file),
          fileType: file.type
        });
        setFile(null); 
      }

      setMessages([...messages, ...newMessages]);
      setMessage('');
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) { 
      setFile(selectedFile);
    }
  };

  return (
    <div className="chat-area">
    {/*<div className="chat-header">{chatTitle || "New Chat"}</div>*/}
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}-message`}>
            {msg.fileURL && msg.fileType.startsWith("image/") ? (
              <img src={msg.fileURL} alt="Uploaded" className="uploaded-image" />
            ) : (
              msg.text
            )}
          </div>
        ))}
      </div>
{/* The input-container has the first input as file upload which does not actually 
 upload the file but displays the file name in the chat. Use Multer to upload the file*/ }
      <form className="input-container" onSubmit={handleSubmit}>
        <input 
          type="file" 
          id="fileUpload" 
          style={{ display: "none" }} 
          onChange={handleFileChange} 
        />
        <label htmlFor="fileUpload" className="upload-btn">📎</label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Review your code..."
          className="message-input"
        />
        <button type="submit" className="send-btn">➤</button>
      </form>
    </div>
  );
};

export default ChatArea;
