'use client';
import { useState, useEffect } from 'react';

const VisitorsTracker = () => {
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    // Check if cookies were previously accepted
    const savedCookies = localStorage.getItem('cookiesAccepted');
    const savedEmail = localStorage.getItem('userEmail');
    
    if (savedCookies === 'true') {
      setCookiesAccepted(true);
      setShowCookieBanner(false);
    } else {
      // Only show banner if cookies haven't been accepted yet
      setShowCookieBanner(true);
    }
    
    if (savedEmail) {
      setUserEmail(savedEmail);
    }

    // Track visitor (without email initially)
    trackVisitor();
  }, []);

  const trackVisitor = async () => {
    try {
      await fetch('/api/visitors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          action: 'track',
          email: null 
        }),
      });
    } catch (error) {
      console.error('Error tracking visitor:', error);
    }
  };

  const handleAcceptCookies = () => {
    setCookiesAccepted(true);
    setShowCookieBanner(false);
    localStorage.setItem('cookiesAccepted', 'true');
    
    if (userEmail) {
      localStorage.setItem('userEmail', userEmail);
      // Update visitor record with email
      updateVisitorWithEmail(userEmail);
    } else {
      // Even if no email, mark cookies as accepted
      updateCookiesAcceptance(true);
    }
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

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (userEmail) {
      localStorage.setItem('userEmail', userEmail);
      updateVisitorWithEmail(userEmail);
      setShowCookieBanner(false);
    }
  };

  // Return null if no cookie banner to show (completely invisible component)
  if (!showCookieBanner) {
    return null;
  }

  // Only render the cookie banner, nothing else
  return (
    <div className="fixed md:bottom-4 md:left-44 md:right-44 bg-red-600 text-white p-4 md:rounded-4xl bottom-0 left-0 right-0 rounded-t-2xl shadow-lg z-50 border border-red-700 ml-2 mr-2">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 md:gap-4">
        {/* Text Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold mb-1 text-lg md:text-base">We use cookies</h3>
          <p className="text-sm md:text-xs text-red-100 leading-relaxed">
            We use cookies to enhance your experience. Accept to share your email for better service.
          </p>
        </div>
        
        {/* Form and Buttons */}
        <div className="w-full lg:w-auto">
          <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
            {/* Email Input - Full width on mobile, constrained on larger screens */}
            <input
              type="email"
              placeholder="Enter your email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="px-4 py-3 md:py-2 text-base md:text-sm bg-white text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent w-full sm:flex-1 md:max-w-[200px]"
            />
            
            {/* Buttons - Stack on mobile, row on larger screens */}
            <div className="flex flex-row gap-2 w-full sm:w-auto">
              <button
                type="submit"
                className="bg-gray-900 text-white px-4 py-3 md:px-3 md:py-2 rounded-lg text-base md:text-sm font-medium hover:bg-gray-800 transition duration-200 flex-1 sm:flex-none whitespace-nowrap"
              >
                Accept & Submit
              </button>
              <button
                type="button"
                onClick={handleDeclineCookies}
                className="bg-gray-600 text-white px-4 py-3 md:px-3 md:py-2 rounded-lg text-base md:text-sm font-medium hover:bg-gray-700 transition duration-200 flex-1 sm:flex-none whitespace-nowrap"
              >
                Decline
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VisitorsTracker;