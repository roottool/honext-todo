import { Hono } from 'hono'
import { handle } from 'hono/vercel'

import authRoute from '@/app/api/[[...route]]/auth'
import tasksRoute from '@/app/api/[[...route]]/tasks'

const app = new Hono()
	.basePath('/api')
	.route('/auth', authRoute)
	.route('/tasks', tasksRoute)

export const GET = handle(app)
export const POST = handle(app)

export type HonoApp = typeof app
