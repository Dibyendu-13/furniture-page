import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import sofaImage from './assets/sofa_image.jpg';

const App = () => {
  const [showIframe, setShowIframe] = useState(false);
  const iframeRef = useRef(null);

  const handleShowIframe = () => {
    requestMicrophoneAccess(); // Request microphone access
    setShowIframe(true); // Show the iframe
  };

  // Request microphone access
  const requestMicrophoneAccess = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('Microphone access granted');
      // Optionally send a message to the iframe to start voice recognition
      if (iframeRef.current) {
        const iframeWindow = iframeRef.current.contentWindow;
        if (iframeWindow) {
          iframeWindow.postMessage("Start voice recognition", '*');
        }
      }
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
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

  // Handle messages from the iframe
  useEffect(() => {
    const handleMessage = (event) => {
      // Check the origin of the message for security
      if (event.origin !== 'https://vapi.ai') {
        return;
      }
      console.log('Message from iframe:', event.data);
    };

    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

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
          <div className="iframe-popup" ref={iframeRef}>
            <iframe
              title="Furniture Details"
              style={{ width: '100%', height: '100%', border: 'none' }}
              allow="microphone"
              src="https://vapi.ai?demo=true&shareKey=fa00851b-217c-40ad-bb83-06eebe97910a&assistantId=8c191741-8543-464c-abf2-d820fe6f785d"
              frameBorder="0"
              allowFullScreen
              onLoad={() => {
                // Optionally send a message to the iframe to start voice recognition
                if (showIframe) {
                  const iframeWindow = iframeRef.current.contentWindow;
                  if (iframeWindow) {
                    iframeWindow.postMessage("Start voice recognition", '*');
                  }
                }
              }}
            ></iframe>
          </div>
        )}
      </section>
    </div>
  );
};

export default App;
