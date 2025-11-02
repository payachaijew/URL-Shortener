/**
 * Local Storage Management Module
 * Handles all localStorage operations for URL shortener
 */

const STORAGE_KEYS = {
  URL_MAPPINGS: 'urlShortener_mappings',
  URL_HISTORY: 'urlShortener_history'
};

/**
 * Saves URL mapping to localStorage
 * @param {string} shortCode - Short code identifier
 * @param {Object} urlData - URL data object
 */
export const saveURLMapping = (shortCode, urlData) => {
  try {
    const mappings = getURLMappings();
    mappings[shortCode] = urlData;
    localStorage.setItem(STORAGE_KEYS.URL_MAPPINGS, JSON.stringify(mappings));
  } catch (error) {
    console.error('Error saving URL mapping:', error);
    throw new Error('Failed to save URL mapping');
  }
};

/**
 * Retrieves all URL mappings from localStorage
 * @returns {Object} Object containing all URL mappings
 */
export const getURLMappings = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.URL_MAPPINGS);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error retrieving URL mappings:', error);
    return {};
  }
};

/**
 * Gets URL data by short code
 * @param {string} shortCode - Short code to lookup
 * @returns {Object|null} URL data object or null if not found
 */
export const getURLByShortCode = (shortCode) => {
  const mappings = getURLMappings();
  return mappings[shortCode] || null;
};

/**
 * Checks if a short code already exists
 * @param {string} shortCode - Short code to check
 * @returns {boolean} True if exists, false otherwise
 */
export const shortCodeExists = (shortCode) => {
  const mappings = getURLMappings();
  return shortCode in mappings;
};

/**
 * Finds existing short code for a given original URL
 * @param {string} originalUrl - Original URL to search for
 * @returns {string|null} Short code if found, null otherwise
 */
export const findExistingShortCode = (originalUrl) => {
  const mappings = getURLMappings();
  
  for (const [shortCode, urlData] of Object.entries(mappings)) {
    if (urlData.originalUrl === originalUrl) {
      return shortCode;
    }
  }
  
  return null;
};

/**
 * Adds URL to history
 * @param {Object} urlData - URL data to add to history
 */
export const addToHistory = (urlData) => {
  try {
    const history = getHistory();
    // Add to beginning of array (most recent first)
    history.unshift(urlData);
    // Keep only last 50 entries
    const limitedHistory = history.slice(0, 50);
    localStorage.setItem(STORAGE_KEYS.URL_HISTORY, JSON.stringify(limitedHistory));
  } catch (error) {
    console.error('Error adding to history:', error);
  }
};

/**
 * Retrieves URL history from localStorage
 * @returns {Array} Array of URL data objects
 */
export const getHistory = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.URL_HISTORY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error retrieving history:', error);
    return [];
  }
};

/**
 * Clears all history
 */
export const clearHistory = () => {
  try {
    localStorage.setItem(STORAGE_KEYS.URL_HISTORY, JSON.stringify([]));
  } catch (error) {
    console.error('Error clearing history:', error);
  }
};

/**
 * Increments click count for a short code
 * @param {string} shortCode - Short code to increment clicks for
 */
export const incrementClicks = (shortCode) => {
  try {
    const mappings = getURLMappings();
    if (mappings[shortCode]) {
      mappings[shortCode].clicks = (mappings[shortCode].clicks || 0) + 1;
      localStorage.setItem(STORAGE_KEYS.URL_MAPPINGS, JSON.stringify(mappings));
    }
  } catch (error) {
    console.error('Error incrementing clicks:', error);
  }
};