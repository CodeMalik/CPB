import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const requestTime = new Date().toISOString();
  
  const url = new URL(request.url);
  const timestamp = url.searchParams.get('t') || Date.now();
  
  try {
    console.log(`🚀 [${requestTime}] HTML SITEMAP - Fresh MongoDB fetch...`);
    
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is missing');
    }

    const client = new MongoClient(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 1,
    });
    
    await client.connect();
    const db = client.db('custom-pack-boxes');

    const [allProducts, allCategories] = await Promise.all([
      db.collection('products')
        .find({})
        .project({ slug: 1, updatedAt: 1, createdAt: 1, title: 1, status: 1, isActive: 1 })
        .sort({ updatedAt: -1 })
        .toArray(),
      
      db.collection('categories')
        .find({})
        .project({ slug: 1, updatedAt: 1, createdAt: 1, name: 1, status: 1, isActive: 1 })
        .sort({ updatedAt: -1 })
        .toArray()
    ]);

    await client.close();

    const activeProducts = allProducts.filter(product => {
      const status = product.status || 'active';
      const isActive = product.isActive !== false;
      return status !== 'deleted' && isActive;
    });

    const activeCategories = allCategories.filter(category => {
      const status = category.status || 'active';
      const isActive = category.isActive !== false;
      return status !== 'deleted' && isActive;
    });

    console.log(`📊 [${requestTime}] HTML Sitemap - Products: ${activeProducts.length}/${allProducts.length}, Categories: ${activeCategories.length}/${allCategories.length}`);
    
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Custom Pack Boxes - Sitemap</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        * { font-family: 'Inter', sans-serif; }
        
        .link-card-hover {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .link-card-hover:hover {
            transform: translateY(-4px);
        }
        
        .gradient-bg {
            background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
        }
        
        .stat-card-hover {
            transition: all 0.3s ease;
        }
        
        .stat-card-hover:hover {
            transform: translateY(-5px);
        }
        
        .back-btn-hover:hover {
            transform: translateY(-2px);
            filter: brightness(110%);
        }
        
        .xml-link-hover:hover {
            transform: translateY(-2px);
            filter: brightness(110%);
        }
        
        .link-icon {
            background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
        }
        
        .stat-card {
            background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
        }
        
        .last-updated-box {
            background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
        }
        
        .empty-state {
            background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
        }
        
        .shadow-custom {
            box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        }
        
        .shadow-topbar {
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .shadow-link-hover:hover {
            box-shadow: 0 8px 20px rgba(220, 38, 38, 0.15);
        }
        
        .shadow-stat-hover:hover {
            box-shadow: 0 10px 25px rgba(220, 38, 38, 0.1);
        }
        
        .shadow-btn-hover:hover {
            box-shadow: 0 5px 15px rgba(220, 38, 38, 0.4);
        }
    </style>
</head>
<body class="gradient-bg min-h-screen w-full overflow-x-hidden">
    <!-- Top Bar -->
    <div class="bg-white w-full py-4 shadow-topbar mb-8">
        <div class="container mx-auto px-4">
            <div class="flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
                <a href="${baseUrl}" class="back-btn-hover gradient-bg text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 no-underline transition-all duration-300 w-full md:w-auto justify-center">
                    <i class="fas fa-arrow-left"></i> Back to Site
                </a>
                <a href="/api/sitemap.xml" class="xml-link-hover bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 no-underline transition-all duration-300 w-full md:w-auto justify-center">
                    <i class="fas fa-file-code"></i> View XML Sitemap
                </a>
            </div>
        </div>
    </div>
    
    <!-- Main Container -->
    <div class="container mx-auto px-4 mb-10 max-w-7xl">
        <div class="bg-white rounded-3xl shadow-custom overflow-hidden p-6 md:p-10">
            <!-- Header -->
            <div class="text-center mb-10 pb-8 border-b-2 border-red-100">
                <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-red-600 mb-4">
                    Custom Pack Boxes Sitemap
                </h1>
                <p class="text-gray-600 text-lg max-w-3xl mx-auto">
                    Complete directory of all pages on our website. Find what you're looking for with our organized page listing.
                </p>
            </div>
            
            <!-- Last Updated -->
            <div class="last-updated-box rounded-xl p-6 md:p-8 border-2 border-red-200 mb-10 text-center">
                <h3 class="text-xl font-bold text-red-800 mb-4">Last Updated</h3>
                <p class="text-gray-600 mb-4">This sitemap is generated in real-time from our database</p>
                <div class="timestamp bg-white px-6 py-3 rounded-full inline-block border border-red-200">
                    <i class="fas fa-clock text-red-600 mr-2"></i>
                    <span class="text-red-600 font-semibold">
                        ${new Date(requestTime).toLocaleString()} | Cache: ${timestamp}
                    </span>
                </div>
            </div>
            
            <!-- Stats -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
                <div class="stat-card stat-card-hover rounded-xl p-6 text-center border-2 border-red-200 shadow-stat-hover">
                    <span class="text-3xl md:text-4xl font-bold text-red-600 block mb-2">
                        ${5 + activeProducts.length + activeCategories.length}
                    </span>
                    <span class="text-red-800 text-sm font-semibold uppercase tracking-wider">
                        Total Pages
                    </span>
                </div>
                
                <div class="stat-card stat-card-hover rounded-xl p-6 text-center border-2 border-red-200 shadow-stat-hover">
                    <span class="text-3xl md:text-4xl font-bold text-red-600 block mb-2">
                        ${activeProducts.length}
                    </span>
                    <span class="text-red-800 text-sm font-semibold uppercase tracking-wider">
                        Active Products
                    </span>
                </div>
                
                <div class="stat-card stat-card-hover rounded-xl p-6 text-center border-2 border-red-200 shadow-stat-hover">
                    <span class="text-3xl md:text-4xl font-bold text-red-600 block mb-2">
                        ${activeCategories.length}
                    </span>
                    <span class="text-red-800 text-sm font-semibold uppercase tracking-wider">
                        Categories
                    </span>
                </div>
                
                <div class="stat-card stat-card-hover rounded-xl p-6 text-center border-2 border-red-200 shadow-stat-hover">
                    <span class="text-3xl md:text-4xl font-bold text-red-600 block mb-2">
                        5
                    </span>
                    <span class="text-red-800 text-sm font-semibold uppercase tracking-wider">
                        Static Pages
                    </span>
                </div>
            </div>
            
            <!-- Static Pages Section -->
            <div class="mb-12">
                <h2 class="text-2xl md:text-3xl font-bold text-red-800 mb-6 pl-4 border-l-4 border-red-600 flex items-center gap-3">
                    <i class="fas fa-home"></i> Static Pages
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${[
                        { icon: '🏠', title: 'Homepage', url: baseUrl, priority: '1.0' },
                        { icon: '📖', title: 'About Us', url: `${baseUrl}/about`, priority: '0.8' },
                        { icon: '📞', title: 'Contact Us', url: `${baseUrl}/contact`, priority: '0.8' },
                        { icon: '📦', title: 'Our Recent Boxes', url: `${baseUrl}/our-recent-boxes`, priority: '0.9' },
                        { icon: '🔍', title: 'Search Products', url: `${baseUrl}/search`, priority: '0.6' }
                    ].map(page => `
                    <div class="link-card-hover bg-red-50 p-5 rounded-xl border-2 border-red-200 flex items-start gap-4 shadow-link-hover link-card-hover">
                        <div class="link-icon w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                            ${page.icon}
                        </div>
                        <div class="flex-1 min-w-0">
                            <a href="${page.url}" class="text-gray-800 font-semibold text-lg mb-2 block hover:text-red-600 hover:underline">
                                ${page.title}
                            </a>
                            <div class="text-gray-500 text-sm font-mono mb-2 break-all">
                                ${page.url}
                            </div>
                            <div class="text-gray-400 text-sm flex items-center gap-3">
                                <span><i class="fas fa-star text-yellow-500"></i> Priority: ${page.priority}</span>
                            </div>
                        </div>
                    </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- Products Section -->
            <div class="mb-12">
                <h2 class="text-2xl md:text-3xl font-bold text-red-800 mb-6 pl-4 border-l-4 border-red-600 flex items-center gap-3">
                    <i class="fas fa-box"></i> Product Pages (${activeProducts.length})
                </h2>
                ${activeProducts.length > 0 ? `
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${activeProducts.map(product => {
                        const lastmod = product.updatedAt ? new Date(product.updatedAt).toLocaleDateString() : 
                                       product.createdAt ? new Date(product.createdAt).toLocaleDateString() : 
                                       'Recent';
                        const title = product.title || product.slug;
                        const formattedTitle = title.length > 60 ? title.substring(0, 60) + '...' : title;
                        return `
                    <div class="link-card-hover bg-red-50 p-5 rounded-xl border-2 border-red-200 flex items-start gap-4 shadow-link-hover">
                        <div class="link-icon w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                            📦
                        </div>
                        <div class="flex-1 min-w-0">
                            <a href="${baseUrl}/custom-packaging/${product.slug}" class="text-gray-800 font-semibold text-lg mb-2 block hover:text-red-600 hover:underline">
                                ${formattedTitle}
                            </a>
                            <div class="text-gray-500 text-sm font-mono mb-2 break-all">
                                ${baseUrl}/custom-packaging/${product.slug}
                            </div>
                            <div class="text-gray-400 text-sm flex items-center gap-3 flex-wrap">
                                <span><i class="fas fa-calendar text-red-500"></i> Updated: ${lastmod}</span>
                                <span><i class="fas fa-star text-yellow-500"></i> Priority: 0.9</span>
                            </div>
                        </div>
                    </div>`;
                    }).join('')}
                </div>` : `
                <div class="empty-state rounded-xl p-10 text-center border-2 border-dashed border-red-200">
                    <i class="fas fa-inbox text-red-600 text-5xl mb-4"></i>
                    <p class="text-gray-600 text-lg">No active products found in the database</p>
                </div>`}
            </div>
            
            <!-- Categories Section -->
            <div class="mb-12">
                <h2 class="text-2xl md:text-3xl font-bold text-red-800 mb-6 pl-4 border-l-4 border-red-600 flex items-center gap-3">
                    <i class="fas fa-folder"></i> Category Pages (${activeCategories.length})
                </h2>
                ${activeCategories.length > 0 ? `
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${activeCategories.map(category => {
                        const lastmod = category.updatedAt ? new Date(category.updatedAt).toLocaleDateString() : 
                                       category.createdAt ? new Date(category.createdAt).toLocaleDateString() : 
                                       'Recent';
                        const name = category.name || category.slug;
                        const formattedName = name.length > 60 ? name.substring(0, 60) + '...' : name;
                        return `
                    <div class="link-card-hover bg-red-50 p-5 rounded-xl border-2 border-red-200 flex items-start gap-4 shadow-link-hover">
                        <div class="link-icon w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                            📁
                        </div>
                        <div class="flex-1 min-w-0">
                            <a href="${baseUrl}/customized/${category.slug}" class="text-gray-800 font-semibold text-lg mb-2 block hover:text-red-600 hover:underline">
                                ${formattedName}
                            </a>
                            <div class="text-gray-500 text-sm font-mono mb-2 break-all">
                                ${baseUrl}/customized/${category.slug}
                            </div>
                            <div class="text-gray-400 text-sm flex items-center gap-3 flex-wrap">
                                <span><i class="fas fa-calendar text-red-500"></i> Updated: ${lastmod}</span>
                                <span><i class="fas fa-star text-yellow-500"></i> Priority: 0.9</span>
                            </div>
                        </div>
                    </div>`;
                    }).join('')}
                </div>` : `
                <div class="empty-state rounded-xl p-10 text-center border-2 border-dashed border-red-200">
                    <i class="fas fa-folder-open text-red-600 text-5xl mb-4"></i>
                    <p class="text-gray-600 text-lg">No active categories found in the database</p>
                </div>`}
            </div>
            
            <!-- Footer -->
            <div class="mt-12 pt-8 border-t-2 border-red-100 text-center">
                <div class="flex flex-wrap justify-center gap-6 mb-6">
                    <a href="${baseUrl}/about" class="text-red-600 font-medium hover:text-red-800 hover:underline">
                        About Us
                    </a>
                    <a href="${baseUrl}/contact" class="text-red-600 font-medium hover:text-red-800 hover:underline">
                        Contact
                    </a>
                    <a href="${baseUrl}/privacy" class="text-red-600 font-medium hover:text-red-800 hover:underline">
                        Privacy Policy
                    </a>
                    <a href="${baseUrl}/terms" class="text-red-600 font-medium hover:text-red-800 hover:underline">
                        Terms of Service
                    </a>
                </div>
                <div class="text-gray-500 text-sm">
                    <p class="mb-2">Custom Pack Boxes &copy; ${new Date().getFullYear()} | All rights reserved</p>
                    <p class="mb-2">Database Status: ${activeProducts.length}/${allProducts.length} products active | ${activeCategories.length}/${allCategories.length} categories active</p>
                    <p><small><i class="fas fa-database"></i> Dynamically generated from MongoDB</small></p>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Update live time
            function updateLiveTime() {
                const now = new Date();
                const liveTimeElements = document.querySelectorAll('.live-time');
                liveTimeElements.forEach(el => {
                    el.textContent = 'Live: ' + now.toLocaleTimeString();
                });
            }
            
            // Add hover effects to cards
            const linkCards = document.querySelectorAll('.link-card-hover');
            linkCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.classList.add('shadow-lg');
                });
                card.addEventListener('mouseleave', function() {
                    this.classList.remove('shadow-lg');
                });
            });
            
            // Add copy URL functionality
            linkCards.forEach(card => {
                card.addEventListener('click', function(e) {
                    if (e.target.tagName === 'A') return;
                    const link = this.querySelector('a');
                    if (link) {
                        const url = link.href;
                        navigator.clipboard.writeText(url).then(() => {
                            const originalText = link.textContent;
                            link.textContent = '✓ Copied!';
                            setTimeout(() => {
                                link.textContent = originalText;
                            }, 2000);
                        });
                    }
                });
            });
            
            // Initialize live time
            setInterval(updateLiveTime, 1000);
            updateLiveTime();
            
            // Smooth scroll for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        });
    </script>
</body>
</html>`;

    console.log(`✅ [${requestTime}] HTML Sitemap generated successfully`);

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
        'Pragma': 'no-cache',
        'Expires': '0',
        'CDN-Cache-Control': 'no-cache',
        'Vercel-CDN-Cache-Control': 'no-cache',
      },
    });

  } catch (error) {
    console.error(`❌ [${requestTime}] HTML Sitemap error:`, error.message);
    
    const fallbackHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Custom Pack Boxes - Sitemap Error</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body class="min-h-screen gradient-bg flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full">
        <div class="text-center">
            <div class="text-red-600 text-6xl mb-6">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h1 class="text-3xl md:text-4xl font-bold text-red-600 mb-6">
                Sitemap Generation Error
            </h1>
            <div class="space-y-4 mb-8">
                <p class="text-gray-700">
                    <strong class="text-gray-900">Error:</strong> ${error.message}
                </p>
                <p class="text-gray-700">
                    <strong class="text-gray-900">Time:</strong> ${requestTime}
                </p>
                <p class="text-gray-600">
                    Please try again later or contact support if the issue persists.
                </p>
            </div>
            <a href="/" class="inline-block gradient-bg text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <i class="fas fa-arrow-left mr-2"></i> Back to Homepage
            </a>
        </div>
    </div>
</body>
</html>`;

    return new NextResponse(fallbackHtml, {
      status: 500,
      headers: { 
        'Content-Type': 'text/html',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  }
}