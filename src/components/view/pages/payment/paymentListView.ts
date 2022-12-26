import {View} from "../../view";
import {CartItemType} from "../../../types/cartItemType";
import {formatPrice} from "../../helpers/helpers";
import {Controller} from "../../../controller/controller";

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
                    <div class="bottom-item__quantity-minus" data-id="${cartItem.product.id}"></div>
                    <div class="bottom-item__count">${cartItem.quantity}</div>
                    <div class="bottom-item__quantity-plus" data-id="${cartItem.product.id}"></div>
                    <div class="bottom-item__price">$${formatPrice(cartItem.product.price * cartItem.quantity)}</div>
                  </div>
                </div>`
        }).join('')
    }

    afterRender(controller: Controller) {
        super.afterRender(controller);

        document.querySelectorAll<HTMLElement>('.bottom-item__quantity-plus').forEach((el) => {
            el.addEventListener('click', (e) => {
                const button = e.currentTarget as HTMLElement
                controller.addProductToCart(Number(button.dataset.id));
              })
         })

        document.querySelectorAll<HTMLElement>('.bottom-item__quantity-minus').forEach((el) => {
            el.addEventListener('click', (e) => {
                const button = e.currentTarget as HTMLElement
                controller.removeProductFromCart(Number(button.dataset.id));
            })
        })
    }
}
