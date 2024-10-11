import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import sofaImage from './assets/sofa_image.jpg';

const App = () => {
  const [showIframe, setShowIframe] = useState(false);
  const iframeRef = useRef(null);

  const handleShowIframe = () => {
    setShowIframe(!showIframe); // Toggle the iframe visibility
  };

  // Close the iframe when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (iframeRef.current && !iframeRef.current.contains(event.target)) {
        setShowIframe(false); // Close iframe
      }
    };

    // Add event listener for click outside
    if (showIframe) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showIframe]);

  return (
    <div className="app">
      <header className="header">
        <h1>Castlery Furniture Collection</h1>
        <p>Discover the exquisite Castlery furniture, designed to fit your style and elevate your living space.</p>
      </header>

      <section className="furniture-container">
        <div className="furniture-display">
          <img src={sofaImage} alt="Castlery Sofa" className="furniture-image" />
          <div className="furniture-info">
            <h2>Elegant Castlery Sofa</h2>
            <p>A blend of style and comfort from Castlery, perfect for your living room.</p>
            <button className="view-3d-btn" onClick={handleShowIframe}>
              Call Sales
            </button>
          </div>
        </div>

        {/* Iframe popup */}
        {showIframe && (
          <div
            className="iframe-popup"
            ref={iframeRef} // Attach the ref to the iframe container
          >
            <iframe
              title="Furniture Details"
              style={{ width: '100%', height: '100%', border: 'none' }}
              src="https://vapi.ai?demo=true&shareKey=fe502c7f-d3a8-46bf-a2d8-aea6eb0d1ea0&assistantId=dd812e24-c416-4d87-9427-d615d4e6ea2a"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </section>
    </div>
  );
};

export default App;
