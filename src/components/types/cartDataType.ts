import {CartItemType} from "./cartItemType";
import {PromocodeDataType} from "./promocodeDataType";
import {PromocodeType} from "./promocodeType";
import {PaginationDataType} from "./paginationDataType";

/**
 * Данные страницы оплаты
 */
export type CartDataType = {
    items: CartItemType[],
    priceAfterDiscount: number,
    getPriceByPromocodes: GetPriceByPromocodes,
    productCount: number,
    promocodes: PromocodeDataType,
    pagination: PaginationDataType,
}

export type GetPriceByPromocodes = (promocodes?: PromocodeType[]) => number
