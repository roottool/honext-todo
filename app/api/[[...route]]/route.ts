import { Hono } from 'hono'
import { handle } from 'hono/vercel'

import authRoute from './auth'

const app = new Hono().basePath('/api')

const _route = app.route('/auth', authRoute)
export type HonoApp = typeof _route

export const GET = handle(app)
export const POST = handle(app)
