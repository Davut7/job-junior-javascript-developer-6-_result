export interface UsersType {
	_id: string
	name: string
	age: number
	city: string
}

export type UsersCollectionType = UsersType[]

export type QueryType = Record<string, any>

export interface OptionsType {
    sort?: Record<string, number>
    limit?: number
};

export type EntryType = Record<string, any>
