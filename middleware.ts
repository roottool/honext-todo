import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
	const token = req.cookies.get('session')?.value
	return token
		? NextResponse.next()
		: NextResponse.redirect(new URL('/', req.url))
}

export const config = {
	matcher: ['/tasks/:path*'],
}
