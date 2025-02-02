import { Hono } from 'hono'
import { setCookie } from 'hono/cookie'

import admin from '@/infra/firebase/serverApp'

const auth = admin.auth()
const app = new Hono().post('/login', async (c) => {
	const { idToken } = await c.req.json<{ idToken: string }>()
	if (!idToken) {
		return c.json({ error: 'No ID token provided' }, 400)
	}

	try {
		const decodedToken = await auth.verifyIdToken(idToken)

		setCookie(c, 'session', idToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			path: '/',
			// 有効期間は1日。
			maxAge: 60 * 60 * 24,
		})

		return c.json({ uid: decodedToken.uid, email: decodedToken.email })
	} catch (error) {
		console.error(error)
		return c.json({ error: 'Invalid ID token' }, 401)
	}
})

export default app
