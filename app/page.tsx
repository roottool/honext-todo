import LoginButton from '@/app/components/LoginButton'

export const dynamic = 'force-dynamic'

export default function Home() {
	return (
		<main className="flex flex-col gap-12 items-center py-5">
			<h2 className="font-bold text-2xl">ログイン</h2>
			<div className="flex gap-2 justify-center w-full max-w-md mx-auto">
				<LoginButton>Sign in with Google</LoginButton>
			</div>
		</main>
	)
}
