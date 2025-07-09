import React from 'react';

function LearnMore() {
  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        padding: '60px 20px',
      }}
    >
      <div
        className="glass-card p-5 rounded-4 shadow-lg"
        style={{
          maxWidth: '1000px',
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'white',
        }}
      >
        <h1 className="mb-4 fw-bold" style={{ color: '#4dabf7' }}>Explore Astra-Q</h1>

        <p className="lead mb-4">
          Astra-Q is an AI assistant tailored for exploring ISRO’s MOSDAC data. It offers conversational access to satellite-derived products and remote sensing datasets.
        </p>

        <h4 className="mt-5 text-info">⚙️ Architecture</h4>
        <img src="/architecture.png" alt="Architecture" className="img-fluid rounded-3 my-3" />

        <h4 className="mt-5 text-info">🌟 Features</h4>
        <ul>
          <li>Semantic search with document-based retrieval</li>
          <li>Knowledge graph-based contextual reasoning</li>
          <li>Handles PDFs, APIs, and dynamic content</li>
        </ul>
        <img src="/feature.png" alt="Features" className="img-fluid rounded-3 my-3" />

        <h4 className="mt-5 text-info">🔁 Process Flow</h4>
        <p>This is how a query flows from user to response generation:</p>
        <img src="/process_flow.png" alt="Process Flow" className="img-fluid rounded-3 my-3" />

        <a href="/" className="btn btn-outline-light mt-4">← Back to Home</a>
      </div>
    </div>
  );
}

export default LearnMore;
