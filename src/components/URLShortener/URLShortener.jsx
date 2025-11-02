/**
 * URLShortener Component
 * Main component that orchestrates the URL shortening application
 */

import React from 'react';
import { useURLShortener } from '../../hooks/useURLShortener';
import URLInput from '../URLInput/URLInput';
import ResultDisplay from '../ResultDisplay/ResultDisplay';
import LinkHistory from '../LinkHistory/LinkHistory';
import {
  Container,
  MainCard,
  Header,
  Logo,
  Title,
  Subtitle,
  Footer,
  FooterLink,
  Features,
  Feature,
  FeatureIcon
} from './URLShortener.styles';

/**
 * Main URL Shortener Application Component
 * Manages the entire URL shortening workflow
 */
const URLShortener = () => {
  const {
    inputUrl,
    shortenedUrl,
    isLoading,
    error,
    history,
    isCached,
    setInputUrl,
    shortenURL,
    copyToClipboard,
    resetForm,
    clearHistory
  } = useURLShortener();

  return (
    <Container>
      <MainCard>
        <Header>
          <Logo aria-label="URL Shortener Logo">🔗</Logo>
          <Title>URL Shortener</Title>
          <Subtitle>
            Shorten your long URLs instantly and share them easily
          </Subtitle>
        </Header>

        <Features>
          <Feature>
            <FeatureIcon>⚡</FeatureIcon>
            Instant Shortening
          </Feature>
          <Feature>
            <FeatureIcon>💾</FeatureIcon>
            Smart Caching
          </Feature>
          <Feature>
            <FeatureIcon>📊</FeatureIcon>
            Link History
          </Feature>
          <Feature>
            <FeatureIcon>🎨</FeatureIcon>
            Beautiful UI
          </Feature>
        </Features>

        <URLInput
          value={inputUrl}
          onChange={setInputUrl}
          onSubmit={shortenURL}
          error={error}
          isLoading={isLoading}
          disabled={isLoading}
        />

        {shortenedUrl && (
          <ResultDisplay
            urlData={shortenedUrl}
            isCached={isCached}
            onCopy={copyToClipboard}
            onReset={resetForm}
          />
        )}

        <LinkHistory
          history={history}
          onCopy={copyToClipboard}
          onClear={clearHistory}
        />

        <Footer>
          <p>
            Built with ❤️ using React & Emotion
          </p>
          <p style={{ marginTop: '0.5rem' }}>
            <FooterLink
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </FooterLink>
          </p>
        </Footer>
      </MainCard>
    </Container>
  );
};

export default URLShortener;