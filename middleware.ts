import { NextResponse, type NextRequest } from 'next/server';

const AUTH_TOKEN_KEY = process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY ?? 'canarias_auth_token';

const AUTH_PATH = '/auth';
const DASHBOARD_PATH = '/dashboard';

const PRIVATE_PATH_PREFIXES = ['/dashboard', '/treasury', '/admin'];

const hasAuthToken = (request: NextRequest): boolean => {
  return Boolean(request.cookies.get(AUTH_TOKEN_KEY)?.value);
};

const isPrivatePath = (pathname: string): boolean => {
  return PRIVATE_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
};

const isAuthPath = (pathname: string): boolean => {
  return pathname === AUTH_PATH || pathname.startsWith(`${AUTH_PATH}/`);
};

const redirectTo = (request: NextRequest, pathname: string): NextResponse => {
  return NextResponse.redirect(new URL(pathname, request.url));
};

export const middleware = (request: NextRequest): NextResponse => {
  const { pathname } = request.nextUrl;
  const authenticated = hasAuthToken(request);

  if (pathname === '/') {
    return redirectTo(request, authenticated ? DASHBOARD_PATH : AUTH_PATH);
  }

  if (isAuthPath(pathname) && authenticated) {
    return redirectTo(request, DASHBOARD_PATH);
  }

  if (isPrivatePath(pathname) && !authenticated) {
    const loginUrl = new URL(AUTH_PATH, request.url);

    loginUrl.searchParams.set('redirectTo', pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets).*)'],
};
