import { zValidator } from '@hono/zod-validator'
import type { ValidationTargets } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { ZodSchema } from 'zod'

export const requestValidator = <
	T extends ZodSchema,
	Target extends keyof ValidationTargets,
>(
	target: Target,
	schema: T,
) =>
	zValidator(target, schema, (result) => {
		if (!result.success) {
			throw new HTTPException(400, { cause: result.error })
		}
	})
