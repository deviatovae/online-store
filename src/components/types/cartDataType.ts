import {CartItemType} from "./cartItemType";

/**
 * Данные страницы оплаты
 */
export type CartDataType = {
    items: CartItemType[],
    orderTotal: number,
    productCount: number,
}
