import {View} from "../../view";
import {Controller} from "../../../controller/controller";
import './cartPageView.scss'
import {Router} from "../../../router/router";

import {CartPageListView} from "./cartPageListView";
import {CartDataType} from "../../../types/cartDataType";
import {formatPrice} from "../../helpers/helpers";


export default class CartPageView extends View<CartDataType> {
  protected views = {
    cartList: new CartPageListView()
};
    render(cartItems: CartDataType): string {
        return `
        <div class="shopping-cart wrapper">
          <div class="shopping-cart__header wrapper">SHOPPING CART</div>
          <div class="shopping-cart__subheader">
            <span>Item</span>
            <span>Price</span>
            <span>Qty</span>
            <span>Subtotal</span>
          </div>
          <div class="shopping-cart__list">
          ${this.views.cartList.render(cartItems.items)}
          </div>
          <div class="shopping-cart__summery">
            <div class="summery-info">
              <div class="summery-info__header">SUMMARY</div>
              <div class="summery-info__order-container">
                <div class="order-container__text-value">
                  <div class="order-container__text">Order Total</div>
                  <div class="order-container__total-value">$${formatPrice(cartItems.orderTotal)}</div>
                </div>
                <div class="order-container-button">
                  <button class="button-order">Proceed to Checkout</button>
                </div>
              </div>
            </div>
            <div class="shopping-promo">
              <input class="input-promo" type="text" placeholder="  Enter promo code">
              <button class="button-apply" disabled="disabled">Apply</button>
            </div>
        </div>`;
    }

    afterRender(controller: Controller) {
        super.afterRender(controller);

        const order = document.querySelector('.button-order') as HTMLElement | null;

        if (order) {
            order.onclick = () => Router.redirectTo('/payment');
        }
    }
}

