import type { PropsWithChildren, RefAttributes } from 'react'
import {
	type ButtonProps as AriaButtonProps,
	Button,
} from 'react-aria-components'

import { twMerge } from 'tailwind-merge'

const DEFAULT_CLASSNAME =
	'font-bold py-3 rounded-xl w-full cursor-pointer' as const satisfies string

interface ButtonProps
	extends Omit<AriaButtonProps, 'className'>,
		RefAttributes<HTMLButtonElement> {
	className?: string | undefined
}
export const SecondaryButton = ({
	children,
	className = '',
	...props
}: PropsWithChildren<ButtonProps>) => {
	return (
		<Button
			{...props}
			className={twMerge(DEFAULT_CLASSNAME, 'bg-secondary', className)}
		>
			{children}
		</Button>
	)
}
