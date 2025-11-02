/**
 * URLInput Component
 * Renders the input field and submit button for URL shortening
 */

import React from 'react';
import {
  InputContainer,
  InputWrapper,
  Input,
  Button,
  ErrorMessage,
  LoadingSpinner
} from './URLInput.styles';

/**
 * URL Input component with validation and loading states
 * @param {Object} props - Component props
 * @param {string} props.value - Current input value
 * @param {Function} props.onChange - Input change handler
 * @param {Function} props.onSubmit - Form submit handler
 * @param {string} props.error - Error message to display
 * @param {boolean} props.isLoading - Loading state
 * @param {boolean} props.disabled - Disabled state
 */
const URLInput = ({ 
  value, 
  onChange, 
  onSubmit, 
  error, 
  isLoading,
  disabled 
}) => {
  /**
   * Handles form submission
   * @param {Event} e - Form event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoading && !disabled) {
      onSubmit();
    }
  };

  /**
   * Handles Enter key press
   * @param {KeyboardEvent} e - Keyboard event
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <InputContainer>
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          <Input
            type="text"
            placeholder="Enter your long URL here..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={handleKeyPress}
            hasError={!!error}
            disabled={isLoading || disabled}
            aria-label="URL input"
            aria-invalid={!!error}
            aria-describedby={error ? "url-error" : undefined}
          />
          <Button
            type="submit"
            disabled={isLoading || disabled}
            isLoading={isLoading}
            aria-label={isLoading ? "Shortening URL..." : "Shorten URL"}
          >
            {isLoading ? (
              <>
                <LoadingSpinner />
                <span style={{ marginLeft: '0.5rem' }}>Shortening...</span>
              </>
            ) : (
              'Shorten URL'
            )}
          </Button>
        </InputWrapper>
        {error && (
          <ErrorMessage id="url-error" role="alert">
            {error}
          </ErrorMessage>
        )}
      </form>
    </InputContainer>
  );
};

export default URLInput;