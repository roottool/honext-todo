import 'client-only'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

import { auth } from './clientApp'

const provider = new GoogleAuthProvider()
export async function signInWithGoogle() {
	try {
		return await signInWithPopup(auth, provider)
	} catch (error) {
		throw new Error('Error signing in with Google', { cause: error })
	}
}
