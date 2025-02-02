import eslint from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import gitignore from 'eslint-config-flat-gitignore'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
	{
		name: 'ignores',
		ignores: ['public', 'pnpm-lock.yaml', ...gitignore({ root: true }).ignores],
	},
	{
		name: 'language options',
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.es2025,
				...globals.node,
			},
		},
	},
	eslint.configs.recommended,
	tseslint.configs.recommendedTypeChecked,
	tseslint.configs.stylisticTypeChecked,
	{
		files: ['*.{js,cjs,mjs}'],
		...tseslint.configs.disableTypeChecked,
	},
	{
		name: 'additional ts settings',
		files: ['**/*.{ts,mts,tsx}'],
		languageOptions: {
			parserOptions: {
				project: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		plugins: {
			'unused-imports': unusedImports,
		},
		settings: {
			'import/resolver-next': [
				createTypeScriptImportResolver({
					alwaysTryTypes: true,
				}),
			],
		},
		rules: {
			'@typescript-eslint/no-unused-vars': 'off',
			'unused-imports/no-unused-vars': [
				'warn',
				{
					vars: 'all',
					varsIgnorePattern: '^_',
					args: 'after-used',
					argsIgnorePattern: '^_',
				},
			],
		},
	},
	{
		name: 'react',
		files: ['{app|src}/**/*.{ts,tsx}'],
		...reactPlugin.configs.flat['jsx-runtime'],
		// NOTE: https://github.com/vercel/next.js/discussions/49337#discussioncomment-5998603
		settings: {
			react: {
				version: 'detect',
			},
		},
		plugins: {
			'jsx-a11y': jsxA11yPlugin,
			react: reactPlugin,
			'react-hooks': reactHooksPlugin,
		},
		rules: {
			...jsxA11yPlugin.configs.recommended.rules,
			...reactPlugin.configs.flat.recommended.rules,
			...reactPlugin.configs.flat['jsx-runtime'].rules,
			...reactHooksPlugin.configs['recommended'].rules,
			'react/prop-types': 'off',
			'jsx-a11y/anchor-is-valid': [
				'error',
				{
					components: ['Link'],
					specialLink: ['to'],
				},
			],
			'react/jsx-sort-props': [
				'warn',
				{
					callbacksLast: false,
					ignoreCase: true,
					noSortAlphabetically: false,
					shorthandFirst: true,
					reservedFirst: true,
				},
			],
		},
	},
	{
		name: 'nextjs',
		files: ['{app|src}/**/*.{ts,tsx}'],
		plugins: {
			'@next/next': nextPlugin,
		},
		rules: {
			...nextPlugin.configs.recommended.rules,
			...nextPlugin.configs['core-web-vitals'].rules,
			'@next/next/no-img-element': 'off',
			'no-restricted-imports': [
				'error',
				{
					paths: [
						{
							name: 'next/inmage',
							message: 'Use <img>.',
						},
					],
				},
			],
		},
	},
)
