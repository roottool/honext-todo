type FetchArgs = Parameters<typeof fetch>
export const fetcher = <T>(
	url: FetchArgs[0],
	init?: FetchArgs[1],
): Promise<T> => {
	const res = fetch(url, init)
		.catch((error) => {
			throw error
		})
		.then((res) => {
			if (!res.ok) {
				throw new Error('An error occurred while fetching the data.')
			}
			return res
		})
		.then((res) => res.json())

	return res
}
