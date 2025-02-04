'use server'

import { redirect } from 'next/navigation'

import { parseWithZod } from '@conform-to/zod'

import { taskSchema } from '@/app/tasks/schema'

// FIXME: Server function用にESLintの設定を見直す。
// eslint-disable-next-line @typescript-eslint/require-await
export async function createTask(_: unknown, formData: FormData) {
	const submission = parseWithZod(formData, {
		schema: taskSchema,
	})
	if (submission.status !== 'success') {
		return submission.reply()
	}

	redirect('/tasks')
}
