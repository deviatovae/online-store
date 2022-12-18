import './headerCartView.scss';
import {View} from "../view";
import {CartType} from "../../types/cartType";

export class HeaderCartView extends View<CartType> {
    public render(cart: CartType): string {

        return `<div class="header-cart">
          <div class="header-cart__img"></div>
          <div class="header-cart__amount-container">
            <p class="header-cart__amount">${cart.count}</p>
          </div>
          <div class="header-cart__num">$${cart.price.toFixed(2)}</div>
        </div>`
    }
}
