import * as admin from 'firebase-admin'
import type { ServiceAccount } from 'firebase-admin'
import 'server-only'
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
} as const satisfies ServiceAccount

const firebaseAdmin =
	admin.apps[0] ??
	admin.initializeApp({
		credential: admin.credential.cert(firebaseAdminConfig),
	})

export const adminDb = firebaseAdmin.firestore()
export const COLLECTION_NAME = 'tasks' as const satisfies string

const adminAuth = firebaseAdmin.auth()
export const verifyIdToken = async (token: string | undefined) => {
	if (!token) {
		throw new Error('No token provided')
	}

	try {
		return await adminAuth.verifyIdToken(token)
	} catch {
		throw new Error('Invalid ID token')
	}
}
