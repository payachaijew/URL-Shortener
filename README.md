URL Shortener web application b uilt with React and Emotion styled components. Transform long URLs into short and shareable links.

Features
1. Convert long URLs to short links in no time.
2. Automically reuses existing short codes for duplicate URLs.
3. Monitor how many times each shortened link is clicked.
4. Copy shortened URLs to clipboard instantly.
5. smooth animations throughout the app.
6. Shortened URLs actually work and redirect to originals URLs.

Live Demo
Visit the live application: [URL Shortener](http://localhost:5174)

Technologies Used 
- React 18: UI library
- Emotion: CSS in JS styling with styled component
- React Router: Client side routing for URL redirects
- LocalStorage API: Data persistence
- vite: Build tool and development server

Prerequisites
Before runing this project, make sure that you have:
- Node.js (version 14 or higher)
- npm or yarn package manager
- Modern web Browser 

Project Structure

## 📁 Project Structure

url-shortener/
│
│  package.json        # Dependencies and scripts
│  README.md           # Documentation
│
├─ public/             # Static assets
│
└─ src/
   │
   ├─ components/
   │   • URLShortener/       # Main app component  
   │   • URLInput/           # Input form component  
   │   • ResultDisplay/      # Result display component  
   │   • LinkHistory/        # History list component  
   │
   ├─ hooks/
   │   • useURLShortener.js  # Custom hook for logic  
   │
   ├─ utils/
   │   • urlShortener.js     # URL shortening utilities  
   │   • storage.js          # LocalStorage management  
   │
   • App.jsx                 # Root component with routing  
   • main.jsx                # Application entry point  
   • index.css               # Global styles


How It Works

1. User Input: User enters a long URL in the input field
2. Validation: URL is validated and normalized (adds https:// if missing)
3. Short Code Generation: A unique 6-character alphanumeric code is generated
4. Caching Check: System checks if URL already has a short code to avoid duplicates
5. Storage: Short code and URL mapping are stored in browser's localStorage
6. Display: Shortened URL is displayed with copy functionality
7. History: URL is added to history with timestamp and click tracking
8. Redirect: When someone visits the short URL, they're redirected to the original