import { test } from 'bun:test'
import { Collection } from './collection'
import type { UsersCollectionType } from './types'
import usersData from './_data.users'
import { TestUsersCollection } from './testUsersCollection'

const users: UsersCollectionType = usersData

const usersCollection = new Collection(users)
const isDebug = false

test.skipIf(isDebug)('query users by name', async done => {
	const query = {
		name: 'Crista'
	}

	new TestUsersCollection(usersData)
		.filterByField('name', query.name)
		.assertDataIsEqual(await usersCollection.find(query))

	done()
})

test.skipIf(isDebug)('query users by name and age', async done => {
	const query = {
		name: 'Crista',
		age: 19
	}

	new TestUsersCollection(usersData)
		.filterByNameAndAge(query.name, query.age)
		.assertDataIsEqual(await usersCollection.find(query))

	done()
})

test.skipIf(isDebug)('query users by name with limit', async done => {
	const query = {
		name: 'Crista'
	}

	const options = {
		limit: 1
	}

	new TestUsersCollection(usersData)
		.filterByField('name', query.name)
		.limit(options.limit)
		.assertDataIsEqual(await usersCollection.find(query, options))

	done()
})

test.skipIf(isDebug)('query users with ascending sort by age', async done => {
	const query = {}
	const options = { sort: { age: 1 } }

	new TestUsersCollection(usersData)
		.sortByAge(options.sort.age)
		.assert(await usersCollection.find(query, options))

	done()
})

test.skipIf(isDebug)('query users by name with descending sort by age', async done => {
	const query = {
		name: 'Crista'
	}

	const options = {
		sort: {
			age: -1
		}
	}

	new TestUsersCollection(usersData)
		.filterByField('name', query.name)
		.sortByAge(-1)
		.assertDataIsEqual(await usersCollection.find(query, options))

	done()
})

test.skipIf(isDebug)('query users by empty query and combined sort by two fields', async done => {
	const query = {}

	const options = {
		sort: {
			name: -1,
			age: 1
		}
	}

	new TestUsersCollection(usersData)
		.sortByCityAskAndAgeAsc()
		.assertDataIsEqual(await usersCollection.find(query, options))

	done()
})

test.skipIf(isDebug)('query users by $gte filter', async done => {
	const query = {
		age: {
			$gte: 40
		}
	}

	new TestUsersCollection(usersData)
		.filterBy$Gte('age', query.age.$gte)
		.assertDataIsEqual(await usersCollection.find(query))

	done()
})

test.skipIf(isDebug)('query users by $or filter', async done => {
	const query = {
		$or: [
			{ age: 28 },
			{ age: 40 }
		]
	}

	new TestUsersCollection(usersData)
		.filterByField('age', query.$or[0].age, query.$or[1].age)
		.assertDataIsEqual(await usersCollection.find(query))

	done()
})

test.skipIf(isDebug)('query users by combined filter', async done => {
	const query = {
		city: 'Krakow',
		age: {
			$gte: 40
		}
	}

	new TestUsersCollection(usersData)
		.filterByField('city', query.city)
		.filterBy$Gte('age', query.age.$gte)
		.assertDataIsEqual(await usersCollection.find(query))

	done()
}
)
