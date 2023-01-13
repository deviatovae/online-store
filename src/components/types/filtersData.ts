export type Limit = {
    min?: number
    selectedMin?: number
    defaultMin?: number
    max?: number
    selectedMax?: number
    defaultMax?: number
}

export type FilterCategory = {
    category: string,
    products: number,
}

export type FilterList = {
    colors?: string[]
    categories?: FilterCategory[]
    collections?: number[]
    price?: Limit
    size?: Limit
    stock?: Limit
}

export type FiltersData = FilterList & {
    selected: FilterList
    showFilters: boolean
}
