import React, { useState } from "react";
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

function PopupModal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" style={{
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
      padding: '20px'
    }}>
      <div className="modal-content wide-modal">
        <button onClick={onClose} className="modal-close">×</button>
        <h2 className="modal-title">{title}</h2>
        <div className="modal-body">
          {children}
        </div>
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
  const [history, setHistory] = useState([
    { type: 'user', text: 'Tell me about Chandrayaan-3', timestamp: '2025-07-05T10:00:00Z' },
    { type: 'bot', text: 'Chandrayaan-3 is ISRO’s third lunar mission...', timestamp: '2025-07-05T10:01:00Z' },
    { type: 'user', text: 'What satellites are in GEO?', timestamp: '2025-07-04T15:30:00Z' }
  ]);
  const [favorites, setFavorites] = useState([
    { 
      messages: [
        { type: 'user', text: 'Details on INSAT-3DR', timestamp: '2025-07-03T12:00:00Z' },
        { type: 'bot', text: 'INSAT-3DR is a weather satellite...', timestamp: '2025-07-03T12:01:00Z' }
      ], 
      timestamp: '2025-07-03T12:02:00Z' 
    }
  ]);
  const [modals, setModals] = useState({
    history: false,
    favorites: false,
    settings: false,
    help: false,
    feedback: false,
    search: false,
    visualizer: false,
    knowledgeGraph: false
  });

  const satelliteImages = [
    { timestamp: '2025-07-01T08:00:00Z', url: 'https://www.isro.gov.in/media/isro/image/SatImages/IndiaFromSpace.jpg' },
    { timestamp: '2025-07-02T08:00:00Z', url: 'https://www.isro.gov.in/media/isro/image/SatImages/IndiaFromSpace2.jpg' },
    { timestamp: '2025-07-03T08:00:00Z', url: 'https://www.isro.gov.in/media/isro/image/SatImages/IndiaFromSpace3.jpg' }
  ];

  const toggleSidebar = () => setCollapsed(!collapsed);

  const handleSend = () => {
    if (inputValue.trim() === "") return;
    const newMessage = { 
      type: 'user', 
      text: inputValue,
      timestamp: new Date().toISOString()
    };
    setMessages([...messages, newMessage]);
    setHistory([...history, newMessage]);
    setInputValue("");
  };

  const toggleFavorite = () => {
    if (!isFavorite && messages.length > 0) {
      setFavorites([...favorites, { messages: [...messages], timestamp: new Date().toISOString() }]);
    }
    setIsFavorite(!isFavorite);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const toggleModal = (modalName) => {
    setModals(prev => ({ ...prev, [modalName]: !prev[modalName] }));
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    const diffDays = Math.floor((now - messageDate) / (1000 * 60 * 60 * 24));
    return diffDays === 0 ? 'Today' : `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  };

  const handleZoom = (direction) => {
    setZoomLevel(prev => direction === 'in' ? Math.min(prev + 0.2, 3) : Math.max(prev - 0.2, 0.5));
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
              {collapsed ? <ArrowForwardIosIcon style={{ fontSize: '16px' }} /> : <KeyboardArrowLeftIcon style={{ fontSize: '16px' }} />}
            </button>
            {collapsed && (
              <>
                <button className="icon-button"><AddIcon style={{ fontSize: '16px' }} /></button>
                <button className="icon-button"><SearchIcon style={{ fontSize: '16px' }} /></button>
              </>
            )}
          </div>

          {!collapsed && (
            <div className="scroll-container">
              <button className="primary-button" style={{ padding: '8px', fontSize: '14px' }}><AddIcon style={{ fontSize: '16px' }} /> New Chat</button>
              <input
                type="text"
                placeholder="Search Chats"
                className="search-input"
                style={{ padding: '8px', fontSize: '14px', marginBottom: '15px' }}
              />
              <h5 className="heading" style={{ fontSize: '16px', marginBottom: '8px' }}>Menu</h5>
              <button className="primary-button" style={{ padding: '8px', fontSize: '14px' }} onClick={() => toggleModal('history')}>
                <HistoryIcon style={{ marginRight: '8px', fontSize: '16px' }} /> History
              </button>
              <button className="primary-button" style={{ padding: '8px', fontSize: '14px' }} onClick={() => toggleModal('favorites')}>
                <StarIcon style={{ marginRight: '8px', fontSize: '16px' }} /> Favorites
              </button>
              <button className="primary-button" style={{ padding: '8px', fontSize: '14px' }} onClick={() => toggleModal('settings')}>
                <SettingsIcon style={{ marginRight: '8px', fontSize: '16px' }} /> Settings
              </button>
              <button className="primary-button" style={{ padding: '8px', fontSize: '14px' }} onClick={() => toggleModal('help')}>
                <HelpIcon style={{ marginRight: '8px', fontSize: '16px' }} /> Help
              </button>
              <button className="primary-button" style={{ padding: '8px', fontSize: '14px' }} onClick={() => toggleModal('feedback')}>
                <FeedbackIcon style={{ marginRight: '8px', fontSize: '16px' }} /> Feedback
              </button>
              <button className="primary-button" style={{ padding: '8px', fontSize: '14px' }} onClick={() => toggleModal('search')}>
                <SearchIcon style={{ marginRight: '8px', fontSize: '16px' }} /> Search & Explore
              </button>
              <button className="primary-button" style={{ padding: '8px', fontSize: '14px' }} onClick={() => toggleModal('visualizer')}>
                <SatelliteIcon style={{ marginRight: '8px', fontSize: '16px' }} /> Satellite Visualizer
              </button>
              <button className="primary-button" style={{ padding: '8px', fontSize: '14px' }} onClick={() => toggleModal('knowledgeGraph')}>
                <AccountTreeIcon style={{ marginRight: '8px', fontSize: '16px' }} /> Knowledge Graph
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
              {!collapsed && <span className="username" style={{ fontSize: '14px' }}>John Doe</span>}
            </button>
            {!collapsed && (
              <button className="settings-button">
                <SettingsIcon style={{ color: '#ffffff', fontSize: '16px' }} />
              </button>
            )}
          </div>
        </div>

        <div className="chat-container">
          <div className="chat-header">
            <h3 className="bot-name">AstroBot 🚀</h3>
            <div>
              <button 
                className="logout-btn" 
                onClick={toggleFavorite}
                style={{ marginRight: '10px', padding: '6px 12px' }}
              >
                <StarIcon style={{ color: isFavorite ? '#ffd700' : '#fff', fontSize: '18px' }} />
              </button>
              <button className="logout-btn" onClick={handleLogout} style={{ padding: '6px 12px' }}>Logout</button>
            </div>
          </div>

          <div className="chat-body">
            {messages.length === 0 ? (
              <div className="intro-message fade-in">
                <h1 style={{ fontSize: '24px' }}>Welcome to AstroBot</h1>
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
                    <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '5px' }}>
                      {formatTimestamp(msg.timestamp)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="chat-input-section">
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
            <button className="icon-btn">
              <MicIcon style={{ fontSize: '18px' }} />
            </button>
          </div>
        </div>
      </div>

      {/* Popup Modals */}
      <PopupModal isOpen={modals.history} onClose={() => toggleModal('history')} title="Chat History">
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {history.length === 0 ? (
            <p>No chat history available.</p>
          ) : (
            history.map((msg, index) => (
              <div key={index} className="modal-section">
                <div className="section-text">{msg.text}</div>
                <div className="section-meta">{formatTimestamp(msg.timestamp)}</div>
              </div>
            ))
          )}
        </div>
      </PopupModal>

      <PopupModal isOpen={modals.favorites} onClose={() => toggleModal('favorites')} title="Favorites">
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {favorites.length === 0 ? (
            <p>No favorite chats saved.</p>
          ) : (
            favorites.map((chat, index) => (
              <div key={index} className="modal-section">
                {chat.messages.map((msg, msgIndex) => (
                   <div key={msgIndex} className="section-text">{msg.type === 'user' ? 'You: ' : 'Bot: '}{msg.text}</div>
                ))}
                <div className="section-meta">{formatTimestamp(chat.timestamp)}</div>
              </div>
            ))
          )}
        </div>
      </PopupModal>

      <PopupModal isOpen={modals.settings} onClose={() => toggleModal('settings')} title="Settings">
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    
    <div className="settings-section">
      <div className="settings-subheading">Account Settings</div>
      <label>Email</label>
      <input type="email" placeholder="Enter new email" />
      <label>Password</label>
      <input type="password" placeholder="Enter new password" />
    </div>

    <div className="settings-section">
      <div className="settings-subheading">Interface Preferences</div>
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
      <div className="settings-subheading">Notifications</div>
      <label><input type="checkbox" /> Email Notifications</label>
      <label><input type="checkbox" /> Push Notifications</label>
      <label><input type="checkbox" /> In-App Alerts</label>
    </div>

    <div className="settings-section">
      <div className="settings-subheading">Privacy Options</div>
      <label><input type="checkbox" /> Clear Chat History on Logout</label>
      <label><input type="checkbox" /> Allow Usage Analytics (Optional)</label>
    </div>

    <button className="primary-button" style={{ padding: '10px', fontSize: '14px' }}>Save Changes</button>
  </div>
</PopupModal>


      <PopupModal isOpen={modals.help} onClose={() => toggleModal('help')} title="Help & Support">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '8px',
          padding: '15px',
          boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ borderLeft: '3px solid #007bff', paddingLeft: '10px' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '8px', color: '#007bff' }}>🤖 How to Use AstroBot</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.5' }}>
              AstroBot is your guide to space exploration data. Ask specific questions like:
              <ul style={{ margin: '8px 0 0 20px', fontSize: '13px' }}>
                <li>"What are the instruments on Aditya-L1?"</li>
                <li>"Provide details on Mangalyaan’s orbit."</li>
                <li>"List ISRO’s active Earth observation satellites."</li>
              </ul>
              Follow up with related questions to explore topics in depth. Use clear, concise language for best results.
            </p>
          </div>
          <div style={{ borderLeft: '3px solid #007bff', paddingLeft: '10px' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '8px', color: '#007bff' }}>📄 Supported Content</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.5' }}>
              AstroBot is trained on a comprehensive dataset, including:
              <ul style={{ margin: '8px 0 0 20px', fontSize: '13px' }}>
                <li>ISRO mission reports (Chandrayaan, Mangalyaan, Aditya-L1)</li>
                <li>Satellite specifications (INSAT, IRS, Cartosat series)</li>
                <li>Publicly available space research papers and ISRO archives</li>
                <li>General astronomy and astrophysics knowledge</li>
              </ul>
              Note: Real-time or classified data is not supported.
            </p>
          </div>
          <div style={{ borderLeft: '3px solid #007bff', paddingLeft: '10px' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '8px', color: '#007bff' }}>🔧 Troubleshooting</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.5' }}>
              If AstroBot doesn’t respond as expected:
              <ul style={{ margin: '8px 0 0 20px', fontSize: '13px' }}>
                <li>Reword queries (e.g., "What is Cartosat-3?" instead of "Tell me about that satellite.")</li>
                <li>Split complex questions into simpler parts.</li>
                <li>Correct typos or ambiguous terms.</li>
                <li>Use the Feedback section to report issues or inaccuracies.</li>
              </ul>
            </p>
          </div>
          <div style={{ borderLeft: '3px solid #007bff', paddingLeft: '10px' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '8px', color: '#007bff' }}>📌 Use Cases</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.5' }}>
              AstroBot supports various applications:
              <ul style={{ margin: '8px 0 0 20px', fontSize: '13px' }}>
                <li><strong>Research:</strong> Access mission data for scientific studies.</li>
                <li><strong>Academic:</strong> Aid students in aerospace and astronomy coursework.</li>
                <li><strong>Policy Analysis:</strong> Understand ISRO’s role in national space programs.</li>
                <li><strong>Space Enthusiasts:</strong> Explore satellite tech and mission details.</li>
              </ul>
            </p>
          </div>
        </div>
      </PopupModal>

      <PopupModal isOpen={modals.feedback} onClose={() => toggleModal('feedback')} title="Feedback / Report Error">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Rate AstroBot</label>
            <div style={{ display: 'flex', gap: '5px' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <StarIcon key={star} style={{ color: '#ffd700', cursor: 'pointer', fontSize: '20px' }} />
              ))}
            </div>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Feedback Type</label>
            <select style={{ width: '100%', padding: '8px', borderRadius: '5px', border: 'none', backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#fff', fontSize: '14px' }}>
              <option value="general">General Feedback</option>
              <option value="error">Error Report</option>
              <option value="suggestion">Feature Suggestion</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Details</label>
            <textarea
              placeholder="Describe your feedback, error, or suggestion..."
              style={{ width: '100%', height: '100px', padding: '8px', borderRadius: '5px', border: 'none', backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#fff', fontSize: '14px' }}
            />
          </div>
          <button className="primary-button" style={{ padding: '8px', fontSize: '14px' }}>Submit</button>
        </div>
      </PopupModal>

      <PopupModal isOpen={modals.search} onClose={() => toggleModal('search')} title="Advanced Semantic Search">
  <div style={{
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    height: '100%',
    maxHeight: '70vh',
  }}>
    {/* Left Filters Panel */}
    <div style={{
      flex: '0 0 250px',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      backgroundColor: 'rgba(255, 255, 255, 0.04)',
      padding: '15px',
      borderRadius: '10px',
      border: '1px solid rgba(255, 255, 255, 0.08)',
    }}>
      <h3 style={{ fontSize: '16px', color: '#fff' }}>Search Filters</h3>

      <div>
        <label style={{ fontSize: '13px', color: '#aaa' }}>Date Range</label><br />
        <input type="date" style={{
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          padding: '6px',
          width: '100%',
        }} />
      </div>

      <div>
        <label style={{ fontSize: '13px', color: '#aaa' }}>Region</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '5px' }}>
          {["India", "Asia-Pacific", "Global", "Indian Ocean", "Arabian Sea", "Bay of Bengal", "Himalayan Region", "Coastal Areas"].map((region, i) => (
            <label key={i} style={{ fontSize: '14px', color: '#ddd' }}>
              <input type="radio" name="region" style={{ marginRight: '6px' }} /> {region}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label style={{ fontSize: '13px', color: '#aaa' }}>Document Type</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '5px' }}>
          {["All Documents", "PDF Documents", "Web Pages", "Data Tables", "Images & Diagrams"].map((type, i) => (
            <label key={i} style={{ fontSize: '14px', color: '#ddd' }}>
              <input type="radio" name="docType" style={{ marginRight: '6px' }} /> {type}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label style={{ fontSize: '13px', color: '#aaa' }}>Knowledge Graph Reasoning</label><br />
        <label style={{ fontSize: '14px', color: '#ddd' }}>
          <input type="checkbox" style={{ marginRight: '6px' }} /> Enable
        </label>
      </div>

      <button className="primary-button" style={{ fontSize: '14px', marginTop: '10px' }}>Apply Filters</button>
    </div>

    {/* Right Panel: Search Input & Placeholder */}
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px' }}>
      {/* Search Box */}
      <div style={{
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <input
          type="text"
          placeholder="Enter your natural language query about ISRO missions, weather data, or documents..."
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            color: '#fff',
            fontSize: '14px',
            outline: 'none',
          }}
        />
        <button className="primary-button" style={{ whiteSpace: 'nowrap', fontSize: '14px', padding: '8px 16px' }}>
          Search
        </button>
      </div>

      {/* KG status tag */}
      <div style={{
        backgroundColor: 'rgba(0, 128, 255, 0.15)',
        padding: '6px 12px',
        borderRadius: '6px',
        fontSize: '13px',
        color: '#66ccff',
        fontWeight: '500',
        maxWidth: 'fit-content'
      }}>
        ✅ Knowledge Graph reasoning enabled — enhanced semantic search active
      </div>

      {/* Results / Empty State */}
      <div style={{
        flex: 1,
        borderRadius: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        border: '1px dashed rgba(255, 255, 255, 0.15)',
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ccc',
        textAlign: 'center',
        gap: '10px'
      }}>
        <div style={{ fontSize: '30px' }}>🔍</div>
        <h3 style={{ fontSize: '16px', color: '#fff' }}>Start Your Search</h3>
        <p style={{ fontSize: '13px' }}>Enter a natural language query to search through ISRO’s knowledge base</p>
        <div style={{ marginTop: '10px', fontSize: '13px', opacity: 0.8 }}>
          <em>Example queries:</em><br />
          “Show me recent satellite launches from Sriharikota”<br />
          “Weather patterns in the Indian Ocean region”<br />
          “Chandrayaan mission technical specifications”
        </div>
      </div>
    </div>
  </div>
</PopupModal>


      <PopupModal isOpen={modals.visualizer} onClose={() => toggleModal('visualizer')} title="Satellite Product Visualizer">
  <div style={{
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    maxHeight: '70vh',
  }}>
    {/* Left Controls */}
    <div style={{
      flex: '0 0 260px',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      backgroundColor: 'rgba(255, 255, 255, 0.04)',
      padding: '15px',
      borderRadius: '10px',
      border: '1px solid rgba(255, 255, 255, 0.08)',
    }}>
      <input
        type="text"
        placeholder="Search satellite..."
        style={{
          padding: '10px 14px',
          borderRadius: '30px',
          border: 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          color: '#fff',
          fontSize: '14px',
        }}
      />

      <div>
        <label style={{ fontSize: '14px', color: '#aaa' }}>Timestamps</label>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          marginTop: '8px'
        }}>
          {satelliteImages.map((image, index) => (
            <button
              key={index}
              className={`timeline-button ${selectedTime === index ? 'active' : ''}`}
              onClick={() => setSelectedTime(index)}
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                backgroundColor: selectedTime === index ? 'rgba(0, 128, 255, 0.2)' : 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#fff',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              {formatTimestamp(satelliteImages[index].timestamp)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label style={{ fontSize: '14px', color: '#aaa' }}>Zoom Controls</label>
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <button onClick={() => handleZoom('in')} className="zoom-button">+</button>
          <button onClick={() => handleZoom('out')} className="zoom-button">−</button>
          <button onClick={() => setZoomLevel(1)} className="reset-button">Reset</button>

        </div>
        <p style={{ fontSize: '12px', color: '#ccc', marginTop: '5px' }}>Zoom: {(zoomLevel * 100).toFixed(0)}%</p>
      </div>
    </div>

    {/* Right Viewer */}
    <div style={{
  flex: 1,
  minWidth: '350px',
  height: '380px',
  position: 'relative',
  borderRadius: '12px',
  overflow: 'hidden',
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
}}>

      <img
        src="/in.png"
        alt="Satellite View"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${zoomLevel})`,
          transition: 'transform 0.3s ease',
        }}
      />
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        backgroundColor: 'rgba(0,0,0,0.4)',
        padding: '6px 12px',
        borderRadius: '6px',
        fontSize: '13px',
        color: '#fff'
      }}>
        Timestamp: {formatTimestamp(satelliteImages[selectedTime].timestamp)}
      </div>
    </div>
  </div>
</PopupModal>


      // Knowledge Graph Explorer JSX Component
<PopupModal isOpen={modals.knowledgeGraph} onClose={() => toggleModal('knowledgeGraph')} title="Knowledge Graph Explorer">
  <div className="knowledge-graph-container">
    {/* Left Sidebar */}
    <div className="knowledge-graph-sidebar">
      <div className="search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for entities, relationships, or concepts..."
            className="search-input"
          />
          <button className="search-button">
            🔍
          </button>
        </div>
        <div className="action-buttons">
          <button className="action-button">
            🔧 Advanced Filters
          </button>
          <button className="action-button">
            📊 Export Graph
          </button>
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Filter by Domain</h3>
        <div className="filter-options">
          <div className="filter-option active">
            📡 All Domains
          </div>
          <div className="filter-option inactive">
            🛰️ Satellites
          </div>
          <div className="filter-option inactive">
            🌤️ Weather
          </div>
          <div className="filter-option inactive">
            🚀 Missions
          </div>
          <div className="filter-option inactive">
            📍 Locations
          </div>
        </div>
      </div>

      <div className="view-tabs">
        <button className="view-tab active">
          Graph View
        </button>
        <button className="view-tab inactive">
          Table View
        </button>
        <button className="view-tab inactive">
          Relationships
        </button>
      </div>
    </div>

    {/* Main Graph Area */}
    <div className="graph-main-area">
      <div className="graph-controls">
        <button className="control-button">
          🔍 Fullscreen
        </button>
      </div>

      <div className="graph-content">
        <h2 className="graph-title">
          Interactive Network Graph
        </h2>
        
        <div className="graph-nodes-container">
          <div className="graph-node chandrayaan">
            Chandrayaan
          </div>
          
          <div className="connection-line"></div>
          
          <div className="graph-node cartosat">
            Cartosat
          </div>
        </div>

        <div className="graph-info-container">
          <div className="graph-icon">
            <div className="graph-icon-inner"></div>
          </div>
          
          <div className="graph-info-text">
            <p className="graph-info-title">
              Interactive Knowledge Graph
            </p>
            <p className="graph-info-subtitle">
              Click on nodes to explore relationships
            </p>
          </div>
        </div>

        <div className="graph-node pslv">
          PSLV
        </div>
      </div>
    </div>
  </div>
</PopupModal>
    </div>
  );
}

export default Chat;