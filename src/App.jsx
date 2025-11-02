/**
 * App Component
 * Root component with routing configuration
 */

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom';
import URLShortener from './components/URLShortener/URLShortener';
import { getURLByShortCode, incrementClicks } from './utils/storage';

/**
 * Redirect component that handles short code redirects
 */
const RedirectHandler = () => {
  const { shortCode } = useParams();

  useEffect(() => {
    // Get the URL data from storage
    const urlData = getURLByShortCode(shortCode);

    if (urlData) {
      // Increment click count
      incrementClicks(shortCode);

      // Redirect to original URL
      window.location.href = urlData.originalUrl;
    }
  }, [shortCode]);

  // If URL not found, redirect to home
  const urlData = getURLByShortCode(shortCode);
  
  if (!urlData) {
    return <Navigate to="/" replace />;
  }

  // Show loading state while redirecting
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontSize: '1.5rem',
      fontWeight: '600'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔗</div>
        <div>Redirecting...</div>
      </div>
    </div>
  );
};

/**
 * Main App Component
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* Home page with URL shortener */}
        <Route path="/" element={<URLShortener />} />
        
        {/* Short code redirect handler */}
        <Route path="/:shortCode" element={<RedirectHandler />} />
      </Routes>
    </Router>
  );
}

export default App;