import { NextResponse } from 'next/server'

// Only allow US and UK - block everything else
const ALLOWED_COUNTRIES = ['US', 'GB', 'UM']; // USA, UK, US Minor Outlying Islands

// Add allowed IP addresses that bypass geo-blocking (if needed)
const BLOCKED_IPS = [];
const ALLOWED_IPS = [];

function extractRealIP(ipHeader) {
  if (!ipHeader) return 'unknown';
  
  // Handle multiple IPs in x-forwarded-for (first IP is the client)
  const ips = ipHeader.split(',').map(ip => ip.trim());
  return ips[0];
}

export async function middleware(request) {
  const { nextUrl } = request;
  const pathname = nextUrl.pathname;
  const hostname = nextUrl.hostname;
  
  // ============ ALLOW LOCALHOST ACCESS ============
  // Skip geo-blocking entirely when running on localhost
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    console.log(`🌐 Localhost access allowed for path: ${pathname}`);
    
    // Apply redirection logic if needed
    if (
      request.method === "GET" &&
      !pathname.startsWith("/_next") &&
      !pathname.startsWith("/api") &&
      !pathname.startsWith("/static") &&
      !pathname.includes(".") &&
      pathname !== "/"
    ) {
      try {
        const baseUrl = new URL(request.url).origin;
        const response = await fetch(`${baseUrl}/api/check-redirection?path=${encodeURIComponent(pathname)}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          next: { revalidate: 60 }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.redirect) {
            console.log(`🔀 Redirecting ${pathname} to ${data.to} (${data.type})`);
            const redirectUrl = new URL(data.to, request.url);
            return NextResponse.redirect(redirectUrl, parseInt(data.type));
          }
        }
      } catch (error) {
        console.error('Redirection middleware error on localhost:', error);
      }
    }
    
    const response = NextResponse.next();
    response.headers.set('x-pathname', pathname);
    response.headers.set('x-localhost', 'true');
    return response;
  }
  
  // Get client IP and country
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const clientIP = extractRealIP(forwardedFor) || realIP || 'unknown';
  
  // ============ ALLOW SPECIFIC IP ADDRESSES ============
  // Allow specific IPs to bypass all restrictions
  if (ALLOWED_IPS.includes(clientIP)) {
    console.log(`✅ Allowed specific IP: ${clientIP} for path: ${pathname}`);
    
    // Apply redirection logic if needed
    if (
      request.method === "GET" &&
      !pathname.startsWith("/_next") &&
      !pathname.startsWith("/api") &&
      !pathname.startsWith("/static") &&
      !pathname.includes(".") &&
      pathname !== "/"
    ) {
      try {
        const baseUrl = new URL(request.url).origin;
        const response = await fetch(`${baseUrl}/api/check-redirection?path=${encodeURIComponent(pathname)}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          next: { revalidate: 60 }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.redirect) {
            console.log(`🔀 Redirecting ${pathname} to ${data.to} (${data.type})`);
            const redirectUrl = new URL(data.to, request.url);
            return NextResponse.redirect(redirectUrl, parseInt(data.type));
          }
        }
      } catch (error) {
        console.error('Redirection middleware error for allowed IP:', error);
      }
    }
    
    const response = NextResponse.next();
    response.headers.set('x-pathname', pathname);
    response.headers.set('x-allowed-ip', 'true');
    return response;
  }
  
  // ============ SKIP GEO-BLOCKING FOR IMAGE PROXY ============
  // Allow worldwide access for image proxy URLs
  if (pathname.startsWith('/api/proxy-image') || 
      pathname.startsWith('/custom-packaging/')) {
    
    // Apply redirection logic if needed
    if (
      request.method === "GET" &&
      pathname.startsWith('/custom-packaging/') &&
      !pathname.includes('.')
    ) {
      try {
        const baseUrl = new URL(request.url).origin;
        const response = await fetch(`${baseUrl}/api/check-redirection?path=${encodeURIComponent(pathname)}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          next: { revalidate: 60 }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.redirect) {
            console.log(`🔀 Redirecting image path ${pathname} to ${data.to}`);
            const redirectUrl = new URL(data.to, request.url);
            return NextResponse.redirect(redirectUrl, parseInt(data.type));
          }
        }
      } catch (error) {
        console.error('Redirection middleware error for image path:', error);
      }
    }
    
    return NextResponse.next();
  }
  
  // ============ GEO-BLOCKING FOR ALL OTHER PATHS ============
  // Get country info
  const cfCountry = request.headers.get('x-vercel-ip-country') || request.headers.get('cf-ipcountry');
  const geoCountry = request.geo?.country;
  const country = cfCountry || geoCountry || 'unknown';

  // REMOVED: VPN/Proxy blocking for ALL users
  // Now VPN users from US/UK can access the website
  
  // Block if IP is specifically blocked
  if (BLOCKED_IPS.includes(clientIP)) {
    console.log(`🚫 Blocked specific IP: ${clientIP} for path: ${pathname}`);
    return new Response('Access denied', {
      status: 403,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  // BLOCK ALL COUNTRIES EXCEPT US AND UK
  // This runs for ALL users including VPN users
  if (country !== 'unknown' && !ALLOWED_COUNTRIES.includes(country)) {
    console.log(`🌍 Blocked request from ${country} (IP: ${clientIP}) for path: ${pathname}`);
    return new Response('This website is not Available', {
      status: 403,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  // Block if country is unknown
  if (country === 'unknown') {
    console.log(`❓ Blocked unknown country request from IP: ${clientIP} for path: ${pathname}`);
    return new Response('Access denied: Region not detectable', {
      status: 403,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  // If we reach here, the user is from US or UK (including VPN users)
  console.log(`✅ Allowed access from ${country} (IP: ${clientIP}) for path: ${pathname}`);

  // ============ REDIRECTION LOGIC ============
  // Your existing redirection logic
  if (
    request.method === "GET" &&
    !pathname.startsWith("/_next") &&
    !pathname.startsWith("/api") &&
    !pathname.startsWith("/static") &&
    !pathname.includes(".") &&
    pathname !== "/"
  ) {
    try {
      const baseUrl = new URL(request.url).origin;
      const response = await fetch(`${baseUrl}/api/check-redirection?path=${encodeURIComponent(pathname)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        next: { revalidate: 60 }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.redirect) {
          console.log(`🔀 Redirecting ${pathname} to ${data.to} (${data.type})`);
          const redirectUrl = new URL(data.to, request.url);
          return NextResponse.redirect(redirectUrl, parseInt(data.type));
        }
      }
    } catch (error) {
      console.error('Redirection middleware error:', error);
    }
  }

  // Continue with normal response
  const response = NextResponse.next();
  response.headers.set('x-pathname', pathname);
  response.headers.set('x-country', country);
  
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:ico|jpg|jpeg|png|svg|css|js)$).*)',
  ],
}