import { Noto_Sans_JP } from 'next/font/google'

import type { PropsWithChildren } from 'react'

import '@/app/globals.css'

const notoSansJp = Noto_Sans_JP({
	subsets: ['latin'],
	weight: ['400', '700'],
	variable: '--font-noto-sans-jp',
	display: 'swap',
	fallback: ['sans-serif'],
})

export const metadata = {
	title: 'TODO',
	description: 'Todo app.',
}

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="ja" className={`${notoSansJp.variable} antialiased`}>
			<body className="font-display">{children}</body>
		</html>
	)
}
