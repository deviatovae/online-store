import {CartItemType} from "./cartItemType";
import {PromocodeDataType} from "./promocodeDataType";
import {PromocodeType} from "./promocodeType";

/**
 * Данные страницы оплаты
 */
export type CartDataType = {
    items: CartItemType[],
    priceAfterDiscount: number,
    getPriceByPromocodes: GetPriceByPromocodes,
    productCount: number,
    promocodes: PromocodeDataType,
}

export type GetPriceByPromocodes = (promocodes?: PromocodeType[]) => number
