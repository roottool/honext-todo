import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { format } from 'date-fns'
import type { InferResponseType } from 'hono'

import CheckForm from '@/app/tasks/components/CheckForm'
import { SESSION_COOKIE_KEY } from '@/infra/cookie'
import { fetcher } from '@/infra/fetcher'
import { client } from '@/infra/hono/client'

type ResType = InferResponseType<typeof client.api.tasks.$get>
export default async function TaskList() {
	const idToken = (await cookies()).get(SESSION_COOKIE_KEY)?.value
	if (!idToken) {
		redirect('/')
	}

	const url = client.api.tasks.$url()
	const res = await fetcher<ResType>(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Cookie: `${SESSION_COOKIE_KEY}=${idToken}`,
		},
	}).catch((error) => {
		console.error(error)
		return { ok: false } as const
	})
	if (!res.ok) {
		return (
			<div className="py-2">
				<p>タスクを取得できませんでした。</p>
			</div>
		)
	}

	res.tasks.forEach((task) => {
		console.log(task)
		console.log(typeof task.dueDate)
	})
	return res.tasks.map(({ id, taskName, dueDate }) => (
		<div key={id} className="flex gap-2 justify-between py-2">
			<div>
				<p className="font-bold">{taskName}</p>
				<p className="text-tin-gray text-sm">
					Due: {format(new Date(dueDate), 'yyyy/MM/dd')}
				</p>
			</div>
			<CheckForm />
		</div>
	))
}
