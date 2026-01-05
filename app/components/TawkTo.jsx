"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import Link from 'next/link';
import { X, MessageSquare, Phone, ChevronDown, Send, User } from 'lucide-react';

/**
 * TawkTo Component
 * 
 * Implements a custom proactive chat invitation (Blazeo/ApexChat style) 
 * that appears 3 seconds after the user visits the page.
 * Theme updated to match the red website theme (#FF0101).
 * Now supports live chatting directly within the popup.
 */
const TawkTo = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLiveChat, setIsLiveChat] = useState(false);
  const [userInput, setUserInput] = useState("");

  // Ref for the embedded container if we want to use the API directly
  // But iframe is more reliable for direct chat links.
  const propertyId = '670d3c8d4304e3196ad168de';
  const widgetId = '1ia5r9330';
  const directChatUrl = `https://tawk.to/chat/${propertyId}/${widgetId}`;

  useEffect(() => {
    setMounted(true);
    console.log("TawkTo component mounted");

    // Timer for the 3-second delay
    const timer = setTimeout(() => {
      console.log("3 seconds passed, attempting to show popup...");
      setShowPopup(true);

      // Hide the standard floating bubble if it exists
      if (window.Tawk_API && window.Tawk_API.hideWidget) {
        window.Tawk_API.hideWidget();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Sync showing state with Tawk.to widget visibility
  useEffect(() => {
    if (showPopup && window.Tawk_API && window.Tawk_API.hideWidget) {
      window.Tawk_API.hideWidget();
    }
  }, [showPopup]);

  const handleClose = () => {
    setShowPopup(false);
    setIsLiveChat(false);

    // When closed, re-show the standard small Tawk.to bubble
    if (window.Tawk_API) {
      if (window.Tawk_API.showWidget) window.Tawk_API.showWidget();
      if (window.Tawk_API.minimize) window.Tawk_API.minimize();
    }
  };

  const handleStartLiveChat = () => {
    setIsLiveChat(true);
  };

  if (!mounted) return null;

  return (
    <>
      {/* Tawk.to Script Integration */}
      <Script
        id="tawk-to-script"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
                        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
                        (function(){
                            var s1=document.createElement("script"),
                                s0=document.getElementsByTagName("script")[0];
                            s1.async=true;
                            s1.src='https://embed.tawk.to/${propertyId}/${widgetId}';
                            s1.charset='UTF-8';
                            s1.setAttribute('crossorigin','*');
                            s0.parentNode.insertBefore(s1,s0);
                        })();
                        
                        Tawk_API.onLoad = function(){
                            // Always hide the default widget initially
                             Tawk_API.hideWidget();
                        };
                    `,
        }}
      />

      {showPopup && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity duration-500"
            onClick={handleClose}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in slide-in-from-bottom-12 duration-500 border border-gray-100">

            {/* Left Panel (Premium Red Sidebar) */}
            <div className="w-full md:w-[260px] bg-gradient-to-b from-[#FF0101] to-[#E30000] p-8 text-white flex flex-col items-center justify-between relative overflow-hidden flex-shrink-0">
              {/* Decorative background effects */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-24 translate-x-24 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-400/10 rounded-full translate-y-16 -translate-x-16 blur-2xl" />

              <div className="text-center relative z-10 w-full">
                <div className="mb-10 block transform hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/logo.png"
                    alt="CPB Logo"
                    width={140}
                    height={50}
                    className="brightness-0 invert mx-auto object-contain drop-shadow-md"
                  />
                </div>

                <div className="relative mb-6 group">
                  <div className="w-24 h-24 rounded-full bg-white/10 p-1 border-2 border-white/20 flex items-center justify-center overflow-hidden mx-auto transition-all duration-300 group-hover:border-white/50 group-hover:scale-105 shadow-xl">
                    <div className="w-full h-full rounded-full overflow-hidden relative bg-[#FF0101]">
                      <Image
                        src="/agent.png"
                        alt="Sarah"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-1 right-[calc(50%-40px)] w-5 h-5 bg-green-500 border-4 border-[#FF0101] rounded-full animate-pulse shadow-lg" />
                </div>

                <h3 className="font-bold text-2xl mb-1 tracking-tight">Sarah</h3>
                <p className="text-[10px] opacity-70 mb-6 uppercase tracking-[0.2em] font-bold">Design Specialist</p>

                <div className="space-y-2 mb-8 bg-black/10 py-3.5 px-4 rounded-2xl border border-white/10">
                  <p className="text-xs font-bold text-white flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
                    ONLINE NOW
                  </p>
                  <p className="text-[11px] text-white/80 leading-tight">Response time: &lt; 1 min</p>
                </div>
              </div>

              <div className="relative z-10 mt-10 text-[9px] opacity-40 font-black uppercase tracking-[0.3em] text-white/60">
                Custom Pack Boxes
              </div>
            </div>

            {/* Right Panel (Chat Interaction Area) */}
            <div className="relative flex-1 bg-white flex flex-col min-h-[520px]">
              {/* Header / Disclaimer */}
              {!isLiveChat && (
                <div className="p-5 bg-gray-50/80 border-b border-gray-100/50 text-[10px] text-gray-400 leading-relaxed italic pr-14 flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-red-100 rounded-full" />
                  <p>Secure connection established. Chat monitored for quality.</p>
                </div>
              )}

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2.5 hover:bg-gray-100 rounded-xl text-gray-300 hover:text-gray-900 transition-all z-[110000] group border border-transparent hover:border-gray-200"
                aria-label="Close chat"
              >
                <X size={20} className="transition-transform group-hover:rotate-90" />
              </button>

              {/* Dynamic Chat Content Body */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {isLiveChat ? (
                  /* LIVE CHAT IFRAME */
                  <div className="w-full h-full animate-in fade-in duration-700">
                    <iframe
                      src={directChatUrl}
                      className="w-full h-full border-0"
                      title="Tawk.to Live Chat"
                    />
                  </div>
                ) : (
                  /* INITIAL WELCOME UI */
                  <div className="flex-1 flex flex-col">
                    <div className="flex-1 p-8 overflow-y-auto space-y-8 scrollbar-hide">
                      <div className="text-center flex flex-col items-center">
                        <button
                          onClick={handleStartLiveChat}
                          className="group relative flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] px-8 py-3 bg-white border-2 border-red-50 rounded-full text-red-500 hover:text-white hover:bg-red-500 hover:border-red-500 transition-all shadow-sm hover:shadow-xl active:scale-95 duration-300"
                        >
                          <MessageSquare size={14} className="group-hover:animate-bounce" />
                          Start Live Chat
                        </button>
                        <div className="text-[9px] text-gray-300 mt-6 uppercase tracking-[0.3em] font-semibold italic">Typically replies in seconds</div>
                      </div>

                      <div className="flex gap-4 items-start group">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0 border border-white overflow-hidden shadow-sm transition-transform group-hover:scale-110">
                          <Image src="/agent.png" alt="Sarah" width={40} height={40} className="object-cover" />
                        </div>
                        <div className="flex-1 space-y-6">
                          <div className="bg-[#fcfdfe] rounded-[2rem] rounded-tl-none px-6 py-5 text-[15px] text-gray-700 leading-relaxed shadow-sm border border-gray-50 relative group-hover:shadow-md transition-shadow">
                            Hello! I'm <span className="font-bold text-[#FF0101]">Sarah</span>. 👋 <br />How can I help you customize your perfect packaging today?
                            <div className="absolute -left-1.5 top-0 w-3 h-3 bg-[#fcfdfe] border-l border-t border-gray-50 skew-x-[-45deg]" />
                          </div>


                        </div>
                      </div>
                    </div>

                    {/* MOCK INPUT THAT TRANSITIONS TO LIVE CHAT */}
                    <div className="p-8 border-t border-gray-50 bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
                      <div
                        className="flex items-center gap-4 bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 text-sm text-gray-400 cursor-text hover:bg-white hover:border-red-100 hover:shadow-xl transition-all group"
                        onClick={handleStartLiveChat}
                      >
                        <User size={18} className="text-gray-300 group-hover:text-red-400" />
                        <input
                          type="text"
                          placeholder="Type your question here..."
                          className="flex-1 bg-transparent border-none outline-none font-medium placeholder:italic text-gray-700"
                          readOnly
                        />
                        <div className="bg-[#FF0101] p-2.5 rounded-xl text-white shadow-xl shadow-red-500/30 transform group-hover:scale-110 active:scale-90 transition-all cursor-pointer">
                          <Send size={16} fill="currentColor" />
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <p className="text-[10px] text-gray-300 flex items-center justify-center gap-1.5 font-medium">
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                          Sarah is online
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TawkTo;