import { z } from 'zod'

export const taskSchema = z.object({
	taskName: z.string().trim().min(1),
	dueDate: z.coerce.date(),
})
export type TaskSchema = z.infer<typeof taskSchema>
