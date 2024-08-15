import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    if (pathname == '/') {
        return NextResponse.redirect(new URL('/chats', request.url));
    }
    return NextResponse.next();
}
export const config = {
    matcher: '/',
};
