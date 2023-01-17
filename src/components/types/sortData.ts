import {FilterList} from "./filtersData";
import {PaginationData} from "./paginationData";

export type ProductViewData = {
    filters: FilterList
    selectedFilters: number
    productsCount: number
    sortBy: string | null
    pagination: PaginationData
}
