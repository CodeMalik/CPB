"use client"
import React, { useEffect, useState } from 'react';
import Confetti from "@/app/components/Confetti"

// SVG Checkmark Icon Component
const CheckIcon = () => (
    <svg
        className="w-24 h-24 text-red-500 mx-auto"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
            fill="currentColor"
        />
    </svg>
);

// SVG Social Media Icons (for demonstration)
const SocialIcon = ({ d }) => (
    <a href="#" className="text-gray-400 hover:text-red-500 transition-colors duration-300">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d={d}></path>
        </svg>
    </a>
);

export default function ThankYou() {
    const [quoteId, setQuoteId] = useState('');

    useEffect(() => {
        // Generate a pseudo-random quote ID for display
        const randomId = `CPB-${Math.floor(1000 + Math.random() * 9000)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
        setQuoteId(randomId);
    }, []);

    return (
        <Confetti>
        <div className="bg-gradient-to-br from-red-50 to-gray-100 min-h-screen flex items-center justify-center font-sans p-4">
            <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl p-8 md:p-12 text-center transform hover:scale-[1.01] transition-all duration-500 border-t-4 border-red-500">

                {/* Header Section */}
                <div className="mb-8">
                    <CheckIcon />
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mt-6">
                        Thank You!
                    </h1>
                    <p className="text-gray-600 text-lg mt-3">
                        Your quote request has been successfully submitted.
                    </p>
                </div>
                {/* Main Content */}
                <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200 text-left">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">What Happens Next?</h2>
                    <ul className="space-y-3 text-gray-600">
                        <li className="flex items-start">
                            <span className="text-red-500 font-bold mr-3">1.</span>
                            <div>
                                <strong>Review:</strong> Our packaging specialists are reviewing your design and specifications.
                            </div>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-500 font-bold mr-3">2.</span>
                            <div>
                                <strong>Quote:</strong> We will contact you with a personalized quote and digital proof within 24 business hours.
                            </div>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-500 font-bold mr-3">3.</span>
                            <div>
                                <strong>Approval:</strong> Once you approve the proof. We will get started on your custom packaging!
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Call to Action */}
                <div className="flex justify-center mb-8">
                    <a
                        href="https://custompackboxes.com"
                        className="bg-red-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-red-600 transition-all duration-300 transform hover:translate-y-[-2px]"
                    >
                        Return to back
                    </a>
                </div>

                {/* Footer with Socials and Contact */}
                <div className="border-t border-gray-200 pt-6">
                    <p className="text-gray-500 mb-4">
                        Have immediate questions? Contact us at <a href="mailto:support@custompackboxes.com" className="text-red-500 font-semibold hover:underline">sales@custompackboxes.com</a>
                    </p>
                    <div className="flex justify-center items-center space-x-4">
                        {/* Replace with your actual social media links and correct SVG paths */}
                        <SocialIcon d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96s4.46 9.96 9.96 9.96c5.5 0 9.96-4.46 9.96-9.96S17.5 2.04 12 2.04zm3.94 7.52h-2.12v-1.62c0-.58.18-1.04.9-1.04h1.22V5h-2.12c-2.4 0-3.32 1.3-3.32 3.28v1.76H8.48v2.12h1.56V18h2.64v-5.24h2.12l.32-2.12z" />
                        <SocialIcon d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96s4.46 9.96 9.96 9.96c5.5 0 9.96-4.46 9.96-9.96S17.5 2.04 12 2.04zm4.8 6.58c.16 3.4-2.22 6.8-6.3 6.8-1.26 0-2.42-.36-3.4-1 .18 0 .36.02.54.02 1.04 0 2-.34 2.76-1-.98-.02-1.8- .66-2.1-1.54.14 0 .28.02.42.02.2 0 .4-.02.58-.08-1.02-.2-1.8-1.1-1.8-2.18v-.02c.3.16.64.26.98.28-.6-.4-1-1.08-1-1.86 0-.4.1-.78.3-1.1.98 1.2 2.42 2 4.12 2.1-.06-.16-.1-.34-.1-.52 0-1.26 1.02-2.28 2.28-2.28.66 0 1.24.28 1.66.72.52-.1.98-.3 1.4-.54-.18.54-.54.98-.98 1.26.46-.06.9-.18 1.3-.36-.3.44-.68.82-1.1 1.12z" />
                        <SocialIcon d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.2 6.2c0 .12 0 .24 0 .36 0 3.7-2.8 8-8 8-1.6 0-3.08-.46-4.34-1.28.22 0 .44.02.66.02 1.32 0 2.54-.44 3.5-1.2-.56-.02-1.08-.38-1.24-.9.2.04.4.06.6.06.24 0 .48-.04.7-.1-1.26-.26-2.2-1.36-2.2-2.7v-.04c.36.2.78.32 1.22.34-.72-.48-1.2-1.3-1.2-2.24 0-.48.14-.94.36-1.34 1.34 1.64 3.34 2.7 5.6 2.84-.04-.2-.08-.4-.08-.6 0-1.48 1.2-2.68 2.68-2.68.78 0 1.48.34 1.96.88.62-.12 1.2-.34 1.72-.66-.2.64-.64 1.18-1.2 1.52.54-.06 1.06-.2 1.54-.42-.36.54-.8 1.02-1.32 1.4z" />
                    </div>
                </div>

            </div>
        </div>
        </Confetti>
    );
}

