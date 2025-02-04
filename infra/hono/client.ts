import { hc } from 'hono/client'
import { z } from 'zod'

import type { HonoApp } from '@/app/api/[[...route]]/route'

const apiBaseUrlSchema = z.string().url()
const validateApiBaseUrl = apiBaseUrlSchema.parse(process.env['API_BASE_URL'])
export const client = hc<HonoApp>(validateApiBaseUrl)
