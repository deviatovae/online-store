export type MinMaxType = {
    min?: number
    selectedMin?: number
    max?: number
    selectedMax?: number
}

export type FilterCategoryType = {
    category: string,
    products: number,
}

export type FilterList = {
    colors?: string[]
    categories?: FilterCategoryType[]
    collections?: number[]
    price?: MinMaxType
    size?: MinMaxType
    stock?: MinMaxType
}

export type FiltersDataType = FilterList & {
    selected: FilterList
}
