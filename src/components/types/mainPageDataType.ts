import {Product} from "./product";
import {FiltersDataType} from "./filtersDataType";
import {CartDataType} from "./cartDataType";

export type MainPageDataType = {
    products: Product[]
    filters: FiltersDataType
    cart: CartDataType
    switchType: string
}
