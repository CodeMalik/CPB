// app/search/page.tsx
import { Suspense } from 'react';
import {  SearchResults } from '../components';

export default async function SearchPage({searchParams}) {
  const params = await searchParams;
  const searchTerm = params?.query || '';

  return (
    <div className="container mx-auto px-4 py-8">
      
      <Suspense fallback={<div>Loading...</div>}>
        <SearchResults searchTerm={searchTerm} />
      </Suspense>
    </div>
  );
}