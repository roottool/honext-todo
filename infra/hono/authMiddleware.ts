import { getCookie } from 'hono/cookie'
import { createMiddleware } from 'hono/factory'

import { adminAuth } from '@/infra/firebase/serverApp'

export const COOKIE_NAME = 'session' as const satisfies string

export const authMiddleware = createMiddleware(async (c, next) => {
	const token = getCookie(c, COOKIE_NAME)
	if (!token) {
		return c.json({ error: 'No token provided' }, 400)
	}

	try {
		const decodedToken = await adminAuth.verifyIdToken(token)
		c.set('user', decodedToken)
	} catch (error) {
		console.error(error)
		return c.json({ error: 'Invalid ID token' }, 401)
	}

	await next()
	return
})
