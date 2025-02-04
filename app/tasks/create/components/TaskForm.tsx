'use client'

import { useActionState } from 'react'
import {
	Button,
	DateInput,
	DatePicker,
	DateSegment,
	FieldError,
	Form,
	Group,
	Input,
	Label,
	TextField,
} from 'react-aria-components'
import { FaRegCalendarAlt } from 'react-icons/fa'

import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'

import { PrimaryButton } from '@/app/components/Button'
import { createTask } from '@/app/tasks/create/actions'
import CalendarPopover from '@/app/tasks/create/components/CalendarPopover'
import { taskSchema } from '@/app/tasks/schema'

export default function TaskForm() {
	const [lastResult, action] = useActionState(createTask, undefined)
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: taskSchema })
		},
	})
	return (
		<Form
			{...form}
			action={action}
			className="flex flex-col gap-6 w-full max-w-md"
		>
			<TextField
				isRequired
				name={fields.taskName.name}
				className="flex flex-col gap-2"
			>
				<Label className="text-bold">Task name</Label>
				<Input
					key={fields.taskName.key}
					defaultValue={fields.taskName.initialValue}
					placeholder="New feature implementation"
					className="bg-secondary p-4 rounded-2xl"
				/>
				<FieldError>{fields.taskName.errors}</FieldError>
			</TextField>
			<DatePicker isRequired name="dueDate" className="flex flex-col gap-2">
				<Label className="text-bold">Due date</Label>
				<Group className="flex gap-12 bg-secondary w-fit p-4 rounded-2xl">
					<DateInput className="flex" key={fields.dueDate.key}>
						{(segment) => <DateSegment segment={segment} />}
					</DateInput>
					<Button>
						<FaRegCalendarAlt />
					</Button>
					<CalendarPopover />
				</Group>
				<FieldError>{fields.dueDate.errors}</FieldError>
			</DatePicker>
			<div className="w-full">
				<PrimaryButton type="submit">Create task</PrimaryButton>
			</div>
		</Form>
	)
}
