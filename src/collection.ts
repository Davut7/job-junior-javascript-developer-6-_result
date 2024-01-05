import type { EntryType, OptionsType, QueryType } from './types'

/**
 * This class helping to use regular javascript array same way as mongo collection
 */
export class Collection {
	data: any

	constructor(data: any = []) {
		this.data = data
	}

	async find(
		query: QueryType = {},
		options: OptionsType = {}
	): Promise<any[]> {
		const filterFn = (entry: any): boolean => {
			if ('$or' in query) {
				const orConditions = query.$or as EntryType[]
				return orConditions.some((condition) =>
					Object.keys(condition).every(
						(key) => entry[key] === condition[key]
					)
				)
			} else {
				return Object.entries(query).every(([key, value]) => {
					if (key.includes('$gte')) {
						const fieldName = key.replace('$gte', '')
						return (
							entry[fieldName] !== undefined &&
							entry[fieldName] >= value
						)
					} else {
						return entry[key] === value
					}
				})
			}
		}

		let result = this.data.filter(filterFn)

		if (options.sort) {
			this.sortByField(options.sort, result)
		}

		if (options.limit) {
			result = result.slice(0, options.limit)
		}

		return result
	}

	sortByField(sortOptions: Record<string, number>, result: any = []): any[] {
		const sortKeys = Object.keys(sortOptions)
		result.sort((a: any, b: any) => {
			for (const key of sortKeys) {
				const order = sortOptions[key]
				const comparison =
					String(a[key]).localeCompare(String(b[key])) * order
				if (comparison !== 0) {
					return comparison
				}
			}
			return 0
		})
		return result
	}
}
