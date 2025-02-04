'use client'

import { type ChangeEvent, useTransition } from 'react'

import { updateTaskStatus } from './actions'

interface Props {
	id: string
	isCompleted: boolean
}
export default function CheckForm(props: Props) {
	const [pending, startTransition] = useTransition()
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault()
		startTransition(async () => {
			await updateTaskStatus({
				...props,
				isCompleted: event.currentTarget.checked,
			})
		})
	}
	return (
		<input
			type="checkbox"
			checked={props.isCompleted}
			disabled={pending}
			onChange={handleChange}
		/>
	)
}
