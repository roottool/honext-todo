import { LinkButton, PrimaryButton } from '@/components/Button'

export default function TaskCreationPage() {
	return (
		<main className="flex flex-col gap-12 px-4 py-5">
			<h2 className="font-bold text-3xl">タスク作成</h2>
			<div className="flex flex-col gap-2 w-full max-w-md">
				<div className="w-full py-3">
					<PrimaryButton>Create task</PrimaryButton>
				</div>
			</div>
		</main>
	)
}
