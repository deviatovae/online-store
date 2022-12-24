import {CartItemType} from "./cartItemType";
import {PromocodeDataType} from "./promocodeDataType";

/**
 * Данные страницы оплаты
 */
export type CartDataType = {
    items: CartItemType[],
    orderTotal: number,
    productCount: number,
    promocodes: PromocodeDataType,
}
