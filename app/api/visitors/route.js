import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/mongoose';
import Visitor from '../../../models/Visitor';

export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country');
    
    let query = {};
    if (country && country !== 'all') {
      query.country = country;
    }

    const visitors = await Visitor.find(query)
      .sort({ visitedAt: -1 })
      .limit(1000);

    return NextResponse.json({
      visitors: visitors,
      total: visitors.length
    });
  } catch (error) {
    console.error('Error fetching visitors:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    
    const data = await request.json();
    const { action, email, cookiesAccepted } = data;

    // Get client IP address - FIXED: Use proper headers for Vercel deployment
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
               request.headers.get('x-real-ip') || 
               'Unknown IP';

    console.log('Detected IP:', ip); // Debug log

    // Get geolocation data
    let country = 'Unknown';
    let city = 'Unknown';

    try {
      // Only fetch geolocation if we have a valid IP (not 'Unknown IP')
      if (ip && ip !== 'Unknown IP' && !ip.startsWith('::')) {
        const geoResponse = await fetch(`http://ip-api.com/json/${ip}`);
        const geoData = await geoResponse.json();
        
        console.log('Geo API response:', geoData); // Debug log
        
        if (geoData.status === 'success') {
          country = geoData.country || 'Unknown';
          city = geoData.city || 'Unknown';
        }
      }
    } catch (geoError) {
      console.error('Error fetching geolocation:', geoError);
    }

    console.log('Final geo data - Country:', country, 'City:', city); // Debug log

    if (action === 'track') {
      // Check if visitor with this IP exists in the last 24 hours
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      
      const existingVisitor = await Visitor.findOne({
        ip: ip,
        visitedAt: { $gte: twentyFourHoursAgo }
      });

      if (!existingVisitor) {
        // Create new visitor record - FIXED: Ensure all fields are properly set
        const newVisitor = new Visitor({
          ip: ip,
          country: country,
          city: city,
          userAgent: request.headers.get('user-agent') || 'Unknown',
          cookiesAccepted: false,
          visitedAt: new Date()
        });

        const savedVisitor = await newVisitor.save();
        console.log('New visitor saved:', savedVisitor); // Debug log
      } else {
        console.log('Visitor already exists in last 24 hours:', existingVisitor); // Debug log
      }

      return NextResponse.json({ success: true });

    } else if (action === 'update') {
      // Find the most recent visitor with this IP
      const recentVisitor = await Visitor.findOne({
        ip: ip
      }).sort({ visitedAt: -1 });

      if (recentVisitor) {
        // Update the visitor record
        const updateData = {};
        
        if (email) {
          updateData.email = email;
        }
        
        if (cookiesAccepted !== undefined) {
          updateData.cookiesAccepted = cookiesAccepted;
        }

        // Also ensure country and city are set if they were unknown
        if (recentVisitor.country === 'Unknown' && country !== 'Unknown') {
          updateData.country = country;
        }
        if (recentVisitor.city === 'Unknown' && city !== 'Unknown') {
          updateData.city = city;
        }

        const updatedVisitor = await Visitor.findByIdAndUpdate(
          recentVisitor._id, 
          updateData,
          { new: true }
        );
        console.log('Updated visitor:', updatedVisitor); // Debug log
      } else {
        // Create new visitor if no recent one found - FIXED: Include all location data
        const newVisitor = new Visitor({
          ip: ip,
          country: country,
          city: city,
          email: email || null,
          userAgent: request.headers.get('user-agent') || 'Unknown',
          cookiesAccepted: cookiesAccepted || false,
          visitedAt: new Date()
        });

        const savedVisitor = await newVisitor.save();
        console.log('New visitor created during update:', savedVisitor); // Debug log
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {
    console.error('Error in visitors API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}