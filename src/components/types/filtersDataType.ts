export type MinMaxType = {
    min: number
    max: number
}

export type FilterCategoryType = {
    category: string,
    products: number,
}

export type FiltersDataType = {
    colors: string[]
    categories: FilterCategoryType[]
    collections: number[]
    price: MinMaxType
    size: MinMaxType
    stock: MinMaxType
}
