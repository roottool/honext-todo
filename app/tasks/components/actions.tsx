'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'

import { type UpdateTaskSchema, updateTaskSchema } from '@/app/tasks/schema'
import { SESSION_COOKIE_KEY } from '@/infra/cookie'
import {
	COLLECTION_NAME,
	adminDb,
	verifyIdToken,
} from '@/infra/firebase/serverApp'

export async function updateTaskStatus(payload: UpdateTaskSchema) {
	const validatedPayload = updateTaskSchema.safeParse(payload)
	if (!validatedPayload.success) {
		return NextResponse.json({ ok: false, error: 'Invalid payload' } as const, {
			status: 400,
		})
	}

	const idToken = (await cookies()).get(SESSION_COOKIE_KEY)?.value
	if (!idToken) {
		return NextResponse.json(
			{ ok: false, error: 'No token provided' } as const,
			{ status: 400 },
		)
	}

	let uid: string
	try {
		const decodedIdToken = await verifyIdToken(idToken)
		uid = decodedIdToken.uid
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{
				ok: false,
				error: 'Invalid ID token',
			} as const,
			{ status: 401 },
		)
	}
	if (!uid) {
		return NextResponse.json(
			{
				ok: false,
				error: 'Invalid ID token',
			} as const,
			{ status: 401 },
		)
	}

	try {
		const { id, isCompleted } = validatedPayload.data
		const taskRef = adminDb.collection(COLLECTION_NAME).doc(id)
		const taskSnapshot = await taskRef.get()
		if (!taskSnapshot.exists) {
			return NextResponse.json(
				{ ok: false, error: 'The task does not exist' } as const,
				{ status: 404 },
			)
		}

		const taskData = taskSnapshot.data()
		if (taskData?.['uid'] !== uid) {
			return NextResponse.json(
				{ ok: false, error: 'The task does not exist' } as const,
				{ status: 404 },
			)
		}

		await taskRef.update({
			isCompleted,
		})
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{ ok: false, error: 'The task update failed' } as const,
			{ status: 500 },
		)
	}

	revalidatePath('/tasks')
	return
}
