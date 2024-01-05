import assert from 'node:assert'
import type { UsersCollectionType, UsersType } from './types'

/**
 * Utility class for testing.
 */
export class TestUsersCollection {
	data: UsersCollectionType

	constructor(data: UsersCollectionType = []) {
		assert(Array.isArray(data))
		this.data = [...data]
	}

	log(): this {
		console.log(this.data)
		return this
	}

	sortByAge(sortDirection = 1): this {
		const sortFn = (a: UsersType, b: UsersType): number => (a.age - b.age) * sortDirection
		this.data.sort(sortFn)
		return this
	}

	sortByNameAsc(): this {
		const sortFn = (a: UsersType, b: UsersType): number => a.name < b.name ? 1 : -1
		this.data.sort(sortFn)
		return this
	}

	sortByCityAskAndAgeAsc(): this {
		const sortFn = (
			a: UsersType,
			b: UsersType
		): number => a.city.localeCompare(b.city) || a.age - b.age

		this.data.sort(sortFn)
		return this
	}

	filterByField(fieldName: string, ...values: any[]): this {
		const filter = (user: any): boolean => values.includes(user[fieldName])
		this.data = this.data.filter(filter)
		return this
	}

	filterByNameAndAge(name: string, age: number): this {
		return this
			.filterByField('name', name)
			.filterByField('age', age)
	}

	filterByNameAndCity(name: string, city: string): this {
		return this
			.filterByField('name', name)
			.filterByField('city', city)
	}

	filterBy$Gte(fieldName: string, $gte: number): this {
		const filter = (user: any): boolean => user[fieldName] >= $gte
		this.data = this.data.filter(filter)
		return this
	}

	limit(limit: number): this {
		assert(typeof limit === 'number')
		this.data = this.data.slice(0, limit)
		return this
	}

	json(): string {
		return JSON.stringify(this.data)
	}

	compare(dataToCompare: any): boolean {
		const dataJson = JSON.stringify(this.data)
		const dataToCompareJson = JSON.stringify(dataToCompare)
		return dataJson === dataToCompareJson
	}

	assert(dataToAssert: any): this {
		const isValid = this.compare(dataToAssert)
		if (!isValid) {
			console.log('Expected result is:\n', this.data)
			console.log('Returned result is:\n', dataToAssert)
		}
		assert(isValid, 'Result returned from collection class is incorrect.')
		return this
	}

	assertDataIsEqual(dataToAssert: any): this {
		this.assert(dataToAssert)
		return this
	}
}
