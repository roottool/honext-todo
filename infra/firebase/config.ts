import { z } from 'zod'

const clientEnvSchema = z.object({
	NEXT_PUBLIC_FIREBASE_API_KEY: z.string().min(1),
	NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().min(1),
	NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().min(1),
	NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string().min(1),
	NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1),
	NEXT_PUBLIC_FIREBASE_APP_ID: z.string().min(1),
})
const validateClientEnv = clientEnvSchema.parse({
	NEXT_PUBLIC_FIREBASE_API_KEY: process.env['NEXT_PUBLIC_FIREBASE_API_KEY'],
	NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
		process.env['NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'],
	NEXT_PUBLIC_FIREBASE_PROJECT_ID:
		process.env['NEXT_PUBLIC_FIREBASE_PROJECT_ID'],
	NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:
		process.env['NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET'],
	NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
		process.env['NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'],
	NEXT_PUBLIC_FIREBASE_APP_ID: process.env['NEXT_PUBLIC_FIREBASE_APP_ID'],
})
export const firebaseConfig = {
	apiKey: validateClientEnv.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: validateClientEnv.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: validateClientEnv.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: validateClientEnv.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: validateClientEnv.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: validateClientEnv.NEXT_PUBLIC_FIREBASE_APP_ID,
} as const satisfies {
	apiKey: string
	authDomain: string
	projectId: string
	storageBucket: string
	messagingSenderId: string
	appId: string
}

const serverEnvSchema = z.object({
	NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().min(1),
	FIREBASE_CLIENT_EMAIL: z.string().min(1).email(),
	FIREBASE_PRIVATE_KEY: z.string().min(1),
})
const validateServerEnv = serverEnvSchema.parse({
	NEXT_PUBLIC_FIREBASE_PROJECT_ID:
		process.env['NEXT_PUBLIC_FIREBASE_PROJECT_ID'],
	FIREBASE_CLIENT_EMAIL: process.env['FIREBASE_CLIENT_EMAIL'],
	FIREBASE_PRIVATE_KEY: process.env['FIREBASE_PRIVATE_KEY'],
})
export const firebaseAdminConfig = {
	projectId: validateServerEnv.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	clientEmail: validateServerEnv.FIREBASE_CLIENT_EMAIL,
	privateKey: validateServerEnv.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
} as const satisfies {
	projectId: string
	clientEmail: string
	privateKey: string
}
