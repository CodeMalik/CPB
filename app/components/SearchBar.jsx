'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/blogs?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push('/blogs');
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="relative group">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for packaging tips, trends, and guides..."
          className="w-full p-4 pl-14 pr-24 rounded-xl border border-gray-300 focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition-all group-hover:border-red-400"
        />
        
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <svg 
            className="w-6 h-6 text-gray-400 group-hover:text-red-500 transition-colors" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        
        {/* Search Button */}
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          Search
        </button>
        
        {/* Popular Searches */}
        <div className="absolute -bottom-8 left-0 flex items-center gap-2 text-sm text-gray-500">
          <span className="font-medium">Popular:</span>
          {['Eco-friendly', 'Custom Boxes', 'Shipping', 'Design Tips'].map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => {
                setSearchTerm(term);
                router.push(`/blogs?search=${encodeURIComponent(term)}`);
              }}
              className="hover:text-red-600 transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
}