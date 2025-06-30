import React, { useState } from "react";
import SpaceBackground from './components/SpaceBackground';
import './chat.css';

function Chat({ onLogout }) {
  const [collapsed, setCollapsed] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  const toggleSidebar = () => setCollapsed(!collapsed);

  const handleSend = () => {
    if (inputValue.trim() === "") return;
    setMessages([...messages, { type: 'user', text: inputValue }]);
    setInputValue("");
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className="chat-wrapper">
      {/* Background (behind everything) */}
      <div className="background-layer">
        <SpaceBackground />
      </div>

      {/* Foreground: Main App Layout */}
      <div className="foreground-layer">
        {/* Sidebar */}
        <div
          className={`sidebar ${collapsed ? 'collapsed' : ''}`}
        >
          {/* Top Section */}
          <div
            className={`top-bar ${collapsed ? 'collapsed' : ''}`}
          >
            <button className="icon-button" onClick={toggleSidebar}>
              {collapsed ? '➤' : '✖'}
            </button>
            {collapsed && (
              <>
                <button className="icon-button">➕</button>
                <button className="icon-button">🔎</button>
              </>
            )}
          </div>

          {/* Scrollable Content */}
          {!collapsed && (
            <div className="scroll-container">
              <button className="primary-button">➕ New Chat</button>
              <input
                type="text"
                placeholder="Search Chats"
                className="search-input"
              />
              <h5 className="heading">Chat History</h5>
              {/* Chat list would go here */}
            </div>
          )}

          {/* Fixed Bottom User Section */}
          <div
            className={`user-section ${collapsed ? 'collapsed' : ''}`}
          >
            <button className="user-button">
              <img
                src="/profile.png"
                alt="Profile"
                className={`avatar ${collapsed ? 'no-margin' : ''}`}
              />
              {!collapsed && <span className="username">John Doe</span>}
            </button>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="chat-container">
          {/* Header */}
          <div className="chat-header">
            <h3 className="bot-name">AstroBot 🚀</h3>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>

          {/* Chat Body */}
          <div className="chat-body">
            {messages.length === 0 ? (
              <div className="intro-message fade-in">
                <h1>👋 Welcome to AstroBot</h1>
                <p>Your intelligent space mission assistant.</p>
                <p>Ask me anything about satellites, missions, or ISRO data!</p>
              </div>
            ) : (
              <div className="message-list fade-in">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`message-bubble ${msg.type === 'user' ? 'user' : 'bot'}`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="chat-input-section">
            <button className="icon-btn">
              <img className="attach-mic" src="/attach.jpg" alt="Attach" />
            </button>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="input-field"
            />
            <button className="icon-btn">
              <img className="attach-mic" src="/mic.jpg" alt="Mic" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;