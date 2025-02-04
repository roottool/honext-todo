import TaskList from '@/app/tasks/_components/TaskList'
import { LinkButton } from '@/components/Button'

export default function TasksPage() {
	return (
		<main className="flex flex-col gap-12 px-4 py-5">
			<h2 className="font-bold text-3xl">タスク一覧</h2>
			<div className="flex flex-col gap-2 w-full max-w-md">
				<TaskList />
				<div className="w-full py-3">
					<LinkButton
						className="w-full"
						variant="secondary"
						href="/tasks/create"
					>
						Add task
					</LinkButton>
				</div>
			</div>
		</main>
	)
}
