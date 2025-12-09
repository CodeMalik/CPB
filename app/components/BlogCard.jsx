export default function BlogCard({ blog }) {
  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      {/* Image Container */}
      {blog.coverImage?.url && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={blog.coverImage.url}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {blog.featured && (
            <div className="absolute top-3 right-3">
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                Featured
              </span>
            </div>
          )}
        </div>
      )}
      
      {/* Content */}
      <div className="p-5">
        {/* Date and Read Time */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded">
            {new Date(blog.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            })}
          </span>
          <span className="text-gray-400">•</span>
          <span className="text-sm text-gray-500">{blog.readTime} min read</span>
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
          {blog.title}
        </h3>
        
        {/* Excerpt */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {blog.excerpt}
        </p>
        
        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {blog.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md hover:bg-red-100 hover:text-red-700 transition-colors"
              >
                {tag}
              </span>
            ))}
            {blog.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-400 text-xs rounded-md">
                +{blog.tags.length - 3}
              </span>
            )}
          </div>
        )}
        
        {/* Read More Button */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-sm text-gray-500 font-medium">
            By {blog.author}
          </span>
          <a
            href={`/blogs/${blog.slug}`}
            className="text-red-600 hover:text-red-700 font-semibold text-sm flex items-center gap-1 group/link"
          >
            Read More
            <svg 
              className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}