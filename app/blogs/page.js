import { connectDB } from '../../lib/mongoose';
import Blog from '../../app/models/Blog';
import BlogCard from '../../app/components/BlogCard';
import SearchBar from '../../app/components/SearchBar';

export const metadata = {
  title: 'Blog - Custom Pack Boxes',
  description: 'Expert packaging insights, trends, and solutions',
};

async function getBlogs(searchParams) {
  await connectDB();
  
  const search = searchParams?.search || '';
  const tag = searchParams?.tag || '';
  const page = parseInt(searchParams?.page) || 1;
  const limit = 9;
  
  let query = { published: true };
  
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { excerpt: { $regex: search, $options: 'i' } },
      { tags: { $regex: search, $options: 'i' } }
    ];
  }
  
  if (tag) {
    query.tags = { $regex: tag, $options: 'i' };
  }
  
  const blogs = await Blog.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .select('-content')
    .lean();
    
  const total = await Blog.countDocuments(query);
  const totalPages = Math.ceil(total / limit);
  
  return {
    blogs: JSON.parse(JSON.stringify(blogs)),
    pagination: { page, limit, total, totalPages }
  };
}

async function getPopularTags() {
  await connectDB();
  
  const blogs = await Blog.find({ published: true }).select('tags').lean();
  const tagCounts = {};
  
  blogs.forEach(blog => {
    blog.tags?.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  
  return Object.entries(tagCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([tag]) => tag);
}

export default async function BlogsPage({ searchParams }) {
  const { blogs, pagination } = await getBlogs(searchParams);
  const popularTags = await getPopularTags();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Packaging Insights & Trends
            </h1>
            <p className="text-xl opacity-95 mb-8">
              Expert advice, creative solutions, and industry updates for all your packaging needs
            </p>
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                <span className="font-semibold">{pagination.total}+</span>
                <p className="text-sm opacity-90">Articles</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                <span className="font-semibold">100%</span>
                <p className="text-sm opacity-90">Expert Content</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-10 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      <div className='mt-10'></div>
      <div className="container mx-auto px-4 py-12 ">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  defaultValue={searchParams?.search || ''}
                  className="w-full p-4 pl-12 rounded-xl border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                />
                <svg className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>

            {/* Featured Section */}
            {blogs.filter(b => b.featured).length > 0 && (
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    <span className="text-red-600">Featured</span> Articles
                  </h2>
                  <div className="h-1 flex-1 max-w-32 bg-gradient-to-r from-red-600 to-transparent rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {blogs.filter(b => b.featured).slice(0, 2).map(blog => (
                    <div key={blog._id} className="group relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300">
                      {blog.coverImage?.url && (
                        <div className="h-64 overflow-hidden">
                          <img 
                            src={blog.coverImage.url}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                              Featured
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center gap-4 mb-3">
                          <span className="text-sm text-gray-500">
                            {new Date(blog.createdAt).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{blog.readTime} min read</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors">
                          {blog.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {blog.tags?.slice(0, 3).map(tag => (
                            <a
                              key={tag}
                              href={`/blogs?tag=${encodeURIComponent(tag)}`}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-red-100 hover:text-red-700 transition-colors"
                            >
                              {tag}
                            </a>
                          ))}
                        </div>
                        <a 
                          href={`/blogs/${blog.slug}`}
                          className="inline-flex items-center text-red-600 font-semibold hover:text-red-700 transition-colors"
                        >
                          Read More
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All Blogs Grid */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Latest Articles</h2>
                <div className="text-gray-500">
                  Showing {blogs.length} of {pagination.total} articles
                </div>
              </div>
              
              {blogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogs.map(blog => (
                    <BlogCard key={blog._id} blog={blog} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No articles found</h3>
                  <p className="text-gray-500">Try different search terms or browse all categories</p>
                </div>
              )}

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="flex items-center space-x-2">
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(pageNum => (
                      <a
                        key={pageNum}
                        href={`/blogs?page=${pageNum}${searchParams?.search ? `&search=${searchParams.search}` : ''}${searchParams?.tag ? `&tag=${searchParams.tag}` : ''}`}
                        className={`px-4 py-2 rounded-lg ${pagination.page === pageNum ? 'bg-red-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:border-red-500'}`}
                      >
                        {pageNum}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-6 space-y-8">
              {/* Popular Tags */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 pb-3 border-b border-gray-200">
                  Popular Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map(tag => (
                    <a
                      key={tag}
                      href={`/blogs?tag=${encodeURIComponent(tag)}`}
                      className={`px-3 py-2 rounded-lg ${searchParams?.tag === tag ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-700'} transition-colors`}
                    >
                      {tag}
                    </a>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-red-50 to-white rounded-xl shadow-lg p-6 border border-red-100">
                <div className="text-red-600 mb-3">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Stay Updated</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Get the latest packaging insights delivered to your inbox
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>

              {/* Stats */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 pb-3 border-b border-gray-200">
                  Blog Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Articles</span>
                    <span className="font-bold text-gray-800">{pagination.total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Monthly Views</span>
                    <span className="font-bold text-gray-800">5.2K+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Avg. Read Time</span>
                    <span className="font-bold text-gray-800">5 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mb-10'></div>
    </div>
  );
}