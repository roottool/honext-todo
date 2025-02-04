'use client'

import { useRouter } from 'next/navigation'

import { useState } from 'react'

import { SecondaryButton } from '@/components/Button'
import { signInWithGoogle } from '@/infra/firebase/auth'

export default function LoginButton({ children }: { children: string }) {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const handleLoginWithPress = async () => {
		setIsLoading(true)
		await login()
			.then(() => {
				router.push('/tasks')
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	return (
		<SecondaryButton
		className='w-full'
			isPending={isLoading}
			onPress={() => {
				void handleLoginWithPress()
			}}
		>
			{children}
		</SecondaryButton>
	)
}

// TODO: カスタムフック化したい
const login = async () => {
	try {
		const { user } = await signInWithGoogle()
		const idToken = await user.getIdToken()

		const res = await fetch('/api/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ idToken }),
		})

		if (!res.ok) throw new Error('ログインに失敗しました')
	} catch (err) {
		console.error(err)
	}
}
