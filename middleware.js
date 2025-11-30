import { NextResponse } from 'next/server'

// Countries to block
const BLOCKED_COUNTRIES = ['IN', 'SG', 'CN']; // India, Singapore, China

export async function middleware(request) {
  const { nextUrl } = request
  
  // Get client IP and country
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  const country = request.headers.get('x-vercel-ip-country') || 
                  request.headers.get('cf-ipcountry') || 
                  request.geo?.country || 
                  'unknown';

  // Check if country is blocked
  if (BLOCKED_COUNTRIES.includes(country)) {
    console.log(`🚫 Blocked request from ${country} (IP: ${ip}) for path: ${nextUrl.pathname}`);
    
    return new Response('Access denied from your region', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }

  // Your existing redirection logic
  if (
    request.method === "GET" &&
    !nextUrl.pathname.startsWith("/_next") &&
    !nextUrl.pathname.startsWith("/api") &&
    !nextUrl.pathname.startsWith("/static") &&
    !nextUrl.pathname.includes(".") &&
    nextUrl.pathname !== "/"
  ) {
    try {
      const pathname = nextUrl.pathname.toLowerCase()
      
      const baseUrl = new URL(request.url).origin
      const response = await fetch(`${baseUrl}/api/check-redirection?path=${encodeURIComponent(pathname)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 }
      })

      if (response.ok) {
        const data = await response.json()
        
        if (data.redirect) {
          console.log(`🔀 Redirecting ${pathname} to ${data.to} (${data.type})`)
          
          const redirectUrl = new URL(data.to, request.url)
          return NextResponse.redirect(redirectUrl, parseInt(data.type))
        }
      }
    } catch (error) {
      console.error('Redirection middleware error:', error)
    }
  }

  // Continue with normal response
  const response = NextResponse.next()
  response.headers.set('x-pathname', nextUrl.pathname)
  
  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}