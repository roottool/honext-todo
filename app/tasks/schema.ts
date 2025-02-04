import { z } from 'zod'

export const createTaskSchema = z.object({
	taskName: z.string().trim().min(1),
	dueDate: z.coerce.date(),
})
export type CreateTaskSchema = z.infer<typeof createTaskSchema>

export const updateTaskSchema = z.object({
	id: z.string().min(1),
	isCompleted: z.boolean(),
})
export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>
