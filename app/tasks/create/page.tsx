import TaskForm from '@/app/tasks/create/components/TaskForm'

export default function TaskCreationPage() {
	return (
		<main className="flex flex-col gap-12 px-4 py-5">
			<h2 className="font-bold text-3xl">タスク作成</h2>
			<TaskForm />
		</main>
	)
}
