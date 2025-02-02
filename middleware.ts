import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'

import { SESSION_COOKIE_KEY } from '@/infra/hono/authMiddleware'

export function middleware(req: NextRequest) {
	const token = req.cookies.get(SESSION_COOKIE_KEY)?.value
	return token
		? NextResponse.next()
		: NextResponse.redirect(new URL('/', req.url))
}

export const config = {
	matcher: ['/tasks/:path*'],
}
