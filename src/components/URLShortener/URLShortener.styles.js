import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
  padding: 2rem 1rem;
`;

export const MainCard = styled.main`
  max-width: 800px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  padding: 3rem 2rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  animation: ${fadeInDown} 0.6s ease-out;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

export const Logo = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: ${fadeInDown} 0.6s ease-out 0.1s both;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  animation: ${fadeInDown} 0.6s ease-out 0.2s both;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #6b7280;
  animation: ${fadeInDown} 0.6s ease-out 0.3s both;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const Footer = styled.footer`
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid #e5e7eb;
  color: #6b7280;
  font-size: 0.875rem;
`;

export const FooterLink = styled.a`
  color: #3b82f6;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;

  &:hover {
    color: #2563eb;
    text-decoration: underline;
  }
`;

export const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
  padding: 1.5rem;
  background: #f9fafb;
  border-radius: 12px;
`;

export const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #4b5563;
  font-weight: 500;
`;

export const FeatureIcon = styled.span`
  font-size: 1.25rem;
`;