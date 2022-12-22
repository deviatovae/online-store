import {Product} from "./product";
import {FiltersDataType} from "./filtersDataType";

export type MainPageDataType = {
    products: Product[]
    filters: FiltersDataType
}
