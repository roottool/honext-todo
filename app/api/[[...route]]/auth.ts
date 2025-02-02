import { Hono } from 'hono'
import { setCookie } from 'hono/cookie'
import { z } from 'zod'

import admin from '@/infra/firebase/serverApp'
import { requestValidator } from '@/infra/hono/validator'

const auth = admin.auth()
const app = new Hono().post(
	'/login',
	requestValidator('json', z.object({ idToken: z.string().jwt() })),
	async (c) => {
		const { idToken } = c.req.valid('json')
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
	},
)

export default app
