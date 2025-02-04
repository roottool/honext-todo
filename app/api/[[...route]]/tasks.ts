import { Hono } from 'hono'
import { getCookie } from 'hono/cookie'

import type { TaskSchema } from '@/app/tasks/schema'
import { SESSION_COOKIE_KEY } from '@/infra/cookie'
import {
	COLLECTION_NAME,
	adminDb,
	verifyIdToken,
} from '@/infra/firebase/serverApp'

interface QuerySnapshotSchema extends Omit<TaskSchema, 'dueDate'> {
	dueDate: number
}

const app = new Hono().get('/', async (c) => {
	const token = getCookie(c, SESSION_COOKIE_KEY)

	let uid: string
	try {
		const decodedIdToken = await verifyIdToken(token)
		uid = decodedIdToken.uid
	} catch (error) {
		console.error(error)
		return c.json(
			{
				ok: false,
				error: error instanceof Error ? error.message : 'Invalid ID token',
			} as const,
			401,
		)
	}
	if (!uid) {
		return c.json({ ok: false, error: 'Invalid ID token' } as const, 401)
	}

	try {
		const queryRef = adminDb.collection(COLLECTION_NAME).where('uid', '==', uid).orderBy('dueDate')
		const querySnapShot = await queryRef.get()
		const tasks = querySnapShot.docs.map((doc) => {
			const data = doc.data() as QuerySnapshotSchema
			return {
				id: doc.id,
				taskName: data.taskName,
				// Firestoreはナノ秒で保持するため、ミリ秒なDate型向けに変換する。
				dueDate: data.dueDate * 1000,
			}
		})
		return c.json({ ok: true, tasks } as const)
	} catch (error) {
		console.error(error)
		return c.json(
			{
				ok: false,
				error: 'Tasks could not be fetched',
			} as const,
			400,
		)
	}
})

export default app
