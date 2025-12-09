import { connectDB } from '../../../lib/mongoose';
import Blog from '../../models/Blog';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaUser, FaCalendarAlt, FaClock, FaTag, FaEye, FaShareAlt } from 'react-icons/fa';

export async function generateMetadata({ params }) {
  try {
    await connectDB();
    const blog = await Blog.findOne({ 
      slug: params.slug, 
      published: true 
    }).lean();
    
    if (!blog) {
      return {
        title: 'Blog Not Found - Custom Pack Boxes',
        description: 'The requested blog post could not be found.'
      };
    }
    
    return {
      title: `${blog.title} - Custom Pack Boxes`,
      description: blog.excerpt,
      keywords: blog.tags?.join(', ') || 'packaging, boxes, custom',
      openGraph: {
        title: blog.title,
        description: blog.excerpt,
        images: blog.coverImage?.url ? [{ url: blog.coverImage.url }] : [],
        type: 'article',
        publishedTime: blog.createdAt,
        authors: [blog.author]
      }
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog - Custom Pack Boxes',
      description: 'Read our latest blog posts'
    };
  }
}

export default async function BlogDetailPage({ params }) {
  try {
    await connectDB();
    
    const blog = await Blog.findOne({ 
      slug: params.slug, 
      published: true 
    }).lean();
    
    if (!blog) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Blog Not Found</h1>
            <p className="text-gray-600 mb-8">The blog post you&apos;re looking for doesn&apos;t exist or has been removed.</p>
            <Link 
              href="/blogs"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <FaArrowLeft className="w-4 h-4" />
              Back to Blogs
            </Link>
          </div>
        </div>
      );
    }
    
    // Increment view count
    await Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } });
    
    // Fetch related blogs
    const relatedBlogs = await Blog.find({
      _id: { $ne: blog._id },
      published: true,
      tags: { $in: blog.tags || [] }
    })
    .limit(3)
    .select('-content')
    .lean();

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-red-700 via-red-800 to-red-900 text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>
          
          <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
            <div className="max-w-500 mx-auto mt-10 mb-20">
              <Link 
                href="/blogs"
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-xl hover:bg-white/20 transition-all duration-300 mb-8 group"
              >
                <FaArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back to Blogs</span>
              </Link>
              
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-sm font-medium">Featured Article</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                  {blog.title}
                </h1>
                
                <p className="text-xl opacity-95 max-w-3xl leading-relaxed">
                  {blog.excerpt}
                </p>
              </div>
              
              {/* Blog Meta - Improved Grid Layout */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-white/30 to-white/10 rounded-xl flex items-center justify-center">
                      <FaUser className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm opacity-80 mb-1">Author</p>
                      <p className="text-lg font-semibold">{blog.author}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-white/30 to-white/10 rounded-xl flex items-center justify-center">
                      <FaCalendarAlt className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm opacity-80 mb-1">Published</p>
                      <p className="text-lg font-semibold">
                        {new Date(blog.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-white/30 to-white/10 rounded-xl flex items-center justify-center">
                      <FaClock className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm opacity-80 mb-1">Read Time</p>
                      <p className="text-lg font-semibold">{blog.readTime || '5'} min read</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Stats */}
              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <FaEye className="w-4 h-4" />
                  <span>{blog.views || 0} views</span>
                </div>
                <button className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/20 transition-colors">
                  <FaShareAlt className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Curved bottom edge */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-white rounded-t-3xl"></div>
        </div>

        <div className="container mx-auto px-4 mb-10  py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:w-2/3">
              {/* Featured Image */}
              {blog.coverImage?.url && (
                <div className="mb-10 rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
                  <div className="relative aspect-video">
                    <Image
                      src={blog.coverImage.url}
                      alt={blog.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
                      priority
                    />
                  </div>
                </div>
              )}
              
              {/* Content Container */}
              <div className="bg-white rounded-3xl shadow-lg p-8 lg:p-10 border border-gray-100">
                {/* Content */}
                <article className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-800 prose-a:text-red-600 hover:prose-a:text-red-700 prose-a:no-underline">
                  <div 
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                </article>
                
                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                      <FaTag className="w-5 h-5 text-red-600" />
                      <h3 className="text-xl font-bold text-gray-800">Article Tags</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {blog.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/blogs?tag=${encodeURIComponent(tag)}`}
                          className="group px-5 py-2.5 bg-gradient-to-r from-red-50 to-red-50 text-red-700 rounded-xl hover:from-red-100 hover:to-red-100 transition-all duration-300 border border-red-100 hover:border-red-200 hover:scale-105 flex items-center gap-2"
                        >
                          <span>#</span>
                          <span className="font-medium">{tag}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="sticky top-6 space-y-8">
                {/* Author Card */}
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-7 border border-gray-200">
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center border-4 border-white shadow-lg">
                      <FaUser className="w-10 h-10 text-red-600" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800">{blog.author}</h4>
                    <p className="text-red-600 font-medium mt-1">Packaging Expert</p>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-center">
                    With {Math.floor(Math.random() * 10) + 5}+ years of experience in the packaging industry, {blog.author} shares valuable insights and practical tips to help businesses optimize their packaging solutions and reduce costs.
                  </p>
                  <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                    <div className="inline-flex items-center gap-4">
                      <span className="text-sm text-gray-500">
                        <span className="font-bold text-gray-700">{Math.floor(Math.random() * 50) + 20}</span> Articles
                      </span>
                      <span className="text-sm text-gray-500">
                        <span className="font-bold text-gray-700">{Math.floor(Math.random() * 10000) + 5000}</span> Reads
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Related Blogs */}
                {relatedBlogs.length > 0 && (
                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-7 border border-gray-200">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                      <h3 className="text-xl font-bold text-gray-800">Related Articles</h3>
                      <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="space-y-5">
                      {relatedBlogs.map((relatedBlog, index) => (
                        <Link
                          key={relatedBlog._id}
                          href={`/blogs/${relatedBlog.slug}`}
                          className="group block bg-white rounded-2xl p-4 border border-gray-100 hover:border-red-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 relative">
                              <div className="w-12 h-12 bg-gradient-to-br from-red-50 to-red-100 rounded-xl flex items-center justify-center">
                                <span className="text-red-700 font-bold">{index + 1}</span>
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2 mb-2">
                                {relatedBlog.title}
                              </h4>
                              <div className="flex items-center gap-3 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <FaCalendarAlt className="w-3 h-3" />
                                  {new Date(relatedBlog.createdAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <FaClock className="w-3 h-3" />
                                  {relatedBlog.readTime || '5'} min
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* CTA Card */}
                <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-3xl shadow-xl p-7 text-white">
                  <h3 className="text-xl font-bold mb-4">Need Custom Packaging?</h3>
                  <p className="opacity-90 mb-6">
                    Get expert advice and quotes for your custom packaging needs.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center w-full bg-white text-red-600 font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105"
                  >
                    Get Free Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='mb-10'>

          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading blog:', error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100  flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Error Loading Blog</h1>
          <p className="text-gray-600 mb-8">There was an error loading the blog post. Please try again later.</p>
          <Link 
            href="/blogs"
            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }
}