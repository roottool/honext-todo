'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { parseWithZod } from '@conform-to/zod'

import { taskSchema } from '@/app/tasks/schema'
import { SESSION_COOKIE_KEY } from '@/infra/cookie'
import {
	COLLECTION_NAME,
	adminDb,
	verifyIdToken,
} from '@/infra/firebase/serverApp'

export async function createTask(_: unknown, formData: FormData) {
	const submission = parseWithZod(formData, {
		schema: taskSchema,
	})
	if (submission.status !== 'success') {
		return submission.reply()
	}

	const idToken = (await cookies()).get(SESSION_COOKIE_KEY)?.value
	if (!idToken) {
		return { ok: false, error: 'No token provided' } as const
	}

	try {
		const { uid } = await verifyIdToken(idToken)
		const docRef = adminDb.collection(COLLECTION_NAME)
		await docRef.add({ uid, isCompleted: false, ...submission.value })
	} catch (error) {
		console.error(error)
		return { ok: false, error: 'The task creation failed' } as const
	}

	redirect('/tasks')
}
