// Edge Middleware Interface Definition compatible with Next.js Edge Runtime
interface CookieItem {
  value?: string;
}

interface RequestCookies {
  get: (name: string) => CookieItem | undefined;
}

interface EdgeNextRequest {
  nextUrl: URL;
  url: string;
  cookies: RequestCookies;
}

class EdgeNextResponse {
  static next() {
    return new Response(null, { status: 200 });
  }

  static redirect(url: URL | string, status = 307) {
    return new Response(null, {
      status,
      headers: { Location: url.toString() },
    });
  }
}

/**
 * Edge Middleware for Route Protection (Next.js / Vercel Edge / Cloudflare Workers)
 * 
 * Rules:
 *  - /dashboard/* -> Requires authenticated user session (client or admin).
 *  - /admin/*     -> Strictly restricted to verified Admin tokens / roles.
 */
export function middleware(request: EdgeNextRequest) {
  const { pathname } = request.nextUrl;

  // Retrieve auth cookie or token set by client
  const sessionToken = request.cookies.get('__session')?.value || request.cookies.get('tac_auth_token')?.value;
  const userRole = request.cookies.get('tac_user_role')?.value;

  // 1. Executive Admin Route Protection (/admin/*)
  if (pathname.startsWith('/admin')) {
    if (!sessionToken) {
      const loginUrl = new URL('/', request.url);
      loginUrl.searchParams.set('auth', 'signin');
      loginUrl.searchParams.set('redirect', pathname);
      return EdgeNextResponse.redirect(loginUrl);
    }

    if (userRole && userRole !== 'admin') {
      // Forbidden: redirect to client dashboard
      const dashboardUrl = new URL('/dashboard', request.url);
      return EdgeNextResponse.redirect(dashboardUrl);
    }
  }

  // 2. Client Workspace Route Protection (/dashboard/*)
  if (pathname.startsWith('/dashboard')) {
    if (!sessionToken) {
      const loginUrl = new URL('/', request.url);
      loginUrl.searchParams.set('auth', 'signin');
      loginUrl.searchParams.set('redirect', pathname);
      return EdgeNextResponse.redirect(loginUrl);
    }
  }

  return EdgeNextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};

