import {FilterList} from "./filtersDataType";

export type ProductViewDataType = {
    filters: FilterList
    productsCount: number
    sortBy: string | null
    perPage: string | null
}
