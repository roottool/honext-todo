'use client'

import Link, { type LinkProps } from 'next/link'

import type { PropsWithChildren, RefAttributes } from 'react'
import {
	type ButtonProps as AriaButtonProps,
	type LinkProps as AriaLinkProps,
	Button,
} from 'react-aria-components'

import { twMerge } from 'tailwind-merge'

const DEFAULT_CLASSNAME =
	'font-bold px-4 py-3 rounded-xl cursor-pointer' as const satisfies string

interface ButtonProps
	extends Omit<AriaButtonProps, 'className'>,
		RefAttributes<HTMLButtonElement> {
	className?: string | undefined
}
export const PrimaryButton = ({
	children,
	className = '',
	...props
}: PropsWithChildren<ButtonProps>) => {
	return (
		<Button
			{...props}
			className={twMerge(DEFAULT_CLASSNAME, 'bg-primary text-white', className)}
		>
			{children}
		</Button>
	)
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

interface LinkButtonProps extends LinkProps {
	className?: string | undefined
	variant?: 'primary' | 'secondary' | undefined
}
export const LinkButton = ({
	children,
	variant,
	className = '',
	...props
}: PropsWithChildren<LinkButtonProps>) => {
	const variantClassName = defineVariantClassName(variant)
	return (
		<Link
			{...props}
			className={twMerge(
				'flex justify-center gap-2',
				DEFAULT_CLASSNAME,
				variantClassName,
				className,
			)}
		>
			{children}
		</Link>
	)
}

function defineVariantClassName(variant: LinkButtonProps['variant']) {
	switch (variant) {
		case 'primary':
			return 'bg-primary text-white'
		case 'secondary':
			return 'bg-secondary'
		default:
			return ''
	}
}
