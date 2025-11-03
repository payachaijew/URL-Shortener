/**
 * Custom Hook for URL Shortener Logic
 * Manages state and business logic for URL shortening
 */

import { useState, useEffect, useCallback } from 'react';
import {
  generateShortCode,
  isValidURL,
  normalizeURL,
  createURLObject
} from '../utils/urlShortener';
import {
  saveURLMapping,
  findExistingShortCode,
  shortCodeExists,
  addToHistory,
  getHistory,
  clearHistory as clearStorageHistory,
  getURLByShortCode
} from '../utils/storage';

/**
 * Custom hook for URL shortener functionality
 * @returns {Object} Hook state and methods
 */
export const useURLShortener = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);
  const [isCached, setIsCached] = useState(false);

  // Load history on mount
  useEffect(() => {
    loadHistory();
  }, []);

  /**
   * Loads history from localStorage
   */
  const loadHistory = useCallback(() => {
    const savedHistory = getHistory();
    setHistory(savedHistory);
  }, []);

  /**
   * Validates and normalizes input URL
   * @param {string} url - URL to validate
   * @returns {string|null} Normalized URL or null if invalid
   */
  const validateAndNormalizeURL = (url) => {
    if (!url.trim()) {
      setError('Please enter a URL');
      return null;
    }

    const normalized = normalizeURL(url);

    if (!isValidURL(normalized)) {
      setError('Please enter a valid URL');
      return null;
    }

    return normalized;
  };

  /**
   * Generates unique short code that doesn't already exist
   * @returns {string} Unique short code
   */
  const generateUniqueShortCode = () => {
    let shortCode;
    let attempts = 0;
    const maxAttempts = 10;

    do {
      shortCode = generateShortCode();
      attempts++;
    } while (shortCodeExists(shortCode) && attempts < maxAttempts);

    if (attempts >= maxAttempts) {
      throw new Error('Failed to generate unique short code');
    }

    return shortCode;
  };

  /**
   * Main function to shorten a URL
   */
  const shortenURL = async () => {
    setError('');
    setIsCached(false);

    const normalizedUrl = validateAndNormalizeURL(inputUrl);
    if (!normalizedUrl) return;

    setIsLoading(true);

    // Simulate network delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      // Check if URL already has a short code (caching)
      const existingShortCode = findExistingShortCode(normalizedUrl);

      if (existingShortCode) {
        // Retrieve the actual cached data with all metadata
        const cachedUrl = getURLByShortCode(existingShortCode);
        if (cachedUrl) {

          setShortenedUrl(cachedUrl);

          setIsCached(true);

          // Add to history so it appears in the history list

          addToHistory(cachedUrl);

          // Reload history to update UI

          loadHistory();

          setIsLoading(false);

          return;

        }
      }

      // Generate new short code
      const shortCode = generateUniqueShortCode();
      const urlData = createURLObject(normalizedUrl, shortCode);

      // Save to storage
      saveURLMapping(shortCode, urlData);
      addToHistory(urlData);

      // Update state
      setShortenedUrl(urlData);
      loadHistory();
    } catch (err) {
      setError(err.message || 'Failed to shorten URL. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Copies text to clipboard
   * @param {string} text - Text to copy
   */
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error('Failed to copy:', err);
      return false;
    }
  };

  /**
   * Resets the form to initial state
   */
  const resetForm = () => {
    setInputUrl('');
    setShortenedUrl(null);
    setError('');
    setIsCached(false);
  };

  /**
   * Clears all history
   */
  const clearHistory = () => {
    clearStorageHistory();
    setHistory([]);
    setShortenedUrl(null);
  };

  return {
    // State
    inputUrl,
    shortenedUrl,
    isLoading,
    error,
    history,
    isCached,

    // Methods
    setInputUrl,
    shortenURL,
    copyToClipboard,
    resetForm,
    clearHistory
  };
};