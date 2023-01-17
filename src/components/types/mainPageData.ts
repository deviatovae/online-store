import {Product} from "./product";
import {FiltersData} from "./filtersData";
import {CartData} from "./cartData";
import {ProductViewData} from "./sortData";

export type MainPageData = {
    products: Product[]
    filters: FiltersData
    cart: CartData
    switchType?: string | null
    sort?: string | null
    view: ProductViewData
}
