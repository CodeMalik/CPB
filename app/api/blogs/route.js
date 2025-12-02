import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/mongoose';
import Blog from '../../models/Blog';
import { uploadToCloudinary, deleteFromCloudinary } from '../../../lib/cloudinary';

// GET all published blogs
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const tag = searchParams.get('tag') || '';
    const limit = parseInt(searchParams.get('limit')) || 10;
    const page = parseInt(searchParams.get('page')) || 1;
    const skip = (page - 1) * limit;
    
    let query = { published: true };
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (tag) {
      query.tags = tag;
    }
    
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-content')
      .lean();
    
    const total = await Blog.countDocuments(query);
    
    return NextResponse.json({
      success: true,
      data: blogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

// POST create new blog (for dashboard)
export async function POST(request) {
  try {
    await connectDB();
    
    const formData = await request.formData();
    const title = formData.get('title');
    const excerpt = formData.get('excerpt');
    const content = formData.get('content');
    const author = formData.get('author') || 'Admin';
    const tags = formData.getAll('tags');
    const published = formData.get('published') === 'true';
    const featured = formData.get('featured') === 'true';
    const readTime = parseInt(formData.get('readTime')) || 5;
    const imageFile = formData.get('coverImage');
    
    // Check if blog with same title exists
    const existingBlog = await Blog.findOne({ title });
    if (existingBlog) {
      return NextResponse.json(
        { success: false, error: 'Blog with this title already exists' },
        { status: 400 }
      );
    }
    
    let coverImage = {};
    
    // Upload image to Cloudinary if provided
    if (imageFile && imageFile.size > 0) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64Image = `data:${imageFile.type};base64,${buffer.toString('base64')}`;
      
      coverImage = await uploadToCloudinary(base64Image);
    }
    
    const blog = new Blog({
      title,
      excerpt,
      content,
      author,
      tags: tags.filter(tag => tag.trim() !== ''),
      published,
      featured,
      readTime,
      coverImage
    });
    
    await blog.save();
    
    return NextResponse.json({
      success: true,
      message: 'Blog created successfully',
      data: blog
    });
    
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create blog' },
      { status: 500 }
    );
  }
}