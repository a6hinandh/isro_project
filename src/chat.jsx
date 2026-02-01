import React, { useState, useEffect, useRef } from "react";
import SpaceBackground from './components/SpaceBackground';
import './chat.css';
import AttachmentIcon from '@mui/icons-material/Attachment';
import MicIcon from '@mui/icons-material/Mic';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import MoreIcon from '@mui/icons-material/More';
import HistoryIcon from '@mui/icons-material/History';
import StarIcon from '@mui/icons-material/Star';
import HelpIcon from '@mui/icons-material/Help';
import FeedbackIcon from '@mui/icons-material/Feedback';
import SatelliteIcon from '@mui/icons-material/Satellite';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

const API_BASE = '/api';

function PopupModal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div
      className="modal-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div className="modal-content wide-modal">
        <button onClick={onClose} className="modal-close">
          ×
        </button>
        <h2 className="modal-title">{title}</h2>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

function Chat({ onLogout }) {
  const [collapsed, setCollapsed] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedTime, setSelectedTime] = useState(0);
  const [loading, setLoading] = useState(false);

  // user + thread state
  const [userId] = useState("user_123");
  const [currentThreadId, setCurrentThreadId] = useState("default_thread");

  // Auto-scroll ref
  const chatContainerRef = useRef(null);

  const [history, setHistory] = useState([
    {
      type: 'user',
      text: 'Tell me about Chandrayaan-3',
      timestamp: '2025-07-05T10:00:00Z',
    },
    {
      type: 'bot',
      text: "Chandrayaan-3 is ISRO's third lunar mission...",
      timestamp: '2025-07-05T10:01:00Z',
    },
    {
      type: 'user',
      text: 'What satellites are in GEO?',
      timestamp: '2025-07-04T15:30:00Z',
    },
  ]);

  const [favorites, setFavorites] = useState([
    {
      // dummy example; real favorites will have threadId
      messages: [
        {
          type: 'user',
          text: 'Details on INSAT-3DR',
          timestamp: '2025-07-03T12:00:00Z',
        },
        {
          type: 'bot',
          text: 'INSAT-3DR is a weather satellite...',
          timestamp: '2025-07-03T12:01:00Z',
        },
      ],
      timestamp: '2025-07-03T12:02:00Z',
    },
  ]);

  const [modals, setModals] = useState({
    history: false,
    favorites: false,
    settings: false,
    help: false,
    feedback: false,
    search: false,
    visualizer: false,
    knowledgeGraph: false,
  });

  const satelliteImages = [
    {
      timestamp: '2025-07-01T08:00:00Z',
      url: 'https://www.isro.gov.in/media/isro/image/SatImages/IndiaFromSpace.jpg',
    },
    {
      timestamp: '2025-07-02T08:00:00Z',
      url: 'https://www.isro.gov.in/media/isro/image/SatImages/IndiaFromSpace2.jpg',
    },
    {
      timestamp: '2025-07-03T08:00:00Z',
      url: 'https://www.isro.gov.in/media/isro/image/SatImages/IndiaFromSpace3.jpg',
    },
  ];

  // Auto-scroll to bottom effect
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const toggleSidebar = () => setCollapsed(!collapsed);

  const handleSend = async () => {
    if (inputValue.trim() === "" || loading) return;

    const userMsg = {
      type: 'user',
      text: inputValue,
      timestamp: new Date().toISOString(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setHistory([...history, userMsg]);
    setInputValue("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          thread_id: currentThreadId,
          message: userMsg.text,
          history: [], // backend keeps history per thread
        }),
      });

      if (!res.ok) {
        throw new Error("Backend error");
      }

      const data = await res.json(); // {answer, sources, mode}

      const botMsg = {
        type: 'bot',
        text: data.answer || "No answer returned.",
        timestamp: new Date().toISOString(),
        sources: data.sources || [],
        mode: data.mode || 'unknown',
      };

      setMessages([...newMessages, botMsg]);
    } catch (err) {
      const errMsg = {
        type: 'bot',
        text: "Backend error. Please try again.",
        timestamp: new Date().toISOString(),
      };
      setMessages([...newMessages, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = () => {
    if (!isFavorite && messages.length > 0) {
      setFavorites([
        ...favorites,
        {
          threadId: currentThreadId,
          messages: [...messages],
          timestamp: new Date().toISOString(),
        },
      ]);
    }
    setIsFavorite(!isFavorite);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const toggleModal = (modalName) => {
    setModals((prev) => ({ ...prev, [modalName]: !prev[modalName] }));
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    const diffDays = Math.floor(
      (now - messageDate) / (1000 * 60 * 60 * 24)
    );
    return diffDays === 0
      ? 'Today'
      : `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  };

  const handleZoom = (direction) => {
    setZoomLevel((prev) =>
      direction === 'in'
        ? Math.min(prev + 0.2, 3)
        : Math.max(prev - 0.2, 0.5)
    );
  };

  const openThread = async (threadId) => {
    setCurrentThreadId(threadId);

    try {
      const res = await fetch(
        `${API_BASE}/thread/${threadId}?user_id=${userId}`
      );
      if (!res.ok) throw new Error("Failed to load thread");

      const data = await res.json(); // [{role, content, timestamp}, ...]

      const restoredMessages = data.map((m) => ({
        type: m.role === "user" ? "user" : "bot",
        text: m.content,
        timestamp: m.timestamp,
      }));

      setMessages(restoredMessages);
    } catch (e) {
      console.error(e);
      setMessages([]);
    }
  };

  return (
    <div className="chat-wrapper">
      <div className="background-layer">
        <SpaceBackground />
      </div>

      <div className="foreground-layer">
        <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
          <div className={`top-bar ${collapsed ? 'collapsed' : ''}`}>
            <button className="icon-button" onClick={toggleSidebar}>
              {collapsed ? (
                <ArrowForwardIosIcon style={{ fontSize: '16px' }} />
              ) : (
                <KeyboardArrowLeftIcon style={{ fontSize: '16px' }} />
              )}
            </button>
            {collapsed && (
              <>
                <button className="icon-button">
                  <AddIcon style={{ fontSize: '16px' }} />
                </button>
                <button className="icon-button">
                  <SearchIcon style={{ fontSize: '16px' }} />
                </button>
              </>
            )}
          </div>

          {!collapsed && (
            <div className="scroll-container">
              <button
                className="primary-button"
                style={{ padding: '8px', fontSize: '14px' }}
                onClick={() => {
                  const newId = `thread_${Date.now()}`;
                  setCurrentThreadId(newId);
                  setMessages([]);
                }}
              >
                <AddIcon style={{ fontSize: '16px' }} /> New Chat
              </button>
              <input
                type="text"
                placeholder="Search Chats"
                className="search-input"
                style={{
                  padding: '8px',
                  fontSize: '14px',
                  marginBottom: '15px',
                }}
              />
              <h5
                className="heading"
                style={{ fontSize: '16px', marginBottom: '8px' }}
              >
                Menu
              </h5>
              <button
                className="primary-button"
                style={{ padding: '8px', fontSize: '14px' }}
                onClick={() => toggleModal('history')}
              >
                <HistoryIcon
                  style={{ marginRight: '8px', fontSize: '16px' }}
                />{' '}
                History
              </button>
              <button
                className="primary-button"
                style={{ padding: '8px', fontSize: '14px' }}
                onClick={() => toggleModal('favorites')}
              >
                <StarIcon
                  style={{ marginRight: '8px', fontSize: '16px' }}
                />{' '}
                Favorites
              </button>
              <button
                className="primary-button"
                style={{ padding: '8px', fontSize: '14px' }}
                onClick={() => toggleModal('settings')}
              >
                <SettingsIcon
                  style={{ marginRight: '8px', fontSize: '16px' }}
                />{' '}
                Settings
              </button>
              <button
                className="primary-button"
                style={{ padding: '8px', fontSize: '14px' }}
                onClick={() => toggleModal('help')}
              >
                <HelpIcon
                  style={{ marginRight: '8px', fontSize: '16px' }}
                />{' '}
                Help
              </button>
              <button
                className="primary-button"
                style={{ padding: '8px', fontSize: '14px' }}
                onClick={() => toggleModal('feedback')}
              >
                <FeedbackIcon
                  style={{ marginRight: '8px', fontSize: '16px' }}
                />{' '}
                Feedback
              </button>
              <button
                className="primary-button"
                style={{ padding: '8px', fontSize: '14px' }}
                onClick={() => toggleModal('search')}
              >
                <SearchIcon
                  style={{ marginRight: '8px', fontSize: '16px' }}
                />{' '}
                Search & Explore
              </button>
              <button
                className="primary-button"
                style={{ padding: '8px', fontSize: '14px' }}
                onClick={() => toggleModal('visualizer')}
              >
                <SatelliteIcon
                  style={{ marginRight: '8px', fontSize: '16px' }}
                />{' '}
                Satellite Visualizer
              </button>
              <button
                className="primary-button"
                style={{ padding: '8px', fontSize: '14px' }}
                onClick={() => toggleModal('knowledgeGraph')}
              >
                <AccountTreeIcon
                  style={{ marginRight: '8px', fontSize: '16px' }}
                />{' '}
                Knowledge Graph
              </button>
            </div>
          )}

          <div className={`user-section ${collapsed ? 'collapsed' : ''}`}>
            <button className="user-button">
              <img
                src="/profile.png"
                alt="Profile"
                className={`avatar ${collapsed ? 'no-margin' : ''}`}
                style={{ width: '32px', height: '32px' }}
              />
              {!collapsed && (
                <span className="username" style={{ fontSize: '14px' }}>
                  John Doe
                </span>
              )}
            </button>
            {!collapsed && (
              <button className="settings-button">
                <SettingsIcon
                  style={{ color: '#ffffff', fontSize: '16px' }}
                />
              </button>
            )}
          </div>
        </div>

        <div className="chat-container">
          <div className="chat-header">
            <h3 className="bot-name">Astra-Q 🚀</h3>
            <div>
              <button
                className="logout-btn"
                onClick={toggleFavorite}
                style={{ marginRight: '10px', padding: '6px 12px' }}
              >
                <StarIcon
                  style={{
                    color: isFavorite ? '#ffd700' : '#fff',
                    fontSize: '18px',
                  }}
                />
              </button>
              <button
                className="logout-btn"
                onClick={handleLogout}
                style={{ padding: '6px 12px' }}
              >
                Logout
              </button>
            </div>
          </div>

          <div className="chat-body">
            <div
              className="message-list-container"
              ref={chatContainerRef}
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px',
                paddingBottom: '120px',
                height: 'calc(100vh - 140px)',
              }}
            >
              {messages.length === 0 ? (
                <div className="intro-message fade-in">
                  <h1 style={{ fontSize: '24px' }}>Welcome to Astra-Q</h1>
                  <p>Astra-Q : Space-Query</p>
                  <p>Your intelligent space mission assistant.</p>
                  <p>
                    Ask me anything about satellites, missions, or ISRO data!
                  </p>
                </div>
              ) : (
                <div className="message-list fade-in">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`message-bubble ${
                        msg.type === 'user' ? 'user' : 'bot'
                      }`}
                    >
                      <div>{msg.text}</div>

                      {msg.type === 'bot' &&
                        msg.sources &&
                        msg.sources.length > 0 && (
                          <div
                            className="sources-block"
                            style={{
                              marginTop: '8px',
                              fontSize: '12px',
                            }}
                          >
                            <div
                              className="sources-title"
                              style={{
                                opacity: 0.8,
                                marginBottom: '4px',
                              }}
                            >
                              Sources:
                            </div>
                            <ul
                              style={{
                                paddingLeft: '16px',
                                margin: 0,
                              }}
                            >
                              {msg.sources.map((s, i) => (
                                <li key={i}>
                                  <span
                                    style={{ fontWeight: 500 }}
                                  >
                                    {s.source}
                                  </span>
                                  {s.page && ` (p. ${s.page})`}
                                  {s.content_preview && (
                                    <span style={{ opacity: 0.8 }}>
                                      {" — "}
                                      {s.content_preview.slice(0, 80)}
                                      ...
                                    </span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                      <div
                        style={{
                          fontSize: '12px',
                          opacity: 0.7,
                          marginTop: '5px',
                        }}
                      >
                        {formatTimestamp(msg.timestamp)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="chat-input-section fixed-bottom">
              <button className="icon-btn">
                <AttachmentIcon style={{ fontSize: '18px' }} />
              </button>
              <button className="icon-btn">
                <MoreIcon style={{ fontSize: '18px' }} />
              </button>
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="input-field"
                style={{ fontSize: '14px' }}
              />
              <button
                className="icon-btn"
                disabled={loading}
                onClick={handleSend}
              >
                <MicIcon style={{ fontSize: '18px' }} />
              </button>
            </div>
          </div>
        </div>

        {/* Popup Modals */}
        <PopupModal
          isOpen={modals.history}
          onClose={() => toggleModal('history')}
          title="Chat History"
        >
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {history.length === 0 ? (
              <p>No chat history available.</p>
            ) : (
              history.map((msg, index) => (
                <div key={index} className="modal-section">
                  <div className="section-text">{msg.text}</div>
                  <div className="section-meta">
                    {formatTimestamp(msg.timestamp)}
                  </div>
                </div>
              ))
            )}
          </div>
        </PopupModal>

        <PopupModal
          isOpen={modals.favorites}
          onClose={() => toggleModal('favorites')}
          title="Favorites"
        >
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {favorites.length === 0 ? (
              <p>No favorite chats saved.</p>
            ) : (
              favorites.map((chat, index) => (
                <div
                  key={index}
                  className="modal-section"
                  onClick={() => {
                    if (chat.threadId) {
                      openThread(chat.threadId);
                      toggleModal('favorites');
                    }
                  }}
                  style={{
                    cursor: chat.threadId ? 'pointer' : 'default',
                  }}
                >
                  {chat.messages.map((msg, msgIndex) => (
                    <div
                      key={msgIndex}
                      className="section-text"
                    >
                      {msg.type === 'user' ? 'You: ' : 'Bot: '}
                      {msg.text}
                    </div>
                  ))}
                  <div className="section-meta">
                    {formatTimestamp(chat.timestamp)}
                  </div>
                </div>
              ))
            )}
          </div>
        </PopupModal>

        <PopupModal
          isOpen={modals.settings}
          onClose={() => toggleModal('settings')}
          title="Settings"
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div className="settings-section">
              <div className="settings-subheading">
                Account Settings
              </div>
              <label>Email</label>
              <input type="email" placeholder="Enter new email" />
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter new password"
              />
            </div>

            <div className="settings-section">
              <div className="settings-subheading">
                Interface Preferences
              </div>
              <label>Theme</label>
              <select>
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="system">System Default</option>
              </select>
              <label>Language</label>
              <select>
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="fr">French</option>
              </select>
            </div>

            <div className="settings-section">
              <div className="settings-subheading">
                Notifications
              </div>
              <label>
                <input type="checkbox" /> Email Notifications
              </label>
              <label>
                <input type="checkbox" /> Push Notifications
              </label>
              <label>
                <input type="checkbox" /> In-App Alerts
              </label>
            </div>

            <div className="settings-section">
              <div className="settings-subheading">
                Privacy Options
              </div>
              <label>
                <input type="checkbox" /> Clear Chat History on
                Logout
              </label>
              <label>
                <input type="checkbox" /> Allow Usage Analytics
                (Optional)
              </label>
            </div>

            <button
              className="primary-button"
              style={{ padding: '10px', fontSize: '14px' }}
            >
              Save Changes
            </button>
          </div>
        </PopupModal>

        <PopupModal
          isOpen={modals.help}
          onClose={() => toggleModal('help')}
          title="Help & Support"
        >
          {/* ... help modal content unchanged ... */}
        </PopupModal>

        <PopupModal
          isOpen={modals.feedback}
          onClose={() => toggleModal('feedback')}
          title="Feedback / Report Error"
        >
          {/* ... feedback modal content unchanged ... */}
        </PopupModal>

        <PopupModal
          isOpen={modals.search}
          onClose={() => toggleModal('search')}
          title="Advanced Semantic Search"
        >
          {/* ... search modal content unchanged ... */}
        </PopupModal>

        <PopupModal
          isOpen={modals.visualizer}
          onClose={() => toggleModal('visualizer')}
          title="Satellite Product Visualizer"
        >
          {/* ... visualizer modal content unchanged ... */}
        </PopupModal>

        <PopupModal
          isOpen={modals.knowledgeGraph}
          onClose={() => toggleModal('knowledgeGraph')}
          title="Knowledge Graph Explorer"
        >
          {/* ... knowledge graph modal content unchanged ... */}
        </PopupModal>
      </div>
    </div>
  );
}

export default Chat;
