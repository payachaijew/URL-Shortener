/**
 * ResultDisplay Component
 * Displays the shortened URL result with copy functionality
 */

import React, { useState } from 'react';
import {
  ResultContainer,
  SuccessIcon,
  ResultTitle,
  CachedBadge,
  URLBox,
  URLLabel,
  URLText,
  CopyButton,
  OriginalURL,
  ActionButtons,
  SecondaryButton
} from './ResultDisplay.styles';

/**
 * Result display component showing shortened URL
 * @param {Object} props - Component props
 * @param {Object} props.urlData - URL data object
 * @param {boolean} props.isCached - Whether URL was retrieved from cache
 * @param {Function} props.onCopy - Copy to clipboard handler
 * @param {Function} props.onReset - Reset form handler
 */
const ResultDisplay = ({ urlData, isCached, onCopy, onReset }) => {
  const [copied, setCopied] = useState(false);

  /**
   * Handles copy button click
   */
  const handleCopy = async () => {
    const success = await onCopy(urlData.shortUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  /**
   * Handles visiting the shortened URL
   */
  const handleVisit = () => {
    window.open(urlData.shortUrl, '_blank', 'noopener,noreferrer');
  };

  if (!urlData) return null;

  return (
    <ResultContainer role="region" aria-label="Shortened URL result">
      <SuccessIcon aria-label="Success">
        ✓
      </SuccessIcon>

      <ResultTitle>
        URL Shortened Successfully!
        {isCached && (
          <CachedBadge aria-label="Retrieved from cache">
            Cached
          </CachedBadge>
        )}
      </ResultTitle>

      <URLBox>
        <URLLabel>Shortened URL</URLLabel>
        <URLText>
          <span>{urlData.shortUrl}</span>
          <CopyButton
            onClick={handleCopy}
            copied={copied}
            aria-label={copied ? "Copied!" : "Copy to clipboard"}
          >
            {copied ? '✓ Copied!' : '📋 Copy'}
          </CopyButton>
        </URLText>
      </URLBox>

      <OriginalURL>
        <strong>Original:</strong> {urlData.originalUrl}
      </OriginalURL>

      <ActionButtons>
        <SecondaryButton
          onClick={handleVisit}
          aria-label="Visit shortened URL"
        >
          🔗 Visit URL
        </SecondaryButton>
        <SecondaryButton
          onClick={onReset}
          aria-label="Shorten another URL"
        >
          ✨ Shorten Another
        </SecondaryButton>
      </ActionButtons>
    </ResultContainer>
  );
};

export default ResultDisplay;