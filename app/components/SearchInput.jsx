'use client';

import { Search } from 'lucide-react';
import { useState, useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get existing search parameter
  const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '');

  // Debounced search handler
  const handleSearch = useCallback((term) => {
    const params = new URLSearchParams(searchParams);
    
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    if (searchParams === "") {
        router.push("/")
    }
    if (term) {
      params.set('query', term);
      router.push(`/search?${params.toString()}`);
    } else {
      params.delete('query');
      router.push('/');
    }
  }, [router, pathname, searchParams]);

  return (
    <div className="relative flex w-full max-w-md">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          handleSearch(e.target.value);
        }}
        placeholder="Search..."
        className="w-full border border-red-themed bg-background px-4 py-3.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      <Search className="absolute right-2 top-3 h-6 w-6 text-muted-foreground" />
    </div>
  );
}