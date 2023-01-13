import {View} from "../../view";
import {CartItemType} from "../../../types/cartItemType";
import {formatPrice} from "../../helpers/helpers";
import {Controller} from "../../../controller/controller";
import {Product} from "../../../types/product";

export class PaymentListView extends View<CartItemType[]> {
    protected views = {}

    private static getDescription({name, color, size, collection, category}: Product): string {
        return [
            name,
            color,
            size + 'cm',
            collection,
            category
        ].join(' | ')
    }

    public render(cartItems: CartItemType[]): string {
        return cartItems.map(({ product, quantity }) => {
            return `<div class="summary-list__item summary-item">
                  <div class="summary-item__top">
                    <div class="summary-item__description">${PaymentListView.getDescription(product)}</div>
                  </div>
                  <div class="summary-item__bottom bottom-item">
                    <div class="bottom-item__quantity">Qty</div>
                    <div class="bottom-item__quantity-minus" data-id="${product.id}"></div>
                    <div class="bottom-item__count">${quantity}</div>
                    <div class="bottom-item__quantity-plus" data-id="${product.id}"></div>
                    <div class="bottom-item__price">$${formatPrice(product.price * quantity)}</div>
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
