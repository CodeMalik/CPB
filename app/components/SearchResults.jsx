// app/components/search-results.tsx
import Image from 'next/image';
import Link from 'next/link';

async function fetchResults(query) {
  try {
    const res = await fetch('https://custompackboxes.vercel.app/api/products');
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }
    const products = await res.json();
    
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    
    return filteredProducts;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function SearchResults({ searchTerm }) {
  const results = await fetchResults(searchTerm);
  
  return (
    <div className="mt-8 space-y-4 min-h-[50vh] flex items-center justify-center gap-8 flex-wrap">
      {results.length > 0 ? (
        results.map((result) => (
          <Link href={`/custom-packaging/${result.slug}`} key={result._id}>
            <article 
              className="rounded-lg border p-4 shadow-sm"
            >
              <Image src={result.image} alt={result.name} width={300} height={350} />
              <h3 className="text-xl font-semibold">{result.name}</h3>
            </article>
          </Link>
        ))
      ) : (
        <p className='text-3xl pb-12'>No products found for<span className='text-red-themed'>&quot;{searchTerm}&quot;</span> </p>
      )}
    </div>
  );
}