import { NextResponse } from 'next/server'

// Allow ALL countries - empty block list
const BLOCKED_COUNTRIES = []; // Empty array to block no countries

// Optional: Add known VPN/Proxy IP ranges or specific IPs you want to block
const BLOCKED_IPS = [
  // Add any specific IPs you want to block regardless of country
];

// Cloudflare VPN IP ranges (example - you can expand this list)
const KNOWN_VPN_RANGES = [
  '173.245.48.0/20',
  '103.21.244.0/22',
  '103.22.200.0/22',
  '103.31.4.0/22',
  '141.101.64.0/18',
  '108.162.192.0/18',
  '190.93.240.0/20',
  '188.114.96.0/20',
  '197.234.240.0/22',
  '198.41.128.0/17',
  '162.158.0.0/15',
  '104.16.0.0/13',
  '104.24.0.0/14',
  '172.64.0.0/13',
  '131.0.72.0/22'
];

function isIPInRange(ip, range) {
  try {
    const [rangeIP, subnetMask] = range.split('/');
    const ipInt = ipToInt(ip);
    const rangeIPInt = ipToInt(rangeIP);
    const mask = subnetMask ? -1 << (32 - parseInt(subnetMask)) : -1;
    
    return (ipInt & mask) === (rangeIPInt & mask);
  } catch {
    return false;
  }
}

function ipToInt(ip) {
  return ip.split('.').reduce((int, octet) => (int << 8) + parseInt(octet, 10), 0) >>> 0;
}

function extractRealIP(ipHeader) {
  if (!ipHeader) return 'unknown';
  
  // Handle multiple IPs in x-forwarded-for (first IP is the client)
  const ips = ipHeader.split(',').map(ip => ip.trim());
  return ips[0];
}

function isVPNorProxy(ip) {
  if (!ip || ip === 'unknown' || ip === '::1') return false;
  
  // Check against known VPN ranges
  return KNOWN_VPN_RANGES.some(range => isIPInRange(ip, range));
}

export async function middleware(request) {
  const { nextUrl } = request;
  
  // Get client IP and country with better extraction
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfCountry = request.headers.get('x-vercel-ip-country') || request.headers.get('cf-ipcountry');
  const geoCountry = request.geo?.country;
  
  const clientIP = extractRealIP(forwardedFor) || realIP || 'unknown';
  const country = cfCountry || geoCountry || 'unknown';

  // Log access for monitoring (optional)
  console.log(`🌍 Access from ${country} (IP: ${clientIP}) for path: ${nextUrl.pathname}`);

  // Block if IP is in VPN/proxy range (optional - you can remove this too if you want)
  if (isVPNorProxy(clientIP)) {
    console.log(`🔒 Blocked VPN/Proxy request from IP: ${clientIP} for path: ${nextUrl.pathname}`);
    
    return new Response('Access denied: VPN/Proxy detected', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }

  // Block if IP is specifically blocked
  if (BLOCKED_IPS.includes(clientIP)) {
    console.log(`🚫 Blocked specific IP: ${clientIP} for path: ${nextUrl.pathname}`);
    
    return new Response('Access denied', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }

  // REMOVED: Country blocking logic - now all countries are allowed
  // Only block if country is explicitly in BLOCKED_COUNTRIES (which is empty)
  if (BLOCKED_COUNTRIES.includes(country)) {
    console.log(`🚫 Blocked request from ${country} (IP: ${clientIP}) for path: ${nextUrl.pathname}`);
    
    return new Response('Access denied from your region', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }

  // Your existing redirection logic (now for all countries)
  if (
    request.method === "GET" &&
    !nextUrl.pathname.startsWith("/_next") &&
    !nextUrl.pathname.startsWith("/api") &&
    !nextUrl.pathname.startsWith("/static") &&
    !nextUrl.pathname.includes(".") &&
    nextUrl.pathname !== "/"
  ) {
    try {
      const pathname = nextUrl.pathname.toLowerCase();
      
      const baseUrl = new URL(request.url).origin;
      const response = await fetch(`${baseUrl}/api/check-redirection?path=${encodeURIComponent(pathname)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
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

  // Continue with normal response for all countries
  const response = NextResponse.next();
  response.headers.set('x-pathname', nextUrl.pathname);
  
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}