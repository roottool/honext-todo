import { Hono } from 'hono'
import { getCookie } from 'hono/cookie'

import { SESSION_COOKIE_KEY } from '@/infra/cookie'
import { adminAuth } from '@/infra/firebase/serverApp'

const app = new Hono()
	.get('/', async (c) => {
		const token = getCookie(c, SESSION_COOKIE_KEY)

		try {
			const decodeIdToken = await verifyIdToken(token)
			return c.json({ ok: true, uid: decodeIdToken.uid } as const)
		} catch (error) {
			console.error(error)
			return c.json({ ok: false, error: 'Invalid ID token' } as const, 401)
		}
	})
	.post('/create', async (c) => {
		const token = getCookie(c, SESSION_COOKIE_KEY)
		try {
			await verifyIdToken(token)
		} catch (error) {
			return error instanceof Error
				? c.json({ ok: false, error: error.message } as const, 401)
				: c.json({ ok: false, error: 'Invalid ID token' } as const, 401)
		}

		return c.json({}, 201)
	})

// Hono MiddlewareではadminAuth.verifyIdToken()をRoute Handler上で動かせないので、関数に切り出して使用する。
const verifyIdToken = async (token: string | undefined) => {
	if (!token) {
		throw new Error('No token provided')
	}

	try {
		return await adminAuth.verifyIdToken(token)
	} catch {
		throw new Error('Invalid ID token')
	}
}

export default app
