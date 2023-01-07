import {CartDataType} from "./cartDataType";
import {Product} from "./product";

export type ProductPageType = {
    cart: CartDataType,
    product: Product,
    isInCart: boolean,
}
