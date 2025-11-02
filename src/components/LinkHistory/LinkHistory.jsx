/**
 * LinkHistory Component
 * Displays history of shortened URLs with copy functionality
 */

import React, { useState } from 'react';
import {
  HistoryContainer,
  HistoryHeader,
  HistoryTitle,
  HistoryCount,
  ClearButton,
  HistoryList,
  HistoryItem,
  ItemHeader,
  ItemURLs,
  ShortURL,
  OriginalURLText,
  ItemMeta,
  MetaItem,
  CopyButtonSmall,
  EmptyState,
  EmptyIcon,
  EmptyText
} from './LinkHistory.styles';

/**
 * Link history component
 * @param {Object} props - Component props
 * @param {Array} props.history - Array of URL history items
 * @param {Function} props.onCopy - Copy to clipboard handler
 * @param {Function} props.onClear - Clear history handler
 */
const LinkHistory = ({ history, onCopy, onClear }) => {
  const [copiedId, setCopiedId] = useState(null);

  /**
   * Handles copy button click for a specific item
   * @param {string} url - URL to copy
   * @param {number} id - Item ID
   */
  const handleCopy = async (url, id) => {
    const success = await onCopy(url);
    if (success) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  /**
   * Formats date to relative time
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString();
  };

  /**
   * Handles clicking on shortened URL
   * @param {string} url - URL to open
   */
  const handleURLClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (history.length === 0) {
    return (
      <HistoryContainer>
        <EmptyState>
          <EmptyIcon>🔗</EmptyIcon>
          <EmptyText>No shortened URLs yet</EmptyText>
          <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.5rem' }}>
            Your shortened URLs will appear here
          </p>
        </EmptyState>
      </HistoryContainer>
    );
  }

  return (
    <HistoryContainer>
      <HistoryHeader>
        <HistoryTitle>
          📚 Link History
          <HistoryCount>{history.length}</HistoryCount>
        </HistoryTitle>
        <ClearButton
          onClick={onClear}
          aria-label="Clear all history"
        >
          🗑️ Clear All
        </ClearButton>
      </HistoryHeader>

      <HistoryList role="list" aria-label="URL history">
        {history.map((item, index) => (
          <HistoryItem 
            key={item.id} 
            index={index}
            role="listitem"
          >
            <ItemHeader>
              <ItemURLs>
                <ShortURL
                  onClick={() => handleURLClick(item.shortUrl)}
                  title="Click to visit"
                  role="link"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleURLClick(item.shortUrl);
                  }}
                >
                  {item.shortUrl}
                </ShortURL>
                <OriginalURLText>
                  {item.originalUrl}
                </OriginalURLText>
              </ItemURLs>
              <CopyButtonSmall
                onClick={() => handleCopy(item.shortUrl, item.id)}
                aria-label={copiedId === item.id ? "Copied!" : "Copy URL"}
              >
                {copiedId === item.id ? '✓' : '📋'}
              </CopyButtonSmall>
            </ItemHeader>

            <ItemMeta>
              <MetaItem title="Date created">
                🕐 {formatDate(item.createdAt)}
              </MetaItem>
              <MetaItem title="Click count">
                👆 {item.clicks || 0} clicks
              </MetaItem>
              <MetaItem title="Short code">
                🔑 {item.shortCode}
              </MetaItem>
            </ItemMeta>
          </HistoryItem>
        ))}
      </HistoryList>
    </HistoryContainer>
  );
};

export default LinkHistory;