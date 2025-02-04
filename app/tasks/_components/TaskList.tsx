import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';



import type { InferResponseType } from 'hono'

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
	})
	if (!res.ok) {
		return (
			<div>
				<p>タスクを取得できませんでした。</p>
			</div>
		)
	}

	return (
		<div>
			<p>{res.uid}</p>
		</div>
	)
}
