import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongoose'
import Redirection from '@/models/Redirection'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const path = searchParams.get('path')
    
    if (!path) {
      return NextResponse.json({ redirect: false })
    }

    await connectDB()
    
    // Find a redirection for this exact path
    const redirection = await Redirection.findOne({ 
      from: path.toLowerCase() 
    })
    
    if (redirection) {
      return NextResponse.json({
        redirect: true,
        to: redirection.to,
        type: redirection.type
      })
    }
    
    return NextResponse.json({ redirect: false })
  } catch (error) {
    console.error('Error checking redirection:', error)
    return NextResponse.json({ redirect: false })
  }
}