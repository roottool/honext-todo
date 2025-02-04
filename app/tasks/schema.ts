import { z } from 'zod'

export const createTaskSchema = z.object({
	taskName: z.string().trim().min(1),
	dueDate: z.coerce.date(),
})
export type CreateTaskSchema = z.infer<typeof createTaskSchema>
