import {  SearchResults } from '../components';

export default async function SearchPage({searchParams}) {
  const params = searchParams;
  const searchTerm = params?.query || '';

  return (
    <div className="container mx-auto px-4 py-8">
        <SearchResults searchTerm={searchTerm} />
    </div>
  );
}