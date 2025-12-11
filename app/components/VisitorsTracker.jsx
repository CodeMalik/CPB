'use client';
import { useState, useEffect } from 'react';

const VisitorsTracker = () => {
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    // Check if cookies were previously accepted
    const savedCookies = localStorage.getItem('cookiesAccepted');
    
    if (savedCookies === 'true') {
      setCookiesAccepted(true);
      setShowCookieBanner(false);
    } else {
      // Only show banner if cookies haven't been accepted yet
      setShowCookieBanner(true);
    }

    // Track visitor on initial load (IP address always tracked)
    trackVisitor();
  }, []);

  useEffect(() => {
    // Try to get email from browser when component mounts
    // This works if user is logged into browser services (Chrome/Firefox)
    if (cookiesAccepted) {
      getBrowserEmail();
    }
  }, [cookiesAccepted]);

  const getBrowserEmail = () => {
    // Try to get email from browser's password manager or autofill
    // Note: This requires user interaction and browser support
    if (typeof document !== 'undefined') {
      // Method 1: Check for saved credentials
      if (navigator.credentials && navigator.credentials.get) {
        navigator.credentials.get({
          password: true,
          mediation: 'silent'
        }).then(cred => {
          if (cred && cred.id && cred.id.includes('@')) {
            setUserEmail(cred.id);
            localStorage.setItem('userEmail', cred.id);
            updateVisitorWithEmail(cred.id);
          }
        }).catch(() => {
          // Silent mode might fail, that's okay
        });
      }

      // Method 2: Look for email in localStorage from previous sessions
      const savedEmail = localStorage.getItem('userEmail');
      if (savedEmail && savedEmail.includes('@')) {
        setUserEmail(savedEmail);
      }
    }
  };

  const trackVisitor = async () => {
    try {
      await fetch('/api/visitors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          action: 'track',
          // Always track IP, no email initially
        }),
      });
    } catch (error) {
      console.error('Error tracking visitor:', error);
    }
  };

  const handleAcceptCookies = async () => {
    setCookiesAccepted(true);
    setShowCookieBanner(false);
    localStorage.setItem('cookiesAccepted', 'true');
    
    // Try to get email from browser after accepting cookies
    getBrowserEmail();
    
    // Update visitor record to mark cookies as accepted
    updateCookiesAcceptance(true);
  };

  const handleDeclineCookies = () => {
    setShowCookieBanner(false);
    localStorage.setItem('cookiesAccepted', 'false');
    updateCookiesAcceptance(false);
  };

  const updateVisitorWithEmail = async (email) => {
    try {
      await fetch('/api/visitors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          action: 'update',
          email: email,
          cookiesAccepted: true
        }),
      });
    } catch (error) {
      console.error('Error updating visitor email:', error);
    }
  };

  const updateCookiesAcceptance = async (accepted) => {
    try {
      await fetch('/api/visitors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          action: 'update',
          cookiesAccepted: accepted
        }),
      });
    } catch (error) {
      console.error('Error updating cookies acceptance:', error);
    }
  };

  // Return null if no cookie banner to show
  if (!showCookieBanner) {
    return null;
  }

  // Only render the cookie banner
  return (
    <div className="fixed md:bottom-2 md:h-17 md:left-44 md:right-44 bg-red-themed text-white p-4 md:rounded-4xl bottom-0 left-0 right-0 rounded-t-2xl shadow-lg z-50 border border-red-700 ml-2 mr-2">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 md:gap-4">
        {/* Text Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg md:text-base">We use cookies</h3>
          <p className="text-sm md:text-xs text-red-100 leading-relaxed">
            We use cookies to enhance your experience. Accepting cookies allows us to personalize your experience with your browser information.
          </p>
        </div>
        
        {/* Buttons */}
        <div className="w-full lg:w-auto">
          <div className="flex flex-row gap-2 w-full">
            <button
              onClick={handleAcceptCookies}
              className="bg-gray-900 text-white px-4 py-3 md:px-3 md:py-2 rounded-lg text-base md:text-sm font-medium hover:bg-gray-800 transition duration-200 flex-1 sm:flex-none whitespace-nowrap"
            >
              Accept Cookies
            </button>
            <button
              type="button"
              onClick={handleDeclineCookies}
              className="bg-gray-600 text-white px-4 py-3 md:px-3 md:py-2 rounded-lg text-base md:text-sm font-medium hover:bg-gray-700 transition duration-200 flex-1 sm:flex-none whitespace-nowrap"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorsTracker;