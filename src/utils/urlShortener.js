/**
 * URL Shortener Utility Module
 * Provides functions for generating short codes and validating URLs
 */

/**
 * Generates a random short code for URL shortening
 * @param {number} length - Length of the short code (default: 6)
 * @returns {string} Random alphanumeric short code
 */
export const generateShortCode = (length = 6) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return result;
};

/**
 * Validates if a string is a valid URL
 * @param {string} url - URL string to validate
 * @returns {boolean} True if valid URL, false otherwise
 */
export const isValidURL = (url) => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch (error) {
    return false;
  }
};

/**
 * Normalizes URL by ensuring it has a protocol
 * @param {string} url - URL to normalize
 * @returns {string} Normalized URL with protocol
 */
export const normalizeURL = (url) => {
  const trimmedUrl = url.trim();
  
  if (!/^https?:\/\//i.test(trimmedUrl)) {
    return `https://${trimmedUrl}`;
  }
  
  return trimmedUrl;
};

/**
 * Creates a shortened URL object with metadata
 * @param {string} originalUrl - Original long URL
 * @param {string} shortCode - Generated short code
 * @returns {Object} URL object with metadata
 */
export const createURLObject = (originalUrl, shortCode) => {
  return {
    id: Date.now(),
    originalUrl,
    shortCode,
    shortUrl: `${window.location.origin}/${shortCode}`,
    createdAt: new Date().toISOString(),
    clicks: 0
  };
};