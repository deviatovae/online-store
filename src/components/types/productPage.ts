import {CartData} from "./cartData";
import {Product} from "./product";

export type ProductPage = {
    cart: CartData,
    product: Product,
    isInCart: boolean,
}
