import {View} from "../../view";
import {CartItemType} from "../../../types/cartItemType";
import {formatPrice} from "../../helpers/helpers";

export class PaymentListView extends View<CartItemType[]> {
    protected views = {}

    private static getDescription(cartItem: CartItemType): string {
        return [
            cartItem.product.name,
            cartItem.product.color,
            cartItem.product.size + 'cm',
            cartItem.product.collection,
            cartItem.product.category
        ].join(' | ')
    }

    public render(cartItems: CartItemType[]): string {
        return cartItems.map((cartItem) => {
            return `<div class="summary-list__item summary-item">
                  <div class="summary-item__top">
                    <div class="summary-item__description">${PaymentListView.getDescription(cartItem)}</div>
                  </div>
                  <div class="summary-item__bottom bottom-item">
                    <div class="bottom-item__quantity">Qty</div>
                    <div class="bottom-item__quantity-minus">
                    <span>-</span>
                    </div>
                    <div class="bottom-item__count">${cartItem.quantity}</div>
                    <div class="bottom-item__quantity-plus">
                    <span>+</span>
                    </div>
                    <div class="bottom-item__price">$${formatPrice(cartItem.product.price * cartItem.quantity)}</div>
                  </div>
                </div>`
        }).join('')
    }
}
