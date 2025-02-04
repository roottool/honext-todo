import { Hono } from 'hono'
import { setCookie } from 'hono/cookie'
import { z } from 'zod'

import { SESSION_COOKIE_KEY } from '@/infra/cookie'
import { verifyIdToken } from '@/infra/firebase/serverApp'
import { requestValidator } from '@/infra/hono/validator'

const app = new Hono().post(
	'/login',
	requestValidator('json', z.object({ idToken: z.string().jwt() })),
	async (c) => {
		const { idToken } = c.req.valid('json')
		if (!idToken) {
			return c.json({ error: 'No ID token provided' }, 400)
		}

		try {
			const decodedToken = await verifyIdToken(idToken)

			setCookie(c, SESSION_COOKIE_KEY, idToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'Strict',
				path: '/',
				// 有効期間は1日。
				maxAge: 60 * 60 * 24,
			})

			return c.json({ uid: decodedToken.uid })
		} catch (error) {
			console.error(error)
			return c.json({ error: 'Invalid ID token' }, 401)
		}
	},
)

export default app
