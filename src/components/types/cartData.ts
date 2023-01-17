import {CartItem} from "./cartItem";
import {PromocodeData} from "./promocodeData";
import {Promocode} from "./promocode";
import {PaginationData} from "./paginationData";

/**
 * Данные страницы оплаты
 */
export type CartData = {
    items: CartItem[],
    priceAfterDiscount: number,
    getPriceByPromocodes: GetPriceByPromocodes,
    productCount: number,
    promocodes: PromocodeData,
    pagination: PaginationData,
}

export type GetPriceByPromocodes = (promocodes?: Promocode[]) => number
