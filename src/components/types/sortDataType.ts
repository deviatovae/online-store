import {FilterList} from "./filtersDataType";
import {PaginationDataType} from "./paginationDataType";

export type ProductViewDataType = {
    filters: FilterList
    selectedFilters: number
    productsCount: number
    sortBy: string | null
    pagination: PaginationDataType
}
