import { type InferResponseType, hc } from 'hono/client'
import { z } from 'zod'

import type { HonoApp } from '@/app/api/[[...route]]/route'

const apiBaseUrlSchema = z.string().url()
const validateApiBaseUrl = apiBaseUrlSchema.parse(process.env['API_BASE_URL'])
export const client = hc<HonoApp>(validateApiBaseUrl)

export type GetResponse = InferResponseType<typeof client.api.tasks.$get>
