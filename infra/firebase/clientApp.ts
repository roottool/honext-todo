import 'client-only'
import {
	type FirebaseApp,
	type FirebaseOptions,
	getApps,
	initializeApp,
} from 'firebase/app'
import { getAuth } from 'firebase/auth'
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
} as const satisfies FirebaseOptions

const createFirebaseApp = (): FirebaseApp => {
	const firebaseApp = getApps()
	return firebaseApp[0] ?? initializeApp(firebaseConfig)
}

const firebaseApp = createFirebaseApp()
export const auth = getAuth(firebaseApp)
