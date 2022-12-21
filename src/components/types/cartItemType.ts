import {Product} from "./product";

/**
 * Данные корзины
 */
export type CartItemType = {
    product: Product,
    quantity: number,
}
