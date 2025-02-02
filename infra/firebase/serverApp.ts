import * as admin from 'firebase-admin'
import { z } from 'zod'

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
const firebaseAdminConfig = {
	projectId: validateServerEnv.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	clientEmail: validateServerEnv.FIREBASE_CLIENT_EMAIL,
	privateKey: validateServerEnv.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
} as const satisfies {
	projectId: string
	clientEmail: string
	privateKey: string
}

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert({
			projectId: firebaseAdminConfig.projectId,
			clientEmail: firebaseAdminConfig.clientEmail,
			privateKey: firebaseAdminConfig.privateKey,
		}),
	})
}

export default admin
