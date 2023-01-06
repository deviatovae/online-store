import {Product} from "./product";
import {FiltersDataType} from "./filtersDataType";
import {CartDataType} from "./cartDataType";
import {ProductViewDataType} from "./sortDataType";

export type MainPageDataType = {
    products: Product[]
    filters: FiltersDataType
    cart: CartDataType
    switchType?: string | null
    sort?: string | null
    view: ProductViewDataType
}
