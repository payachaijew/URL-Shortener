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
  const [redirectUrl, setRedirectUrl] = React.useState(null);
  const [notFound, setNotFound] = React.useState(false);

  useEffect(() => {
    // First, try to get the URL from the hash (encoded in the short URL)
    const hash = window.location.hash.substring(1); // Remove the # symbol
    let originalUrl = null;

    if (hash) {
      try {
        // Decode the URL from base64
        originalUrl = decodeURIComponent(atob(hash));
      } catch (error) {
        console.error('Error decoding URL from hash:', error);
      }
    }

    // If hash is not available, fall back to localStorage
    if (!originalUrl) {
      const urlData = getURLByShortCode(shortCode);
      if (urlData) {
        originalUrl = urlData.originalUrl;
      }
    }

    if (originalUrl) {
      // Increment click count in localStorage (for the creator's stats)
      incrementClicks(shortCode);

      // Set the redirect URL
      setRedirectUrl(originalUrl);

      // Redirect to original URL
      window.location.href = originalUrl;
    } else {
      // URL not found
      setNotFound(true);
    }
  }, [shortCode]);

  // If URL not found, redirect to home
  if (notFound) {
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