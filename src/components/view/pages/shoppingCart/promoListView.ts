import {View} from "../../view";
import {CartItemType} from "../../../types/cartItemType";
import {formatPrice} from "../../helpers/helpers";
import {CartDataType} from "../../../types/cartDataType";
import {Controller} from "../../../controller/controller";


export class PromoListView extends View<CartItemType[]> {
    protected views = {}


    public render(cartItems: CartItemType[]): string {
        return cartItems.map((cartItem) => {
            return `
            <div class="order-container__text-promo">XMAS2023 -15% OFF</div>
            <div class="order-container__total-value">$${formatPrice(cartItem.product.price * cartItem.quantity /1.15)}</div>
            `
        }).join('')
    }
}