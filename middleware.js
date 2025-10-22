import { NextResponse } from 'next/server'

export async function middleware(request) {
  const { nextUrl } = request
  
  // First, check if this path needs to be redirected
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
      
      // Call our API to check for redirections
      const baseUrl = new URL(request.url).origin
      const response = await fetch(`${baseUrl}/api/check-redirection?path=${encodeURIComponent(pathname)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add cache control to prevent too many requests
        next: { revalidate: 60 } // Cache for 60 seconds
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
      // Don't block the request if redirection check fails
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