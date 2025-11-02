/**
 * ResultDisplay Component
 * Displays the shortened URL result with copy functionality and QR code
 */

import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
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

  /**
   * Handles sharing via Web Share API
   */
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this link!',
          text: `Shortened URL: ${urlData.shortUrl}`,
          url: urlData.shortUrl
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      handleCopy();
    }
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

      {/* QR Code Section */}
      <div style={{ 
        background: 'white', 
        padding: '1.5rem', 
        borderRadius: '12px', 
        marginTop: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>
          📱 SCAN QR CODE
        </div>
        <QRCodeSVG 
          value={urlData.shortUrl} 
          size={150}
          level="H"
          includeMargin={true}
        />
      </div>

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