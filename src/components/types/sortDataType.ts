import {FilterList} from "./filtersDataType";

export type ProductViewDataType = {
    filters: FilterList
    selectedFilters: number
    productsCount: number
    sortBy: string | null
    perPage: string | null
}
