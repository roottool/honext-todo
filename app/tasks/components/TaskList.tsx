import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { format } from 'date-fns'

import CheckForm from '@/app/tasks/components/CheckForm'
import { SESSION_COOKIE_KEY } from '@/infra/cookie'
import { fetcher } from '@/infra/fetcher'
import { type GetResponse, client } from '@/infra/hono/client'

export default async function TaskList() {
	const idToken = (await cookies()).get(SESSION_COOKIE_KEY)?.value
	if (!idToken) {
		redirect('/')
	}

	const url = client.api.tasks.$url()
	const res = await fetcher<GetResponse>(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Cookie: `${SESSION_COOKIE_KEY}=${idToken}`,
		},
	}).catch((error) => {
		console.error(error)
		return {
			ok: false,
			error: 'Tasks could not be fetched',
		} as const
	})
	if (!res.ok) {
		return (
			<div className="py-2">
				<p>タスクを取得できませんでした。</p>
			</div>
		)
	}

	return res.tasks.map(({ id, taskName, dueDate, isCompleted }) => (
		<div key={id} className="flex gap-2 justify-between py-2">
			<div>
				<p className="font-bold">{taskName}</p>
				<p className="text-tin-gray text-sm">
					Due: {format(new Date(dueDate), 'yyyy/MM/dd')}
				</p>
			</div>
			<CheckForm {...{ id, dueDate, isCompleted }} />
		</div>
	))
}
